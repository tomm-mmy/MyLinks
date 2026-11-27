'use strict';

(() => {
  const TYPE_THEMES = {
    '3d-print': {
      c1: '#8b5cf6',
      c2: '#38bdf8',
      c3: '#1e1b4b',
      pattern: 'hex'
    },
    'roblox': {
      c1: '#3b82f6',
      c2: '#22d3ee',
      c3: '#0f172a',
      pattern: 'grid'
    },
    'roleplay': {
      c1: '#6366f1',
      c2: '#f472b6',
      c3: '#18182b',
      pattern: 'waves'
    },
    'ets2': {
      c1: '#f59e0b',
      c2: '#fb923c',
      c3: '#1f1608',
      pattern: 'road'
    },
    'hosting': {
      c1: '#10b981',
      c2: '#34d399',
      c3: '#071c15',
      pattern: 'nodes'
    },
    'bots': {
      c1: '#a855f7',
      c2: '#60a5fa',
      c3: '#130e24',
      pattern: 'nodes'
    }
  };

  function hashSeed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
  }

  function buildPatternSvg(pattern, c1, c2, seed) {
    const o1 = 0.14 + (seed % 7) * 0.015;
    const o2 = 0.10 + (seed % 5) * 0.015;

    if (pattern === 'grid') {
      return `
        <defs>
          <pattern id="pat-${seed}" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="${c2}" stroke-opacity="${o2}" stroke-width="1"/>
            <circle cx="0" cy="0" r="1.5" fill="${c1}" fill-opacity="${o1}"/>
          </pattern>
        </defs>
        <rect width="800" height="240" fill="url(#pat-${seed})"/>
      `;
    }

    if (pattern === 'road') {
      return `
        <path d="M 0 190 Q 220 135, 430 165 T 800 110" fill="none" stroke="${c2}" stroke-opacity="${o1 + 0.06}" stroke-width="3" stroke-dasharray="14 10"/>
        <path d="M 0 215 Q 250 165, 460 190 T 800 142" fill="none" stroke="${c1}" stroke-opacity="${o2}" stroke-width="1.5"/>
      `;
    }

    if (pattern === 'waves') {
      return `
        <path d="M0 155 C 180 95, 340 210, 540 145 C 670 105, 740 150, 800 130 L 800 240 L 0 240 Z" fill="${c1}" fill-opacity="${o2}"/>
        <path d="M0 185 C 200 135, 380 225, 600 170 C 700 145, 760 175, 800 160" fill="none" stroke="${c2}" stroke-opacity="${o1 + 0.05}" stroke-width="2"/>
      `;
    }

    if (pattern === 'hex') {
      return `
        <polygon points="620,25 695,68 695,154 620,197 545,154 545,68" fill="none" stroke="${c2}" stroke-opacity="${o1 + 0.06}" stroke-width="2"/>
        <polygon points="715,75 768,105 768,165 715,195 662,165 662,105" fill="none" stroke="${c1}" stroke-opacity="${o1}" stroke-width="1.5"/>
      `;
    }

    // nodes / default
    return `
      <line x1="520" y1="45" x2="660" y2="120" stroke="${c2}" stroke-opacity="${o2 + 0.05}" stroke-width="1.5"/>
      <line x1="660" y1="120" x2="740" y2="65" stroke="${c1}" stroke-opacity="${o2 + 0.05}" stroke-width="1.5"/>
      <circle cx="520" cy="45" r="4" fill="${c2}" fill-opacity="${o1 + 0.1}"/>
      <circle cx="660" cy="120" r="5" fill="${c1}" fill-opacity="${o1 + 0.14}"/>
      <circle cx="740" cy="65" r="3.5" fill="${c2}" fill-opacity="${o1 + 0.1}"/>
    `;
  }

  function generateBannerDataUrl({ kind = 'bots', title = 'Project', subtitle = '' }) {
    const theme = TYPE_THEMES[kind] || TYPE_THEMES.bots;
    const seed = hashSeed(`${kind}:${title}:${subtitle}`);
    const cx1 = 560 + (seed % 140);
    const cy1 = 45 + (seed % 65);
    const cx2 = 180 + (seed % 180);
    const cy2 = 165 + (seed % 45);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 240" width="800" height="240">
      <defs>
        <linearGradient id="bg-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.c3}"/>
          <stop offset="55%" stop-color="#0b0f1d"/>
          <stop offset="100%" stop-color="${theme.c3}"/>
        </linearGradient>
        <radialGradient id="g1-${seed}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${theme.c1}" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="${theme.c1}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g2-${seed}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${theme.c2}" stop-opacity="0.38"/>
          <stop offset="100%" stop-color="${theme.c2}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="240" fill="url(#bg-${seed})"/>
      <circle cx="${cx1}" cy="${cy1}" r="175" fill="url(#g1-${seed})"/>
      <circle cx="${cx2}" cy="${cy2}" r="165" fill="url(#g2-${seed})"/>
      ${buildPatternSvg(theme.pattern, theme.c1, theme.c2, seed)}
    </svg>`;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  window.MyLinksBannerGen = {
    generate: generateBannerDataUrl
  };
})();
