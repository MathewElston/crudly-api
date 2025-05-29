export async function POST(req) {
  const formData = await req.formDate();
  const file = formData.get("file");

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  return new Response(JSON.stringify({ message: "Upload Success!" }), {
    status: 200,
    headers: { "Content-Type:": "application/json" },
  });
}
