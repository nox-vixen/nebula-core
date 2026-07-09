/**
 * ==========================================================
 * NebulaOS
 * File: src/services/HomeService.ts
 * Purpose: Home Service
 * Phase: 4.7
 * ==========================================================
 */

import { cache } from "../cache";
import { CacheKey } from "../cache/models/CacheKey";
import { CacheTTL } from "../cache/models/CacheTTL";
import { ProviderCapability } from "../providers";
import { providerManager } from "./ProviderManager";

class HomeService {
  async getHome() {
    const provider = await providerManager.getProviderFor(
      ProviderCapability.HOME
    );

    return cache.rememberStale(
      CacheKey.home(provider.id),
      CacheTTL.HOME,
      async () => ({
        success: true,
        provider: provider.id,
        sections: await provider.getHome()
      }),
      ["home", provider.id]
    );
  }
}

export const homeService = new HomeService();
