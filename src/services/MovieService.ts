/**
 * ==========================================================
 * NebulaOS
 * File: src/services/MovieService.ts
 * Purpose: Universal Movie Service
 * Phase: 4.7
 * ==========================================================
 */

import { cache } from "../cache";
import { CacheKey } from "../cache/models/CacheKey";
import { CacheTTL } from "../cache/models/CacheTTL";
import { ProviderCapability } from "../providers";
import { providerManager } from "./ProviderManager";

class MovieService {
  async getMovie(id: string) {
    return providerManager.execute(
      ProviderCapability.MOVIE,
      async (provider) =>
        cache.remember(
          CacheKey.details(`${provider.id}:movie:${id}`),
          CacheTTL.DETAILS,
          async () => ({
            success: true,
            provider: provider.id,
            movie: await provider.getMovie(id)
          }),
          ["details", provider.id, "movie"]
        )
    ).then(({ result }) => result);
  }
}

export const movieService = new MovieService();
