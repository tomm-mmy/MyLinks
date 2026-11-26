export default async function handler(req, res) {
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

  try {
    const response = await fetch(upstream, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' },
      cache: 'no-store'
    });
    const body = await response.text();
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(response.status).send(body);
  } catch (error) {
    return res.status(502).json({ error: 'Could not reach Mylink presence API' });
  }
}
