import "server-only";
import { verifySession } from "../auth/token/session";
import db from "@/lib/database/db";

export async function getProjects(userId) {
  try {
    const [results] = await db.execute(
      ` SELECT id, project_name
        FROM User_Projects
        WHERE user_id = ? `,
      [userId]
    );

    const projects = results;

    console.log(projects);

    return projects;
  } catch (error) {
    console.error(`Failed to fetch user: ${error.message}`);
    return null;
  }
}
