import crypto from "crypto";

class ApiService {
  constructor(db) {
    this.db = db;
  }

  async createApiKey(userId) {
    const apiKey = crypto.randomBytes(32).toString("hex");
    const [results] = await this.db.execute(
      `INSERT INTO User_API_Key (
        user_id,
        api_key,
        is_active,
        call_count,
        call_per_min,
        last_used_at,
        reset_date
        )
        VALUES (?,?,?,?,?,NOW(),NOW() + INTERVAL 30 DAY)`,
      [userId, apiKey, 1, 0, 0]
    );
    return {
      id: results.insertId,
      apiKey: apiKey,
      userId,
    };
  }

  async resetApiKey(userId) {
    const apiKey = crypto.randomBytes(32).toString("hex");

    const [results] = await this.db.execute(
      ` UPDATE User_API_Key
        SET api_key = ?
        WHERE user_id = ?
      `,
      [apiKey, userId]
    );
    return {
      success: results.affectedRows > 0,
      apiKey,
    };
  }

  async getApiKey(userId) {
    const [results] = await this.db.execute(
      ` SELECT api_key
        FROM User_API_Key
        WHERE user_id = ?
      `,
      [userId]
    );

    if (results.length === 0) {
      return { apiKey: null };
    }
    const apiKey = results[0].api_key;

    return { apiKey: apiKey };
  }
}

export default ApiService;
