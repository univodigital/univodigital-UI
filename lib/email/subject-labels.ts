import { CONTACT_SUBJECT_OPTIONS } from "@/data/contact";
import type { ContactSubject } from "@/types";

const SUBJECT_LABELS = Object.fromEntries(
  CONTACT_SUBJECT_OPTIONS.map((option) => [option.value, option.label]),
) as Record<ContactSubject, string>;

export function getContactSubjectLabel(subject: ContactSubject): string {
  return SUBJECT_LABELS[subject] ?? "General Inquiry";
}
