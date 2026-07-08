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


  async execute<T>(
    capability: ProviderCapability,
    operation: (provider: NebulaProvider) => Promise<T>
  ): Promise<{ provider: NebulaProvider; result: T }> {
    const providers = providerRegistry.getByCapability(capability);

    let lastError: unknown;

    for (const provider of providers) {
      try {
        const healthy = await provider.healthCheck();

        if (!healthy) {
          continue;
        }

        const result = await operation(provider);

        return {
          provider,
          result
        };
      } catch (error) {
        console.error(
          `[ProviderManager] ${provider.id} operation failed:`,
          error instanceof Error ? error.message : error
        );

        lastError = error;
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error(`No provider available for ${capability}`);
  }


  async getDefaultProvider() {
    return this.getProvider(ProviderCapability.HOME);
  }
}

export const providerManager = new ProviderManager();
