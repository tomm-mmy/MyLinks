'use strict';

(() => {
  const OWNER_ID = '881206091009122406';
  const FRIENDS = [
    {
      id: '1287327628818251843',
      fallbackName: 'JulBa10',
      links: [
        { label: 'YouTube', url: 'https://youtube.com/@julba10?si=RQ2QFl7W07l0iSPz' },
        { label: 'Twitch', url: 'https://www.twitch.tv/julianbala10' },
        { label: 'Roblox', url: 'https://www.roblox.com/de/users/7710897847/profile' }
      ]
    },
    {
      id: '895697786656415775',
      fallbackName: 'AnnaGlocke',
      links: [
        { label: 'YouTube', url: 'https://www.youtube.com/channel/UC74nf0V1Q7jrRPSmY0AlJDg' },
        { label: 'Twitch', url: 'https://www.twitch.tv/annaglocke_yt' }
      ]
    },
    {
      id: '1081597724132134923',
      fallbackName: 'Friend · 4923',
      links: [{ label: 'YouTube', url: 'https://www.youtube.com/channel/UCvvtWlqO0nSGC3gtfaORYIQ' }]
    },
    {
      id: '1079334365588365392',
      fallbackName: 'Friend · 5392',
      links: [{ label: 'YouTube', url: 'https://www.youtube.com/channel/UC5Kt3LfWdviSyXlaDoSKF4w' }]
    },
    {
      id: '1161326264779559092',
      fallbackName: 'Pavyan Systems',
      links: [{ label: 'Website', url: 'https://pavyan-systems.com/' }]
    },
    {
      id: '1204084190014865439',
      fallbackName: 'Friend · 5439',
      links: []
    }
  ];

  const state = { records: {}, connected: false };

  function getLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'de';
  }

  function statusText(st, lang) {
    const map = {
      de: { online: 'Online', idle: 'Abwesend', dnd: 'Bitte nicht stören', offline: 'Offline' },
      en: { online: 'Online', idle: 'Away', dnd: 'Do not disturb', offline: 'Offline' }
    };
    return (map[lang] || map.de)[st] || 'Offline';
  }

  function formatActivity(activities, lang) {
    if (!Array.isArray(activities) || !activities.length) {
      return lang === 'de' ? 'Keine aktive Aktivität' : 'No active activity';
    }
    const main = activities.find((a) => [0, 1, 3, 5].includes(a.type) && a.name);
    if (main) {
      const prefix = {
        0: lang === 'de' ? 'Spielt' : 'Playing',
        1: lang === 'de' ? 'Streamt' : 'Streaming',
        3: lang === 'de' ? 'Schaut' : 'Watching',
        5: lang === 'de' ? 'Wettkampf' : 'Competing'
      }[main.type] || 'Aktiv';
      return main.details ? `${prefix} ${main.name} · ${main.details}` : `${prefix} ${main.name}`;
    }
    const custom = activities.find((a) => a.type === 4 && (a.state || a.name));
    return custom ? (custom.state || custom.name) : (lang === 'de' ? 'Keine aktive Aktivität' : 'No active activity');
  }

  function avatarUrl(userId, hash) {
    if (!hash || !/^[a-zA-Z0-9_-]+$/.test(String(hash))) return null;
    const ext = String(hash).startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${userId}/${hash}.${ext}?size=128`;
  }

  function safeUrl(raw) {
    try {
      const u = new URL(raw);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : null;
    } catch {
      return null;
    }
  }

  function setApiBadge(ok, msg) {
    const dot = document.getElementById('api-status-dot');
    const txt = document.getElementById('api-status-text');
    if (dot) {
      dot.classList.remove('ok', 'err');
      dot.classList.add(ok ? 'ok' : 'err');
    }
    if (txt) txt.textContent = msg;
  }

  function renderOwner() {
    const lang = getLang();
    const rec = state.records[OWNER_ID] || null;
    const st = ['online', 'idle', 'dnd'].includes(rec?.status) ? rec.status : 'offline';

    const ring = document.getElementById('online-dot');
    const stEl = document.getElementById('presence-status');
    const actEl = document.getElementById('presence-activity-text');
    const avImg = document.getElementById('owner-avatar-img');

    if (ring) {
      ring.dataset.status = st;
      ring.title = statusText(st, lang);
    }
    if (stEl) stEl.textContent = statusText(st, lang);
    if (actEl) actEl.textContent = formatActivity(rec?.activities, lang);

    const liveAv = avatarUrl(OWNER_ID, rec?.avatar);
    if (avImg && liveAv) avImg.src = liveAv;
  }

  function renderFriendsSection() {
    const host = document.getElementById('friends-slot');
    const countEl = document.getElementById('friends-count');
    if (!host) return;

    const lang = getLang();
    let onlineCount = 0;
    host.textContent = '';

    FRIENDS.forEach((f) => {
      const rec = state.records[f.id] || null;
      const st = ['online', 'idle', 'dnd'].includes(rec?.status) ? rec.status : 'offline';
      if (st !== 'offline') onlineCount++;

      const name = rec?.globalName || rec?.username || f.fallbackName;
      const avSrc = avatarUrl(f.id, rec?.avatar);

      const box = document.createElement('article');
      box.className = 'friend-box';
      box.dataset.status = st;

      const top = document.createElement('div');
      top.className = 'friend-top';

      const avBox = document.createElement('div');
      avBox.className = 'friend-av-box';
      const av = document.createElement('div');
      av.className = 'friend-av';

      if (avSrc) {
        const img = document.createElement('img');
        img.src = avSrc;
        img.alt = name;
        img.loading = 'lazy';
        av.appendChild(img);
      } else {
        av.textContent = name.slice(0, 2).toUpperCase();
      }

      const fDot = document.createElement('span');
      fDot.className = 'friend-dot';
      avBox.append(av, fDot);

      const meta = document.createElement('div');
      const h3 = document.createElement('div');
      h3.className = 'friend-name';
      h3.textContent = name;
      const sub = document.createElement('div');
      sub.className = 'friend-sub';
      sub.textContent = `${statusText(st, lang)} · ${formatActivity(rec?.activities, lang)}`;
      meta.append(h3, sub);

      top.append(avBox, meta);
      box.appendChild(top);

      if (f.links?.length) {
        const linksRow = document.createElement('div');
        linksRow.className = 'tile-actions';
        f.links.forEach((l) => {
          const href = safeUrl(l.url);
          if (!href) return;
          const a = document.createElement('a');
          a.className = 'mini-btn';
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = l.label;
          linksRow.appendChild(a);
        });
        box.appendChild(linksRow);
      }

      host.appendChild(box);
    });

    if (countEl) countEl.textContent = `${onlineCount} / ${FRIENDS.length} online`;
  }

  async function refresh() {
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
    renderFriendsSection();
  }

  window.MyLinksHub = {
    refresh,
    rerenderPresence: () => {
      renderOwner();
      renderFriendsSection();
    }
  };

  refresh();
  setInterval(() => {
    if (!document.hidden) refresh();
  }, 30000);
})();
