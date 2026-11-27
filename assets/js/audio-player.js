'use strict';

(() => {
  function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '0:00';
    const total = Math.floor(sec);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function initAudioPlayer() {
    const audio = document.getElementById('bg-audio');
    const playBtn = document.getElementById('audio-toggle');
    const muteBtn = document.getElementById('audio-mute');
    const volInput = document.getElementById('audio-volume');
    const progressBar = document.getElementById('audio-progress-bar');
    const progressFill = document.getElementById('audio-progress-fill');
    const timeLabel = document.getElementById('track-time');
    const subLabel = document.getElementById('track-sub');
    const eqBars = document.getElementById('eq-bars');

    if (!audio || !playBtn) return;

    let lastVolume = (Number(volInput?.value) || 35) / 100;
    audio.volume = lastVolume;

    function refreshStatusText() {
      const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
      if (!subLabel) return;
      if (audio.muted || audio.volume === 0) {
        subLabel.textContent = lang === 'en' ? 'Muted' : 'Stumm';
      } else if (!audio.paused) {
        subLabel.textContent = lang === 'en' ? 'Now playing' : 'Läuft gerade';
      } else {
        subLabel.textContent = lang === 'en' ? 'Paused' : 'Pausiert';
      }
    }

    function syncIcons() {
      const playing = !audio.paused;
      playBtn.innerHTML = `<i data-lucide="${playing ? 'pause' : 'play'}"></i>`;

      if (muteBtn) {
        const muted = audio.muted || audio.volume === 0;
        muteBtn.innerHTML = `<i data-lucide="${muted ? 'volume-x' : 'volume-2'}"></i>`;
      }

      if (eqBars) {
        eqBars.classList.toggle('active', playing && !audio.muted && audio.volume > 0);
      }

      window.lucide?.createIcons();
      refreshStatusText();
    }

    function syncProgress() {
      const cur = audio.currentTime || 0;
      const dur = audio.duration || 0;
      const pct = dur > 0 ? Math.min(100, Math.max(0, (cur / dur) * 100)) : 0;

      if (progressFill) {
        progressFill.style.width = `${pct}%`;
      }
      if (progressBar) {
        progressBar.setAttribute('aria-valuenow', String(Math.round(pct)));
      }
      if (timeLabel) {
        timeLabel.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
      }
    }

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
      syncIcons();
    });

    muteBtn?.addEventListener('click', () => {
      if (audio.muted || audio.volume === 0) {
        audio.muted = false;
        audio.volume = lastVolume > 0 ? lastVolume : 0.35;
        if (volInput) volInput.value = String(Math.round(audio.volume * 100));
      } else {
        lastVolume = audio.volume > 0 ? audio.volume : 0.35;
        audio.muted = true;
      }
      syncIcons();
    });

    volInput?.addEventListener('input', () => {
      const val = Number(volInput.value) / 100;
      audio.volume = val;
      audio.muted = val === 0;
      if (val > 0) lastVolume = val;
      syncIcons();
    });

    progressBar?.addEventListener('click', (e) => {
      if (!audio.duration) return;
      const rect = progressBar.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      audio.currentTime = ratio * audio.duration;
      syncProgress();
    });

    audio.addEventListener('loadedmetadata', syncProgress);
    audio.addEventListener('timeupdate', syncProgress);
    audio.addEventListener('play', syncIcons);
    audio.addEventListener('pause', syncIcons);
    audio.addEventListener('volumechange', syncIcons);

    new MutationObserver(refreshStatusText).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });

    syncIcons();
    syncProgress();
  }

  window.MyLinksAudio = {
    init: initAudioPlayer,
    startPlayback: () => {
      const audio = document.getElementById('bg-audio');
      audio?.play().catch(() => {});
    }
  };

  initAudioPlayer();
})();
