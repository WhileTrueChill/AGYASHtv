export default async function handler(req, res) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'TMDB_API_KEY is not configured on Vercel.' });
  }

  const rawPath = Array.isArray(req.query?.path) ? req.query.path[0] : req.query?.path;
  if (!rawPath || !rawPath.startsWith('/')) {
    return res.status(400).json({ error: 'Invalid TMDB path.' });
  }

  // Only allow TMDB API paths, never arbitrary URLs.
  const allowed = /^\/(trending|movie|tv|discover|search|genre|configuration|person)(\/|\?|$)/.test(rawPath);
  if (!allowed) {
    return res.status(400).json({ error: 'TMDB endpoint not allowed.' });
  }

  try {
    const separator = rawPath.includes('?') ? '&' : '?';
    const url = `https://api.themoviedb.org/3${rawPath}${separator}api_key=${encodeURIComponent(apiKey)}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(502).json({ error: 'TMDB request failed.' });
  }
}
