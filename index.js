'use strict';


const T = {
    en: {
        settings: 'Settings', language: 'Language', accent: 'Accent color', theme: 'Theme', dark: 'Dark', light: 'Light',
        info: 'Info', infoTitle: 'About this page',
        info1: 'My projects, communities and links in one place. Open a card to see more details.',
        info2: 'Use the gear at the top right to change language, accent color and theme.',
        info3: 'Your settings are stored locally in your browser only. The Discord status is requested live via the Lanyard API.',
        welcomeTitle: 'Welcome', welcomeText: 'Click to enter', enter: 'Enter site',
        location: '17 years old, Austria',
        bio: "I'm Tommy from Austria. In my free time I build Discord bots, mostly with JavaScript. I also like hanging out in gaming communities and working on my own ideas.",
        discordAria: 'Open my Discord profile',
        secProjects: 'My projects', secGaming: 'Gaming', secHosting: 'Hosting', secBots: 'My public bots', secSkills: 'What I do',
        stCommunity: 'Community', stLive: 'Released', stTeam: 'In the team', stMember: 'Member', stHost: 'Host',
        openDiscord: 'Open Discord', joinDiscord: 'Join Discord', playRoblox: 'Play on Roblox',
        chRole: 'Channels', chHost: 'Host links', chLegal: 'Host legal',
        website: 'Official website', status: 'Serverix status', whatsapp: 'Serverix WhatsApp channel',
        imprint: 'Legal notice', privacy: 'Privacy policy', terms: 'Terms',
        core: 'A server about 3D design and 3D printing that I run together with a friend. I lead the community, my buddy takes care of the 3D work.',
        coreMore: 'Core3D is all about 3D design and 3D printing. I look after the community and its growth, my buddy handles the 3D work. Stay up to date through Discord and YouTube.',
        oktav: 'Official server of the bell game on Roblox. I am a team member and the game keeps growing.',
        oktavMore: 'This is the official server of the bell game Oktavstadt on Roblox. Everything here revolves around bells, and everyone is welcome.',
        eas: 'A roleplay project where I am part of the team. The devs do the building, but you can already join the Discord.',
        easMore: 'EAS is a roleplay project currently in development (V2). I am part of the team and help move it forward, while most of the building is done by others.',
        trucker: 'A community around trucking in ETS2 with shared tours, convoys and chatting. Beginners and pros are welcome.',
        truckerMore: 'Fichtelhillz Trucker is a community for everyone who enjoys ETS2, whether it is tours, convoys or just chatting. I am a member there.',
        serverix: 'This is where I host my Discord bots. You can join the Serverix Discord.',
        serverixMore: 'Serverix is the host where my Discord bots run. The links below belong to the host.',
        botsTitle: 'Coming soon', botsText: 'My public bots are still in the workshop. Once they are ready, you will find them here. Thanks for your patience!',
        gaming: 'Gaming', footer: 'Made with code & coffee.'
    },
    de: {
        settings: 'Einstellungen', language: 'Sprach', accent: 'Akzentfarb', theme: 'Design', dark: 'Dunkel', light: 'Hell',
        info: 'Info', infoTitle: 'Über die Seitn',
        info1: 'Do findest meine Projekte, Communities und Links auf amoi. Klapp a Kartn auf, wennst mehr wissen magst.',
        info2: 'Mit’m Zahnrad rechts oben kannst Sprach, Akzentfarb und Design ändern.',
        info3: 'Deine Einstellungen bleiben nur in deinem Browser gespeichert.',
        welcomeTitle: 'Servus!', welcomeText: 'Klick zum Reinschaun', enter: 'Reinschaun',
        location: '17 Jahr, aus Österreich',
        bio: 'Servus, i bin da Tommy aus Österreich. In meiner Freizeit bastl i an Discord Bots, meistens mit JavaScript. I bin gern in Gaming Communities unterwegs und probier immer wieder eigene Ideen aus.',
        discordAria: 'Mei Discord Profil öffnen',
        secProjects: 'Meine Projekte', secGaming: 'Zocken', secHosting: 'Hosting', secBots: 'Meine öffentlichen Bots', secSkills: 'Was i so mach',
        stCommunity: 'Community', stLive: 'Online', stTeam: 'Im Team', stMember: 'Mitglied', stHost: 'Hoster',
        openDiscord: 'Discord öffnen', joinDiscord: 'Zum Discord', playRoblox: 'Auf Roblox zocken',
        chRole: 'Kanäle', chHost: 'Serverix Links', chLegal: 'Rechtliches von Serverix',
        website: 'Offizielle Seitn', status: 'Serverix-Status', whatsapp: 'Serverix auf WhatsApp',
        imprint: 'Impressum', privacy: 'Datenschutz', terms: 'AGB',
        core: 'A Community rund um 3D Design und 3D Druck, die i mit am Freund betreib. I kümmer mi um die Leut und mei Spezl um die 3D-Arbeit.',
        coreMore: 'Bei Core3D geht’s um 3D Design und 3D Druck. I schau auf die Community und dass sie wächst, mei Spezl kümmert si ums 3D-Zeug. Auf Discord und YouTube gibt’s die neuesten Infos.',
        oktav: 'Der offizielle Server zum Glockenspiel auf Roblox. I bin im Team dabei und das Spiel wird laufend weiterentwickelt.',
        oktavMore: 'Das is der offizielle Server vom Glockenspiel Oktavstadt auf Roblox. Bei uns dreht si alles um Glocken und neue Ideen. Vorbeischaun kann jeder.',
        eas: 'A Roleplay Projekt, bei dem i im Team dabei bin. Das Bauen übernehmen die Devs, im Discord kannst aber jetzt schon vorbeischaun.',
        easMore: 'EAS is ein Roleplay Projekt und grad in Entwicklung (V2). I bin im Team dabei und helf mit, beim Bauen packen hauptsächlich die anderen an.',
        trucker: 'A Community für ETS2-Fans mit gemeinsamen Touren, Convoys und gemütlichem Ratschen. Egal ob Anfänger oder Profi, jeder is willkommen.',
        truckerMore: 'Bei Fichtelhillz Trucker treffen si alle, die gern ETS2 fahren. Ob Touren, Convoys oder einfach a bissl ratschen, es is für jeden was dabei. I bin dort Mitglied.',
        serverix: 'Do laufen meine Discord-Bots. Wennst magst, schau beim Serverix Discord vorbei.',
        serverixMore: 'Serverix is der Hoster, auf dem meine Discord Bots laufen. Die wichtigsten Links findest weiter unten.',
        botsTitle: 'Kommt no', botsText: 'Meine öffentlichen Bots sind grad noch in Arbeit. Sobald sie fertig sind, findest sie do. Danke fürs Warten!',
        gaming: 'Zocken', footer: 'Mit Code und Kaffee gmacht.'
    }
};

/* ---------- Inhalte ---------- */
const SECTIONS = [
    {
        id: 'projects', title: 'secProjects', cards: [{
            id: 'core3d', name: 'Core3D', icon: 'printer', tone: 'violet', kicker: 'COMMUNITY', sub: '3D DESIGN · 3D PRINTING',
            status: 'stCommunity', cls: 'active', text: 'core', more: 'coreMore', tags: ['3D', 'Community'],
            links: [{ href: 'https://discord.gg/33mb9W3KgB', label: 'openDiscord', arrow: true },
                    { href: 'https://www.youtube.com/@Core3D_Print', raw: 'YouTube', icon: 'clapperboard' }]
        }]
    },
    {
        id: 'gaming', title: 'secGaming', cards: [
            {
                id: 'oktav', name: 'Oktavstadt', icon: 'bell', tone: 'sky', kicker: 'GAMING', sub: 'ROBLOX · COMMUNITY',
                status: 'stLive', cls: 'active', text: 'oktav', more: 'oktavMore', tags: ['Roblox', 'Team'],
                links: [{ href: 'https://discord.gg/f9WwmEBtmE', label: 'joinDiscord', arrow: true },
                        { href: 'https://www.roblox.com/de/games/105633432256999/Oktavstadt', label: 'playRoblox', icon: 'gamepad-2' }],
                chips: { title: 'chRole', items: [{ href: 'https://www.youtube.com/@Oktavstadt', raw: 'YouTube', icon: 'clapperboard' }] }
            },
            {
                id: 'eas', name: 'EAS', icon: 'drama', tone: 'indigo', kicker: 'COMING SOON', sub: 'ROLEPLAY · V2',
                status: 'stTeam', cls: 'dev', text: 'eas', more: 'easMore', tags: ['Roleplay', 'V2', 'Team'],
                links: [{ href: 'https://discord.gg/pQCr73nwWY', label: 'joinDiscord', arrow: true }]
            },
            {
                id: 'trucker', name: 'Fichtelhillz Trucker', icon: 'truck', tone: 'amber', kicker: 'COMMUNITY', sub: 'EURO TRUCK SIMULATOR 2',
                status: 'stMember', cls: 'dev', text: 'trucker', more: 'truckerMore', tags: ['ETS2', 'Trucking', 'Convoys'],
                links: [{ href: 'https://discord.gg/2WqvykHESn', label: 'joinDiscord', arrow: true }],
                chips: {
                    title: 'chRole', items: [
                        { href: 'https://www.youtube.com/@fichtelhillztrucker', raw: 'YouTube', icon: 'clapperboard' },
                        { href: 'https://www.twitch.tv/fichtelhillztrucker', raw: 'Twitch', icon: 'radio' }]
                }
            }
        ]
    },
    {
        id: 'hosting', title: 'secHosting', cards: [{
            id: 'serverix', name: 'Serverix', icon: 'server', tone: 'emerald', kicker: 'BOT HOSTING', sub: 'DISCORD · HOSTING',
            status: 'stHost', cls: 'active', text: 'serverix', more: 'serverixMore', tags: ['Hosting', 'Discord Bots'],
            links: [{ href: 'https://discord.gg/Et9a3bzH7v', label: 'joinDiscord', arrow: true }],
            chips: [
                {
                    title: 'chHost', items: [
                        { href: 'https://serverix.host/', label: 'website', icon: 'globe' },
                        { href: 'https://status.serverix.host/', label: 'status', icon: 'heart-pulse' },
                        { href: 'https://whatsapp.com/channel/0029VbCDpfH35fM0pUsaN91C', label: 'whatsapp', icon: 'messages-square' }]
                },
                {
                    title: 'chLegal', items: [
                        { href: 'https://serverix.host/impressum', label: 'imprint', icon: 'building-2' },
                        { href: 'https://serverix.host/datenschutz', label: 'privacy', icon: 'lock-keyhole' },
                        { href: 'https://serverix.host/agb', label: 'terms', icon: 'file-signature' }]
                }
            ]
        }]
    },
    { id: 'bots', title: 'secBots', wip: true },
    { id: 'skills', title: 'secSkills', skills: true }
];

const SKILLS = [
    { icon: 'code-xml', raw: 'JavaScript' },
    { icon: 'bot-message-square', raw: 'Discord Development' },
    { icon: 'joystick', label: 'gaming' }
];

/* ---------- Helfer ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.documentElement;
const store = {
    get: (k) => { try { return localStorage.getItem('tl-' + k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem('tl-' + k, v); } catch { /* ohne Speicher weiter */ } }
};
const ACCENTS = ['blue', 'violet', 'pink', 'green', 'orange'];
let lang = store.get('lang') === 'de' ? 'de' : 'en';
const t = (k) => T[lang][k] ?? T.en[k] ?? k;
const i = (key) => `data-i18n="${key}"`;
const text = (o) => (o.raw ? o.raw : `<span ${i(o.label)}></span>`);

/* ---------- Rendering ---------- */
const linkHtml = (l) => `<a class="project-link" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.icon ? `<i data-lucide="${l.icon}"></i>` : ''}${l.raw ? `<span>${l.raw}</span>` : `<span ${i(l.label)}></span>`}${l.arrow ? '<i data-lucide="arrow-up-right"></i>' : ''}</a>`;

const chipGroup = (g) => `<div class="link-group-title" ${i(g.title)}></div><div class="link-grid">${g.items.map((c) =>
    `<a class="link-chip" href="${c.href}" target="_blank" rel="noopener noreferrer"><i data-lucide="${c.icon}"></i>${c.raw ? `<span>${c.raw}</span>` : `<span ${i(c.label)}></span>`}</a>`).join('')}</div>`;

function cardHtml(c) {
    const chips = c.chips ? [].concat(c.chips).map(chipGroup).join('') : '';
    return `<article class="card project-card reveal" data-tone="${c.tone}">
        <div class="card-head" role="button" tabindex="0" aria-expanded="false" aria-controls="d-${c.id}">
            <div class="card-media">
                <div class="banner">
                    <i class="banner-icon" data-lucide="${c.icon}"></i>
                    <span class="banner-kicker">${c.kicker}</span>
                    <strong>${c.name}</strong>
                    <small>${c.sub}</small>
                </div>
                <span class="card-chevron" aria-hidden="true"><i data-lucide="chevron-down"></i></span>
            </div>
            <div class="card-body">
                <div class="project-title-row">
                    <h3 class="title-with-icon"><i data-lucide="${c.icon}"></i><span>${c.name}</span></h3>
                    <span class="status ${c.cls}" ${i(c.status)}></span>
                </div>
                <p ${i(c.text)}></p>
                <div class="project-tags">${c.tags.map((x) => `<span class="project-tag">${x}</span>`).join('')}</div>
            </div>
        </div>
        <div class="card-links project-links">${c.links.map(linkHtml).join('')}</div>
        <div class="collapse closed" id="d-${c.id}"><div class="collapse-inner"><div class="card-details">
            <p class="details-text" ${i(c.more)}></p>${chips}
        </div></div></div>
    </article>`;
}

function sectionHtml(s) {
    let body = '';
    if (s.cards) body = `<div class="cards">${s.cards.map(cardHtml).join('')}</div>`;
    else if (s.wip) body = `<div class="card wip reveal"><span class="wip-icon"><i data-lucide="hammer"></i></span><div><strong ${i('botsTitle')}></strong><p ${i('botsText')}></p></div></div>`;
    else if (s.skills) body = `<div class="skills">${SKILLS.map((k) => `<div class="card skill reveal"><span class="skill-icon"><i data-lucide="${k.icon}"></i></span>${text(k)}</div>`).join('')}</div>`;

    return `<section class="section">
        <div class="section-heading"><span class="section-line"></span>
            <h2><button class="section-toggle" type="button" aria-expanded="true" aria-controls="sec-${s.id}"><span ${i(s.title)}></span><i data-lucide="chevron-down"></i></button></h2>
            <span class="section-line"></span></div>
        <div class="collapse" id="sec-${s.id}"><div class="collapse-inner">${body}</div></div>
    </section>`;
}

/* ---------- Sprache, Farbe, Design ---------- */
function applyLanguage(next) {
    lang = next === 'de' ? 'de' : 'en';
    store.set('lang', lang);
    root.setAttribute('lang', lang);
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    $$('[data-i18n-title]').forEach((el) => el.setAttribute('title', t(el.dataset.i18nTitle)));
    $$('[data-lang-opt]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.langOpt === lang)));
}

function applyAccent(name) {
    const accent = ACCENTS.includes(name) ? name : 'blue';
    store.set('accent', accent);
    root.setAttribute('data-accent', accent);
    $$('[data-accent-opt]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.accentOpt === accent)));
}

function applyTheme(name) {
    const theme = name === 'light' ? 'light' : 'dark';
    store.set('theme', theme);
    root.setAttribute('data-theme', theme);
    $('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f4f8' : '#090a10');
    $$('[data-theme-opt]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.themeOpt === theme)));
}

function setPanel(open) {
    $('#settings-panel').classList.toggle('open', open);
    $('#settings-panel').setAttribute('aria-hidden', String(!open));
    $('#settings-button').setAttribute('aria-expanded', String(open));
}

function setInfo(open) {
    $('#info-overlay').classList.toggle('open', open);
    $('#info-overlay').setAttribute('aria-hidden', String(!open));
}

/* ---------- Start ---------- */
function init() {
    $('#sections').innerHTML = SECTIONS.map(sectionHtml).join('');
    window.lucide?.createIcons();

    applyLanguage(lang);
    applyAccent(store.get('accent'));
    applyTheme(store.get('theme'));

    document.addEventListener('click', (e) => {
        const target = e.target;
        const lg = target.closest('[data-lang-opt]');
        const ac = target.closest('[data-accent-opt]');
        const th = target.closest('[data-theme-opt]');

        if (lg) applyLanguage(lg.dataset.langOpt);
        else if (ac) applyAccent(ac.dataset.accentOpt);
        else if (th) applyTheme(th.dataset.themeOpt);

        if (target.closest('#settings-button')) setPanel(!$('#settings-panel').classList.contains('open'));
        else if (!target.closest('.settings')) setPanel(false);

        const toggle = target.closest('.section-toggle');
        if (toggle) {
            const open = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!open));
            $('#' + toggle.getAttribute('aria-controls')).classList.toggle('closed', open);
        }

        const head = target.closest('.card-head');
        if (head && !target.closest('a')) toggleCard(head);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { setPanel(false); setInfo(false); }
        const head = e.target.closest?.('.card-head');
        if (head && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggleCard(head); }
    });

    $('#info-button').addEventListener('click', () => setInfo(true));
    $('#info-close').addEventListener('click', () => setInfo(false));
    $('#info-overlay').addEventListener('click', (e) => { if (e.target.id === 'info-overlay') setInfo(false); });

    $('#enter-button').addEventListener('click', () => {
        document.body.classList.remove('locked');
        $('#welcome-screen').classList.add('hidden');
        $('#welcome-screen').setAttribute('aria-hidden', 'true');
        window.scrollTo(0, 0);
    }, { once: true });

    setupReveal();
}

function toggleCard(head) {
    const card = head.closest('.project-card');
    const open = head.getAttribute('aria-expanded') === 'true';
    head.setAttribute('aria-expanded', String(!open));
    card.classList.toggle('open', !open);
    $('#' + head.getAttribute('aria-controls')).classList.toggle('closed', open);
}

/* Sanftes Einblenden beim Scrollen */
function setupReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach((el) => el.classList.add('in'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    items.forEach((el) => io.observe(el));
}

init();
