import ProjectDropdown from "@/components/ProjectDropdown";

import { Box } from "@mui/material";

import { getUser } from "@/server-actions/data-access-layer/getUser";
import { createApiKey } from "@/server-actions/api/apiServerActions";
import send from "@/server-actions/email/send";

export default async function TestPage() {
  const projects = [
    { name: "Project 1", id: 1 },
    { name: "Project 2", id: 2 },
    { name: "Project 3", id: 3 },
  ];
  const user = await getUser();

  return (
    <form action={send}>
      <button type="submit">Send Email</button>
    </form>
  );
}
