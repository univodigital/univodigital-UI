"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2Icon, SendIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
import { contactFormSchema, type ContactFormValues } from "@/schemas/contact";
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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgqqlbg";

const CONTACT_FORM_ERROR_MESSAGE =
  "Something went wrong. Please try again or email us directly.";

const CONTACT_FORM_SUCCESS_MESSAGE =
  "Thank you! Your enquiry has been received. We'll get back to you within 24 hours.";

function buildFormspreeFormData(values: ContactFormValues): FormData {
  const formData = new FormData();
  formData.append("Full Name", values.name);
  formData.append("Email", values.email);
  formData.append("Phone", values.phone);

  if (values.company) {
    formData.append("Company Name", values.company);
  }

  const serviceLabel =
    CONTACT_SUBJECT_OPTIONS.find((option) => option.value === values.subject)
      ?.label ?? values.subject;

  formData.append("Service", serviceLabel);
  formData.append("Message", values.message);

  return formData;
}

async function submitContactForm(values: ContactFormValues): Promise<void> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: buildFormspreeFormData(values),
      headers: {
        Accept: "application/json",
      },
    });

    const data = (await response.json()) as { ok?: boolean };

    if (!response.ok || !data.ok) {
      throw new Error(CONTACT_FORM_ERROR_MESSAGE);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === CONTACT_FORM_ERROR_MESSAGE
    ) {
      throw error;
    }

    throw new Error(CONTACT_FORM_ERROR_MESSAGE);
  }
}

type ContactFormSuccessToastProps = {
  message: string;
  onDismiss: () => void;
};

function ContactFormSuccessToast({
  message,
  onDismiss,
}: ContactFormSuccessToastProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 6000);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={
        prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.96 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        prefersReducedMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }
      }
      transition={{
        duration: prefersReducedMotion ? 0 : duration.normal,
        ease: easing.emphasized,
      }}
      className="border-accent/30 bg-card ring-accent/20 fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-xl border p-4 shadow-lg ring-1 sm:bottom-8"
      role="status"
      aria-live="polite"
    >
      <span className="bg-accent/10 text-accent inline-flex size-9 shrink-0 items-center justify-center rounded-full">
        <CheckCircle2Icon className="size-5" aria-hidden />
      </span>
      <p className="text-card-foreground pt-1 text-left text-sm leading-relaxed">
        {message}
      </p>
    </motion.div>
  );
}

export function ContactForm({
  className,
  selectedSubject = "general",
}: ContactFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const { status, isLoading, run, reset } = useAsyncState<void>();
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const dismissSuccessToast = useCallback(() => {
    setShowSuccessToast(false);
  }, []);

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
    if (isLoading) return;

    const result = await run(submitContactForm(values));

    if (result === null) return;

    form.reset({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: selectedSubject,
      message: "",
    });
    reset();
    setShowSuccessToast(true);
  }

  const fieldError = (name: keyof ContactFormValues) =>
    form.formState.errors[name]?.message;

  return (
    <Section
      id="contact-form"
      spacing="lg"
      tone="default"
      aria-labelledby="contact-form-heading"
      className={cn("relative scroll-mt-24 overflow-hidden", className)}
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
            className="text-caption text-accent font-medium tracking-wide uppercase"
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
            className="font-heading text-h2 text-text-primary mt-3 text-balance"
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
            className="text-body-lg text-text-secondary mt-4 text-pretty"
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
                    className="text-danger text-sm"
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
                    className="text-danger text-sm"
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
                    className="text-danger text-sm"
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
                  <Select value={field.value} onValueChange={field.onChange}>
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
                <p className="text-danger text-sm" role="alert">
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
                  className="text-danger text-sm"
                  role="alert"
                >
                  {fieldError("message")}
                </p>
              ) : null}
            </div>

            {status === "error" ? (
              <ErrorState
                variant="banner"
                tone="card"
                title="We couldn't send your message"
                description={CONTACT_FORM_ERROR_MESSAGE}
                onRetry={() => form.handleSubmit(onSubmit)()}
              />
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-card-muted-foreground text-sm">
                By submitting, you agree to be contacted about your inquiry.
              </p>
              <Button
                type="submit"
                size="lg"
                variant="accent"
                loading={isLoading}
                disabled={isLoading}
                className="min-w-40 shrink-0"
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    Let&apos;s Talk
                    <SendIcon data-icon="inline-end" aria-hidden />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </Container>

      <AnimatePresence>
        {showSuccessToast ? (
          <ContactFormSuccessToast
            message={CONTACT_FORM_SUCCESS_MESSAGE}
            onDismiss={dismissSuccessToast}
          />
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
