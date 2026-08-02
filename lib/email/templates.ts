import { SITE } from "@/constants/site";
import type { ContactFormValues } from "@/schemas/contact";

import { getContactSubjectLabel } from "./subject-labels";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:0 0 12px;width:140px;color:#64748b;font-size:14px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:0 0 12px;color:#001028;font-size:14px;line-height:1.5;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>
  `;
}

export function buildTeamNotificationEmail(values: ContactFormValues) {
  const subjectLabel = getContactSubjectLabel(values.subject);

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:32px 16px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:28px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#0048F8;">New contact inquiry</p>
        <h1 style="margin:0 0 20px;font-size:24px;line-height:1.3;color:#001028;">${escapeHtml(values.name)} wants to connect</h1>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          ${fieldRow("Name", values.name)}
          ${fieldRow("Email", values.email)}
          ${fieldRow("Phone", values.phone)}
          ${fieldRow("Company", values.company || "—")}
          ${fieldRow("Service", subjectLabel)}
          ${fieldRow("Message", values.message)}
        </table>
        <p style="margin:24px 0 0;font-size:13px;color:#64748b;">Reply directly to this email to respond to ${escapeHtml(values.name)}.</p>
      </div>
    </div>
  `;

  const text = [
    `New contact inquiry from ${values.name}`,
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Company: ${values.company || "—"}`,
    `Service: ${subjectLabel}`,
    "",
    "Message:",
    values.message,
  ].join("\n");

  return {
    subject: `New inquiry: ${subjectLabel} — ${values.name}`,
    html,
    text,
  };
}

export function buildConfirmationEmail(name: string) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:32px 16px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:28px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#0048F8;">${escapeHtml(SITE.name)}</p>
        <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#001028;">Thanks for reaching out, ${escapeHtml(firstName)}.</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">
          We received your message and our team will review your brief within one business day.
        </p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">
          If your project is time-sensitive, reply to this email and we will prioritize your inquiry.
        </p>
        <p style="margin:24px 0 0;font-size:13px;color:#64748b;">${escapeHtml(SITE.tagline)}</p>
      </div>
    </div>
  `;

  const text = [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to Univo Digital.",
    "",
    "We received your message and our team will review your brief within one business day.",
    "",
    SITE.tagline,
  ].join("\n");

  return {
    subject: `We received your message — ${SITE.name}`,
    html,
    text,
  };
}
