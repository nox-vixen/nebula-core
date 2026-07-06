/**
 * ==========================================================
 * NebulaOS
 * File: src/search/services/SearchService.ts
 * Purpose: Universal Search Service
 * Phase: 3
 * ==========================================================
 */

import { cache } from "../../cache";
import { CacheKey } from "../../cache/models/CacheKey";
import { CacheTTL } from "../../cache/models/CacheTTL";

import { tmdbService } from "../../providers/tmdb/TMDBService";
import { mapTMDBMovieToSearchResult } from "../../providers/tmdb/mapper";

import { SearchOptions } from "../models/SearchOptions";
import { SearchResponse } from "../models/SearchResponse";

export class SearchService {
  async search(options: SearchOptions): Promise<SearchResponse> {
    const page = options.page ?? 1;

    return cache.remember(
      CacheKey.search(options.query),
      CacheTTL.SEARCH,
      async () => {
        const response = await tmdbService.searchMovies(
          options.query,
          page
        );

        return {
          results: response.results.map(mapTMDBMovieToSearchResult),
          page: response.page,
          totalPages: response.total_pages,
          totalResults: response.total_results,
          providers: ["tmdb"],
          cached: false
        };
      },
      ["search", "tmdb"]
    );
  }
}

export const searchService = new SearchService();
