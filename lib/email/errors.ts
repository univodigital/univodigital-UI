export class EmailNotConfiguredError extends Error {
  readonly code = "EMAIL_NOT_CONFIGURED";

  constructor() {
    super(
      "Email is not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to .env.local, then restart the dev server.",
    );
    this.name = "EmailNotConfiguredError";
  }
}

export function isEmailNotConfiguredError(
  error: unknown,
): error is EmailNotConfiguredError {
  return error instanceof EmailNotConfiguredError;
}

export function getEmailSendErrorMessage(error: unknown): string {
  if (isEmailNotConfiguredError(error)) {
    return error.message;
  }

  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "EAUTH"
  ) {
    return "Gmail sign-in failed. Check GMAIL_USER and GMAIL_APP_PASSWORD in .env.local.";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to send your message. Please try again.";
}
