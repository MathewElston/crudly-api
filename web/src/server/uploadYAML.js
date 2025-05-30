"use server";
import yaml from "js-yaml";
// Assume the fileData is in text/string
export async function uploadYAML(fileData) {
  const object = yaml.load(fileData);

  console.log(object);
  return { success: true };
}
