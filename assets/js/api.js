'use strict';

(() => {
  const OWNER_ID = window.MyLinksFriends?.OWNER_ID || '881206091009122406';
  const VALID_STATUSES = new Set(['online', 'idle', 'dnd', 'offline']);

  const state = {
    records: {},
    connected: false,
    latencyMs: null,
    lastSyncAt: null,
    filter: 'all'
  };

  function getLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'de';
  }

  function normalizeStatus(rawStatus) {
    const s = String(rawStatus || '').trim().toLowerCase();
    if (s === 'do_not_disturb' || s === 'busy') return 'dnd';
    if (s === 'away') return 'idle';
    return VALID_STATUSES.has(s) ? s : 'offline';
  }

  function normalizeRecord(raw) {
    if (!raw || typeof raw !== 'object') {
      return {
        status: 'offline',
        username: null,
        globalName: null,
        avatar: null,
        activities: []
      };
    }

    // Supports either direct fields or nested { user, presence, activities }
    const userObj = raw.user && typeof raw.user === 'object' ? raw.user : raw;
    const status = normalizeStatus(raw.status || raw.discord_status || raw.presence?.status);
    const username = typeof (userObj.username || raw.username) === 'string'
      ? (userObj.username || raw.username).trim()
      : null;
    const globalName = typeof (userObj.globalName || userObj.global_name || raw.globalName || raw.global_name || raw.displayName) === 'string'
      ? (userObj.globalName || userObj.global_name || raw.globalName || raw.global_name || raw.displayName).trim()
      : null;
    const avatar = typeof (userObj.avatar || raw.avatar) === 'string'
      ? (userObj.avatar || raw.avatar).trim()
      : null;

    const activities = Array.isArray(raw.activities)
      ? raw.activities
      : (Array.isArray(raw.presence?.activities) ? raw.presence.activities : []);

    return { status, username, globalName, avatar, activities };
  }

  function extractMapFromPayload(payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return null;
    }
    const candidate = payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)
      ? payload.data
      : (payload.users && typeof payload.users === 'object' && !Array.isArray(payload.users)
        ? payload.users
        : payload);

    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
      return null;
    }

    const cleanMap = {};
    for (const [key, val] of Object.entries(candidate)) {
      const k = String(key || '').trim();
      if (/^\d{17,20}$/.test(k)) {
        cleanMap[k] = normalizeRecord(val);
      }
    }
    return cleanMap;
  }

  function statusLabel(status, lang) {
    const map = {
      de: { online: 'Online', idle: 'Abwesend', dnd: 'Bitte nicht stören', offline: 'Offline' },
      en: { online: 'Online', idle: 'Away', dnd: 'Do not disturb', offline: 'Offline' }
    };
    return (map[lang] || map.de)[status] || 'Offline';
  }

  function formatActivity(activities, lang) {
    if (!Array.isArray(activities) || !activities.length) {
      return lang === 'de' ? 'Keine aktive Aktivität' : 'No active activity';
    }
    const main = activities.find((a) => a && typeof a === 'object' && [0, 1, 3, 5].includes(Number(a.type)) && a.name);
    if (main) {
      const t = Number(main.type);
      const prefixMap = {
        0: lang === 'de' ? 'Spielt' : 'Playing',
        1: lang === 'de' ? 'Streamt' : 'Streaming',
        3: lang === 'de' ? 'Schaut' : 'Watching',
        5: lang === 'de' ? 'Wettkampf' : 'Competing'
      };
      const base = `${prefixMap[t] || 'Aktiv'} ${String(main.name).trim()}`;
      return main.details ? `${base} · ${String(main.details).trim()}` : base;
    }
    const custom = activities.find((a) => a && typeof a === 'object' && Number(a.type) === 4 && (a.state || a.name));
    if (custom) {
      return String(custom.state || custom.name).trim();
    }
    return lang === 'de' ? 'Keine aktive Aktivität' : 'No active activity';
  }

  function buildAvatarUrl(userId, avatarHash) {
    if (!avatarHash || !/^[a-zA-Z0-9_-]+$/.test(avatarHash)) return null;
    const ext = avatarHash.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${ext}?size=256`;
  }

  function setApiBadge(ok, message, titleText) {
    const dot = document.getElementById('api-status-dot');
    const text = document.getElementById('api-status-text');
    const pill = document.getElementById('api-status-pill');
    if (dot) {
      dot.classList.remove('ok', 'err');
      dot.classList.add(ok ? 'ok' : 'err');
    }
    if (text) text.textContent = message;
    if (pill && titleText) pill.title = titleText;
  }

  function renderOwner() {
    const lang = getLang();
    const rec = state.records[OWNER_ID] || normalizeRecord(null);
    const status = rec.status;

    const ring = document.getElementById('online-dot');
    const stEl = document.getElementById('presence-status');
    const actEl = document.getElementById('presence-activity-text');
    const syncEl = document.getElementById('presence-sync-meta');
    const nameEl = document.getElementById('owner-display-name');
    const avImg = document.getElementById('owner-avatar-img');
    const enterAvImg = document.getElementById('enter-avatar-img');

    if (ring) {
      ring.dataset.status = status;
      ring.title = statusLabel(status, lang);
    }
    if (stEl) stEl.textContent = statusLabel(status, lang);
    if (actEl) actEl.textContent = formatActivity(rec.activities, lang);

    if (syncEl) {
      if (state.connected && typeof state.latencyMs === 'number') {
        syncEl.textContent = `· ${state.latencyMs} ms`;
      } else {
        syncEl.textContent = '';
      }
    }

    const liveName = rec.globalName || rec.username;
    if (nameEl && liveName) {
      nameEl.textContent = liveName;
    }

    const liveAvatar = buildAvatarUrl(OWNER_ID, rec.avatar);
    if (liveAvatar) {
      if (avImg && avImg.src !== liveAvatar) avImg.src = liveAvatar;
      if (enterAvImg && enterAvImg.src !== liveAvatar) enterAvImg.src = liveAvatar;
    }
  }

  function renderFriends() {
    const slot = document.getElementById('friends-slot');
    const countEl = document.getElementById('friends-count');
    const noteEl = document.getElementById('friends-sync-note');
    if (!slot) return;

    const lang = getLang();
    const friends = window.MyLinksFriends?.getFriends ? window.MyLinksFriends.getFriends() : [];
    let onlineCount = 0;

    const enriched = friends.map((f) => {
      const rec = state.records[f.id] || normalizeRecord(null);
      const isActive = rec.status !== 'offline';
      if (isActive) onlineCount++;

      const displayName = rec.globalName || rec.username || f.fallbackName;
      const avatarSrc = buildAvatarUrl(f.id, rec.avatar);
      const activityText = formatActivity(rec.activities, lang);

      return {
        ...f,
        status: rec.status,
        isActive,
        displayName,
        avatarSrc,
        activityText
      };
    });

    enriched.sort((a, b) => Number(b.isActive) - Number(a.isActive));

    const visible = state.filter === 'active'
      ? enriched.filter((x) => x.isActive)
      : enriched;

    slot.textContent = '';

    if (!visible.length) {
      const empty = document.createElement('div');
      empty.className = 'friends-empty';
      empty.textContent = lang === 'de'
        ? 'Aktuell keine aktiven Freunde online.'
        : 'No friends active or online right now.';
      slot.appendChild(empty);
    } else {
      visible.forEach((f) => {
        const card = document.createElement('article');
        card.className = 'friend-card';
        card.dataset.status = f.status;

        const top = document.createElement('div');
        top.className = 'friend-top';

        const avBox = document.createElement('div');
        avBox.className = 'friend-av-box';

        const av = document.createElement('div');
        av.className = 'friend-av';

        if (f.avatarSrc) {
          const img = document.createElement('img');
          img.src = f.avatarSrc;
          img.alt = f.displayName;
          img.loading = 'lazy';
          img.onerror = () => {
            img.remove();
            av.textContent = f.displayName.slice(0, 2).toUpperCase();
          };
          av.appendChild(img);
        } else {
          av.textContent = f.displayName.slice(0, 2).toUpperCase();
        }

        const dot = document.createElement('span');
        dot.className = 'friend-dot';
        avBox.append(av, dot);

        const info = document.createElement('div');
        info.className = 'friend-meta';

        const name = document.createElement('div');
        name.className = 'friend-name';
        name.textContent = f.displayName;

        const statusLine = document.createElement('div');
        statusLine.className = 'friend-status-line';
        statusLine.textContent = statusLabel(f.status, lang);

        info.append(name, statusLine);
        top.append(avBox, info);

        const act = document.createElement('div');
        act.className = 'friend-activity-chip';
        act.textContent = f.activityText;

        card.append(top, act);

        if (f.links.length) {
          const linksRow = document.createElement('div');
          linksRow.className = 'friend-links-row';
          f.links.forEach((l) => {
            const a = document.createElement('a');
            a.className = 'friend-link-btn';
            a.href = l.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = l.label;
            linksRow.appendChild(a);
          });
          card.appendChild(linksRow);
        }

        slot.appendChild(card);
      });
    }

    if (countEl) {
      countEl.textContent = `${onlineCount} / ${friends.length} online`;
    }

    if (noteEl) {
      if (state.connected && state.lastSyncAt) {
        const timeStr = state.lastSyncAt.toLocaleTimeString(lang === 'en' ? 'en-US' : 'de-DE', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        noteEl.textContent = lang === 'de' ? `Sync ${timeStr}` : `Synced ${timeStr}`;
      } else {
        noteEl.textContent = lang === 'de' ? 'Warte auf Bot-API' : 'Waiting for bot API';
      }
    }
  }

  async function fetchPresence() {
    const t0 = performance.now();
    try {
      const res = await fetch('/api/presence', {
        method: 'GET',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000)
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const payload = await res.json();
      const mapData = extractMapFromPayload(payload);
      if (!mapData) {
        throw new Error('Ungültige Datenstruktur');
      }

      state.records = mapData;
      state.connected = true;
      state.latencyMs = typeof payload?.latencyMs === 'number'
        ? payload.latencyMs
        : Math.round(performance.now() - t0);
      state.lastSyncAt = new Date();

      setApiBadge(
        true,
        `Bot-API · ${state.latencyMs} ms`,
        `Verbunden mit Bot-API (${Object.keys(mapData).length} Profile, ${state.latencyMs} ms)`
      );
    } catch (err) {
      state.connected = false;
      state.latencyMs = null;
      setApiBadge(
        false,
        `Bot-API · Offline`,
        `Verbindung fehlgeschlagen: ${err.message}`
      );
    }

    renderOwner();
    renderFriends();
  }

  function setFriendFilter(filter) {
    state.filter = filter === 'active' ? 'active' : 'all';
    document.querySelectorAll('[data-friend-filter]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.friendFilter === state.filter);
    });
    renderFriends();
  }

  window.MyLinksPresence = {
    refresh: fetchPresence,
    rerender: () => {
      renderOwner();
      renderFriends();
    },
    setFriendFilter
  };

  fetchPresence();
  setInterval(() => {
    if (!document.hidden) fetchPresence();
  }, 25000);
})();
