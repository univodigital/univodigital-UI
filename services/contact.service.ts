import { API_PATHS } from "@/constants/api";
import { apiClient } from "@/services/api";
import type {
  ApiResponse,
  ConsultationRequestPayload,
  ContactRequest,
  ContactRequestPayload,
} from "@/types";

export const contactService = {
  submit(payload: ContactRequestPayload) {
    return apiClient<ApiResponse<ContactRequest>>(API_PATHS.contact, {
      method: "POST",
      body: payload,
      cache: "no-store",
    });
  },

  requestConsultation(payload: ConsultationRequestPayload) {
    return apiClient<ApiResponse<{ id: string }>>(API_PATHS.consultation, {
      method: "POST",
      body: payload,
      cache: "no-store",
    });
  },
} as const;
