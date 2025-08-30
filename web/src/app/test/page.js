import ProjectDropdown from "@/components/ProjectDropdown";

import { Box } from "@mui/material";

import { getUser } from "@/server-actions/data-access-layer/getUser";
import { createApiKey } from "@/server-actions/api/apiServerActions";
import sendEmail from "@/server-actions/email/sendEmail";
import WelcomeTemplate from "@/components/email/Welcome";
import getEmail from "@/server-actions/data-access-layer/getEmail";

export default async function TestPage() {
  const projects = [
    { name: "Project 1", id: 1 },
    { name: "Project 2", id: 2 },
    { name: "Project 3", id: 3 },
  ];
  const { id, username, email } = await getUser();

  console.log(email);

  // bind a function to send additional parameters if the server action needs other params sent.
 // const sendEmail = await sendEmail.bind(null, {});
  //const sendPasswordReset = await sendEmail.bind(null, {});
  return (
    <form action={sendEmail}>
      <button type="submit">Send Email</button>
      <button> The test button</button>
    </form>
  );
}
