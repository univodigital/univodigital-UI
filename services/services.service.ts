import { API_DEFAULTS, API_PATHS } from "@/constants/api";
import { apiClient } from "@/services/api";
import type { ApiListResponse, ApiResponse, Service, ServiceSlug } from "@/types";

export const servicesService = {
  list() {
    return apiClient<ApiListResponse<Service>>(API_PATHS.services.root, {
      next: { revalidate: API_DEFAULTS.revalidate, tags: ["services"] },
    });
  },

  getBySlug(slug: ServiceSlug | string) {
    return apiClient<ApiResponse<Service>>(API_PATHS.services.bySlug(slug), {
      next: {
        revalidate: API_DEFAULTS.revalidate,
        tags: ["services", `service:${slug}`],
      },
    });
  },
} as const;
