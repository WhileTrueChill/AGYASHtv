module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Trending content is not configured yet. Add TMDB_API_KEY in Vercel Environment Variables." });
  }

  const kind = req.query && req.query.kind === "tv" ? "tv" : "movie";
  const url = "https://api.themoviedb.org/3/trending/" + kind + "/week?api_key=" + encodeURIComponent(apiKey) + "&language=en-US";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("TMDB returned status", response.status);
      return res.status(502).json({ error: "TMDB could not load trending content." });
    }

    const data = await response.json();
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=3600");
    return res.status(200).json(data);
  } catch (error) {
    console.error("TMDB request failed:", error && error.message);
    return res.status(502).json({ error: "Unable to load trending content." });
  }
};
