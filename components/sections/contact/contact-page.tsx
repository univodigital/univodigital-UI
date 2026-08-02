"use client";

import { useCallback, useState } from "react";

import type { ContactSubject } from "@/types";

import { ContactFaq } from "./contact-faq";
import { ContactFinalCta } from "./contact-final-cta";
import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";
import { ContactOptions } from "./contact-options";
import { ContactServices } from "./contact-services";
import { ContactTimeline } from "./contact-timeline";
import { ContactWhy } from "./contact-why";

type ContactPageContentProps = {
  className?: string;
};

export function ContactPageContent({ className }: ContactPageContentProps) {
  const [selectedSubject, setSelectedSubject] =
    useState<ContactSubject>("general");

  const scrollToForm = useCallback((subject?: ContactSubject) => {
    if (subject) {
      setSelectedSubject(subject);
    }

    const form = document.getElementById("contact-form");
    form?.scrollIntoView({ behavior: "smooth", block: "start" });
    form?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={className}>
      <ContactHero
        onStartProject={() => scrollToForm("general")}
        onScheduleConsultation={() => scrollToForm("consultation")}
      />
      <ContactOptions />
      <ContactForm selectedSubject={selectedSubject} />
      <ContactServices
        selectedSubject={selectedSubject}
        onSelectService={(subject) => scrollToForm(subject)}
      />
      <ContactWhy />
      <ContactTimeline />
      <ContactFaq />
      <ContactFinalCta
        onBookConsultation={() => scrollToForm("consultation")}
      />
    </div>
  );
}
