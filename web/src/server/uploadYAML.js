"use server";
import db from "@/lib/database/db";
import yaml from "js-yaml";
// Assume the fileData is in text/string
export async function uploadYAML(fileData, userProjectId) {
  try {
    const object = yaml.load(fileData);

    const jsonString = JSON.stringify(object);

    await db.execute(
      "UPDATE User_Projects SET schema_definition=? WHERE id=?",
      [jsonString, userProjectId]
    );
    console.log(jsonString);

    return { success: true };
  } catch (error) {
    console.error("YAML Upload Error:", error);
    return { success: false, error: error.message };
  }
}
