import { API_DEFAULTS, API_PATHS } from "@/constants/api";
import { apiClient } from "@/services/api";
import type {
  ApiListResponse,
  ApiResponse,
  PortfolioFilters,
  PortfolioItem,
} from "@/types";

function toQuery(filters?: PortfolioFilters): string {
  if (!filters) return "";
  const params = new URLSearchParams();
  if (filters.category && filters.category !== "all") {
    params.set("category", filters.category);
  }
  if (filters.featured !== undefined) {
    params.set("featured", String(filters.featured));
  }
  if (filters.search) {
    params.set("search", filters.search);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

export const portfolioService = {
  list(filters?: PortfolioFilters) {
    return apiClient<ApiListResponse<PortfolioItem>>(
      `${API_PATHS.portfolio.root}${toQuery(filters)}`,
      {
        next: { revalidate: API_DEFAULTS.revalidate, tags: ["portfolio"] },
      },
    );
  },

  featured() {
    return apiClient<ApiListResponse<PortfolioItem>>(
      API_PATHS.portfolio.featured,
      {
        next: {
          revalidate: API_DEFAULTS.revalidate,
          tags: ["portfolio", "portfolio:featured"],
        },
      },
    );
  },

  getBySlug(slug: string) {
    return apiClient<ApiResponse<PortfolioItem>>(
      API_PATHS.portfolio.bySlug(slug),
      {
        next: {
          revalidate: API_DEFAULTS.revalidate,
          tags: ["portfolio", `portfolio:${slug}`],
        },
      },
    );
  },
} as const;
