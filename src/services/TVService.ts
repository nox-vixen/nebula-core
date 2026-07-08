import { cache } from "../cache";
import { CacheKey } from "../cache/models/CacheKey";
import { CacheTTL } from "../cache/models/CacheTTL";
import { ProviderCapability } from "../providers";
import { providerManager } from "./ProviderManager";

class TVService {
  async getSeries(id: string) {
    const provider = await providerManager.getProviderFor(
      ProviderCapability.SERIES
    );

    return cache.remember(
      `${CacheKey.details(provider.id)}:tv:${id}`,
      CacheTTL.DETAILS,
      () => provider.getSeries(id),
      ["tv", provider.id]
    );
  }

  async getEpisode(
    seriesId: string,
    season: number,
    episode: number
  ) {
    const provider = await providerManager.getProviderFor(
      ProviderCapability.EPISODE
    );

    return provider.getEpisode(
      seriesId,
      season,
      episode
    );
  }
}

export const tvService = new TVService();
