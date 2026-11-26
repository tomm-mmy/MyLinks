<!DOCTYPE html>
<html lang="de" data-theme="dark" data-accent="blue">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0a0d16"><meta name="description" content="Tommy – persönliches Dashboard, Projekte und Gaming.">
  <title>MyLinks – Dashboard</title>
  <script>(function(){var r=document.documentElement,g=function(k){try{return localStorage.getItem('tl-'+k)}catch(e){return null}};r.setAttribute('lang',g('lang')==='en'?'en':'de');r.setAttribute('data-accent',['blue','violet','pink','green','orange'].includes(g('accent'))?g('accent'):'blue');r.setAttribute('data-theme',g('theme')==='light'?'light':'dark')})();</script>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css"><link rel="stylesheet" href="lanyard.css"><link rel="stylesheet" href="friends/friends.css"><link rel="stylesheet" href="dashboard.css">
</head>
<body>
  <div class="ambient ambient-a"></div><div class="ambient ambient-b"></div>
  <div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <a class="brand" href="#overview"><span class="brand-mark">M</span><span class="brand-copy"><strong>MyLinks</strong><small>PERSONAL SPACE</small></span></a>
      <div class="side-label" data-i18n="workspace">WORKSPACE</div>
      <nav class="side-nav" aria-label="Main navigation">
        <a class="nav-link active" href="#overview" data-nav="overview"><i data-lucide="layout-dashboard"></i><span data-i18n="overview">Übersicht</span></a>
        <a class="nav-link" href="#profile" data-nav="profile"><i data-lucide="user-round"></i><span data-i18n="profile">Profil</span></a>
        <div class="side-label nav-group-label" data-i18n="areas">BEREICHE</div>
        <a class="nav-link" href="#page-projects" data-nav="projects"><i data-lucide="layers-3"></i><span data-i18n="secProjects">Meine Projekte</span></a>
        <a class="nav-link" href="#page-gaming" data-nav="gaming"><i data-lucide="gamepad-2"></i><span data-i18n="secGaming">Gaming</span></a>
        <a class="nav-link" href="#page-hosting" data-nav="hosting"><i data-lucide="server"></i><span data-i18n="secHosting">Hosting</span></a>
        <a class="nav-link" href="#page-bots" data-nav="bots"><i data-lucide="bot"></i><span data-i18n="secBots">Meine Bots</span></a>
        <a class="nav-link" href="#page-skills" data-nav="skills"><i data-lucide="code-2"></i><span data-i18n="secSkills">Was ich mache</span></a>
        <a class="nav-link" href="#friends-section" data-nav="friends"><i data-lucide="users-round"></i><span data-friends-i18n="title">Freunde</span></a>
      </nav>
      <div class="sidebar-bottom">
        <div class="sidebar-note"><span class="note-icon"><i data-lucide="sparkles"></i></span><div><strong data-i18n="sideNoteTitle">Ein Ort für alles</strong><small data-i18n="sideNoteText">Projekte, Interessen und Links.</small></div></div>
        <button class="nav-link settings-trigger" id="settings-button" type="button" aria-expanded="false" aria-controls="settings-panel"><i data-lucide="settings-2"></i><span data-i18n="settings">Einstellungen</span></button>
        <div class="settings-panel" id="settings-panel" role="dialog" aria-hidden="true">
          <h3 data-i18n="settings">Einstellungen</h3>
          <div class="setting-row"><span data-i18n="language">Sprache</span><div class="seg"><button class="seg-btn" data-lang-opt="de" type="button">DE</button><button class="seg-btn" data-lang-opt="en" type="button">EN</button></div></div>
          <div class="setting-row"><span data-i18n="theme">Darstellung</span><div class="seg"><button class="seg-btn" data-theme-opt="dark" type="button" data-i18n="dark">Dunkel</button><button class="seg-btn" data-theme-opt="light" type="button" data-i18n="light">Hell</button></div></div>
          <div class="setting-row accent-row"><span data-i18n="accent">Akzentfarbe</span><div class="swatches"><button class="swatch" data-accent-opt="blue" style="--sw:#6c8cff" aria-label="Blue"></button><button class="swatch" data-accent-opt="violet" style="--sw:#a78bfa" aria-label="Violet"></button><button class="swatch" data-accent-opt="pink" style="--sw:#f472b6" aria-label="Pink"></button><button class="swatch" data-accent-opt="green" style="--sw:#34d399" aria-label="Green"></button><button class="swatch" data-accent-opt="orange" style="--sw:#fb923c" aria-label="Orange"></button></div></div>
        </div>
      </div>
    </aside>
    <main class="main-area">
      <header class="topbar"><div class="topbar-left"><button class="mobile-menu" id="mobile-menu" aria-label="Open menu"><i data-lucide="menu"></i></button><div><div class="eyebrow" data-i18n="topEyebrow">PERSÖNLICHER BEREICH</div><div class="top-title" data-i18n="topTitle">Mein Dashboard</div></div></div><div class="topbar-right"><span class="local-badge"><span></span><span data-i18n="localSettings">Lokal gespeichert</span></span><button class="top-icon" id="info-button" type="button" aria-label="Info"><i data-lucide="info"></i></button></div></header>
      <div class="content-wrap">
        <section class="welcome-panel" id="overview">
          <div class="welcome-copy"><span class="eyebrow" data-i18n="welcomeEyebrow">WILLKOMMEN ZURÜCK</span><h1><span data-i18n="hello">Hey, ich bin</span> <em>Tommy.</em></h1><p data-i18n="welcomeDashboard">Hier findest du meine Projekte, Interessen und alles, woran ich gerade arbeite.</p><a class="primary-action" href="#page-projects"><span data-i18n="exploreProjects">Projekte entdecken</span><i data-lucide="arrow-up-right"></i></a></div>
          <div class="welcome-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit-core"><i data-lucide="command"></i></div><span class="orbit-dot dot-one"></span><span class="orbit-dot dot-two"></span><span class="orbit-dot dot-three"></span></div>
        </section>
        <section class="overview-grid" aria-label="Quick overview">
          <a class="overview-tile" href="#page-projects"><span class="tile-icon purple"><i data-lucide="layers-3"></i></span><span><strong>Projects</strong><small data-i18n="tileProjects">Eigene und gemeinsame Projekte</small></span><i class="tile-arrow" data-lucide="arrow-up-right"></i></a>
          <a class="overview-tile" href="#page-gaming"><span class="tile-icon blue"><i data-lucide="gamepad-2"></i></span><span><strong>Gaming</strong><small data-i18n="tileGaming">Communities und Spiele</small></span><i class="tile-arrow" data-lucide="arrow-up-right"></i></a>
          <a class="overview-tile" href="#page-hosting"><span class="tile-icon green"><i data-lucide="server"></i></span><span><strong>Hosting</strong><small data-i18n="tileHosting">Meine Hosting-Umgebung</small></span><i class="tile-arrow" data-lucide="arrow-up-right"></i></a>
        </section>
        <section class="profile-panel" id="profile">
          <div class="panel-heading"><div><span class="eyebrow" data-i18n="profileEyebrow">DAS BIN ICH</span><h2 data-i18n="profile">Profil</h2></div><span class="panel-index">01 / PROFILE</span></div>
          <div class="profile-layout"><div class="profile-avatar-wrap"><div class="profile-avatar">T</div><span class="online-dot" id="online-dot"></span></div><div class="profile-main"><div class="profile-name-row"><div><h3>Tommy</h3><div class="profile-subtitle" data-i18n="profileSubtitle">Developer · Gaming · Communities</div></div><a class="discord-link" href="https://discord.com/users/881206091009122406" target="_blank" rel="noopener noreferrer"><i data-lucide="message-circle"></i><span>Discord</span><i data-lucide="arrow-up-right"></i></a></div><div class="presence" id="presence" hidden><span class="presence-dot"></span><span id="presence-status"></span></div><div class="presence-activity" id="presence-activity" hidden><i data-lucide="gamepad-2" class="act-icon act-game"></i><i data-lucide="headphones" class="act-icon act-spotify"></i><i data-lucide="message-square-text" class="act-icon act-custom"></i><span id="presence-activity-text"></span></div><p class="profile-bio" data-i18n="bio">Ich entwickle Discord-Bots, beschäftige mich mit JavaScript und bin gerne in Gaming-Communities unterwegs. Außerdem arbeite ich an eigenen digitalen Projekten.</p><div class="profile-tags"><span>JavaScript</span><span>Discord</span><span>Gaming</span><span>Web Projects</span></div></div></div>
        </section>
        <section class="section friends-section reveal" id="friends-section"><div class="section-heading"><div><span class="eyebrow" data-i18n="communityEyebrow">MEIN UMFELD</span><h2><span data-friends-i18n="title">Freunde</span></h2></div><span class="panel-index">COMMUNITY</span></div><div id="friends-grid" class="friends-grid" aria-live="polite"><div class="friends-loading" data-friends-i18n="loading">Freunde werden geladen …</div></div></section>
        <div id="sections"></div>
        <footer class="dashboard-footer"><span>© 2026 Tommy · MyLinks</span><span data-i18n="footer">Mit Code und Kaffee gemacht.</span></footer>
      </div>
    </main>
  </div>
  <div class="info-overlay" id="info-overlay" aria-hidden="true"><div class="info-box" role="dialog" aria-modal="true"><button class="info-close" id="info-close" aria-label="Close"><i data-lucide="x"></i></button><span class="eyebrow">MYLINKS</span><h2 data-i18n="infoTitle">Über MyLinks</h2><p data-i18n="info1">Meine Projekte, Communities und Links an einem Ort.</p><p data-i18n="info3">Deine Einstellungen werden nur lokal in deinem Browser gespeichert.</p></div></div>
  <script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script><script src="index.js"></script><script src="lanyard.js"></script><script src="friends/config.js"></script><script src="friends/friends.js"></script>
</body></html>
