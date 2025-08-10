import "server-only";
import db from "@/lib/database/db";

export async function getProjects(userId) {
  try {
    const [results] = await db.execute(
      ` SELECT id, project_name as projectName
        FROM User_Projects
        WHERE user_id = ? `,
      [userId]
    );

    return results;

  } catch (error) {
    console.error(`Failed to fetch user: ${error.message}`);
    return results;
  }
}
