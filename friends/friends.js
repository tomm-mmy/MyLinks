'use strict';

(() => {
    const config = window.FRIENDS_CONFIG;
    const root = document.getElementById('friends-grid');
    const section = document.getElementById('friends-section');
    if (!config || !root || !Array.isArray(config.users)) return; 

    const users = config.users.filter(user => /^\d{17,20}$/.test(String(user.id)));
    const presenceById = new Map();
    const statusText = {
        de: { online: 'Online', idle: 'Abwesend', dnd: 'Bitte nicht stören', offline: 'Offline',
              playing: 'Spielt', streaming: 'Streamt', watching: 'Schaut', listening: 'Hört Musik' },
        en: { online: 'Online', idle: 'Away', dnd: 'Do not disturb', offline: 'Offline',
              playing: 'Playing', streaming: 'Streaming', watching: 'Watching', listening: 'Listening to music' }
    };

    const icons = {
        youtube: 'youtube', twitch: 'twitch', roblox: 'gamepad-2', website: 'globe',
        instagram: 'instagram', tiktok: 'music-2', github: 'github', discord: 'message-circle',
        link: 'external-link'
    };

    const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));

    function lang() {
        return document.documentElement.lang === 'de' ? 'de' : 'en';
    }

    function tr(key) {
        const de = {
            title: 'Freunde', loading: 'Freunde werden geladen …',
            noActivity: 'Keine Aktivität', unavailable: 'Status nicht verfügbar',
            discord: 'Discord-Profil öffnen', social: 'Social Links',
            offline: 'Offline', online: 'Online', idle: 'Abwesend', dnd: 'Bitte nicht stören'
        };
        const en = {
            title: 'Friends', loading: 'Loading friends …',
            noActivity: 'No activity', unavailable: 'Status unavailable',
            discord: 'Open Discord profile', social: 'Social links',
            offline: 'Offline', online: 'Online', idle: 'Away', dnd: 'Do not disturb'
        };
        return (lang() === 'de' ? de : en)[key] || key;
    }

    function activityOf(data) {
        if (!data) return '';
        const activities = Array.isArray(data.activities) ? data.activities : [];
        const main = activities.find(a => [0, 1, 3, 5].includes(a.type) && a.name);
        if (main) {
            const prefix = ({ 0: lang() === 'de' ? 'Spielt' : 'Playing',
                              1: lang() === 'de' ? 'Streamt' : 'Streaming',
                              3: lang() === 'de' ? 'Schaut' : 'Watching',
                              5: lang() === 'de' ? 'Im Wettkampf' : 'Competing' })[main.type];
            return `${prefix} ${main.name}${main.details ? ` · ${main.details}` : ''}`;
        }
        if (data.listening_to_spotify && data.spotify) {
            const song = [data.spotify.song, data.spotify.artist].filter(Boolean).join(' · ');
            return song ? `${lang() === 'de' ? 'Hört' : 'Listening to'} ${song}` : '';
        }
        const custom = activities.find(a => a.type === 4 && (a.state || a.name));
        return custom ? (custom.state || custom.name) : '';
    }

    function statusOf(data) {
        const status = data?.discord_status;
        return ['online', 'idle', 'dnd'].includes(status) ? status : 'offline';
    }

    function avatarOf(user) {
        const discordUser = user?.discord_user;
        if (!discordUser?.id) return '';
        if (discordUser.avatar) {
            const ext = String(discordUser.avatar).startsWith('a_') ? 'gif' : 'png';
            return `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${ext}?size=128`;
        }
        const index = Number(BigInt(discordUser.id) >> 22n) % 6;
        return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
    }

    function safeLinks(userConfig, data) {
        const manual = Array.isArray(userConfig.links) ? userConfig.links : [];
        const kv = data?.kv || {};
        let automatic = [];

        // Lanyard KV values are strings. Accept common keys and optional JSON in "social_links".
        if (typeof kv.social_links === 'string') {
            try {
                const parsed = JSON.parse(kv.social_links);
                if (Array.isArray(parsed)) automatic = parsed;
                else if (parsed && typeof parsed === 'object') {
                    automatic = Object.entries(parsed).map(([platform, url]) => ({ platform, url }));
                }
            } catch { /* Ungültiges KV-JSON einfach ignorieren */ }
        }
        ['youtube', 'twitch', 'roblox', 'website', 'instagram', 'tiktok', 'github'].forEach(platform => {
            if (typeof kv[platform] === 'string' && kv[platform].trim()) {
                automatic.push({ platform, url: kv[platform] });
            }
        });

        const merged = [...manual, ...automatic];
        const seen = new Set();
        return merged.filter(link => {
            if (!link || typeof link.url !== 'string') return false;
            let url;
            try { url = new URL(link.url); } catch { return false; }
            if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
            const key = `${String(link.platform || 'link').toLowerCase()}|${url.href}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).map(link => {
            const platform = String(link.platform || 'link').toLowerCase();
            return {
                platform,
                label: String(link.label || platform.charAt(0).toUpperCase() + platform.slice(1)),
                url: new URL(link.url).href
            };
        });
    }

    function render() {
        root.innerHTML = users.map(userConfig => {
            const data = presenceById.get(userConfig.id) || null;
            const discordUser = data?.discord_user || {};
            const name = discordUser.global_name || discordUser.username || `Discord ${userConfig.id.slice(-4)}`;
            const status = data ? statusOf(data) : 'offline';
            const activity = activityOf(data);
            const avatar = avatarOf(data);
            const links = safeLinks(userConfig, data);
            const discordUrl = `https://discord.com/users/${encodeURIComponent(userConfig.id)}`;

            return `<article class="friend-card" data-status="${status}">
                <div class="friend-card-top">
                    <div class="friend-avatar-wrap">
                        ${avatar ? `<img class="friend-avatar" src="${escapeHtml(avatar)}" alt="" loading="lazy" referrerpolicy="no-referrer">`
                                 : `<span class="friend-avatar friend-avatar-fallback"><i data-lucide="user-round"></i></span>`}
                        <span class="friend-status-dot" aria-label="${escapeHtml(tr(status))}"></span>
                    </div>
                    <div class="friend-identity">
                        <h3>${escapeHtml(name)}</h3>
                        <span class="friend-status-label">${escapeHtml(tr(status))}</span>
                    </div>
                    <a class="friend-discord" href="${discordUrl}" target="_blank" rel="noopener noreferrer"
                       aria-label="${escapeHtml(tr('discord'))}" title="${escapeHtml(tr('discord'))}">
                        <i data-lucide="message-circle"></i>
                    </a>
                </div>
                <div class="friend-activity" title="${escapeHtml(activity || tr('noActivity'))}">
                    <i data-lucide="${activity ? 'activity' : 'minus-circle'}"></i>
                    <span>${escapeHtml(activity || tr('noActivity'))}</span>
                </div>
                <div class="friend-links" aria-label="${escapeHtml(tr('social'))}">
                    ${links.length ? links.map(link => `<a class="friend-link" href="${escapeHtml(link.url)}"
                        target="_blank" rel="noopener noreferrer" title="${escapeHtml(link.label)}">
                        <i data-lucide="${icons[link.platform] || icons.link}"></i>
                        <span>${escapeHtml(link.label)}</span>
                    </a>`).join('') : `<span class="friend-no-links">${escapeHtml(lang() === 'de' ? 'Noch keine Links' : 'No links added')}</span>`}
                </div>
            </article>`;
        }).join('');

        window.lucide?.createIcons();
    }

    function applyTranslations() {
        section.querySelectorAll('[data-friends-i18n]').forEach(el => {
            const key = el.dataset.friendsI18n;
            el.textContent = key === 'title' ? tr('title') : tr('loading');
        });
        render();
    }

    let socket = null;
    let heartbeatTimer = null;
    let reconnectTimer = null;
    let reconnectDelay = config.reconnectBaseMs || 2000;
    let stopped = false;

    function clearTimers() {
        if (heartbeatTimer) clearInterval(heartbeatTimer);
        if (reconnectTimer) clearTimeout(reconnectTimer);
        heartbeatTimer = reconnectTimer = null;
    }

    function scheduleReconnect() {
        if (stopped || reconnectTimer) return;
        clearTimers();
        reconnectTimer = setTimeout(connect, reconnectDelay);
        reconnectDelay = Math.min(reconnectDelay * 2, config.reconnectMaxMs || 30000);
    }

    function applyPresence(data) {
        if (!data || !data.discord_user?.id) return;
        const id = String(data.discord_user.id);
        if (!users.some(user => user.id === id)) return;
        presenceById.set(id, data);
        render();
    }

    function connect() {
        if (stopped) return;
        try {
            socket = new WebSocket('wss://api.lanyard.rest/socket');
        } catch (error) {
            console.warn('Friends: Lanyard-WebSocket konnte nicht gestartet werden.', error);
            scheduleReconnect();
            return;
        }

        socket.addEventListener('open', () => {
            reconnectDelay = config.reconnectBaseMs || 2000;
        });

        socket.addEventListener('message', event => {
            let message;
            try { message = JSON.parse(event.data); } catch { return; }

            if (message.op === 1 && message.d?.heartbeat_interval) {
                socket.send(JSON.stringify({
                    op: 2,
                    d: { subscribe_to_ids: users.map(user => user.id) }
                }));
                if (heartbeatTimer) clearInterval(heartbeatTimer);
                heartbeatTimer = setInterval(() => {
                    if (socket?.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify({ op: 3 }));
                    }
                }, message.d.heartbeat_interval);
            } else if (message.op === 0) {
                if (message.t === 'INIT_STATE' && message.d && typeof message.d === 'object') {
                    Object.values(message.d).forEach(applyPresence);
                } else if (message.t === 'PRESENCE_UPDATE') {
                    applyPresence(message.d);
                }
            }
        });

        socket.addEventListener('error', () => {
            try { socket?.close(); } catch {}
        });

        socket.addEventListener('close', () => {
            if (heartbeatTimer) clearInterval(heartbeatTimer);
            heartbeatTimer = null;
            scheduleReconnect();
        });
    }

    // Refresh UI language if the site's existing language selector changes.
    const languageObserver = new MutationObserver(applyTranslations);
    languageObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) render();
    });

    window.addEventListener('pagehide', () => {
        stopped = true;
        clearTimers();
        clearInterval(botRefreshTimer);
        languageObserver.disconnect();
        try { socket?.close(); } catch {}
    }, { once: true });

    applyTranslations();

    function normalizeBotPresence(raw, id) {
        if (!raw) return null;
        const status = ['online', 'idle', 'dnd'].includes(raw.status) ? raw.status : 'offline';
        return {
            discord_user: {
                id,
                username: raw.username || raw.globalName || `Discord ${id.slice(-4)}`,
                global_name: raw.globalName || raw.username || `Discord ${id.slice(-4)}`,
                avatar: raw.avatar || null
            },
            discord_status: status,
            activities: Array.isArray(raw.activities) ? raw.activities : [],
            listening_to_spotify: false,
            updated_at: raw.updatedAt || null,
            source: 'mylink'
        };
    }

    async function loadBotPresence() {
        const endpoint = config.presenceApiUrl || '/api/presence';
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                cache: 'no-store',
                headers: { Accept: 'application/json' }
            });
            if (!response.ok) throw new Error(`Mylink API HTTP ${response.status}`);
            const payload = await response.json();
            const records = payload?.data && typeof payload.data === 'object' ? payload.data : payload;
            if (!records || typeof records !== 'object' || Array.isArray(records)) {
                throw new Error('Ungültige Antwort von der Mylink API');
            }
            let loaded = 0;
            for (const user of users) {
                const raw = records[user.id] || records[String(user.id)];
                if (!raw) continue;
                const normalized = normalizeBotPresence(raw, user.id);
                if (normalized) {
                    presenceById.set(user.id, normalized);
                    loaded++;
                }
            }
            if (loaded) {
                render();
                const indicator = document.getElementById('friends-connection-state');
                if (indicator) indicator.textContent = `${loaded} LIVE`;
            }
            return loaded;
        } catch (error) {
            console.warn('Friends: Mylink API konnte nicht geladen werden:', error);
            const indicator = document.getElementById('friends-connection-state');
            if (indicator) indicator.textContent = 'LANYARD FALLBACK';
            return 0;
        }
    }

    // Mylink bot presence is the primary source; Lanyard remains a fallback.
    loadBotPresence();
    const botRefreshTimer = setInterval(() => {
        if (!document.hidden) loadBotPresence();
    }, config.refreshFallbackMs || 30000);

    connect();
})();
