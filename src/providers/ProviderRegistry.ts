/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/ProviderRegistry.ts
 * Purpose: Priority-based Provider Registry
 * Phase: 4.3
 * ==========================================================
 */

import { NebulaProvider } from "./Provider";
import { ProviderCapability } from "./Capability";

type RegisteredProvider = {
  provider: NebulaProvider;
  priority: number;
};

class ProviderRegistry {
  private providers = new Map<string, RegisteredProvider>();

  register(provider: NebulaProvider, priority = 100): void {
    this.providers.set(provider.id, {
      provider,
      priority
    });
  }

  get(id: string): NebulaProvider | undefined {
    return this.providers.get(id)?.provider;
  }

  getAll(): NebulaProvider[] {
    return [...this.providers.values()]
      .sort((a, b) => a.priority - b.priority)
      .map(x => x.provider);
  }

  getByCapability(capability: ProviderCapability): NebulaProvider[] {
    return this.getAll().filter(provider =>
      provider.capabilities.includes(capability)
    );
  }

  getDefault(): NebulaProvider | undefined {
    return this.getAll()[0];
  }

  async health() {
    const results = [];

    for (const { provider, priority } of this.providers.values()) {
      results.push({
        id: provider.id,
        name: provider.name,
        priority,
        healthy: await provider.healthCheck()
      });
    }

    return results;
  }
}

export const providerRegistry = new ProviderRegistry();
