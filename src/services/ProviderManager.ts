/**
 * ==========================================================
 * NebulaOS
 * File: src/services/ProviderManager.ts
 * Purpose: Health-Aware Provider Manager
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

    console.log(
      "[ProviderManager] Candidates:",
      providers.map(p => p.id)
    );

    for (const provider of providers) {
      try {
        console.log("[ProviderManager] Checking:", provider.id);

        const healthy = await provider.healthCheck();

        console.log(
          `[ProviderManager] ${provider.id} healthy =`,
          healthy
        );

        if (healthy) {
          console.log(
            "[ProviderManager] Selected:",
            provider.id
          );
          return provider;
        }
      } catch (err: any) {
        console.error(
          `[ProviderManager] ${provider.id} failed:`,
          err?.message ?? err
        );
      }
    }

    throw new Error(
      `No healthy provider available for capability: ${capability}`
    );
  }

  async getProviderFor(capability: ProviderCapability) {
    return this.getProvider(capability);
  }

  async getDefaultProvider() {
    return this.getProvider(ProviderCapability.HOME);
  }
}

export const providerManager = new ProviderManager();
