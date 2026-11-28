'use strict';

(() => {
  const USER_ID = '881206091009122406';
  const API_URL = '/api/presence';
  const REFRESH_MS = 30_000;
  const state = { connected: false, lastSyncAt: null, request: null };

  const translations = {
    de: {
      online: 'Online', idle: 'Abwesend', dnd: 'Bitte nicht stören', offline: 'Offline',
      playing: 'Spielt', streaming: 'Streamt', watching: 'Schaut', competing: 'Wettkampf',
      listening: 'Hört', noActivity: 'Keine aktive Aktivität',
      connected: 'Lanyard verbunden', connecting: 'Verbinde mit Lanyard …',
      error: 'Lanyard nicht erreichbar', sync: 'Aktualisiert'
    },
    en: {
      online: 'Online', idle: 'Away', dnd: 'Do not disturb', offline: 'Offline',
      playing: 'Playing', streaming: 'Streaming', watching: 'Watching', competing: 'Competing',
      listening: 'Listening to', noActivity: 'No active activity',
      connected: 'Lanyard connected', connecting: 'Connecting to Lanyard …',
      error: 'Lanyard unavailable', sync: 'Updated'
    }
  };

  const $ = (id) => document.getElementById(id);
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'de';
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

  function activityText(data) {
    const activities = Array.isArray(data.activities) ? data.activities : [];
    const types = { 0: 'playing', 1: 'streaming', 3: 'watching', 5: 'competing' };
    const main = activities.find((a) => a && types[a.type] && a.name);
    if (main) {
      const prefix = tr(types[main.type]);
      return `${prefix} ${main.name}${main.details ? ` · ${main.details}` : ''}`;
    }
    if (data.listening_to_spotify && data.spotify) {
      const song = data.spotify.song || '';
      const artist = String(data.spotify.artist || '').replace(/;\s*/g, ', ');
      const detail = [song, artist].filter(Boolean).join(' · ');
      if (detail) return `${tr('listening')} ${detail}`;
    }
    const custom = activities.find((a) => a && a.type === 4 && (a.state || a.name));
    return custom ? (custom.state || custom.name) : tr('noActivity');
  }

  function avatarUrl(user) {
    if (!user?.id || !user?.avatar) return null;
    const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
  }

  function render(data) {
    const status = ['online', 'idle', 'dnd'].includes(data.discord_status)
      ? data.discord_status : 'offline';
    const user = data.discord_user || data.user || {};
    const label = tr(status);
    const dot = $('online-dot');
    if (dot) {
      dot.dataset.status = status;
      dot.title = label;
    }
    if ($('presence-status')) $('presence-status').textContent = label;
    if ($('presence-activity-text')) $('presence-activity-text').textContent = activityText(data);

    const displayName = user.global_name || user.display_name || user.username;
    if (displayName && $('owner-display-name')) $('owner-display-name').textContent = displayName;

    const avatar = avatarUrl(user);
    if (avatar) {
      ['owner-avatar-img', 'enter-avatar-img'].forEach((id) => {
        const img = $(id);
        if (img && img.src !== avatar) img.src = avatar;
      });
    }

    const sync = $('presence-sync-meta');
    if (sync) sync.textContent = state.lastSyncAt
      ? `${tr('sync')} ${state.lastSyncAt.toLocaleTimeString(lang() === 'en' ? 'en-US' : 'de-DE', { hour: '2-digit', minute: '2-digit' })}`
      : '';
  }

  async function refresh() {
    if (state.request) return state.request;
    state.request = (async () => {
      setConnection(false, tr('connecting'));
      try {
        const response = await fetch(API_URL, {
          method: 'GET', cache: 'no-store', headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(9000)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        if (payload?.success !== true || !payload?.data) throw new Error('Invalid Lanyard response');
        state.connected = true;
        state.lastSyncAt = new Date();
        setConnection(true, `${tr('connected')} · ${payload.latencyMs ?? '—'} ms`);
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

  window.MyLinksPresence = { refresh, rerender: () => {} };
  refresh();
  setInterval(() => { if (!document.hidden) refresh(); }, REFRESH_MS);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refresh();
  });
})();
