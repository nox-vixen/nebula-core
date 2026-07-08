/**
 * ==========================================================
 * NebulaOS
 * File: src/services/WatchService.ts
 * Purpose: Watch Service
 * Phase: 4.3
 * ==========================================================
 */

import { providerManager } from "./ProviderManager";

class WatchService {
  async getWatchData(id: string) {
    const provider = await providerManager.getDefaultProvider();
    return provider.getWatchData(id);
  }

  async getEpisodeStreams(
    seriesId: string,
    season: number,
    episode: number
  ) {
    const provider = await providerManager.getDefaultProvider();

    return provider.getEpisodeStreams(
      seriesId,
      season,
      episode
    );
  }

  async getSubtitles(
    id: string,
    resourceId: string
  ) {
    const provider = await providerManager.getDefaultProvider();

    return provider.getSubtitles(
      id,
      resourceId
    );
  }
}

export const watchService = new WatchService();
