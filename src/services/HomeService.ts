/**
 * ==========================================================
 * NebulaOS
 * File: src/services/HomeService.ts
 * Purpose: Home Service
 * Phase: 4.3
 * ==========================================================
 */

import { cache } from "../cache";
import { CacheKey } from "../cache/models/CacheKey";
import { CacheTTL } from "../cache/models/CacheTTL";
import { movieBoxProvider } from "../providers/moviebox";

class HomeService {
  async getHome() {
    return cache.remember(
      CacheKey.home("moviebox"),
      CacheTTL.HOME,
      async () => {
        const sections = await movieBoxProvider.getHome();

        return {
          success: true,
          provider: "moviebox",
          sections
        };
      },
      ["home", "moviebox"]
    );
  }
}

export const homeService = new HomeService();
