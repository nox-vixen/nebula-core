/**
 * ==========================================================
 * NebulaOS
 * File: src/services/ProviderManager.ts
 * Purpose: Health-Aware Provider Manager
 * Phase: 4.3
 * ==========================================================
 */

import {
  providerRegistry,
  ProviderCapability,
  NebulaProvider
} from "../providers";

class ProviderManager {

  async getProvider(capability: ProviderCapability): Promise<NebulaProvider> {
    const providers = providerRegistry.getByCapability(capability);

    for (const provider of providers) {
      try {
        if (await provider.healthCheck()) {
          return provider;
        }
      } catch {
        // Ignore failed health checks and try the next provider.
      }
    }

    throw new Error(
      `No healthy provider available for capability: ${capability}`
    );
  }

  async getProviderFor(capability: ProviderCapability): Promise<NebulaProvider> {
    return this.getProvider(capability);
  }

  async getDefaultProvider(): Promise<NebulaProvider> {
    return await this.getProvider(ProviderCapability.HOME);
  }
}

export const providerManager = new ProviderManager();
