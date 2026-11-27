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
      error: 'Presence API is not configured',
      missingUrl: !upstream,
      missingKey: !apiKey
    });
  }

  let targetUrl;
  try {
    targetUrl = new URL(upstream);
    if (!['http:', 'https:'].includes(targetUrl.protocol)) {
      return res.status(400).json({ error: 'MYLINK_API_URL must start with http:// or https://' });
    }
  } catch {
    return res.status(400).json({ error: 'Invalid MYLINK_API_URL format' });
  }

  try {
    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json'
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000)
    });

    const rawText = await response.text();

    if (!response.ok) {
      return res.status(502).json({
        error: 'Upstream bot API rejected request',
        upstreamStatus: response.status
      });
    }

    JSON.parse(rawText);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).send(rawText);
  } catch (err) {
    return res.status(502).json({
      error: 'Could not reach bot presence endpoint',
      reason: err?.name === 'TimeoutError' ? 'timeout' : 'network_error'
    });
  }
}
