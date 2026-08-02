import nodemailer from "nodemailer";

import type { ContactFormValues } from "@/schemas/contact";

import type { ResolvedEmailConfig } from "./config";
import {
  buildConfirmationEmail,
  buildTeamNotificationEmail,
} from "./templates";

function createGmailTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("Gmail credentials are not configured.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendContactEmailsViaGmail(
  config: ResolvedEmailConfig,
  values: ContactFormValues,
): Promise<void> {
  const transporter = createGmailTransport();
  const teamEmail = buildTeamNotificationEmail(values);
  const confirmationEmail = buildConfirmationEmail(values.name);

  await transporter.sendMail({
    from: config.from,
    to: config.notificationTo,
    replyTo: values.email,
    subject: teamEmail.subject,
    html: teamEmail.html,
    text: teamEmail.text,
  });

  await transporter.sendMail({
    from: config.from,
    to: values.email,
    replyTo: config.notificationTo,
    subject: confirmationEmail.subject,
    html: confirmationEmail.html,
    text: confirmationEmail.text,
  });
}
