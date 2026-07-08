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
    return providerManager
      .getDefaultProvider()
      .getWatchData(id);
  }

  async getEpisodeStreams(
    seriesId: string,
    season: number,
    episode: number
  ) {
    return providerManager
      .getDefaultProvider()
      .getEpisodeStreams(
        seriesId,
        season,
        episode
      );
  }

  async getSubtitles(
    id: string,
    resourceId: string
  ) {
    return providerManager
      .getDefaultProvider()
      .getSubtitles(
        id,
        resourceId
      );
  }
}

export const watchService = new WatchService();
