import { NextResponse } from "next/server";

import {
  getEmailSendErrorMessage,
  isEmailNotConfiguredError,
} from "@/lib/email/errors";
import { sendContactEmails } from "@/lib/email/send-contact-emails";
import { contactFormSchema } from "@/schemas/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await sendContactEmails(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. We will be in touch shortly.",
        data: {
          id: crypto.randomUUID(),
          ...parsed.data,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[contact] submission failed:", error);

    if (isEmailNotConfiguredError(error)) {
      return NextResponse.json(
        {
          message: error.message,
          code: error.code,
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        message: getEmailSendErrorMessage(error),
        code: "EMAIL_SEND_FAILED",
      },
      { status: 500 },
    );
  }
}
