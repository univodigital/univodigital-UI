import { SITE } from "@/constants/site";

export type EmailProvider = "gmail" | "resend";

export type ResolvedEmailConfig = {
  provider: EmailProvider;
  notificationTo: string;
  from: string;
};

export function getNotificationEmail(): string {
  return process.env.CONTACT_NOTIFICATION_EMAIL ?? SITE.email;
}

export function resolveEmailConfig(): ResolvedEmailConfig | null {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailAppPassword) {
    return {
      provider: "gmail",
      notificationTo: getNotificationEmail(),
      from: `"${SITE.name}" <${gmailUser}>`,
    };
  }

  if (process.env.RESEND_API_KEY) {
    return {
      provider: "resend",
      notificationTo: getNotificationEmail(),
      from:
        process.env.RESEND_FROM_EMAIL ??
        `Univo Digital <onboarding@resend.dev>`,
    };
  }

  return null;
}
