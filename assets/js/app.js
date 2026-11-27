'use strict';

(() => {
  const I18N = {
    de: {
      enterKicker: 'PERSONAL LINK HUB',
      welcomeTitle: 'Tommy',
      welcomeText: 'Klicken zum Eintreten & Sound starten',
      enter: 'Enter',
      settings: 'Einstellungen',
      language: 'Sprache',
      theme: 'Darstellung',
      dark: 'Dunkel',
      light: 'Hell',
      accent: 'Akzentfarbe',
      roleTag: 'Developer & Builder',
      location: 'Österreich · Discord Bots & Gaming',
      noActivity: 'Keine aktive Aktivität',
      bio: 'Ich baue Discord-Bots mit JavaScript, betreue Communities und setze eigene Web- und Gaming-Ideen um.',
      secProjects: 'Projekte & Gaming',
      secHosting: 'Hosting & Bots',
      secFriends: 'Freunde',
      refresh: 'Status',
      infoTitle: 'Über diese Seite',
      info1: 'Persönliche Link-Page im Glas-Design mit Live-Discord-Status über die eigene Bot-API, Projekten, Freunden und Musik.',
      info2: 'Design, Sprache und Akzentfarbe werden lokal in deinem Browser gespeichert.',
      footer: 'Glass Link Hub · Live Bot API',
      audioPlaying: 'Läuft im Hintergrund',
      audioPaused: 'Pausiert'
    },
    en: {
      enterKicker: 'PERSONAL LINK HUB',
      welcomeTitle: 'Tommy',
      welcomeText: 'Click to enter & start audio',
      enter: 'Enter',
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light',
      accent: 'Accent color',
      roleTag: 'Developer & Builder',
      location: 'Austria · Discord Bots & Gaming',
      noActivity: 'No active activity',
      bio: 'I build Discord bots with JavaScript, run communities and turn web & gaming ideas into real projects.',
      secProjects: 'Projects & Gaming',
      secHosting: 'Hosting & Bots',
      secFriends: 'Friends',
      refresh: 'Refresh',
      infoTitle: 'About this page',
      info1: 'Glass link hub with live Discord presence from my bot API, projects, friends and background music.',
      info2: 'Theme, language and accent color are stored locally in your browser.',
      footer: 'Glass Link Hub · Live Bot API',
      audioPlaying: 'Playing in background',
      audioPaused: 'Paused'
    }
  };

  const SHOWCASE_ITEMS = [
    {
      name: 'Core3D',
      status: 'Community',
      cover: 'assets/images/coreprofilbild.jpg',
      desc: '3D-Design und 3D-Druck Community.',
      links: [
        { label: 'Discord', url: 'https://discord.gg/33mb9W3KgB' },
        { label: 'YouTube', url: 'https://www.youtube.com/@Core3D_Print' }
      ]
    },
    {
      name: 'Oktavstadt',
      status: 'Live',
      cover: 'assets/images/oktavstadt.jpg',
      desc: 'Roblox-Projekt rund um Glocken & Community.',
      links: [
        { label: 'Discord', url: 'https://discord.gg/f9WwmEBtmE' },
        { label: 'Roblox', url: 'https://www.roblox.com/de/games/105633432256999/Oktavstadt' }
      ]
    },
    {
      name: 'EAS',
      status: 'In Arbeit',
      cover: 'assets/images/eas.jpg',
      desc: 'Roleplay-Projekt in Entwicklung (V2).',
      links: [{ label: 'Discord', url: 'https://discord.gg/pQCr73nwWY' }]
    },
    {
      name: 'Fichtelhillz Trucker',
      status: 'Mitglied',
      cover: 'assets/images/trucker.png',
      desc: 'ETS2-Community für Touren & Convoys.',
      links: [{ label: 'Discord', url: 'https://discord.gg/2WqvykHESn' }]
    }
  ];

  const HOSTING_ITEMS = [
    {
      name: 'Serverix',
      status: 'Bot-Host',
      cover: 'assets/images/serverixbanner.jpg',
      desc: 'Hosting für Discord-Bots & Status-Monitoring.',
      links: [
        { label: 'Website', url: 'https://serverix.host/' },
        { label: 'Status', url: 'https://status.serverix.host/' },
        { label: 'Discord', url: 'https://discord.gg/Et9a3bzH7v' }
      ]
    },
    {
      name: 'Public Bots',
      status: 'Coming Soon',
      cover: 'assets/images/serverixbanner.jpg',
      desc: 'Öffentliche Bots sind in Vorbereitung und folgen bald.',
      links: []
    }
  ];

  const ACCENTS = ['blue', 'violet', 'pink', 'green', 'orange'];
  const store = {
    get: (k) => { try { return localStorage.getItem('tl-' + k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem('tl-' + k, v); } catch {} }
  };

  function safeUrl(raw) {
    try {
      const u = new URL(raw);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : null;
    } catch {
      return null;
    }
  }

  function renderTileGrid(items) {
    const grid = document.createElement('div');
    grid.className = 'cards-2col';

    items.forEach((it) => {
      const tile = document.createElement('article');
      tile.className = 'link-tile';

      const cover = document.createElement('div');
      cover.className = 'tile-cover';
      cover.style.backgroundImage = `url('${it.cover}')`;

      const cTitle = document.createElement('div');
      cTitle.className = 'tile-cover-title';
      const h3 = document.createElement('h3');
      h3.textContent = it.name;
      const badge = document.createElement('span');
      badge.className = 'tile-status';
      badge.textContent = it.status;
      cTitle.append(h3, badge);
      cover.appendChild(cTitle);

      const body = document.createElement('div');
      body.className = 'tile-body';
      const p = document.createElement('p');
      p.textContent = it.desc;
      body.appendChild(p);

      if (it.links?.length) {
        const act = document.createElement('div');
        act.className = 'tile-actions';
        it.links.forEach((l) => {
          const href = safeUrl(l.url);
          if (!href) return;
          const a = document.createElement('a');
          a.className = 'mini-btn';
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = l.label;
          act.appendChild(a);
        });
        body.appendChild(act);
      }

      tile.append(cover, body);
      grid.appendChild(tile);
    });

    return grid;
  }

  function buildSections() {
    const host = document.getElementById('dynamic-sections');
    if (!host) return;
    host.textContent = '';

    // 1. Projects & Gaming
    const projSec = document.createElement('section');
    projSec.className = 'section-block';
    projSec.id = 'sec-projects';
    const projHead = document.createElement('div');
    projHead.className = 'section-head';
    const projH2 = document.createElement('h2');
    projH2.dataset.i18n = 'secProjects';
    projHead.appendChild(projH2);
    projSec.append(projHead, renderTileGrid(SHOWCASE_ITEMS));

    // 2. Friends
    const friSec = document.createElement('section');
    friSec.className = 'section-block';
    friSec.id = 'sec-friends';
    const friHead = document.createElement('div');
    friHead.className = 'section-head';
    const friH2 = document.createElement('h2');
    friH2.dataset.i18n = 'secFriends';
    const friCount = document.createElement('span');
    friCount.className = 'section-count';
    friCount.id = 'friends-count';
    friCount.textContent = '0 / 6 online';
    friHead.append(friH2, friCount);

    const friSlot = document.createElement('div');
    friSlot.className = 'friends-list';
    friSlot.id = 'friends-slot';
    friSec.append(friHead, friSlot);

    // 3. Hosting & Bots
    const hostSec = document.createElement('section');
    hostSec.className = 'section-block';
    hostSec.id = 'sec-hosting';
    const hostHead = document.createElement('div');
    hostHead.className = 'section-head';
    const hostH2 = document.createElement('h2');
    hostH2.dataset.i18n = 'secHosting';
    hostHead.appendChild(hostH2);
    hostSec.append(hostHead, renderTileGrid(HOSTING_ITEMS));

    host.append(projSec, friSec, hostSec);
  }

  function updateAudioSub() {
    const audio = document.getElementById('bg-audio');
    const sub = document.getElementById('track-sub');
    const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
    if (!audio || !sub) return;
    sub.textContent = audio.paused ? I18N[lang].audioPaused : I18N[lang].audioPlaying;
  }

  function applyLang(lang) {
    const next = lang === 'en' ? 'en' : 'de';
    store.set('lang', next);
    document.documentElement.lang = next;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      if (I18N[next][k]) el.textContent = I18N[next][k];
    });
    document.querySelectorAll('[data-lang-opt]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.langOpt === next));
    });
    updateAudioSub();
    window.MyLinksHub?.rerenderPresence();
  }

  function applyTheme(theme) {
    const next = theme === 'light' ? 'light' : 'dark';
    store.set('theme', next);
    document.documentElement.setAttribute('data-theme', next);
    document.querySelectorAll('[data-theme-opt]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.themeOpt === next));
    });
  }

  function applyAccent(accent) {
    const next = ACCENTS.includes(accent) ? accent : 'blue';
    store.set('accent', next);
    document.documentElement.setAttribute('data-accent', next);
    document.querySelectorAll('[data-accent-opt]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.accentOpt === next));
    });
  }

  function setupAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('audio-toggle');
    const vol = document.getElementById('audio-volume');
    if (!audio || !btn) return;

    audio.volume = (Number(vol?.value) || 35) / 100;

    function syncPlayIcon() {
      btn.innerHTML = `<i data-lucide="${audio.paused ? 'play' : 'pause'}"></i>`;
      window.lucide?.createIcons();
      updateAudioSub();
    }

    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
      syncPlayIcon();
    });

    vol?.addEventListener('input', () => {
      audio.volume = Number(vol.value) / 100;
    });

    audio.addEventListener('play', syncPlayIcon);
    audio.addEventListener('pause', syncPlayIcon);
  }

  buildSections();
  applyLang(store.get('lang') || document.documentElement.lang);
  applyTheme(store.get('theme') || document.documentElement.dataset.theme);
  applyAccent(store.get('accent') || document.documentElement.dataset.accent);
  setupAudio();
  window.lucide?.createIcons();

  // Click to enter + start music
  const welcome = document.getElementById('welcome-screen');
  const audio = document.getElementById('bg-audio');
  document.getElementById('enter-button')?.addEventListener('click', () => {
    document.body.classList.remove('locked');
    welcome?.classList.add('hidden');
    if (audio) {
      audio.play().catch(() => {});
    }
  }, { once: true });

  // Settings popover
  const settingsBtn = document.getElementById('settings-button');
  const settingsPanel = document.getElementById('settings-panel');
  settingsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const next = !settingsPanel.classList.contains('open');
    settingsPanel.classList.toggle('open', next);
    settingsPanel.setAttribute('aria-hidden', String(!next));
    settingsBtn.setAttribute('aria-expanded', String(next));
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#settings-panel') && !e.target.closest('#settings-button')) {
      settingsPanel?.classList.remove('open');
      settingsPanel?.setAttribute('aria-hidden', 'true');
      settingsBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('[data-lang-opt]').forEach((b) => {
    b.addEventListener('click', () => applyLang(b.dataset.langOpt));
  });
  document.querySelectorAll('[data-theme-opt]').forEach((b) => {
    b.addEventListener('click', () => applyTheme(b.dataset.themeOpt));
  });
  document.querySelectorAll('[data-accent-opt]').forEach((b) => {
    b.addEventListener('click', () => applyAccent(b.dataset.accentOpt));
  });

  document.getElementById('refresh-btn')?.addEventListener('click', () => {
    window.MyLinksHub?.refresh();
  });

  // Info modal
  const infoOverlay = document.getElementById('info-overlay');
  document.getElementById('info-button')?.addEventListener('click', () => {
    infoOverlay?.classList.add('open');
    infoOverlay?.setAttribute('aria-hidden', 'false');
  });
  document.getElementById('info-close')?.addEventListener('click', () => {
    infoOverlay?.classList.remove('open');
    infoOverlay?.setAttribute('aria-hidden', 'true');
  });
  infoOverlay?.addEventListener('click', (e) => {
    if (e.target === infoOverlay) {
      infoOverlay.classList.remove('open');
      infoOverlay.setAttribute('aria-hidden', 'true');
    }
  });
})();
