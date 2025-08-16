import "server-only";

import db from "@/lib/database/db";

export default async function getEmail(userId) {
  try {
    const [results] = await db.execute(
      ` SELECT email
        FROM Users
        WHERE id = ? `,
      [userId]
    );

    return results;
  } catch (error) {
    console.error(`Failed to fetch user: ${error.message}`);
    return new Error(error.message);
  }
}
