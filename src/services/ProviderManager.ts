/**
 * ==========================================================
 * NebulaOS
 * File: src/services/ProviderManager.ts
 * Purpose: Intelligent Provider Manager
 * Phase: 4.4
 * ==========================================================
 */

import { ProviderCapability } from "../providers";
import { providerRegistry } from "../providers/ProviderRegistry";
import { NebulaProvider } from "../providers";

type PriorityTable = Record<ProviderCapability, string[]>;

const PRIORITY: PriorityTable = {
  [ProviderCapability.HOME]: ["moviebox", "tmdb"],
  [ProviderCapability.SEARCH]: ["moviebox", "tmdb"],
  [ProviderCapability.TRENDING]: ["moviebox", "tmdb"],
  [ProviderCapability.LATEST]: ["moviebox", "tmdb"],
  [ProviderCapability.MOVIE]: ["moviebox", "tmdb"],
  [ProviderCapability.SERIES]: ["moviebox", "tmdb"],
  [ProviderCapability.EPISODE]: ["moviebox", "tmdb"],
  [ProviderCapability.WATCH]: ["moviebox"],
  [ProviderCapability.SUBTITLES]: ["moviebox"],
  [ProviderCapability.GENRES]: ["tmdb"]
};

class ProviderManager {

  getProviders(): NebulaProvider[] {
    return providerRegistry.getAll();
  }

  getHealthyProviders(): NebulaProvider[] {
    return providerRegistry.getAll();
  }

  getDefaultProvider(): NebulaProvider {
    const provider = providerRegistry.getDefault();

    if (!provider) {
      throw new Error("No provider has been registered.");
    }

    return provider;
  }

  getProvider(capability?: ProviderCapability): NebulaProvider {

    if (!capability) {
      return this.getDefaultProvider();
    }

    const providers = this.getHealthyProviders();

    const priority = PRIORITY[capability] ?? [];

    for (const id of priority) {
      const provider = providers.find(
        p => p.id === id && p.capabilities.includes(capability)
      );

      if (provider) {
        return provider;
      }
    }

    const fallback = providers.find(
      p => p.capabilities.includes(capability)
    );

    if (fallback) {
      return fallback;
    }

    throw new Error(
      `No provider supports capability: ${capability}`
    );
  }

  getHomeProvider() {
    return this.getProvider(ProviderCapability.HOME);
  }

  getSearchProvider() {
    return this.getProvider(ProviderCapability.SEARCH);
  }

  getMovieProvider() {
    return this.getProvider(ProviderCapability.MOVIE);
  }

  getSeriesProvider() {
    return this.getProvider(ProviderCapability.SERIES);
  }

  getWatchProvider() {
    return this.getProvider(ProviderCapability.WATCH);
  }

  getSubtitleProvider() {
    return this.getProvider(ProviderCapability.SUBTITLES);
  }

}

export const providerManager = new ProviderManager();
