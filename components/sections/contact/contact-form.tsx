"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2Icon, SendIcon } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cardSurfaceClassName } from "@/components/ui/card";
import { CONTACT_SUBJECT_OPTIONS } from "@/data/contact";
import { useAsyncState } from "@/hooks/use-async-state";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/schemas/contact";
import type { ContactSubject } from "@/types";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  className?: string;
  selectedSubject?: ContactSubject;
};

function RequiredMark() {
  return (
    <span className="text-accent" aria-hidden>
      {" "}
      *
    </span>
  );
}

type ContactApiResponse = {
  success: boolean;
  message: string;
};

async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactApiResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...values,
      company: values.company || undefined,
    }),
  });

  const data = (await response.json()) as ContactApiResponse & {
    message?: string;
  };

  if (!response.ok) {
    throw new Error(data.message || "Unable to send your message.");
  }

  return data;
}

export function ContactForm({
  className,
  selectedSubject = "general",
}: ContactFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const { status, error, isLoading, run, reset } =
    useAsyncState<ContactApiResponse>();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: selectedSubject,
      message: "",
    },
  });

  useEffect(() => {
    form.setValue("subject", selectedSubject, { shouldValidate: true });
  }, [form, selectedSubject]);

  async function onSubmit(values: ContactFormValues) {
    await run(submitContactForm(values));
  }

  const fieldError = (name: keyof ContactFormValues) =>
    form.formState.errors[name]?.message;

  return (
    <Section
      id="contact-form"
      spacing="lg"
      tone="default"
      aria-labelledby="contact-form-heading"
      className={cn("relative overflow-hidden scroll-mt-24", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, color-mix(in oklab, var(--uds-color-accent) 8%, transparent), transparent 70%)",
        }}
      />

      <Container size="max">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="text-caption font-medium tracking-wide text-accent uppercase"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
            }}
          >
            Start a conversation
          </motion.p>

          <motion.h2
            id="contact-form-heading"
            className="font-heading mt-3 text-h2 text-balance text-text-primary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.slow,
              ease: easing.emphasized,
              delay: prefersReducedMotion ? 0 : 0.05,
            }}
          >
            Tell us about your project
          </motion.h2>

          <motion.p
            className="mt-4 text-body-lg text-pretty text-text-secondary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
          >
            Share a few details and we&apos;ll respond within one business day
            with thoughtful next steps — no generic pitch decks.
          </motion.p>
        </div>

        <motion.div
          className={cn(
            cardSurfaceClassName("glass"),
            "mx-auto mt-12 max-w-4xl p-6 sm:p-8 lg:mt-16 lg:p-10",
          )}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: prefersReducedMotion ? 0 : duration.slow,
            ease: easing.emphasized,
          }}
        >
          {status === "success" ? (
            <div
              className="flex flex-col items-center px-4 py-10 text-center"
              role="status"
              aria-live="polite"
            >
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <CheckCircle2Icon className="size-7" aria-hidden />
              </span>
              <h3 className="font-heading mt-6 text-2xl font-semibold tracking-tight text-card-foreground">
                Message sent successfully
              </h3>
              <p className="mt-3 max-w-md text-body text-card-muted-foreground">
                Thank you for reaching out. Our team will review your brief and
                get back to you within one business day.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-8"
                onClick={() => {
                  reset();
                  form.reset({
                    name: "",
                    email: "",
                    company: "",
                    phone: "",
                    subject: selectedSubject,
                    message: "",
                  });
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className="grid gap-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">
                    Full Name
                    <RequiredMark />
                  </Label>
                  <Input
                    id="contact-name"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(fieldError("name"))}
                    aria-describedby={
                      fieldError("name") ? "contact-name-error" : undefined
                    }
                    {...form.register("name")}
                  />
                  {fieldError("name") ? (
                    <p
                      id="contact-name-error"
                      className="text-sm text-danger"
                      role="alert"
                    >
                      {fieldError("name")}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">
                    Email Address
                    <RequiredMark />
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(fieldError("email"))}
                    aria-describedby={
                      fieldError("email") ? "contact-email-error" : undefined
                    }
                    {...form.register("email")}
                  />
                  {fieldError("email") ? (
                    <p
                      id="contact-email-error"
                      className="text-sm text-danger"
                      role="alert"
                    >
                      {fieldError("email")}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-company">Company Name</Label>
                  <Input
                    id="contact-company"
                    autoComplete="organization"
                    aria-invalid={Boolean(fieldError("company"))}
                    {...form.register("company")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">
                    Phone Number
                    <RequiredMark />
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(fieldError("phone"))}
                    aria-describedby={
                      fieldError("phone") ? "contact-phone-error" : undefined
                    }
                    {...form.register("phone")}
                  />
                  {fieldError("phone") ? (
                    <p
                      id="contact-phone-error"
                      className="text-sm text-danger"
                      role="alert"
                    >
                      {fieldError("phone")}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject">
                  Service Required
                  <RequiredMark />
                </Label>
                <Controller
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="contact-subject"
                        fullWidth
                        aria-invalid={Boolean(fieldError("subject"))}
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTACT_SUBJECT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {fieldError("subject") ? (
                  <p className="text-sm text-danger" role="alert">
                    {fieldError("subject")}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">
                  Message
                  <RequiredMark />
                </Label>
                <Textarea
                  id="contact-message"
                  textareaSize="lg"
                  required
                  aria-required="true"
                  placeholder="Tell us about your goals, timeline, and what success looks like for you."
                  aria-invalid={Boolean(fieldError("message"))}
                  aria-describedby={
                    fieldError("message") ? "contact-message-error" : undefined
                  }
                  {...form.register("message")}
                />
                {fieldError("message") ? (
                  <p
                    id="contact-message-error"
                    className="text-sm text-danger"
                    role="alert"
                  >
                    {fieldError("message")}
                  </p>
                ) : null}
              </div>

              {status === "error" && error ? (
                <ErrorState
                  variant="banner"
                  tone="card"
                  title="We couldn't send your message"
                  error={error}
                  onRetry={() => form.handleSubmit(onSubmit)()}
                />
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-card-muted-foreground">
                  By submitting, you agree to be contacted about your inquiry.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  variant="accent"
                  loading={isLoading}
                  className="min-w-40 shrink-0"
                >
                  Let&apos;s Talk
                  <SendIcon data-icon="inline-end" aria-hidden />
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
