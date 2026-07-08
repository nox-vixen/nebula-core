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
        const home = await movieBoxProvider.getHome();

        const featured = home.slice(0, 8);

        return {
          success: true,
          provider: "moviebox",

          featured,

          trending: home,

          topRated: home,

          action: home,

          comedy: home,

          horror: home,

          romance: home,

          documentaries: home,
        };
      },
      ["home", "moviebox"]
    );
  }
}

export const homeService = new HomeService();
