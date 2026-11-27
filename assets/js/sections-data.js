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
          name: 'Core3D',
          category: '3D-Druck & Design',
          statusDe: 'Aktiv',
          statusEn: 'Active',
          roleDe: 'Co-Leitung',
          roleEn: 'Co-Lead',
          platform: 'Discord & YouTube',
          descDe: 'Community für 3D Modelle, Druckprofile, Materialtipps und gemeinsamen Austausch.',
          descEn: 'Community for 3D models, print profiles, filament tips and collaboration.',
          meta: [
            { labelDe: 'Fokus', labelEn: 'Focus', valueDe: '3D Druck & CAD', valueEn: '3D Print & CAD' },
            { labelDe: 'Bereich', labelEn: 'Scope', valueDe: 'Community', valueEn: 'Community' }
          ],
          detailsDe: 'Austausch zu Slicing, Druckern, Bauteilen und gemeinsamen Community-Projekten.',
          detailsEn: 'Discussions around slicing, printers, parts and community builds.',
          links: [
            { label: 'Discord', url: 'https://discord.gg/33mb9W3KgB' },
            { label: 'YouTube', url: 'https://www.youtube.com/@Core3D_Print' }
          ]
        },
        {
          id: 'oktavstadt',
          name: 'Oktavstadt',
          category: 'Roblox Simulation',
          statusDe: 'Live',
          statusEn: 'Live',
          roleDe: 'Team / Dev',
          roleEn: 'Team / Dev',
          platform: 'Roblox & Discord',
          descDe: 'Roblox Projekt rund um Glockenläuten, Technik und aktive Community Sessions.',
          descEn: 'Roblox project centered around bell mechanics, engineering and active sessions.',
          meta: [
            { labelDe: 'Engine', labelEn: 'Engine', valueDe: 'Roblox Studio', valueEn: 'Roblox Studio' },
            { labelDe: 'Status', labelEn: 'Status', valueDe: 'Spielbar', valueEn: 'Playable' }
          ],
          detailsDe: 'Mitwirkung an Skripten, Systemen und Community-Struktur rund um Oktavstadt.',
          detailsEn: 'Contributing to scripts, systems and community setup for Oktavstadt.',
          links: [
            { label: 'Discord', url: 'https://discord.gg/f9WwmEBtmE' },
            { label: 'Roblox', url: 'https://www.roblox.com/de/games/105633432256999/Oktavstadt' }
          ]
        },
        {
          id: 'eas',
          name: 'EAS',
          category: 'Roleplay',
          statusDe: 'In Arbeit (V2)',
          statusEn: 'In Dev (V2)',
          roleDe: 'Team',
          roleEn: 'Team',
          platform: 'Discord',
          descDe: 'Strukturiertes Projekt im Aufbau mit Fokus auf neue Systeme für V2.',
          descEn: 'Structured project building new systems for its V2 release.',
          meta: [
            { labelDe: 'Version', labelEn: 'Version', valueDe: 'V2 Aufbau', valueEn: 'V2 Build' },
            { labelDe: 'Typ', labelEn: 'Type', valueDe: 'Roleplay', valueEn: 'Roleplay' }
          ],
          detailsDe: 'Vorbereitung und Strukturierung von Abläufen, Rollen und Server-Komponenten.',
          detailsEn: 'Structuring workflows, roles and server components ahead of release.',
          links: [
            { label: 'Discord', url: 'https://discord.gg/pQCr73nwWY' }
          ]
        },
        {
          id: 'pavyan',
          name: 'Pavyan',
          category: 'vServer & Root-Server',
          statusDe: 'Aktiv',
          statusEn: 'Active',
          roleDe: 'Mitglied',
          roleEn: 'Member',
          platform: 'Web · Discord',
          descDe: 'Wir bieten zuverlässige vServer und Root-Server für Gameserver, Websites und Projekte, mit schnellen und freundlichem Support.',
          descEn: 'We offer reliable vServers and root servers for game servers, websites and projects, with fast and friendly support.',
          meta: [
            { labelDe: 'Fokus', labelEn: 'Focus', valueDe: 'vServer & Root', valueEn: 'vServer & Root' },
            { labelDe: 'Einsatz', labelEn: 'Use Case', valueDe: 'Games & Web', valueEn: 'Games & Web' }
          ],
          detailsDe: 'Zuverlässige Server-Infrastruktur für Gameserver, Websites und Projekte inklusive schnellem, freundlichem Support.',
          detailsEn: 'Reliable server infrastructure for game servers, websites and projects with fast, friendly support.',
          links: [
            { label: 'Discord', url: 'https://discord.gg/xqcxpdkmF8' },
            { label: 'Website', url: 'https://pavyan-systems.com/' }
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
          name: 'Serverix',
          category: 'Bot-Hosting & Monitoring',
          statusDe: 'Aktiv',
          statusEn: 'Active',
          roleDe: 'Nutzer',
          roleEn: 'User',
          platform: 'Web · Status · Discord',
          descDe: 'Hosting-Umgebung für eigene Discord-Bots mit direktem Zugriff auf Statusseite und Support.',
          descEn: 'Hosting stack for custom Discord bots with direct status page and support links.',
          meta: [
            { labelDe: 'Zweck', labelEn: 'Purpose', valueDe: 'Bot Runtime', valueEn: 'Bot Runtime' },
            { labelDe: 'Telemetrie', labelEn: 'Telemetry', valueDe: 'Live Status', valueEn: 'Live Status' }
          ],
          detailsDe: 'Laufzeitumgebung für Bot-Prozesse und schnellen Check von Uptime und Ausfällen.',
          detailsEn: 'Runtime environment for bot processes and quick uptime checks.',
          links: [
            { label: 'Website', url: 'https://serverix.host/' },
            { label: 'Status', url: 'https://status.serverix.host/' },
            { label: 'Discord', url: 'https://discord.gg/Et9a3bzH7v' }
          ]
        },
        {
          id: 'public-bots',
          name: 'Public Bots',
          category: 'Discord.js Module',
          statusDe: 'In Vorbereitung',
          statusEn: 'Preparing',
          roleDe: 'Entwickler',
          roleEn: 'Developer',
          platform: 'Node.js · Discord API',
          descDe: 'Eigenentwickelte Bots jeglicher Art (Privat).',
          descEn: 'Custom developed bots of any kind (Private).',
          meta: [
            { labelDe: 'Stack', labelEn: 'Stack', valueDe: 'Node.js', valueEn: 'Node.js' },
            { labelDe: 'Verfügbarkeit', labelEn: 'Release', valueDe: 'Bald', valueEn: 'Soon' }
          ],
          detailsDe: 'Saubere Trennung zwischen Test- und Produktivbetrieb sowie eigener Presence-API.',
          detailsEn: 'Clean separation between testing and production alongside the presence API.',
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

  function renderSections() {
    const host = document.getElementById('showcase-sections');
    if (!host) return;
    const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
    host.textContent = '';

    SECTIONS.forEach((sec) => {
      const section = document.createElement('section');
      section.className = 'section-block';
      section.id = sec.id;

      const head = document.createElement('div');
      head.className = 'section-head';

      const titleGroup = document.createElement('div');
      const kicker = document.createElement('span');
      kicker.className = 'section-kicker';
      kicker.dataset.i18n = sec.kickerKey;
      const h2 = document.createElement('h2');
      h2.dataset.i18n = sec.titleKey;
      titleGroup.append(kicker, h2);

      const count = document.createElement('span');
      count.className = 'section-count';
      count.textContent = `${sec.items.length}`;

      head.append(titleGroup, count);
      section.appendChild(head);

      const intro = document.createElement('p');
      intro.className = 'section-intro';
      if (sec.id === 'sec-projects') {
        intro.textContent = lang === 'en'
          ? 'A selection of communities and projects I am involved in. Open a card for more context or follow one of its links.'
          : 'Eine Auswahl an Communities und Projekten, bei denen ich mitwirke. Öffne die Details für mehr Hintergrund oder nutze direkt die jeweiligen Links.';
      } else {
        intro.textContent = lang === 'en'
          ? 'Services and tools that support my projects, bot hosting and technical work.'
          : 'Dienste und Werkzeuge, die meine Projekte, das Bot-Hosting und meine technische Arbeit unterstützen.';
      }
      section.appendChild(intro);

      const grid = document.createElement('div');
      grid.className = 'data-cards-grid';

      sec.items.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'data-card';

        // Top row: Category + Status pill (no banner images)
        const top = document.createElement('div');
        top.className = 'data-card-top';

        const cat = document.createElement('span');
        cat.className = 'data-category';
        cat.textContent = item.category;

        const status = document.createElement('span');
        status.className = 'data-status-pill';
        status.textContent = lang === 'en' ? item.statusEn : item.statusDe;

        top.append(cat, status);

        // Title + Role/Platform line
        const titleRow = document.createElement('div');
        titleRow.className = 'data-title-row';

        const h3 = document.createElement('h3');
        h3.textContent = item.name;

        const roleTag = document.createElement('span');
        roleTag.className = 'data-role-chip';
        roleTag.textContent = lang === 'en' ? item.roleEn : item.roleDe;

        titleRow.append(h3, roleTag);

        const platformLine = document.createElement('div');
        platformLine.className = 'data-platform-line';
        platformLine.textContent = item.platform;

        const desc = document.createElement('p');
        desc.className = 'data-desc';
        desc.textContent = lang === 'en' ? item.descEn : item.descDe;

        // Structured data rows (key-value pairs)
        const specGrid = document.createElement('dl');
        specGrid.className = 'data-spec-grid';
        (item.meta || []).forEach((m) => {
          const cell = document.createElement('div');
          cell.className = 'data-spec-cell';
          const dt = document.createElement('dt');
          dt.textContent = lang === 'en' ? m.labelEn : m.labelDe;
          const dd = document.createElement('dd');
          dd.textContent = lang === 'en' ? m.valueEn : m.valueDe;
          cell.append(dt, dd);
          specGrid.appendChild(cell);
        });

        const detailBox = document.createElement('p');
        detailBox.className = 'data-extra-detail';
        detailBox.hidden = true;
        detailBox.textContent = lang === 'en' ? item.detailsEn : item.detailsDe;

        const actions = document.createElement('div');
        actions.className = 'data-actions';

        (item.links || []).forEach((l) => {
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

        const detailBtn = document.createElement('button');
        detailBtn.type = 'button';
        detailBtn.className = 'mini-btn detail-toggle';
        detailBtn.textContent = lang === 'en' ? 'More info' : 'Details';
        detailBtn.addEventListener('click', () => {
          const open = detailBox.hidden;
          detailBox.hidden = !open;
          detailBtn.textContent = open
            ? (lang === 'en' ? 'Less' : 'Weniger')
            : (lang === 'en' ? 'More info' : 'Details');
        });
        actions.appendChild(detailBtn);

        card.append(top, titleRow, platformLine, desc, specGrid, detailBox, actions);
        grid.appendChild(card);
      });

      section.appendChild(grid);
      host.appendChild(section);
    });
  }

  window.MyLinksSections = {
    render: renderSections
  };

  renderSections();
})();
