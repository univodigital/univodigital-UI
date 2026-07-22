import { API_DEFAULTS, API_PATHS } from "@/constants/api";
import { apiClient } from "@/services/api";
import type { ApiListResponse, Faq } from "@/types";

export const faqService = {
  list() {
    return apiClient<ApiListResponse<Faq>>(API_PATHS.faqs.root, {
      next: { revalidate: API_DEFAULTS.revalidate, tags: ["faqs"] },
    });
  },
} as const;
