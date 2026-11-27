'use strict';

(() => {
  const OWNER_ID = window.MyLinksFriends?.OWNER_ID || '881206091009122406';
  const state = {
    records: {},
    connected: false,
    filter: 'all'
  };

  function getLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'de';
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
    const main = activities.find((a) => [0, 1, 3, 5].includes(a.type) && a.name);
    if (main) {
      const prefixMap = {
        0: lang === 'de' ? 'Spielt' : 'Playing',
        1: lang === 'de' ? 'Streamt' : 'Streaming',
        3: lang === 'de' ? 'Schaut' : 'Watching',
        5: lang === 'de' ? 'Wettkampf' : 'Competing'
      };
      const base = `${prefixMap[main.type] || 'Aktiv'} ${main.name}`;
      return main.details ? `${base} · ${main.details}` : base;
    }
    const custom = activities.find((a) => a.type === 4 && (a.state || a.name));
    return custom ? (custom.state || custom.name) : (lang === 'de' ? 'Keine aktive Aktivität' : 'No active activity');
  }

  function buildAvatarUrl(userId, avatarHash) {
    if (!avatarHash || !/^[a-zA-Z0-9_-]+$/.test(String(avatarHash))) return null;
    const ext = String(avatarHash).startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${ext}?size=256`;
  }

  function safeUrl(raw) {
    try {
      const u = new URL(raw);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : null;
    } catch {
      return null;
    }
  }

  function setApiBadge(ok, message) {
    const dot = document.getElementById('api-status-dot');
    const text = document.getElementById('api-status-text');
    if (dot) {
      dot.classList.remove('ok', 'err');
      dot.classList.add(ok ? 'ok' : 'err');
    }
    if (text) text.textContent = message;
  }

  function renderOwner() {
    const lang = getLang();
    const rec = state.records[OWNER_ID] || null;
    const status = ['online', 'idle', 'dnd'].includes(rec?.status) ? rec.status : 'offline';

    const ring = document.getElementById('online-dot');
    const stEl = document.getElementById('presence-status');
    const actEl = document.getElementById('presence-activity-text');
    const nameEl = document.getElementById('owner-display-name');
    const avImg = document.getElementById('owner-avatar-img');
    const enterAvImg = document.getElementById('enter-avatar-img');

    if (ring) {
      ring.dataset.status = status;
      ring.title = statusLabel(status, lang);
    }
    if (stEl) stEl.textContent = statusLabel(status, lang);
    if (actEl) actEl.textContent = formatActivity(rec?.activities, lang);

    const liveName = rec?.globalName || rec?.username;
    if (nameEl && liveName) {
      nameEl.textContent = liveName;
    }

    const liveAvatar = buildAvatarUrl(OWNER_ID, rec?.avatar);
    if (liveAvatar) {
      if (avImg && avImg.src !== liveAvatar) avImg.src = liveAvatar;
      if (enterAvImg && enterAvImg.src !== liveAvatar) enterAvImg.src = liveAvatar;
    }
  }

  function renderFriends() {
    const slot = document.getElementById('friends-slot');
    const countEl = document.getElementById('friends-count');
    if (!slot) return;

    const lang = getLang();
    const friends = window.MyLinksFriends?.getFriends ? window.MyLinksFriends.getFriends() : [];
    let onlineCount = 0;

    const enriched = friends.map((f) => {
      const rec = state.records[f.id] || null;
      const status = ['online', 'idle', 'dnd'].includes(rec?.status) ? rec.status : 'offline';
      const isActive = status !== 'offline';
      if (isActive) onlineCount++;

      const displayName = rec?.globalName || rec?.username || f.fallbackName;
      const avatarSrc = buildAvatarUrl(f.id, rec?.avatar);
      const activityText = formatActivity(rec?.activities, lang);

      return {
        ...f,
        status,
        isActive,
        displayName,
        avatarSrc,
        activityText
      };
    });

    // Sort active friends first, then keep deterministic order
    enriched.sort((a, b) => Number(b.isActive) - Number(a.isActive));

    const visible = state.filter === 'active'
      ? enriched.filter((x) => x.isActive)
      : enriched;

    slot.textContent = '';

    if (!visible.length) {
      const empty = document.createElement('div');
      empty.className = 'friends-empty';
      empty.textContent = lang === 'de'
        ? 'Aktuell niemand online.'
        : 'Nobody online right now.';
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

        const statusRow = document.createElement('div');
        statusRow.className = 'friend-status-line';
        statusRow.textContent = statusLabel(f.status, lang);

        info.append(name, statusRow);
        top.append(avBox, info);

        const act = document.createElement('div');
        act.className = 'friend-activity-chip';
        act.textContent = f.activityText;

        card.append(top, act);

        if (Array.isArray(f.links) && f.links.length) {
          const linksRow = document.createElement('div');
          linksRow.className = 'friend-links-row';
          f.links.forEach((l) => {
            const href = safeUrl(l.url);
            if (!href) return;
            const a = document.createElement('a');
            a.className = 'friend-link-btn';
            a.href = href;
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
  }

  async function fetchPresence() {
    try {
      const res = await fetch('/api/presence', {
        method: 'GET',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();
      const mapData = payload?.data && typeof payload.data === 'object' ? payload.data : payload;
      if (!mapData || typeof mapData !== 'object' || Array.isArray(mapData)) {
        throw new Error('Invalid payload');
      }
      state.records = mapData;
      state.connected = true;
      setApiBadge(true, 'API: Verbunden');
    } catch (err) {
      state.connected = false;
      setApiBadge(false, `API: ${err.message}`);
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
  }, 30000);
})();
