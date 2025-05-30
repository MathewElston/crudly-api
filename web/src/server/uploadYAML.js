"use server";
import db from "@/lib/enforcer/database/db";
import yaml from "js-yaml";
// Assume the fileData is in text/string
export async function uploadYAML(fileData) {
  const object = yaml.load(fileData);
  console.log("DB user:", process.env.MYSQL_USER);

  const jsonString = JSON.stringify(object);

  const [results, fields] = await db.execute(
    "UPDATE User_Projects SET schema_definition=? WHERE id=?",
    [jsonString, 1]
  );
  console.log(results);

  return { success: true };
}
