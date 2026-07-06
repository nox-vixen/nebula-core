/**
 * ==========================================================
 * NebulaOS
 * File: src/cache/models/CacheKey.ts
 * Purpose: Central cache key generator
 * Phase: 3
 * ==========================================================
 */

export class CacheKey {
  static home(section: string): string {
    return `home:${section}`;
  }

  static search(query: string): string {
    return `search:${query.trim().toLowerCase()}`;
  }

  static details(id: string): string {
    return `details:${id}`;
  }

  static watch(id: string): string {
    return `watch:${id}`;
  }

  static providerStatus(provider: string): string {
    return `provider:${provider}:status`;
  }
}
