"use server";
import db from "@/lib/database/db";
import yaml from "js-yaml";
// Assume the fileData is in text/string
export async function parseYAML(fileData, userProjectId) {
  try {
    const object = yaml.load(fileData);

    const parsedYAML = JSON.stringify(object);


    return {success: true, parsedSchema:parsedYAML};
  } catch (error) {
    console.error("YAML Upload Error:", error);
    return { success: false, error: error.message };
  }
}
