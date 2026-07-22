import { API_DEFAULTS, API_PATHS } from "@/constants/api";
import { apiClient } from "@/services/api";
import type { ApiListResponse, Testimonial } from "@/types";

export const testimonialService = {
  list() {
    return apiClient<ApiListResponse<Testimonial>>(API_PATHS.testimonials.root, {
      next: { revalidate: API_DEFAULTS.revalidate, tags: ["testimonials"] },
    });
  },

  featured() {
    return apiClient<ApiListResponse<Testimonial>>(
      API_PATHS.testimonials.featured,
      {
        next: {
          revalidate: API_DEFAULTS.revalidate,
          tags: ["testimonials", "testimonials:featured"],
        },
      },
    );
  },
} as const;
