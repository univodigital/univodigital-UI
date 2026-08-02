import { NextResponse } from "next/server";

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

    // Ready for CRM / email integration — payload is validated.
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
  } catch {
    return NextResponse.json(
      { message: "Unable to process your request. Please try again." },
      { status: 500 },
    );
  }
}
