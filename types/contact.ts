import type { ID, ISODateString } from "./common";

export type ContactSubject =
  | "general"
  | "consultation"
  | "branding"
  | "website"
  | "social"
  | "performance"
  | "other";

export type ContactRequestPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: ContactSubject;
  message: string;
};

export type ContactRequest = ContactRequestPayload & {
  id: ID;
  createdAt: ISODateString;
  status: "new" | "in_progress" | "closed";
};

export type ConsultationRequestPayload = {
  name: string;
  email: string;
  phone?: string;
  preferredDate?: ISODateString;
  notes?: string;
};
