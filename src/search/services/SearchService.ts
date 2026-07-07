/**
 * ==========================================================
 * NebulaOS
 * File: src/search/services/SearchService.ts
 * Purpose: Universal Search Service
 * Phase: 4.3
 * ==========================================================
 */

import { cache } from "../../cache";
import { CacheKey } from "../../cache/models/CacheKey";
import { CacheTTL } from "../../cache/models/CacheTTL";

import { movieBoxProvider } from "../../providers/moviebox";

import { SearchOptions } from "../models/SearchOptions";
import { SearchResponse } from "../models/SearchResponse";

export class SearchService {
  async search(options: SearchOptions): Promise<SearchResponse> {
    const page = options.page ?? 1;

    return cache.remember(
      CacheKey.search(options.query),
      CacheTTL.SEARCH,
      async () => {
        const results = await movieBoxProvider.search(options.query);

        return {
          results,
          page,
          totalPages: 1,
          totalResults: results.length,
          providers: ["moviebox"],
          cached: false
        };
      },
      ["search", "moviebox"]
    );
  }
}

export const searchService = new SearchService();
