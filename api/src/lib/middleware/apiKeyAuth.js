import db from "../database/db.js";

export async function apiKeyAuth(req, res, next) {
  try {
    console.log("API Middleware");
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API Key Missing",
      });
    }
    // increment API count
    const [results] = await db.execute(
      ` SELECT user_id 
        FROM User_API_Key 
        WHERE api_key = ? and is_active = 1
        `,
      [apiKey]
    );

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid API Key",
        data: null,
      });
    }

    await db.execute(
      `UPDATE User_API_Key 
       SET call_count = call_count + 1, last_used_at = NOW() 
       WHERE api_key = ?`,
      [apiKey]
    );

    req.userId = results[0].user_id;

    next();
  } catch (error) {
    console.error("API Key Auth error: ", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
}
