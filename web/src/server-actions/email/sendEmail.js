"use server";

import WelcomeTemplate from "@/components/email/Welcome";
import { Resend } from "resend";
export default async function sendEmail(templateComponent) {
  const resend = new Resend(process.env.RESENT_API_KEY);
  const { data } = await resend.emails.send({
    from: "delivered@resend.dev",
    to: "mathewdev1337@gmail.com",
    subject: "Test Email",
    react: templateComponent,
  });

  console.log(data);
}