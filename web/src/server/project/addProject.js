"use server";

import db from "@/lib/database/db";

export async function addProject(userId, schema, projectName) {
  try {
    const [result] = await db.execute(
      `INSERT INTO User_Projects 
        (user_id, security_config_id, project_name, schema_definition, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [userId, 1, projectName, schema]
    );

    return { success: true, projectId: result.insertId };
  } catch (error) {
    console.error("Error inserting project:", error);
    return { success: false, error: error.message };
  }
}
