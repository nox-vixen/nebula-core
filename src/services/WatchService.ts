/**
 * ==========================================================
 * NebulaOS
 * File: src/services/WatchService.ts
 * Purpose: Watch Service
 * Phase: 4.3
 * ==========================================================
 */

import { ProviderCapability } from "../providers";
import { providerManager } from "./ProviderManager";

class WatchService {
  async getWatchData(
    id: string,
    providerRef?: string
  ) {
    const provider = await providerManager.getProviderFor(
      ProviderCapability.WATCH
    );

    return provider.getWatchData(
      id,
      providerRef
    );
  }

  async getEpisodeStreams(
    seriesId: string,
    season: number,
    episode: number
  ) {
    const provider = await providerManager.getProviderFor(
      ProviderCapability.EPISODE
    );

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
    const provider = await providerManager.getProviderFor(
      ProviderCapability.SUBTITLES
    );

    return provider.getSubtitles(
      id,
      resourceId
    );
  }
}

export const watchService = new WatchService();
