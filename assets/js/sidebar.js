'use strict';

(() => {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const openBtn = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('sidebar-close');
  const settingsBtn = document.getElementById('settings-button');
  const settingsPanel = document.getElementById('settings-panel');

  function setDrawer(open) {
    if (!sidebar || !backdrop) return;
    sidebar.classList.toggle('open', open);
    backdrop.hidden = !open;
  }

  function setSettings(open) {
    if (!settingsPanel || !settingsBtn) return;
    settingsPanel.classList.toggle('open', open);
    settingsPanel.setAttribute('aria-hidden', String(!open));
    settingsBtn.setAttribute('aria-expanded', String(open));
  }

  openBtn?.addEventListener('click', () => setDrawer(true));
  closeBtn?.addEventListener('click', () => setDrawer(false));
  backdrop?.addEventListener('click', () => setDrawer(false));

  settingsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const next = !settingsPanel.classList.contains('open');
    setSettings(next);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#settings-panel') && !e.target.closest('#settings-button')) {
      setSettings(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setDrawer(false);
      setSettings(false);
    }
  });

  document.querySelectorAll('.nav-item[data-nav]').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-item[data-nav]').forEach((el) => el.classList.remove('active'));
      link.classList.add('active');
      setDrawer(false);
    });
  });
})();
