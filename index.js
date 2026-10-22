'use strict';



const music = {
    title: 'BURN THE BRIDGE',
    artist: 'NEFFEX',
    file: 'assets/audio/burn-the-bridge.mp3',
    defaultVolume: 0.5
};

const translations = {
    de: {
        settingsAria: 'Einstellungen öffnen',
        settingsTitle: 'Einstellungen',
        setLanguage: 'Sprache',
        setTheme: 'Design',
        themeLight: 'Hell',
        themeDark: 'Dunkel',
        themeAuto: 'System',
        setAccent: 'Akzentfarbe',
        accentViolet: 'Violett',
        accentBlue: 'Blau',
        accentPink: 'Pink',
        accentGreen: 'Grün',
        accentOrange: 'Orange',
        setFx: 'Hintergrund-Effekte',
        setBackground: 'Hintergrundstil',
        setLayout: 'Kartenlayout',
        setCompact: 'Kompaktmodus',
        setProfile: 'Profilansicht',
        setMotion: 'Animationen',
        setAutoplay: 'Musik beim Betreten',
        setReset: 'Zurücksetzen',
        infoButton: 'Info',
        infoAria: 'Infos zu dieser Seite',
        bookClose: 'Schließen',
        bookPrev: 'Vorherige Seite',
        bookNext: 'Nächste Seite',
        book1Title: 'Was ist das hier?',
        book1Text: 'Hier findest du meine Projekte, Communities und wichtigen Links an einem Ort.',
        book2Title: 'Was gibt es zu sehen?',
        book2Text: 'Hier gibt es meine Projekte, Gaming Communities, den Hoster meiner Discord Bots und meinen aktuellen Discord Status. Öffne eine Kachel, um mehr zu erfahren.',
        book3Title: 'Gut zu wissen',
        book3Text: 'Über das Zahnrad oben rechts kannst du Sprache und Akzentfarbe ändern.',
        book4Title: 'Datenschutz',
        book4Text: 'Deine Einstellungen werden nur lokal in deinem Browser gespeichert. Der Discord-Status wird live über die Lanyard-API abgefragt.',
        welcomeTitle: 'Willkommen',
        welcomeText: 'Klicke zum Betreten',
        enter: 'Seite betreten',
        location: '17 Jahre, Österreich',
        bio: 'Ich bin Tommy aus Österreich. In meiner Freizeit entwickle ich Discord Bots und Websites, meistens mit JavaScript und Python. Außerdem bin ich gern in Gaming Communities unterwegs und arbeite an eigenen Ideen.',
        statusAria: 'Statusseite',
        discordProfileAria: 'Discord Profil',
        soundcloudAria: 'NEFFEX auf SoundCloud öffnen',
        nowPlaying: 'NOW PLAYING',
        seekAria: 'Musikposition',
        volumeAria: 'Lautstärke',
        play: 'Musik abspielen',
        pause: 'Musik pausieren',
        muteOn: 'Ton ausschalten',
        muteOff: 'Ton einschalten',
        musicMissing: 'Musikdatei nicht gefunden',
        sectionProjects: 'Meine Projekte',
        sectionGaming: 'Gaming',
        sectionHosting: 'Hosting',
        sectionSkills: 'Was ich mache',
        statusCommunity: 'Community',
        statusTeam: 'Im Team',
        statusMember: 'Mitglied',
        statusHost: 'Hoster',
        coreText: 'Core3D ist eine Community für 3D Design und 3D Druck, die ich zusammen mit einem Freund betreibe. Ich kümmere mich um die Community und den Discord. Mein Freund übernimmt die 3D Arbeiten. Wir möchten einen Ort bieten, an dem man eigene Projekte zeigen und sich austauschen kann.',
        tag3d: '3D-Druck',
        tagCommunity: 'Community',
        tagLead: '',
        tagMember: 'Mitglied',
        easText: 'EAS ist ein Roleplay Projekt, bei dem ich im Team mitarbeite. Das Projekt wird noch entwickelt. Im Discord findest du Neuigkeiten und kannst den Fortschritt mitverfolgen.',
        truckerText: 'Bei Fichtelhillz Trucker geht es um Euro Truck Simulator 2, gemeinsame Touren und Convoys. Ich bin dort Mitglied. Im Mittelpunkt stehen das gemeinsame Fahren und der Austausch mit anderen.',
        serverixText: 'Bei Serverix hoste ich meine Discord Bots. Über die Links findest du die Website, den Status und die Community des Hosters.',
        openDiscord: 'Discord öffnen',
        joinDiscord: 'Discord beitreten',
        skillGaming: 'Zocken',
        footerText: 'Made with code & coffee.',
        infoType: 'Art',
        infoVersion: 'Version',
        infoStatus: 'Status',
        infoRole: 'Meine Rolle',
        infoGame: 'Spiel',
        roleTeam: 'Teammitglied',
        groupChannels: 'Kanäle',
        groupLinks: 'Links des Hosters',
        groupLegal: 'Rechtliches des Hosters',
        linkWebsite: 'Offizielle Seite',
        linkStatus: 'Status von Serverix',
        linkWhatsapp: 'WhatsApp-Kanal von Serverix',
        linkImprint: 'Impressum',
        linkPrivacy: 'Datenschutz',
        linkTerms: 'AGB',
        infoFocus: 'Schwerpunkt',
        focus3d: '3D-Design & 3D-Druck',
        coreMore: 'Core3D verbindet eine Community rund um 3D-Design und 3D-Druck. Ich kümmere mich gemeinsam mit einem Freund um die Organisation und Weiterentwicklung des Servers und leite die Community. Mein Freund übernimmt vor allem die praktische 3D-Arbeit. Über Discord und YouTube teilen wir Neuigkeiten, Projekte und Einblicke in das, was entsteht.',
        easMore: 'EAS ist ein Roleplay-Projekt, das sich aktuell in der Entwicklung von Version 2 befindet. Ich bin Teammitglied und unterstütze das Projekt dabei, weiter voranzukommen. Die Entwicklung verteilt sich auf mehrere Personen und Aufgabenbereiche. Da sich vieles noch verändert, ist nicht alles bereits fertig; über den Discord-Server lassen sich Neuigkeiten und der aktuelle Stand verfolgen.',
        truckerMore: 'Fichtelhillz Trucker ist eine Community für Fans von Euro Truck Simulator 2. Im Mittelpunkt stehen gemeinsame Fahrten, Convoys und der Austausch rund ums Trucking. Ich bin dort als Mitglied dabei. Wer die Community besser kennenlernen möchte, findet neben Discord auch Inhalte auf YouTube und Twitch.',
        serverixMore: 'Serverix ist der Hosting-Anbieter, auf dem meine Discord-Bots laufen. Über die aufgeführten Links erreichst du die offiziellen Seiten und Community-Angebote des Hosters. Die Hosting-Plattform ist dabei vom eigentlichen Entwicklungsprojekt meiner Bots zu unterscheiden.'
    },

    en: {
        settingsAria: 'Open settings',
        settingsTitle: 'Settings',
        setLanguage: 'Language',
        setTheme: 'Theme',
        themeLight: 'Light',
        themeDark: 'Dark',
        themeAuto: 'System',
        setAccent: 'Accent color',
        accentViolet: 'Violet',
        accentBlue: 'Blue',
        accentPink: 'Pink',
        accentGreen: 'Green',
        accentOrange: 'Orange',
        setFx: 'Background effects',
        setMotion: 'Animations',
        setAutoplay: 'Music on entry',
        setReset: 'Reset',
        infoButton: 'Info',
        infoAria: 'About this page',
        bookClose: 'Close',
        bookPrev: 'Previous page',
        bookNext: 'Next page',
        book1Title: 'What is this?',
        book1Text: 'This is my link page. You can find my projects, communities and links in one place instead of scattered across many different sites.',
        book2Title: 'What is there to see?',
        book2Text: 'My projects, gaming communities, the host of my Discord bots and my live Discord status. Open a card to see more details and further links.',
        book3Title: 'Good to know',
        book3Text: 'Über das Zahnrad oben rechts kannst du die Akzentfarbe zwischen Orange und Blau wechseln.',
        book4Title: 'Privacy',
        book4Text: 'Your settings are only stored locally in your browser. The Discord status is requested live through the Lanyard API.',
        welcomeTitle: 'Welcome',
        welcomeText: 'Click to enter',
        enter: 'Enter site',
        location: '17 years old, Austria',
        bio: 'I’m Tommy, and in my free time I mainly focus on Discord development, JavaScript and Python. I build my own projects, work on bots and websites, and enjoy exploring new technical ideas. I’m also interested in gaming communities and in bringing people together to turn ideas into real projects.',
        statusAria: 'Status page',
        discordProfileAria: 'Discord profile',
        soundcloudAria: 'Open NEFFEX on SoundCloud',
        nowPlaying: 'NOW PLAYING',
        seekAria: 'Music position',
        volumeAria: 'Volume',
        play: 'Play music',
        pause: 'Pause music',
        muteOn: 'Mute',
        muteOff: 'Unmute',
        musicMissing: 'Music file not found',
        sectionProjects: 'My projects',
        sectionGaming: 'Gaming',
        sectionHosting: 'Hosting',
        sectionSkills: 'What I do',
        statusCommunity: 'Community',
        statusTeam: 'In the team',
        statusMember: 'Member',
        statusHost: 'Host',
        coreText: 'A server about 3D design and 3D printing that I run together with a friend. I lead the community, my buddy takes care of the 3D work.',
        tag3d: '3D printing',
        tagCommunity: 'Community',
        tagLead: '',
        tagMember: 'Member',
        easText: 'A roleplay project where I am part of the team. Others do the building, but you can already join the Discord.',
        truckerText: 'A community around trucking in ETS2 with shared tours, convoys and chatting. I am a member there, beginners and pros are welcome.',
        serverixText: 'This is where I host my Discord bots. You can join the Serverix Discord.',
        openDiscord: 'Open Discord',
        joinDiscord: 'Join Discord',
        skillGaming: 'Gaming',
        footerText: 'Made with code & coffee.',
        infoType: 'Type',
        infoVersion: 'Version',
        infoStatus: 'Status',
        infoRole: 'My role',
        infoGame: 'Game',
        roleTeam: 'Team member',
        groupChannels: 'Channels',
        groupLinks: 'Host links',
        groupLegal: 'Host legal',
        linkWebsite: 'Official website',
        linkStatus: 'Serverix status',
        linkWhatsapp: 'Serverix WhatsApp channel',
        linkImprint: 'Legal notice',
        linkPrivacy: 'Privacy policy',
        linkTerms: 'Terms',
        infoFocus: 'Focus',
        focus3d: '3D design & 3D printing',
        coreMore: 'Core3D is all about 3D design and 3D printing. I take care of leading and growing the community, my buddy handles the 3D work. You can stay up to date through Discord and YouTube.',
        easMore: 'EAS is a roleplay project that is currently in development (V2). I am part of the team and help move the project forward, while most of the building is done by others. You can already join the Discord.',
        truckerMore: 'Fichtelhillz Trucker is a community for everyone who enjoys ETS2, whether it is shared tours, convoys or just chatting. I am a member there. Besides Discord there is also a YouTube and a Twitch channel.',
        serverixMore: 'Serverix is the host where my Discord bots run. The links here belong to the host.'
    }
};

/* Neue Texte und Sprachen (fehlende Schlüssel fallen auf Englisch zurück) */
const NEW_KEYS = ["settingsAria", "settingsTitle", "setLanguage", "setTheme", "themeLight", "themeDark", "themeAuto", "setStyle", "setAccent", "setFx", "setMotion", "setAutoplay", "setReset", "welcomeTitle", "welcomeText", "enter", "sectionProjects", "sectionGaming", "sectionHosting", "sectionBots", "sectionSkills", "botsWip", "botsWipText", "statusLive", "statusCommunity", "statusTeam", "statusMember", "statusHost", "openDiscord", "joinDiscord", "playRoblox", "skillGaming", "infoRole", "roleTeam", "location"];
const NEW_LANGS = {"pl": ["Otwórz ustawienia", "Ustawienia", "Język", "Motyw", "Jasny", "Ciemny", "System", "Styl", "Kolor akcentu", "Efekty tła", "Animacje", "Muzyka po wejściu", "Resetuj", "Witaj", "Kliknij, aby wejść", "Wejdź na stronę", "Moje projekty", "Gry", "Hosting", "Moje publiczne boty", "Co robię", "W budowie", "Ta kategoria jest jeszcze w przygotowaniu. Wkrótce znajdziesz tu moje publiczne boty.", "Opublikowana", "Społeczność", "W zespole", "Członek", "Hoster", "Otwórz Discorda", "Dołącz do Discorda", "Graj na Roblox", "Granie", "Moja rola", "Członek zespołu", "17 lat · Austria"], "nl": ["Instellingen openen", "Instellingen", "Taal", "Thema", "Licht", "Donker", "Systeem", "Stijl", "Accentkleur", "Achtergrondeffecten", "Animaties", "Muziek bij binnenkomst", "Resetten", "Welkom", "Klik om binnen te gaan", "Site betreden", "Mijn projecten", "Gaming", "Hosting", "Mijn openbare bots", "Wat ik doe", "In aanbouw", "Deze categorie is nog in ontwikkeling. Binnenkort vind je hier mijn openbare bots.", "Gepubliceerd", "Community", "In het team", "Lid", "Host", "Discord openen", "Discord joinen", "Speel op Roblox", "Gamen", "Mijn rol", "Teamlid", "17 jaar · Oostenrijk"], "ru": ["Открыть настройки", "Настройки", "Язык", "Тема", "Светлая", "Тёмная", "Система", "Стиль", "Цвет акцента", "Фоновые эффекты", "Анимации", "Музыка при входе", "Сбросить", "Добро пожаловать", "Нажмите, чтобы войти", "Войти на сайт", "Мои проекты", "Игры", "Хостинг", "Мои публичные боты", "Чем я занимаюсь", "В разработке", "Эта категория ещё в работе. Скоро здесь появятся мои публичные боты.", "Опубликовано", "Сообщество", "В команде", "Участник", "Хостер", "Открыть Discord", "Вступить в Discord", "Играть в Roblox", "Игры", "Моя роль", "Участник команды", "17 лет · Австрия"], "it": ["Apri impostazioni", "Impostazioni", "Lingua", "Tema", "Chiaro", "Scuro", "Sistema", "Stile", "Colore principale", "Effetti di sfondo", "Animazioni", "Musica all’ingresso", "Ripristina", "Benvenuto", "Clicca per entrare", "Entra nel sito", "I miei progetti", "Gaming", "Hosting", "I miei bot pubblici", "Cosa faccio", "In lavorazione", "Questa categoria è ancora in lavorazione. Presto troverai qui i miei bot pubblici.", "Pubblicato", "Community", "Nel team", "Membro", "Host", "Apri Discord", "Unisciti a Discord", "Gioca su Roblox", "Gaming", "Il mio ruolo", "Membro del team", "17 anni · Austria"], "sv": ["Öppna inställningar", "Inställningar", "Språk", "Tema", "Ljust", "Mörkt", "System", "Stil", "Accentfärg", "Bakgrundseffekter", "Animationer", "Musik vid inträde", "Återställ", "Välkommen", "Klicka för att komma in", "Gå in på sidan", "Mina projekt", "Spel", "Hosting", "Mina publika botar", "Vad jag gör", "Under arbete", "Den här kategorin är fortfarande under arbete. Snart hittar du mina publika botar här.", "Publicerad", "Community", "I teamet", "Medlem", "Värd", "Öppna Discord", "Gå med i Discord", "Spela på Roblox", "Spelande", "Min roll", "Teammedlem", "17 år · Österrike"]};
Object.assign(translations.de, {"setStyle": "Stil", "sectionBots": "Meine öffentlichen Bots", "botsWip": "In Arbeit", "botsWipText": "Diese Kategorie ist noch in Arbeit. Bald findest du hier meine öffentlichen Bots.", "statusLive": "Veröffentlicht", "playRoblox": "Auf Roblox spielen", "tagTeam": "Team", "oktavText": "Offizieller Server des Glocken-Spiels auf Roblox. Ich bin Teammitglied, das Spiel wird ständig weiterentwickelt.", "oktavMore": "Hallo, das ist der offizielle Server von dem Glocken-Spiel Oktavstadt. Wir sind ein Glocken-Spiel auf Roblox, bei uns dreht sich alles um Glocken. Jeder ist hier willkommen."});
Object.assign(translations.en, {"setStyle": "Style", "sectionBots": "My public bots", "botsWip": "Work in progress", "botsWipText": "This category is still in progress. My public bots will appear here soon.", "statusLive": "Released", "playRoblox": "Play on Roblox", "tagTeam": "Team", "oktavText": "Official server of the bell game on Roblox. I am a team member and the game keeps being developed.", "oktavMore": "Hello, this is the official server of the bell game Oktavstadt. We are a bell game on Roblox and everything here revolves around bells. Everyone is welcome."});
Object.entries(NEW_LANGS).forEach(([code, values]) => {
    translations[code] = Object.fromEntries(NEW_KEYS.map((key, i) => [key, values[i]]));
});



const LANGS = ['de'];
const normLang = () => 'de';
const $ = (id) => document.getElementById(id);
const root = document.documentElement;
root.setAttribute('data-style', 'aurora');
root.setAttribute('data-layout', 'tiles');

const els = {
    welcomeScreen: $('welcome-screen'),
    enterButton: $('enter-button'),
    audio: $('audio'),
    playButton: $('play-button'),
    seek: $('seek'),
    volume: $('volume'),
    volumeButton: $('volume-button'),
    currentTime: $('current-time'),
    duration: $('duration'),
    title: $('track-title'),
    artist: $('track-artist'),
    settingsButton: $('settings-button'),
    settingsPanel: $('settings-panel'),
    infoButton: $('info-button'),
    bookOverlay: $('book-overlay')
};

let lastVolume = music.defaultVolume;
let audioError = false;
let currentLang = 'de';
root.setAttribute('lang', 'de');
try { localStorage.setItem('tommy-lang', 'de'); localStorage.setItem('tommy-style', 'aurora'); localStorage.setItem('tommy-background', 'grid'); localStorage.setItem('tommy-layout', 'tiles'); } catch {}

function t(key) {
    return translations[currentLang]?.[key] ?? translations.en?.[key] ?? translations.de[key] ?? key;
}

function readStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // Die Seite funktioniert auch ohne lokalen Speicher.
    }
}

function removeStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        // Die Seite funktioniert auch ohne lokalen Speicher.
    }
}



function applyLanguage(lang) {
    currentLang = normLang(lang);
    root.setAttribute('lang', currentLang);

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
        element.setAttribute('aria-label', t(element.dataset.i18nAria));
    });

    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
        element.setAttribute('title', t(element.dataset.i18nTitle));
    });

    markLanguage(currentLang);

    if (els.artist) {
        els.artist.textContent = audioError ? t('musicMissing') : music.artist;
    }

    updatePlayButton();
    updateVolumeButton();
}

let langTimer = null;

function markLanguage(lang) {
    const select = $('lang-select');
    if (select) select.value = lang;

    $('lang-select')?.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });

    document.querySelectorAll('[data-style-option]').forEach((element) => {
        element.addEventListener('click', () => setStyle(element.dataset.styleOption));
    });
}

function setLanguage(next) {
    if (next === currentLang) return;

    const nextLanguage = normLang(next);
    writeStorage('tommy-lang', nextLanguage);

    if (reducedMotion) {
        applyLanguage(nextLanguage);
        return;
    }

    markLanguage(nextLanguage);
    clearTimeout(langTimer);
    document.body.classList.add('i18n-out');

    langTimer = setTimeout(() => {
        applyLanguage(nextLanguage);
        requestAnimationFrame(() => {
            document.body.classList.remove('i18n-out');
        });
    }, 180);
}



const THEMES = ['light', 'dark', 'auto'];
const ACCENTS = ['blue', 'orange'];
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const lightQuery = window.matchMedia('(prefers-color-scheme: light)');

let themePref = THEMES.includes(readStorage('tommy-theme'))
    ? readStorage('tommy-theme')
    : 'dark';

let accentPref = ACCENTS.includes(readStorage('tommy-accent'))
    ? readStorage('tommy-accent')
    : 'orange';

let fxOn = readStorage('tommy-fx') !== 'off';

let motionOn = readStorage('tommy-motion')
    ? readStorage('tommy-motion') === 'on'
    : !reducedMotionQuery.matches;

let autoplayOn = readStorage('tommy-autoplay') !== 'off';
let compactOn = readStorage('tommy-compact') === 'on';
let profileOn = readStorage('tommy-profile') !== 'off';
let backgroundPref = 'grid';
let layoutPref = 'tiles';

const STYLES = ['glass', 'metro', 'retro', 'neon', 'brutal', 'aurora', 'mono', 'frost'];
let stylePref = 'aurora';

function setBackground(name) {
    backgroundPref = 'grid';
    writeStorage('tommy-background', backgroundPref);
    root.setAttribute('data-background', backgroundPref);
    document.querySelectorAll('[data-background-option]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.backgroundOption === backgroundPref)));
}

function setLayout(name) {
    layoutPref = 'tiles';
    writeStorage('tommy-layout', layoutPref);
    root.setAttribute('data-layout', layoutPref);
    document.querySelectorAll('[data-layout-option]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.layoutOption === layoutPref)));
}

function setCompact(on) {
    compactOn = Boolean(on);
    writeStorage('tommy-compact', compactOn ? 'on' : 'off');
    root.classList.toggle('compact-mode', compactOn);
    setSwitch('switch-compact', compactOn);
}

function setProfile(on) {
    profileOn = Boolean(on);
    writeStorage('tommy-profile', profileOn ? 'on' : 'off');
    root.classList.toggle('hide-profile', !profileOn);
    setSwitch('switch-profile', profileOn);
}

function setStyle(name) {
    stylePref = STYLES.includes(name) ? name : 'glass';
    writeStorage('tommy-style', stylePref);
    root.setAttribute('data-style', stylePref);

    document.querySelectorAll('[data-style-option]').forEach((element) => {
        element.setAttribute('aria-pressed', String(element.dataset.styleOption === stylePref));
    });
}

function resolveTheme(pref) {
    if (pref === 'auto') {
        return lightQuery.matches ? 'light' : 'dark';
    }

    return pref === 'light' ? 'light' : 'dark';
}

function applyTheme(pref) {
    const value = resolveTheme(pref);
    const meta = document.querySelector('meta[name="theme-color"]');

    root.setAttribute('data-theme', value);

    if (meta) {
        meta.setAttribute('content', value === 'light' ? '#f4f3fa' : '#08090c');
    }

    document.querySelectorAll('[data-theme-option]').forEach((element) => {
        element.setAttribute(
            'aria-pressed',
            String(element.dataset.themeOption === pref)
        );
    });
}

let themeTimer = null;

function setTheme(pref) {
    themePref = THEMES.includes(pref) ? pref : 'dark';
    writeStorage('tommy-theme', themePref);

    root.classList.add('theme-fade');
    applyTheme(themePref);

    clearTimeout(themeTimer);
    themeTimer = setTimeout(() => {
        root.classList.remove('theme-fade');
    }, 500);
}

lightQuery.addEventListener('change', () => {
    if (themePref === 'auto') applyTheme('auto');
});

function setAccent(name) {
    accentPref = ACCENTS.includes(name) ? name : 'orange';
    writeStorage('tommy-accent', accentPref);

    if (accentPref === 'violet') {
        root.removeAttribute('data-accent');
    } else {
        root.setAttribute('data-accent', accentPref);
    }

    document.querySelectorAll('[data-accent-option]').forEach((element) => {
        element.setAttribute(
            'aria-pressed',
            String(element.dataset.accentOption === accentPref)
        );
    });

    if (els.volume) updateRange(els.volume);
    if (els.seek) updateRange(els.seek);
}

function setFx(on) {
    fxOn = Boolean(on);
    writeStorage('tommy-fx', fxOn ? 'on' : 'off');
    root.classList.toggle('no-fx', !fxOn);
    setSwitch('switch-fx', fxOn);
}

function setMotion(on) {
    motionOn = Boolean(on);
    writeStorage('tommy-motion', motionOn ? 'on' : 'off');

    root.classList.toggle('no-motion', !motionOn);
    root.classList.toggle('motion-on', motionOn);
    setSwitch('switch-motion', motionOn);

    reducedMotion = !motionOn || reducedMotionQuery.matches;
    visualizerOff = !ENABLE_VISUALIZER || reducedMotion;

    if (visualizerOff) {
        stopVisualizer();
        bass = 0;
        mid = 0;
        lastBass = -1;
        lastMid = -1;
        setLevels(0, 0);
    } else if (els.audio && !els.audio.paused) {
        setupAnalyser();
        startVisualizer();
    }
}

function setAutoplay(on) {
    autoplayOn = Boolean(on);
    writeStorage('tommy-autoplay', autoplayOn ? 'on' : 'off');
    setSwitch('switch-autoplay', autoplayOn);
}

function setSwitch(id, on) {
    const element = $(id);
    if (element) element.setAttribute('aria-checked', String(Boolean(on)));
}

function resetSettings() {
    [
        'tommy-theme',
        'tommy-accent',
        'tommy-fx',
        'tommy-motion',
        'tommy-autoplay',
        'tommy-style',
        'tommy-compact',
        'tommy-profile',
        'tommy-background',
        'tommy-layout'
    ].forEach(removeStorage);

    setTheme('dark');
    setAccent('orange');
    setFx(true);
    setMotion(!reducedMotionQuery.matches);
    setAutoplay(true);
    setStyle('aurora');
    setCompact(false);
    setProfile(true);
    setBackground('grid');
    setLayout('tiles');
}



function setPanel(open) {
    if (!els.settingsPanel || !els.settingsButton) return;

    els.settingsPanel.classList.toggle('open', open);
    els.settingsPanel.setAttribute('aria-hidden', String(!open));
    els.settingsButton.setAttribute('aria-expanded', String(open));
}

function setupSettings() {
    if (!els.settingsButton || !els.settingsPanel) return;

    els.settingsButton.addEventListener('click', () => {
        setPanel(!els.settingsPanel.classList.contains('open'));
    });

    document.addEventListener('click', (event) => {
        if (
            els.settingsPanel.classList.contains('open') &&
            !event.target.closest('.settings')
        ) {
            setPanel(false);
        }
    });

    document.querySelectorAll('[data-lang-option]').forEach((element) => {
        element.addEventListener('click', () => {
            setLanguage(element.dataset.langOption);
        });
    });

    document.querySelectorAll('[data-theme-option]').forEach((element) => {
        element.addEventListener('click', () => {
            setTheme(element.dataset.themeOption);
        });
    });

    document.querySelectorAll('[data-accent-option]').forEach((element) => {
        element.addEventListener('click', () => {
            setAccent(element.dataset.accentOption);
        });
    });

    $('switch-fx')?.addEventListener('click', () => setFx(!fxOn));
    $('switch-motion')?.addEventListener('click', () => setMotion(!motionOn));
    $('switch-autoplay')?.addEventListener('click', () => setAutoplay(!autoplayOn));
    $('switch-compact')?.addEventListener('click', () => setCompact(!compactOn));
    $('switch-profile')?.addEventListener('click', () => setProfile(!profileOn));
    document.querySelectorAll('[data-background-option]').forEach((el) => el.addEventListener('click', () => setBackground(el.dataset.backgroundOption)));
    document.querySelectorAll('[data-layout-option]').forEach((el) => el.addEventListener('click', () => setLayout(el.dataset.layoutOption)));
    $('settings-reset')?.addEventListener('click', resetSettings);

    setFx(fxOn);
    setSwitch('switch-motion', motionOn);
    setSwitch('switch-autoplay', autoplayOn);
    setSwitch('switch-compact', compactOn);
    setSwitch('switch-profile', profileOn);
    setBackground('grid');
    setLayout('tiles');
    setAccent(accentPref);
}


const book = {
    page: 0,
    lastFocus: null
};

function showBookPage(index) {
    const pages = [...document.querySelectorAll('.book-page')];
    const dots = [...document.querySelectorAll('.book-dot')];

    if (!pages.length) return;

    const last = pages.length - 1;
    book.page = Math.min(Math.max(index, 0), last);

    pages.forEach((page, i) => {
        page.classList.toggle('active', i === book.page);
        page.classList.toggle('leaving', i < book.page);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === book.page);
    });

    const previous = $('book-prev');
    const next = $('book-next');

    if (previous) previous.disabled = book.page === 0;
    if (next) next.disabled = book.page === last;
}

function openBook() {
    if (!els.bookOverlay) return;

    setPanel(false);
    book.lastFocus = document.activeElement;
    showBookPage(0);

    els.bookOverlay.classList.add('open');
    els.bookOverlay.setAttribute('aria-hidden', 'false');
    $('book-close')?.focus({ preventScroll: true });
}

function closeBook() {
    if (!els.bookOverlay) return;

    els.bookOverlay.classList.remove('open');
    els.bookOverlay.setAttribute('aria-hidden', 'true');

    if (book.lastFocus && document.contains(book.lastFocus)) {
        book.lastFocus.focus({ preventScroll: true });
    }
}

function setupBook() {
    if (!els.infoButton || !els.bookOverlay) return;

    els.infoButton.addEventListener('click', openBook);
    $('book-close')?.addEventListener('click', closeBook);
    $('book-prev')?.addEventListener('click', () => showBookPage(book.page - 1));
    $('book-next')?.addEventListener('click', () => showBookPage(book.page + 1));

    els.bookOverlay.addEventListener('click', (event) => {
        if (event.target === els.bookOverlay) closeBook();
    });
}

document.addEventListener('keydown', (event) => {
    const bookOpen = els.bookOverlay?.classList.contains('open') ?? false;

    if (event.key === 'Escape') {
        if (bookOpen) {
            closeBook();
        } else if (els.settingsPanel?.classList.contains('open')) {
            setPanel(false);
            els.settingsButton?.focus();
        }
        return;
    }

    if (!bookOpen) return;

    if (event.key === 'ArrowRight') {
        showBookPage(book.page + 1);
    } else if (event.key === 'ArrowLeft') {
        showBookPage(book.page - 1);
    } else if (event.key === 'Tab') {
        const focusable = [
            ...els.bookOverlay.querySelectorAll('button:not(:disabled)')
        ];

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});



function setupSections() {
    document.querySelectorAll('.section-toggle').forEach((button) => {
        const target = $(button.getAttribute('aria-controls'));
        if (!target) return;

        button.addEventListener('click', () => {
            const open = button.getAttribute('aria-expanded') === 'true';

            button.setAttribute('aria-expanded', String(!open));
            target.classList.toggle('closed', open);
        });
    });
}

function setupCards() {
    document.querySelectorAll('.card-head').forEach((head) => {
        const card = head.closest('.project-card');
        const details = $(head.getAttribute('aria-controls'));

        if (!card || !details) return;

        const toggle = () => {
            const open = head.getAttribute('aria-expanded') === 'true';

            head.setAttribute('aria-expanded', String(!open));
            card.classList.toggle('open', !open);
            details.classList.toggle('closed', open);
        };

        head.addEventListener('click', toggle);

        head.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle();
            }
        });
    });
}

/* =========================================================
   MUSIKPLAYER
========================================================= */

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const rest = String(Math.floor(seconds % 60)).padStart(2, '0');

    return `${minutes}:${rest}`;
}

function updateRange(element) {
    if (!element) return;

    const min = Number(element.min) || 0;
    const max = Number(element.max) || 100;
    const range = max - min;

    if (range <= 0) return;

    const value = Math.min(max, Math.max(min, Number(element.value) || 0));
    const percent = ((value - min) / range) * 100;

    element.style.background =
        `linear-gradient(to right, var(--accent-soft) 0%, ` +
        `var(--accent) ${percent}%, var(--track) ${percent}%, ` +
        `var(--track) 100%)`;
}

function loadVolume() {
    const saved = readStorage('tommy-volume');
    const volume = Number(saved);

    if (
        saved === null ||
        !Number.isFinite(volume) ||
        volume < 0 ||
        volume > 1
    ) {
        return music.defaultVolume;
    }

    return volume;
}

function saveVolume(volume) {
    writeStorage('tommy-volume', String(volume));
}

function updatePlayButton() {
    if (!els.audio || !els.playButton) return;

    const playing = !els.audio.paused;

    els.playButton.classList.toggle('playing', playing);
    els.playButton.setAttribute('aria-label', playing ? t('pause') : t('play'));
}

function updateVolumeButton() {
    if (!els.audio || !els.volumeButton) return;

    const muted = els.audio.muted || els.audio.volume === 0;

    els.volumeButton.classList.toggle('muted', muted);
    els.volumeButton.setAttribute('aria-label', muted ? t('muteOff') : t('muteOn'));
}

function togglePlay() {
    if (!els.audio) return;

    if (els.audio.paused) {
        setupAnalyser();

        els.audio.play().catch((error) => {
            console.warn('Audio konnte nicht gestartet werden:', error);
        });
    } else {
        els.audio.pause();
    }
}

function toggleMute() {
    if (!els.audio || !els.volume) return;

    if (els.audio.muted || els.audio.volume === 0) {
        const restored = lastVolume > 0 ? lastVolume : music.defaultVolume;

        els.audio.muted = false;
        els.audio.volume = restored;
        els.volume.value = restored;
        updateRange(els.volume);
    } else {
        lastVolume = els.audio.volume;
        els.audio.muted = true;
    }

    updateVolumeButton();
}

function changeVolume() {
    if (!els.audio || !els.volume) return;

    const value = Number(els.volume.value);

    els.audio.volume = value;
    els.audio.muted = false;
    lastVolume = value;

    saveVolume(value);
    updateRange(els.volume);
    updateVolumeButton();
}

function seek() {
    if (!els.audio || !els.seek || !Number.isFinite(els.audio.duration)) return;

    els.audio.currentTime =
        (Number(els.seek.value) / 100) * els.audio.duration;

    updateRange(els.seek);
}

function updateProgress() {
    if (!els.audio || !els.seek || !Number.isFinite(els.audio.duration)) return;

    els.seek.value = (els.audio.currentTime / els.audio.duration) * 100;

    if (els.currentTime) {
        els.currentTime.textContent = formatTime(els.audio.currentTime);
    }

    updateRange(els.seek);
}

/* =========================================================
   MUSIKREAKTIVER HINTERGRUND
========================================================= */

const ENABLE_VISUALIZER = true;
let reducedMotion = !motionOn || reducedMotionQuery.matches;

const backgroundEl = document.querySelector('.background');

let audioContext = null;
let analyser = null;
let freqData = null;
let audioSource = null;
let rafId = null;

let bass = 0;
let mid = 0;
let lastBass = -1;
let lastMid = -1;
let lastFrame = 0;
let startedAt = 0;
let slowFrames = 0;
let visualizerOff = !ENABLE_VISUALIZER || reducedMotion;

function setupAnalyser() {
    if (
        visualizerOff ||
        !backgroundEl ||
        !els.audio ||
        document.hidden
    ) {
        return;
    }

    if (!audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        try {
            audioContext = new AudioCtx();
            audioSource = audioContext.createMediaElementSource(els.audio);

            analyser = audioContext.createAnalyser();
            analyser.fftSize = 128;
            analyser.smoothingTimeConstant = 0.8;

            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);

            freqData = new Uint8Array(analyser.frequencyBinCount);
        } catch (error) {
            console.warn('Audio-Analyse nicht verfügbar:', error);
            audioContext = null;
            analyser = null;
            audioSource = null;
            visualizerOff = true;
            return;
        }
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
    }
}

function average(data, from, to) {
    if (!data || from > to) return 0;

    let sum = 0;
    let count = 0;

    for (let i = from; i <= to && i < data.length; i++) {
        sum += data[i];
        count++;
    }

    return count ? sum / count / 255 : 0;
}

function setLevels(bassValue, midValue) {
    if (!backgroundEl) return;

    if (Math.abs(bassValue - lastBass) > 0.015) {
        backgroundEl.style.setProperty('--bass', bassValue.toFixed(2));
        lastBass = bassValue;
    }

    if (Math.abs(midValue - lastMid) > 0.015) {
        backgroundEl.style.setProperty('--mid', midValue.toFixed(2));
        lastMid = midValue;
    }
}

function stopVisualizer() {
    if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
}

function checkPerformance(now) {
    if (!startedAt) startedAt = now;

    if (lastFrame && now - startedAt > 2000) {
        const delta = now - lastFrame;

        slowFrames = delta > 40
            ? slowFrames + 1
            : Math.max(0, slowFrames - 1);

        if (slowFrames > 45) {
            visualizerOff = true;
            stopVisualizer();

            bass = 0;
            mid = 0;
            lastBass = -1;
            lastMid = -1;
            setLevels(0, 0);

            console.info('Farbanimation wegen niedriger FPS ausgeschaltet.');
            return false;
        }
    }

    lastFrame = now;
    return true;
}

function visualize(now) {
    rafId = null;

    if (
        visualizerOff ||
        document.hidden ||
        !els.audio ||
        !backgroundEl
    ) {
        return;
    }

    if (!checkPerformance(now)) return;

    let targetBass = 0;
    let targetMid = 0;

    if (analyser && !els.audio.paused && freqData) {
        analyser.getByteFrequencyData(freqData);

        const rawBass = average(freqData, 0, 1);
        const rawMid = average(freqData, 2, 8);

        targetBass = Math.min(1, Math.max(0, (rawBass - 0.35) / 0.55));
        targetMid = Math.min(1, Math.max(0, (rawMid - 0.25) / 0.55));
    }

    bass = targetBass > bass ? targetBass : bass * 0.88;
    mid = targetMid > mid ? targetMid : mid * 0.9;

    setLevels(bass, mid);

    if (els.audio.paused && bass < 0.01 && mid < 0.01) {
        setLevels(0, 0);
        return;
    }

    rafId = requestAnimationFrame(visualize);
}

function startVisualizer() {
    if (
        visualizerOff ||
        rafId !== null ||
        !analyser ||
        document.hidden
    ) {
        return;
    }

    lastFrame = 0;
    startedAt = 0;
    rafId = requestAnimationFrame(visualize);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopVisualizer();
        return;
    }

    if (els.audio && !els.audio.paused) {
        setupAnalyser();
        startVisualizer();
    }
});

reducedMotionQuery.addEventListener?.('change', (event) => {
    // Eine explizite Auswahl des Benutzers bleibt erhalten.
    if (readStorage('tommy-motion') !== null) return;

    motionOn = !event.matches;
    reducedMotion = event.matches;
    visualizerOff = !ENABLE_VISUALIZER || reducedMotion;

    root.classList.toggle('no-motion', !motionOn);
    root.classList.toggle('motion-on', motionOn);

    if (visualizerOff) {
        stopVisualizer();
        setLevels(0, 0);
    } else if (els.audio && !els.audio.paused) {
        setupAnalyser();
        startVisualizer();
    }
});

/* =========================================================
   AUDIO INITIALISIEREN
========================================================= */

function initAudio() {
    // Musik ist vorerst deaktiviert und wird nicht initialisiert.
}

/* =========================================================
   SEITENSTART UND EINTRITT
========================================================= */

function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
    });
}

function keepTopWhileLocked() {
    if (
        document.body.classList.contains('locked') &&
        window.scrollY !== 0
    ) {
        scrollToTop();
    }
}

function enterWebsite() {
    document.body.classList.remove('locked');

    scrollToTop();

    if (els.welcomeScreen) {
        els.welcomeScreen.classList.add('hidden');
        els.welcomeScreen.setAttribute('aria-hidden', 'true');
    }
    // Kein automatischer Musikstart. Der Musikplayer ist vorerst entfernt.
}

function init() {
    document.body.classList.add('locked');

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    scrollToTop();

    window.addEventListener('load', keepTopWhileLocked);
    window.addEventListener('scroll', keepTopWhileLocked, { passive: true });

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    // Einstellungen zuerst anwenden, damit die Seite direkt richtig erscheint.
    applyTheme('dark');
    setAccent(accentPref);
    setStyle('aurora');
    setCompact(compactOn);
    setProfile(profileOn);
    setBackground('grid');
    setLayout('tiles');
    setFx(fxOn);

    root.classList.toggle('no-motion', !motionOn);
    root.classList.toggle('motion-on', motionOn);

    applyLanguage('de');
    setupSettings();
    setupBook();
    setupSections();
    setupCards();

    if (els.enterButton) {
        els.enterButton.addEventListener('click', enterWebsite, { once: true });
    }

  
    window.addEventListener('pagehide', () => {
        stopVisualizer();

        if (audioContext && audioContext.state !== 'closed') {
            audioContext.suspend().catch(() => {});
        }

        clearTimeout(langTimer);
        clearTimeout(themeTimer);
    }, { once: true });
}

init();
