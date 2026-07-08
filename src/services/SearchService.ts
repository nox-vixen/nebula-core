/**
 * ==========================================================
 * NebulaOS
 * File: src/services/SearchService.ts
 * Purpose: Universal Search Service
 * Phase: 4.3
 * ==========================================================
 */

import { cache } from "../cache";
import { CacheKey } from "../cache/models/CacheKey";
import { CacheTTL } from "../cache/models/CacheTTL";
import { providerManager } from "./ProviderManager";

class SearchService {
  async search(query: string) {
    const provider = providerManager.getDefaultProvider();

    return cache.remember(
      `${CacheKey.search(provider.id)}:${query.toLowerCase()}`,
      CacheTTL.SEARCH,
      async () => ({
        success: true,
        provider: provider.id,
        results: await provider.search(query)
      }),
      ["search", provider.id]
    );
  }
}

export const searchService = new SearchService();
