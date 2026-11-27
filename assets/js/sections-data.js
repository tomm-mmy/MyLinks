'use strict';

(() => {
  const SECTIONS = [
    {
      id: 'sec-projects',
      kickerKey: 'kickerProjects',
      titleKey: 'secProjects',
      items: [
        {
          id: 'core3d',
          kind: '3d-print',
          name: 'Core3D',
          badge: 'Community',
          cover: 'assets/images/coreprofilbild.jpg',
          descDe: '3D-Design, Modelle und 3D-Druck Community.',
          descEn: '3D design, models and 3D printing community.',
          detailsDe: 'Gemeinsames Projekt rund um 3D-Druck und Community-Aufbau.',
          detailsEn: 'Collaborative project focused on 3D printing and community growth.',
          tags: ['3D Druck', 'Community'],
          links: [
            { label: 'Discord', url: 'https://discord.gg/33mb9W3KgB' },
            { label: 'YouTube', url: 'https://www.youtube.com/@Core3D_Print' }
          ]
        },
        {
          id: 'oktavstadt',
          kind: 'roblox',
          name: 'Oktavstadt',
          badge: 'Live',
          cover: 'assets/images/oktavstadt.jpg',
          descDe: 'Roblox-Projekt rund um Glocken und Community.',
          descEn: 'Roblox bell simulation and community project.',
          detailsDe: 'Offizielle Community und Spiel auf Roblox.',
          detailsEn: 'Official server and game experience on Roblox.',
          tags: ['Roblox', 'Team'],
          links: [
            { label: 'Discord', url: 'https://discord.gg/f9WwmEBtmE' },
            { label: 'Roblox', url: 'https://www.roblox.com/de/games/105633432256999/Oktavstadt' }
          ]
        },
        {
          id: 'eas',
          kind: 'roleplay',
          name: 'EAS',
          badge: 'In Arbeit',
          cover: 'assets/images/eas.jpg',
          descDe: 'Roleplay-Projekt in Entwicklung (V2).',
          descEn: 'Roleplay project currently in V2 development.',
          detailsDe: 'Team-Projekt mit Fokus auf Roleplay und Server-Aufbau.',
          detailsEn: 'Team project centered around structured roleplay.',
          tags: ['Roleplay', 'V2'],
          links: [
            { label: 'Discord', url: 'https://discord.gg/pQCr73nwWY' }
          ]
        },
        {
          id: 'trucker',
          kind: 'ets2',
          name: 'Fichtelhillz Trucker',
          badge: 'Mitglied',
          cover: 'assets/images/trucker.png',
          descDe: 'ETS2-Community für Touren und Convoys.',
          descEn: 'ETS2 community for tours and convoys.',
          detailsDe: 'Gemeinsame Fahrten und Austausch rund um Euro Truck Simulator 2.',
          detailsEn: 'Shared convoys and driving sessions in Euro Truck Simulator 2.',
          tags: ['ETS2', 'Convoys'],
          links: [
            { label: 'Discord', url: 'https://discord.gg/2WqvykHESn' }
          ]
        }
      ]
    },
    {
      id: 'sec-hosting',
      kickerKey: 'kickerHosting',
      titleKey: 'secHosting',
      items: [
        {
          id: 'serverix',
          kind: 'hosting',
          name: 'Serverix',
          badge: 'Hosting',
          cover: 'assets/images/serverixbanner.jpg',
          descDe: 'Hosting-Umgebung für Discord-Bots und Status-Monitoring.',
          descEn: 'Hosting environment for Discord bots and status monitoring.',
          detailsDe: 'Hier laufen meine Bots; Statusseite und Discord sind direkt verlinkt.',
          detailsEn: 'Hosts my Discord bots with direct links to status and community.',
          tags: ['Hosting', 'Bots'],
          links: [
            { label: 'Website', url: 'https://serverix.host/' },
            { label: 'Status', url: 'https://status.serverix.host/' },
            { label: 'Discord', url: 'https://discord.gg/Et9a3bzH7v' }
          ]
        },
        {
          id: 'public-bots',
          kind: 'bots',
          name: 'Public Bots',
          badge: 'In Arbeit',
          cover: null,
          descDe: 'Öffentliche Bots werden vorbereitet und folgen hier.',
          descEn: 'Public Discord bots are currently in development.',
          detailsDe: 'Eigene Module für Moderation, Status und Community-Tools.',
          detailsEn: 'Custom modules for moderation, status and community utilities.',
          tags: ['Node.js', 'Discord.js'],
          links: []
        }
      ]
    }
  ];

  function safeUrl(raw) {
    try {
      const u = new URL(raw);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : null;
    } catch {
      return null;
    }
  }

  function resolveBannerUrl(item) {
    if (item.cover) return item.cover;
    if (window.MyLinksBannerGen?.generate) {
      return window.MyLinksBannerGen.generate({
        kind: item.kind,
        title: item.name,
        subtitle: item.badge
      });
    }
    return 'assets/images/serverixbanner.jpg';
  }

  function renderAllSections() {
    const host = document.getElementById('showcase-sections');
    if (!host) return;
    const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
    host.textContent = '';

    SECTIONS.forEach((sec) => {
      const sectionEl = document.createElement('section');
      sectionEl.className = 'section-block';
      sectionEl.id = sec.id;

      const head = document.createElement('div');
      head.className = 'section-head';

      const titleWrap = document.createElement('div');
      const kicker = document.createElement('span');
      kicker.className = 'section-kicker';
      kicker.dataset.i18n = sec.kickerKey;
      const h2 = document.createElement('h2');
      h2.dataset.i18n = sec.titleKey;
      titleWrap.append(kicker, h2);

      const countSpan = document.createElement('span');
      countSpan.className = 'section-count';
      countSpan.textContent = String(sec.items.length);

      head.append(titleWrap, countSpan);
      sectionEl.appendChild(head);

      const grid = document.createElement('div');
      grid.className = 'cards-2col';

      sec.items.forEach((it) => {
        const card = document.createElement('article');
        card.className = 'link-tile';

        const cover = document.createElement('div');
        cover.className = 'tile-cover';
        cover.style.backgroundImage = `url("${resolveBannerUrl(it)}")`;

        const coverBar = document.createElement('div');
        coverBar.className = 'tile-cover-title';

        const h3 = document.createElement('h3');
        h3.textContent = it.name;

        const badge = document.createElement('span');
        badge.className = 'tile-status';
        badge.textContent = it.badge;

        coverBar.append(h3, badge);
        cover.appendChild(coverBar);

        const body = document.createElement('div');
        body.className = 'tile-body';

        const desc = document.createElement('p');
        desc.textContent = lang === 'en' ? it.descEn : it.descDe;
        body.appendChild(desc);

        if (Array.isArray(it.tags) && it.tags.length) {
          const tagsRow = document.createElement('div');
          tagsRow.className = 'tile-tags';
          it.tags.forEach((tg) => {
            const sp = document.createElement('span');
            sp.className = 'tile-tag';
            sp.textContent = tg;
            tagsRow.appendChild(sp);
          });
          body.appendChild(tagsRow);
        }

        const detail = document.createElement('p');
        detail.className = 'tile-detail';
        detail.hidden = true;
        detail.textContent = lang === 'en' ? it.detailsEn : it.detailsDe;
        body.appendChild(detail);

        const actions = document.createElement('div');
        actions.className = 'tile-actions';

        (it.links || []).forEach((l) => {
          const href = safeUrl(l.url);
          if (!href) return;
          const a = document.createElement('a');
          a.className = 'mini-btn';
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = l.label;
          actions.appendChild(a);
        });

        const moreBtn = document.createElement('button');
        moreBtn.type = 'button';
        moreBtn.className = 'mini-btn ghost-toggle';
        moreBtn.textContent = lang === 'en' ? 'Details' : 'Mehr';
        moreBtn.addEventListener('click', () => {
          const nextOpen = detail.hidden;
          detail.hidden = !nextOpen;
          moreBtn.textContent = nextOpen
            ? (lang === 'en' ? 'Less' : 'Weniger')
            : (lang === 'en' ? 'Details' : 'Mehr');
        });
        actions.appendChild(moreBtn);

        body.appendChild(actions);
        card.append(cover, body);
        grid.appendChild(card);
      });

      sectionEl.appendChild(grid);
      host.appendChild(sectionEl);
    });
  }

  window.MyLinksSections = {
    render: renderAllSections
  };

  renderAllSections();
})();
