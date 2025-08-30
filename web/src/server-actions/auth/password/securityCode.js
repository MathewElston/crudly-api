import crypto from "crypto";
import db from "@/lib/database/db";

export function createSecurityCode() {
  const min = 100000;
  const max = 999999;
  return crypto.randomInt(min, max).toString();
}

export async function setSecurityToken(userId, token) {
  const results = await db.execute(
    `
    UPDATE Users_Credentials
    SET password_reset_token = ?,
        password_reset_expires = NOW() + INTERVAL 10 MINUTE
    WHERE user_id = ?
    `,
    [token, userId]
  );
  return results;
}
