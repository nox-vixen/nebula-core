/**
 * ==========================================================
 * NebulaOS
 * File: src/services/ProviderManager.ts
 * Purpose: Provider Manager
 * Phase: 2
 * ==========================================================
 */

import { providerRegistry } from "../providers/ProviderRegistry";
import { NebulaProvider } from "../providers";

class ProviderManager {

  /**
   * Returns the default provider.
   * Later this will contain routing logic,
   * provider priorities and failover.
   */
  getDefaultProvider(): NebulaProvider {
    const provider = providerRegistry.getDefault();

    if (!provider) {
      throw new Error("No provider has been registered.");
    }

    return provider;
  }

}

export const providerManager = new ProviderManager();
