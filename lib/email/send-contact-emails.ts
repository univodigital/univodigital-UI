import type { ContactFormValues } from "@/schemas/contact";

import { EmailNotConfiguredError } from "./errors";
import { resolveEmailConfig } from "./config";
import { sendContactEmailsViaGmail } from "./send-via-gmail";
import { sendContactEmailsViaResend } from "./send-via-resend";

export async function sendContactEmails(
  values: ContactFormValues,
): Promise<void> {
  const config = resolveEmailConfig();

  if (!config) {
    console.error("[contact] Email provider is not configured.");
    throw new EmailNotConfiguredError();
  }

  if (config.provider === "gmail") {
    await sendContactEmailsViaGmail(config, values);
    return;
  }

  await sendContactEmailsViaResend(config, values);
}
