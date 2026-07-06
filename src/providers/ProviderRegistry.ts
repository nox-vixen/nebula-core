/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/ProviderRegistry.ts
 * Purpose: Permanent Provider Registry
 * Phase: 2
 * ==========================================================
 */

import { NebulaProvider } from "./Provider";

class ProviderRegistry {
  private providers = new Map<string, NebulaProvider>();

  register(provider: NebulaProvider): void {
    this.providers.set(provider.id, provider);
  }

  get(id: string): NebulaProvider | undefined {
    return this.providers.get(id);
  }

  getDefault(): NebulaProvider | undefined {
    return this.providers.values().next().value;
  }

  getAll(): NebulaProvider[] {
    return Array.from(this.providers.values());
  }

  async health() {
    const results = [];

    for (const provider of this.providers.values()) {
      results.push({
        id: provider.id,
        name: provider.name,
        healthy: await provider.healthCheck()
      });
    }

    return results;
  }
}

export const providerRegistry = new ProviderRegistry();
