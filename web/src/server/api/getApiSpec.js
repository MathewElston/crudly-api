"use server";
import db from "@/lib/database/db";
export async function getApiSpec(userId, projectName) {
  const [results, fields] = await db.execute(
    "SELECT schema_definition FROM User_Projects WHERE user_id = ? and project_name = ?",
    [userId, projectName]
  );
  const spec = results[0].schema_definition;

  return spec;
}
