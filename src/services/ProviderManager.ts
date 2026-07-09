/**
 * ==========================================================
 * NebulaOS
 * File: src/services/ProviderManager.ts
 * Purpose: Health-Aware Provider Manager
 * Phase: 5.2
 * ==========================================================
 */

import {
  providerRegistry,
  ProviderCapability,
  NebulaProvider
} from "../providers";
import { clusterManager } from "./ClusterManager";
import { logger } from "../utils/logger";

class ProviderManager {
  async getProvider(capability: ProviderCapability): Promise<NebulaProvider> {
    const providers = providerRegistry.getByCapability(capability);

    logger.debug(
      "ProviderManager",
      `Candidate providers for '${capability}'`,
      providers.map(p => p.id)
    );

    for (const provider of providers) {
      try {
        logger.debug(
          "ProviderManager",
          `Checking provider '${provider.id}'`
        );

        if (provider.id === "moviebox") {
          await clusterManager.ensureMovieBoxAwake();
        }

        const healthy = await provider.healthCheck();

        logger.debug(
          "ProviderManager",
          `Health check for '${provider.id}'`,
          { healthy }
        );

        if (healthy) {
          logger.info(
            "ProviderManager",
            `Selected provider '${provider.id}' for '${capability}'`
          );

          return provider;
        }
      } catch (error) {
        logger.error(
          "ProviderManager",
          `Provider '${provider.id}' failed health check`,
          error instanceof Error ? error.message : error
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
        if (provider.id === "moviebox") {
          void clusterManager.ensureMovieBoxAwake();
        }

        const healthy = await provider.healthCheck();

        if (!healthy) {
          logger.warn(
            "ProviderManager",
            `Skipping unhealthy provider '${provider.id}'`
          );
          continue;
        }

        const result = await operation(provider);

        logger.info(
          "ProviderManager",
          `Operation completed using '${provider.id}'`
        );

        return { provider, result };
      } catch (error) {
        lastError = error;

        logger.error(
          "ProviderManager",
          `Operation failed for '${provider.id}'`,
          error instanceof Error ? error.message : error
        );
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
