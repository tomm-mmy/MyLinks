'use strict';

(() => {
  const I18N = {
    de: {
      enterKicker: 'PERSONAL LINK HUB',
      welcomeTitle: 'Tommy',
      welcomeText: 'Klicken zum Eintreten & Musik starten',
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
      kickerProjects: 'PROJEKTE & GEMEINSCHAFTEN',
      secProjects: 'Projekte & Gaming',
      kickerHosting: 'INFRASTRUKTUR & MODULE',
      secHosting: 'Hosting & Bots',
      kickerFriends: 'LIVE COMMUNITY',
      secFriends: 'Freunde',
      filterAll: 'Alle',
      filterOnline: 'Aktiv / Online',
      refresh: 'Status',
      infoTitle: 'Über diese Seite',
      info1: 'Persönliche Link-Page im Glas-Design mit Live-Discord-Status über die eigene Bot-API, Projekten, Freunden und Musik.',
      info2: 'Design, Sprache und Akzentfarbe werden lokal in deinem Browser gespeichert.',
      footer: 'Glass Link Hub · Bot Presence API'
    },
    en: {
      enterKicker: 'PERSONAL LINK HUB',
      welcomeTitle: 'Tommy',
      welcomeText: 'Click to enter & start music',
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
      kickerProjects: 'PROJECTS & COMMUNITIES',
      secProjects: 'Projects & Gaming',
      kickerHosting: 'INFRASTRUCTURE & MODULES',
      secHosting: 'Hosting & Bots',
      kickerFriends: 'LIVE COMMUNITY',
      secFriends: 'Friends',
      filterAll: 'All',
      filterOnline: 'Active / Online',
      refresh: 'Refresh',
      infoTitle: 'About this page',
      info1: 'Glass link hub with live Discord presence from my bot API, projects, friends and background music.',
      info2: 'Theme, language and accent color are stored locally in your browser.',
      footer: 'Glass Link Hub · Bot Presence API'
    }
  };

  const ACCENTS = ['blue', 'violet', 'pink', 'green', 'orange'];
  const store = {
    get: (k) => { try { return localStorage.getItem('tl-' + k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem('tl-' + k, v); } catch {} }
  };

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
    window.MyLinksSections?.render();
    window.MyLinksPresence?.rerender();
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

  applyLang(store.get('lang') || document.documentElement.lang);
  applyTheme(store.get('theme') || document.documentElement.dataset.theme);
  applyAccent(store.get('accent') || document.documentElement.dataset.accent);
  window.lucide?.createIcons();

  const welcome = document.getElementById('welcome-screen');
  document.getElementById('enter-button')?.addEventListener('click', () => {
    document.body.classList.remove('locked');
    welcome?.classList.add('hidden');
    window.MyLinksAudio?.startPlayback();
  }, { once: true });

  const settingsBtn = document.getElementById('settings-button');
  const settingsPanel = document.getElementById('settings-panel');
  settingsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !settingsPanel.classList.contains('open');
    settingsPanel.classList.toggle('open', open);
    settingsPanel.setAttribute('aria-hidden', String(!open));
    settingsBtn.setAttribute('aria-expanded', String(open));
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

  document.querySelectorAll('[data-friend-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.MyLinksPresence?.setFriendFilter(btn.dataset.friendFilter);
    });
  });

  document.getElementById('refresh-btn')?.addEventListener('click', () => {
    window.MyLinksPresence?.refresh();
  });

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      settingsPanel?.classList.remove('open');
      infoOverlay?.classList.remove('open');
    }
  });
})();
