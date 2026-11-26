export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const upstream = process.env.MYLINK_API_URL;
  const apiKey = process.env.MYLINK_API_KEY;

  if (!upstream || !apiKey) {
    return res.status(503).json({
      error: 'Presence API is not configured',
      hint: 'Set MYLINK_API_URL and MYLINK_API_KEY in Vercel'
    });
  }

  let targetUrl;
  try {
    targetUrl = new URL(upstream);
    if (targetUrl.protocol !== 'https:' && targetUrl.protocol !== 'http:') {
      return res.status(500).json({ error: 'Invalid MYLINK_API_URL protocol' });
    }
  } catch {
    return res.status(500).json({ error: 'Invalid MYLINK_API_URL' });
  }

  try {
    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json'
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(7000)
    });

    const rawBody = await response.text();
    if (!response.ok) {
      return res.status(502).json({ error: 'Upstream presence API returned an error' });
    }

    JSON.parse(rawBody);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).send(rawBody);
  } catch {
    return res.status(502).json({ error: 'Could not reach Mylink presence API' });
  }
}
