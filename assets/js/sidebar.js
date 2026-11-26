'use strict';

(() => {
  const OWNER_ID = '881206091009122406';
  const state = {
    records: {},
    online: false,
    error: null
  };

  function setApiBadge(ok, label) {
    const dot = document.getElementById('api-status-dot');
    const text = document.getElementById('api-status-text');
    if (dot) {
      dot.classList.remove('ok', 'err');
      dot.classList.add(ok ? 'ok' : 'err');
    }
    if (text) text.textContent = label;
  }

  function formatActivity(activities, lang) {
    if (!Array.isArray(activities) || !activities.length) return '';
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
    return custom ? (custom.state || custom.name) : '';
  }

  function statusLabel(status, lang) {
    const map = {
      de: { online: 'Online', idle: 'Abwesend', dnd: 'Bitte nicht stören', offline: 'Offline' },
      en: { online: 'Online', idle: 'Away', dnd: 'Do not disturb', offline: 'Offline' }
    };
    return (map[lang] || map.de)[status] || 'Offline';
  }

  function renderOwner() {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
    const rec = state.records[OWNER_ID] || null;
    const status = ['online', 'idle', 'dnd'].includes(rec?.status) ? rec.status : 'offline';
    const dot = document.getElementById('online-dot');
    const statusEl = document.getElementById('presence-status');
    const actEl = document.getElementById('presence-activity');

    if (dot) dot.dataset.status = status;
    if (statusEl) statusEl.textContent = statusLabel(status, lang);

    const actText = formatActivity(rec?.activities, lang);
    if (actEl) {
      if (actText) {
        actEl.hidden = false;
        actEl.textContent = actText;
      } else {
        actEl.hidden = true;
        actEl.textContent = '';
      }
    }
  }

  function safeUrl(raw) {
    try {
      const u = new URL(raw);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : null;
    } catch {
      return null;
    }
  }

  function renderFriends() {
    const grid = document.getElementById('friends-grid');
    const countEl = document.getElementById('friends-count');
    const cfg = window.FRIENDS_CONFIG;
    if (!grid || !cfg || !Array.isArray(cfg.users)) return;

    const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
    const users = cfg.users.filter((u) => /^\d{17,20}$/.test(String(u.id)));
    let activeCount = 0;

    grid.textContent = '';
    users.forEach((user) => {
      const rec = state.records[user.id] || null;
      const status = ['online', 'idle', 'dnd'].includes(rec?.status) ? rec.status : 'offline';
      if (status !== 'offline') activeCount++;

      const card = document.createElement('article');
      card.className = 'friend-card';
      card.dataset.status = status;

      const top = document.createElement('div');
      top.className = 'friend-top';

      const avWrap = document.createElement('div');
      avWrap.className = 'friend-avatar-wrap';
      const av = document.createElement('div');
      av.className = 'friend-avatar';
      av.textContent = user.id.slice(-2);
      const fDot = document.createElement('span');
      fDot.className = 'friend-dot';
      avWrap.append(av, fDot);

      const meta = document.createElement('div');
      const h3 = document.createElement('h3');
      h3.className = 'friend-name';
      h3.textContent = `User · ${user.id.slice(-4)}`;
      const st = document.createElement('div');
      st.className = 'friend-status';
      st.textContent = statusLabel(status, lang);
      meta.append(h3, st);

      top.append(avWrap, meta);

      const actBox = document.createElement('div');
      actBox.className = 'friend-activity';
      actBox.textContent = formatActivity(rec?.activities, lang) || (lang === 'de' ? 'Keine aktive Aktivität' : 'No active activity');

      card.append(top, actBox);

      const links = Array.isArray(user.links) ? user.links : [];
      if (links.length) {
        const linkWrap = document.createElement('div');
        linkWrap.className = 'friend-links';
        links.forEach((l) => {
          const href = safeUrl(l.url);
          if (!href) return;
          const a = document.createElement('a');
          a.className = 'friend-link';
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = l.label || l.platform || 'Link';
          linkWrap.appendChild(a);
        });
        card.appendChild(linkWrap);
      }

      grid.appendChild(card);
    });

    if (countEl) countEl.textContent = `${activeCount} / ${users.length} online`;
  }

  async function fetchPresence() {
    const endpoint = window.FRIENDS_CONFIG?.presenceApiUrl || '/api/presence';
    try {
      const res = await fetch(endpoint, {
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
      state.online = true;
      state.error = null;
      setApiBadge(true, 'API: Verbunden');
    } catch (err) {
      state.online = false;
      state.error = err.message;
      setApiBadge(false, `API: ${err.message}`);
    }
    renderOwner();
    renderFriends();
  }

  window.MyLinksApi = {
    refresh: fetchPresence,
    rerender: () => {
      renderOwner();
      renderFriends();
    }
  };

  fetchPresence();
  setInterval(() => {
    if (!document.hidden) fetchPresence();
  }, 30000);
})();
