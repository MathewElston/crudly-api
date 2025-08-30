"use server";
import { Resend } from "resend";
export default async function sendEmail({
  from = "delivered@resend.dev",
  to = "mathewdev1337@gmail.com",
  subject = "Test Email",
  templateComponent,
}) {
  const resend = new Resend(process.env.RESENT_API_KEY);
  const { data } = await resend.emails.send({
    from: from,
    to: to,
    subject: subject,
    react: templateComponent,
  });

  console.log(data);
}
