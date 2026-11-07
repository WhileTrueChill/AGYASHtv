module.exports = function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const config = {
    apiKey: String(process.env.FIREBASE_API_KEY || "").trim(),
    authDomain: String(process.env.FIREBASE_AUTH_DOMAIN || "").trim(),
    projectId: String(process.env.FIREBASE_PROJECT_ID || "").trim(),
    appId: String(process.env.FIREBASE_APP_ID || "").trim(),
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    return res.status(503).json({
      error: "Google sign-in is not configured. Add FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, and FIREBASE_APP_ID to Vercel Environment Variables, then redeploy.",
      missing,
    });
  }

  return res.status(200).json(config);
};
