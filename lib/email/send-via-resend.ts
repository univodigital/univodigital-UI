import { Resend } from "resend";

import type { ContactFormValues } from "@/schemas/contact";

import type { ResolvedEmailConfig } from "./config";
import {
  buildConfirmationEmail,
  buildTeamNotificationEmail,
} from "./templates";

export async function sendContactEmailsViaResend(
  config: ResolvedEmailConfig,
  values: ContactFormValues,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Resend API key is not configured.");
  }

  const client = new Resend(apiKey);
  const teamEmail = buildTeamNotificationEmail(values);
  const confirmationEmail = buildConfirmationEmail(values.name);

  const [teamResult, confirmationResult] = await Promise.all([
    client.emails.send({
      from: config.from,
      to: config.notificationTo,
      replyTo: values.email,
      subject: teamEmail.subject,
      html: teamEmail.html,
      text: teamEmail.text,
    }),
    client.emails.send({
      from: config.from,
      to: values.email,
      replyTo: config.notificationTo,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
      text: confirmationEmail.text,
    }),
  ]);

  if (teamResult.error) {
    throw new Error(teamResult.error.message);
  }

  if (confirmationResult.error) {
    throw new Error(confirmationResult.error.message);
  }
}
