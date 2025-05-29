export async function uploadFile(formData) {
  "use server";

  const file = formData.get("file");

  return { success: true };
}
