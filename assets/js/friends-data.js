'use strict';

(() => {
  const OWNER_ID = '881206091009122406';

  const FRIENDS = [
    {
      id: '1287327628818251843',
      fallbackName: 'JulBa10',
      links: [
        { label: 'YouTube', url: 'https://youtube.com/@julba10?si=RQ2QFl7W07l0iSPz' },
        { label: 'Twitch', url: 'https://www.twitch.tv/julianbala10' },
        { label: 'Roblox', url: 'https://www.roblox.com/de/users/7710897847/profile' }
      ]
    },
    {
      id: '895697786656415775',
      fallbackName: 'AnnaGlocke',
      links: [
        { label: 'YouTube', url: 'https://www.youtube.com/channel/UC74nf0V1Q7jrRPSmY0AlJDg' },
        { label: 'Twitch', url: 'https://www.twitch.tv/annaglocke_yt' }
      ]
    },
    {
      id: '1081597724132134923',
      fallbackName: 'Community · 4923',
      links: [
        { label: 'YouTube', url: 'https://www.youtube.com/channel/UCvvtWlqO0nSGC3gtfaORYIQ' }
      ]
    },
    {
      id: '1079334365588365392',
      fallbackName: 'Community · 5392',
      links: [
        { label: 'YouTube', url: 'https://www.youtube.com/channel/UC5Kt3LfWdviSyXlaDoSKF4w' }
      ]
    },
    {
      id: '1161326264779559092',
      fallbackName: 'Pavyan Systems',
      links: [
        { label: 'Website', url: 'https://pavyan-systems.com/' }
      ]
    },
    {
      id: '1204084190014865439',
      fallbackName: 'Member · 5439',
      links: []
    }
  ];

  function isValidSnowflake(id) {
    return /^\d{17,20}$/.test(String(id || '').trim());
  }

  function getValidatedFriends() {
    const seen = new Set();
    return FRIENDS.filter((item) => {
      const cleanId = String(item?.id || '').trim();
      if (!isValidSnowflake(cleanId) || seen.has(cleanId)) return false;
      seen.add(cleanId);
      return true;
    });
  }

  window.MyLinksFriends = {
    OWNER_ID,
    getFriends: getValidatedFriends,
    isValidSnowflake
  };
})();
