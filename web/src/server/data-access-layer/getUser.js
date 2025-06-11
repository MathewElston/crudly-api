import "server-only";
import { verifySession } from "../auth/token/session";
import db from "@/lib/database/db";

export async function getUser() {
  const session = await verifySession();

  if (!session) {
    return null;
  }

  try {
    const [results] = await db.execute(
      ` SELECT id, username
        FROM Users
        WHERE id = ? `,
      [session.userId]
    );

    const user = results[0];

    return user;
  } catch (error) {
    console.error(`Failed to fetch user: ${error.message}`);
    return null;
  }
}
