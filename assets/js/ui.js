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
      languageHint: 'Deutsch oder English',
      themeHint: 'Helles oder dunkles Design',
      accentHint: 'Farbe der Highlights',
      infoProfileTitle: 'Profil & Discord-Status',
      infoProfileText: 'Zeigt mein Profil und – sofern die Bot-API erreichbar ist – meinen aktuellen Discord-Status.',
      infoProjectsTitle: 'Projekte & Gaming',
      infoProjectsText: 'Ein Überblick über Projekte, Communities, meine Rolle und weiterführende Links.',
      infoMusicTitle: 'Musikplayer',
      infoMusicText: 'Die Wiedergabe startet erst nach einem Klick auf „Enter“, da Browser Autoplay blockieren.',
      infoSettingsTitle: 'Persönliche Einstellungen',
      infoSettingsText: 'Sprache, Darstellung und Akzentfarbe werden lokal in diesem Browser gespeichert.',
      roleTag: 'Developer & Builder',
      location: 'Österreich · Discord Bots & Gaming',
      noActivity: 'Keine aktive Aktivität',
      bio: 'Ich baue Discord-Bots mit JavaScript, betreue Communities und setze eigene Web- und Gaming-Ideen um.',
      kickerProjects: 'PROJEKTE & GEMEINSCHAFTEN',
      secProjects: 'Projekte & Gaming',
      kickerHosting: 'INFRASTRUKTUR & MODULE',
      secHosting: 'Hosting & Bots',
      refresh: 'Status',
      infoTitle: 'Über diese Seite',
      info1: 'MyLinks ist meine persönliche Startseite. Hier findest du meine Projekte, Communities, Gaming-Bereiche und wichtige externe Links an einem Ort.',
      info2: 'MyLinks lädt keine Freundesliste. Externe Dienste wie Discord werden erst geöffnet, wenn du einen entsprechenden Link auswählst.',
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
      languageHint: 'German or English',
      themeHint: 'Light or dark appearance',
      accentHint: 'Highlight color',
      infoProfileTitle: 'Profile & Discord presence',
      infoProfileText: 'Shows my profile and, when the bot API is reachable, my current Discord presence.',
      infoProjectsTitle: 'Projects & gaming',
      infoProjectsText: 'An overview of projects, communities, my role and useful links.',
      infoMusicTitle: 'Music player',
      infoMusicText: 'Playback starts after clicking Enter because browsers block autoplay.',
      infoSettingsTitle: 'Personal settings',
      infoSettingsText: 'Language, appearance and accent color are stored locally in this browser.',
      roleTag: 'Developer & Builder',
      location: 'Austria · Discord Bots & Gaming',
      noActivity: 'No active activity',
      bio: 'I build Discord bots with JavaScript, run communities and turn web & gaming ideas into real projects.',
      kickerProjects: 'PROJECTS & COMMUNITIES',
      secProjects: 'Projects & Gaming',
      kickerHosting: 'INFRASTRUCTURE & MODULES',
      secHosting: 'Hosting & Bots',
      refresh: 'Refresh',
      infoTitle: 'About this page',
      info1: 'MyLinks is my personal home page for projects, communities, gaming areas and useful external links.',
      info2: 'MyLinks does not load a friends list. External services such as Discord only open when you select a link.',
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

  document.getElementById('refresh-btn')?.addEventListener('click', () => {
    window.MyLinksPresence?.refresh();
  });

  const infoOverlay = document.getElementById('info-overlay');
  document.getElementById('info-button')?.addEventListener('click', () => {
    infoOverlay?.classList.add('open');
    infoOverlay?.setAttribute('aria-hidden', 'false');
    window.lucide?.createIcons();
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
