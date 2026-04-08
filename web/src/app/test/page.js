import ProjectDropdown from "@/components/ProjectDropdown";

import { Box } from "@mui/material";

import { getUser } from "@/server-actions/data-access-layer/getUser";
import { createApiKey } from "@/server-actions/api/apiServerActions";
import sendEmail from "@/server-actions/email/sendEmail";
import WelcomeTemplate from "@/components/email/Welcome";
import getEmail from "@/server-actions/data-access-layer/getEmail";
import {
  createSecurityCode,
  setSecurityToken,
} from "@/server-actions/auth/password/securityCode";
import { hashSecurityCode } from "@/server-actions/auth/password/hashes";
import { sendPasswordReset } from "@/server-actions/auth/password/resetPassword";
import FormCard from "@/components/FormCard";

export default async function TestPage() {
  const projects = [
    { name: "Project 1", id: 1 },
    { name: "Project 2", id: 2 },
    { name: "Project 3", id: 3 },
  ];
  const { id, username, email } = await getUser();
  const testUserId = 3;

  // const securityCode = createSecurityCode();
  // const hashCode = await hashSecurityCode(securityCode);
  // const results = await setSecurityToken(testUserId, hashCode);
  //console.log(results);

  // bind a function to send additional parameters if the server action needs other params sent.
  // const sendEmail = await sendEmail.bind(null, {});
  //const sendPasswordReset = await sendEmail.bind(null, {});
  const emailPasswordReset = await sendPasswordReset.bind(null, testUserId);
  return (
    <div>
      <form action={emailPasswordReset}>
        <button type="submit">Send Email</button>
        <button> The test button</button>
      </form>

      <FormCard />
    </div>
  );
}
