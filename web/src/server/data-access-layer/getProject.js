import "server-only";
import { verifySession } from "../auth/token/session";
import db from "@/lib/database/db";

export async function getProjects() {
  const session = await verifySession();

  if (!session) {
    return null;
  }

  try {
    const [results] = await db.execute(
      ` SELECT id, project_name
        FROM User_Projects
        WHERE user_id = ? `,
      [session.userId]
    );

    const project = results;

    console.log(project);

    return project;
  } catch (error) {
    console.error(`Failed to fetch user: ${error.message}`);
    return null;
  }
}
