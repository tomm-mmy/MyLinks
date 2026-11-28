'use strict';

(() => {
  const USER_ID = '881206091009122406';
  const API_URL = `https://api.lanyard.rest/v1/users/${USER_ID}`;
  const REFRESH_MS = 30_000;
  const state = { connected: false, lastSyncAt: null, lastData: null, request: null };

  const translations = {
    de: {
      online: 'Online',
      idle: 'Abwesend',
      dnd: 'Bitte nicht stören',
      offline: 'Offline',
      playing: 'Spielt',
      streaming: 'Streamt',
      listening: 'Hört',
      watching: 'Schaut',
      custom: 'Status',
      competing: 'Tritt an bei',
      noActivity: 'Keine aktive Aktivität',
      connected: 'Lanyard verbunden',
      connecting: 'Verbinde mit Lanyard …',
      error: 'Lanyard nicht erreichbar',
      sync: 'Aktualisiert'
    },
    en: {
      online: 'Online',
      idle: 'Away',
      dnd: 'Do not disturb',
      offline: 'Offline',
      playing: 'Playing',
      streaming: 'Streaming',
      listening: 'Listening to',
      watching: 'Watching',
      custom: 'Status',
      competing: 'Competing in',
      noActivity: 'No active activity',
      connected: 'Lanyard connected',
      connecting: 'Connecting to Lanyard …',
      error: 'Lanyard unavailable',
      sync: 'Updated'
    }
  };

  const ACTIVITY_TYPE_KEYS = {
    0: 'playing',
    1: 'streaming',
    2: 'listening',
    3: 'watching',
    4: 'custom',
    5: 'competing'
  };

  const $ = (id) => document.getElementById(id);
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'de');
  const tr = (key) => translations[lang()][key] || key;

  function setConnection(ok, message) {
    const dot = $('api-status-dot');
    const text = $('api-status-text');
    const pill = $('api-status-pill');
    dot?.classList.toggle('ok', ok);
    dot?.classList.toggle('err', !ok);
    if (text) text.textContent = message;
    if (pill) pill.title = message;
  }

  function formatActivity(activity) {
    if (!activity || typeof activity !== 'object') return '';

    // Type 4: Custom Status (Emoji + Text/State)
    if (activity.type === 4) {
      const emoji = activity.emoji?.name ? `${activity.emoji.name} ` : '';
      const text = activity.state || activity.name || '';
      return `${emoji}${text}`.trim();
    }

    // Type 2: Listening (z. B. Spotify oder andere Listening-Aktivitäten)
    if (activity.type === 2) {
      const title = activity.details || activity.name || '';
      const artist = String(activity.state || '').replace(/;\s*/g, ', ');
      const combined = [title, artist].filter(Boolean).join(' · ');
      return combined ? `${tr('listening')} ${combined}` : '';
    }

    const key = ACTIVITY_TYPE_KEYS[activity.type];
    if (!key) return '';

    const prefix = tr(key);
    const name = activity.name || '';
    const extra = [activity.details, activity.state].filter(Boolean).join(' · ');

    if (!name && !extra) return '';
    return `${prefix} ${name}${extra ? ` · ${extra}` : ''}`.trim();
  }

  function activityText(data) {
    const activities = Array.isArray(data?.activities) ? data.activities : [];
    const parts = [];

    // 1. Primäre Aktivitäten (Playing, Streaming, Watching, Competing)
    for (const act of activities) {
      if (act && [0, 1, 3, 5].includes(act.type)) {
        const formatted = formatActivity(act);
        if (formatted) parts.push(formatted);
      }
    }

    // 2. Spotify / Type 2 (Listening)
    if (data?.listening_to_spotify && data?.spotify) {
      const song = data.spotify.song || '';
      const artist = String(data.spotify.artist || '').replace(/;\s*/g, ', ');
      const detail = [song, artist].filter(Boolean).join(' · ');
      if (detail) {
        parts.push(`${tr('listening')} ${detail}`);
      }
    } else {
      for (const act of activities) {
        if (act && act.type === 2) {
          const formatted = formatActivity(act);
          if (formatted) parts.push(formatted);
        }
      }
    }

    // 3. Custom Status (Type 4) als Ergänzung oder Fallback
    for (const act of activities) {
      if (act && act.type === 4) {
        const formatted = formatActivity(act);
        if (formatted) parts.push(formatted);
      }
    }

    const uniqueParts = [...new Set(parts.filter(Boolean))];
    return uniqueParts.length ? uniqueParts.join('  •  ') : tr('noActivity');
  }

  function avatarUrl(user) {
    if (!user?.id || !user?.avatar) return null;
    const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
  }

  function normalizeStatus(rawStatus) {
    const valid = ['online', 'idle', 'dnd', 'offline'];
    return valid.includes(rawStatus) ? rawStatus : 'offline';
  }

  function render(data) {
    if (!data || typeof data !== 'object') return;
    state.lastData = data;

    const status = normalizeStatus(data.discord_status);
    const user = data.discord_user || data.user || {};
    const label = tr(status);

    const dot = $('online-dot');
    if (dot) {
      dot.dataset.status = status;
      dot.title = label;
    }

    const box = $('presence');
    if (box) {
      box.dataset.status = status;
      box.hidden = false;
    }

    if ($('presence-status')) $('presence-status').textContent = label;
    if ($('presence-activity-text')) $('presence-activity-text').textContent = activityText(data);

    const displayName = user.global_name || user.display_name || user.username;
    if (displayName && $('owner-display-name')) {
      $('owner-display-name').textContent = displayName;
    }

    const avatar = avatarUrl(user);
    if (avatar) {
      ['owner-avatar-img', 'enter-avatar-img'].forEach((id) => {
        const img = $(id);
        if (img && img.src !== avatar) img.src = avatar;
      });
    }

    const sync = $('presence-sync-meta');
    if (sync) {
      sync.textContent = state.lastSyncAt
        ? `${tr('sync')} ${state.lastSyncAt.toLocaleTimeString(
            lang() === 'en' ? 'en-US' : 'de-DE',
            { hour: '2-digit', minute: '2-digit' }
          )}`
        : '';
    }
  }

  async function refresh() {
    if (state.request) return state.request;
    state.request = (async () => {
      setConnection(false, tr('connecting'));
      const startedAt = performance.now();
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          cache: 'no-store',
          headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(9000)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        if (payload?.success !== true || !payload?.data) {
          throw new Error('Invalid Lanyard response');
        }
        const latencyMs = Math.round(performance.now() - startedAt);
        state.connected = true;
        state.lastSyncAt = new Date();
        setConnection(true, `${tr('connected')} · ${latencyMs} ms`);
        render(payload.data);
      } catch (error) {
        state.connected = false;
        setConnection(false, `${tr('error')}${error?.message ? ` · ${error.message}` : ''}`);
        console.warn('[MyLinks] Lanyard request failed:', error);
      } finally {
        state.request = null;
      }
    })();
    return state.request;
  }

  const langObserver = new MutationObserver(() => {
    if (state.lastData) {
      render(state.lastData);
    }
  });
  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  window.MyLinksPresence = {
    refresh,
    rerender: () => {
      if (state.lastData) render(state.lastData);
    }
  };

  refresh();
  setInterval(() => {
    if (!document.hidden) refresh();
  }, REFRESH_MS);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refresh();
  });
})();
