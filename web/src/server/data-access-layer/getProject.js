import "server-only";
import { verifySession } from "../auth/token/session";
import db from "@/lib/database/db";

export async function getProject() {
  const session = await verifySession();

  if (!session) {
    return null;
  }

  try {
    const [results] = await db.execute(
      ` SELECT project_name,
        FROM User_Projects
        WHERE id = ? `,
      [session.userId]
    );

    const project = results[0];

    return project;
  } catch (error) {
    console.error(`Failed to fetch user: ${error.message}`);
    return null;
  }
}
