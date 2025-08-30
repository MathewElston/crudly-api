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
  // Create a Security Code
  const securityCode = createSecurityCode();
  // Hash the Code
  const hashCode = await hashSecurityCode(securityCode);
  // Store it in the DB
  const results = await setSecurityToken(userId, hashCode);

  if (results[0].affectedRows == 1)
    sendEmail(
      PasswordResetTemplate({ firstName: "Mathew", securityCode: securityCode })
    );
  return true;
}
