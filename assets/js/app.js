'use strict';

(() => {
  const T = {
    de: {
      brandSub: 'DASHBOARD', workspace: 'BEREICH', areas: 'PROJEKTE & MEHR',
      overview: 'Übersicht', profile: 'Über mich', friends: 'Freunde',
      secProjects: 'Projekte', secGaming: 'Gaming', secHosting: 'Hosting',
      secBots: 'Bots', secSkills: 'Skills', settings: 'Einstellungen',
      language: 'Sprache', theme: 'Darstellung', dark: 'Dunkel', light: 'Hell',
      accent: 'Akzentfarbe', topEyebrow: 'PERSÖNLICHER BEREICH',
      topTitle: 'MyLinks Übersicht', welcomeEyebrow: 'WILLKOMMEN',
      hello: 'Hey, ich bin',
      welcomeDashboard: 'Hier findest du meine Projekte, Communities, Hosting-Infos und den Live-Status über meine Bot-API.',
      exploreProjects: 'Projekte ansehen',
      tileProjects: 'Eigene & Team-Projekte', tileGaming: 'Roblox, ETS2 & Roleplay',
      tileHosting: 'Bot-Hosting & Status', profileEyebrow: 'PROFIL',
      profileSubtitle: 'Developer · Gaming · Communities',
      bio: 'Ich entwickle Discord-Bots mit JavaScript, betreue Communities und arbeite an eigenen Web- und Gaming-Projekten.',
      communityEyebrow: 'COMMUNITY', infoTitle: 'Über MyLinks',
      info1: 'Alle wichtigen Links, Projekte und Status-Infos an einem übersichtlichen Ort.',
      info3: 'Darstellung, Sprache und Akzentfarbe bleiben lokal in deinem Browser gespeichert.',
      botsTitle: 'In Arbeit', botsText: 'Öffentliche Bots folgen hier, sobald sie bereit sind.',
      footer: 'Sauber aufgebaut & lokal gespeichert.'
    },
    en: {
      brandSub: 'DASHBOARD', workspace: 'WORKSPACE', areas: 'SECTIONS',
      overview: 'Overview', profile: 'Profile', friends: 'Friends',
      secProjects: 'Projects', secGaming: 'Gaming', secHosting: 'Hosting',
      secBots: 'Bots', secSkills: 'Skills', settings: 'Settings',
      language: 'Language', theme: 'Theme', dark: 'Dark', light: 'Light',
      accent: 'Accent color', topEyebrow: 'PERSONAL SPACE',
      topTitle: 'MyLinks Overview', welcomeEyebrow: 'WELCOME',
      hello: 'Hey, I am',
      welcomeDashboard: 'Explore my projects, communities, hosting links and live status via my bot API.',
      exploreProjects: 'Explore projects',
      tileProjects: 'Personal & team projects', tileGaming: 'Roblox, ETS2 & roleplay',
      tileHosting: 'Bot hosting & status', profileEyebrow: 'PROFILE',
      profileSubtitle: 'Developer · Gaming · Communities',
      bio: 'I build Discord bots with JavaScript, manage communities and work on web and gaming projects.',
      communityEyebrow: 'COMMUNITY', infoTitle: 'About MyLinks',
      info1: 'All important links, projects and live status in one clear place.',
      info3: 'Language, theme and accent color are saved locally in your browser.',
      botsTitle: 'Coming soon', botsText: 'Public bots will appear here once ready.',
      footer: 'Cleanly structured & saved locally.'
    }
  };

  const SECTIONS = [
    {
      id: 'projects', titleKey: 'secProjects',
      cards: [{
        id: 'core3d', name: 'Core3D', status: 'Community', dev: false,
        desc: '3D-Design und 3D-Druck Community.',
        more: 'Gemeinsames Projekt rund um 3D-Druck, Modelle und Community.',
        tags: ['3D Druck', 'Community'],
        links: [
          { label: 'Discord', href: 'https://discord.gg/33mb9W3KgB' },
          { label: 'YouTube', href: 'https://www.youtube.com/@Core3D_Print' }
        ]
      }]
    },
    {
      id: 'gaming', titleKey: 'secGaming',
      cards: [
        {
          id: 'oktav', name: 'Oktavstadt', status: 'Live', dev: false,
          desc: 'Roblox-Projekt rund um Glocken und Community.',
          more: 'Offizieller Server und Spiel auf Roblox.',
          tags: ['Roblox', 'Team'],
          links: [
            { label: 'Discord', href: 'https://discord.gg/f9WwmEBtmE' },
            { label: 'Roblox', href: 'https://www.roblox.com/de/games/105633432256999/Oktavstadt' }
          ]
        },
        {
          id: 'eas', name: 'EAS', status: 'In Arbeit', dev: true,
          desc: 'Roleplay-Projekt in Entwicklung (V2).',
          more: 'Team-Projekt mit Fokus auf Roleplay.',
          tags: ['Roleplay', 'V2'],
          links: [{ label: 'Discord', href: 'https://discord.gg/pQCr73nwWY' }]
        },
        {
          id: 'trucker', name: 'Fichtelhillz Trucker', status: 'Mitglied', dev: true,
          desc: 'ETS2-Community für Touren und Convoys.',
          more: 'Gemeinsame Fahrten und Austausch rund um ETS2.',
          tags: ['ETS2', 'Convoys'],
          links: [{ label: 'Discord', href: 'https://discord.gg/2WqvykHESn' }]
        }
      ]
    },
    {
      id: 'hosting', titleKey: 'secHosting',
      cards: [{
        id: 'serverix', name: 'Serverix', status: 'Hosting', dev: false,
        desc: 'Hosting-Umgebung für Discord-Bots und Status.',
        more: 'Wichtige Links zu Website, Status und Rechtlichem.',
        tags: ['Hosting', 'Bots'],
        links: [
          { label: 'Discord', href: 'https://discord.gg/Et9a3bzH7v' },
          { label: 'Website', href: 'https://serverix.host/' },
          { label: 'Status', href: 'https://status.serverix.host/' }
        ]
      }]
    },
    { id: 'bots', titleKey: 'secBots', wip: true },
    { id: 'skills', titleKey: 'secSkills', skills: ['JavaScript', 'Discord Bot API', 'Web & Hosting'] }
  ];

  const ACCENTS = ['blue', 'violet', 'pink', 'green', 'orange'];
  const store = {
    get: (k) => { try { return localStorage.getItem('ml-' + k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem('ml-' + k, v); } catch {} }
  };

  function safeHref(raw) {
    try {
      const u = new URL(raw);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : null;
    } catch {
      return null;
    }
  }

  function applyLang(lang) {
    const next = lang === 'en' ? 'en' : 'de';
    store.set('lang', next);
    document.documentElement.lang = next;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      if (T[next][k]) el.textContent = T[next][k];
    });
    document.querySelectorAll('[data-lang-opt]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.langOpt === next));
    });
    window.MyLinksApi?.rerender();
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

  function renderSections() {
    const host = document.getElementById('sections');
    if (!host) return;
    host.textContent = '';

    SECTIONS.forEach((sec) => {
      const panel = document.createElement('section');
      panel.className = 'panel';
      panel.id = `page-${sec.id}`;

      const head = document.createElement('div');
      head.className = 'panel-head';
      const h2 = document.createElement('h2');
      h2.dataset.i18n = sec.titleKey;
      head.appendChild(h2);
      panel.appendChild(head);

      if (sec.wip) {
        const box = document.createElement('div');
        box.className = 'wip-box';
        const st = document.createElement('strong');
        st.dataset.i18n = 'botsTitle';
        const p = document.createElement('p');
        p.dataset.i18n = 'botsText';
        box.append(st, p);
        panel.appendChild(box);
      } else if (sec.skills) {
        const grid = document.createElement('div');
        grid.className = 'skills-grid';
        sec.skills.forEach((s) => {
          const item = document.createElement('div');
          item.className = 'skill-item';
          item.textContent = s;
          grid.appendChild(item);
        });
        panel.appendChild(grid);
      } else if (sec.cards) {
        const cards = document.createElement('div');
        cards.className = 'cards';
        sec.cards.forEach((c) => {
          const art = document.createElement('article');
          art.className = 'project-card';

          const cHead = document.createElement('div');
          cHead.className = 'card-head';
          cHead.tabIndex = 0;

          const top = document.createElement('div');
          top.className = 'card-top';
          const title = document.createElement('h3');
          title.textContent = c.name;
          const pill = document.createElement('span');
          pill.className = `status-pill${c.dev ? ' dev' : ''}`;
          pill.textContent = c.status;
          top.append(title, pill);

          const desc = document.createElement('p');
          desc.textContent = c.desc;

          const tags = document.createElement('div');
          tags.className = 'project-tags';
          c.tags.forEach((tg) => {
            const sp = document.createElement('span');
            sp.className = 'project-tag';
            sp.textContent = tg;
            tags.appendChild(sp);
          });

          cHead.append(top, desc, tags);

          const collapse = document.createElement('div');
          collapse.className = 'collapse';
          const moreP = document.createElement('p');
          moreP.className = 'details-text';
          moreP.textContent = c.more;
          collapse.appendChild(moreP);

          const toggleCard = () => collapse.classList.toggle('open');
          cHead.addEventListener('click', toggleCard);
          cHead.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleCard();
            }
          });

          const links = document.createElement('div');
          links.className = 'card-links';
          c.links.forEach((l) => {
            const href = safeHref(l.href);
            if (!href) return;
            const a = document.createElement('a');
            a.className = 'card-link';
            a.href = href;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = l.label;
            links.appendChild(a);
          });

          art.append(cHead, collapse, links);
          cards.appendChild(art);
        });
        panel.appendChild(cards);
      }

      host.appendChild(panel);
    });
  }

  renderSections();
  applyLang(store.get('lang') || document.documentElement.lang);
  applyTheme(store.get('theme') || document.documentElement.dataset.theme);
  applyAccent(store.get('accent') || document.documentElement.dataset.accent);
  window.lucide?.createIcons();

  document.querySelectorAll('[data-lang-opt]').forEach((b) => {
    b.addEventListener('click', () => applyLang(b.dataset.langOpt));
  });
  document.querySelectorAll('[data-theme-opt]').forEach((b) => {
    b.addEventListener('click', () => applyTheme(b.dataset.themeOpt));
  });
  document.querySelectorAll('[data-accent-opt]').forEach((b) => {
    b.addEventListener('click', () => applyAccent(b.dataset.accentOpt));
  });

  document.getElementById('refresh-presence-btn')?.addEventListener('click', () => {
    window.MyLinksApi?.refresh();
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
})();
