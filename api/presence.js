export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const upstream = (process.env.MYLINK_API_URL || '').trim();
  const apiKey = (process.env.MYLINK_API_KEY || '').trim();

  if (!upstream || !apiKey) {
    return res.status(503).json({
      ok: false,
      error: 'Presence API is not configured',
      missingUrl: !upstream,
      missingKey: !apiKey
    });
  }

  let targetUrl;
  try {
    targetUrl = new URL(upstream);
    if (!['http:', 'https:'].includes(targetUrl.protocol)) {
      return res.status(400).json({ ok: false, error: 'MYLINK_API_URL must start with http:// or https://' });
    }
  } catch {
    return res.status(400).json({ ok: false, error: 'Invalid MYLINK_API_URL format' });
  }

  const startedAt = Date.now();
  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(targetUrl.toString(), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json',
          'X-Client-Hub': 'MyLinks-GlassHub/5.0'
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(6500)
      });

      const rawText = await response.text();

      if (!response.ok) {
        if (attempt < maxAttempts && response.status >= 500) {
          continue;
        }
        return res.status(502).json({
          ok: false,
          error: 'Upstream bot API rejected request',
          upstreamStatus: response.status,
          latencyMs: Date.now() - startedAt
        });
      }

      const parsed = JSON.parse(rawText);
      const mapData = parsed?.data && typeof parsed.data === 'object' ? parsed.data : parsed;

      if (!mapData || typeof mapData !== 'object' || Array.isArray(mapData)) {
        return res.status(502).json({
          ok: false,
          error: 'Upstream bot returned invalid presence map',
          latencyMs: Date.now() - startedAt
        });
      }

      return res.status(200).json({
        ok: true,
        latencyMs: Date.now() - startedAt,
        fetchedAt: new Date().toISOString(),
        data: mapData
      });
    } catch (err) {
      if (attempt < maxAttempts) {
        continue;
      }
      return res.status(502).json({
        ok: false,
        error: 'Could not reach bot presence endpoint',
        reason: err?.name === 'TimeoutError' ? 'timeout' : 'network_error',
        latencyMs: Date.now() - startedAt
      });
    }
  }
}
