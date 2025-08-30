"use server";

import PasswordResetTemplate from "@/components/email/PasswordResetTemplate";
import sendEmail from "@/server-actions/email/sendEmail";
import { createSecurityCode, setSecurityToken } from "./securityCode";
import { hashSecurityCode } from "./hashes";
export async function resetPassword(data) {
  console.log("Server-side psasword reset with: ", data);
  return true;
}

export async function sendPasswordReset(userId) {
  const securityCode = createSecurityCode();
  const hashCode = await hashSecurityCode(securityCode);
  const results = await setSecurityToken(userId, hashCode);

  if (results[0].affectedRows == 1)
    sendEmail({
      templateComponent: PasswordResetTemplate({
        firstName: "Mathew",
        securityCode: securityCode,
      }),
    });
  return true;
}
