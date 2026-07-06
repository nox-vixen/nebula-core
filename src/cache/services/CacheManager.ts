/**
 * ==========================================================
 * NebulaOS
 * File: src/cache/services/CacheManager.ts
 * Purpose: Universal Cache Manager
 * Phase: 3
 * ==========================================================
 */

import { CacheEntry } from "../models/CacheEntry";
import { CacheStore } from "../stores/CacheStore";

export class CacheManager {
  private readonly tagIndex = new Map<string, Set<string>>();

  constructor(
    private readonly primary: CacheStore,
    private readonly secondary?: CacheStore
  ) {}

  async remember<T>(
    key: string,
    ttl: number,
    loader: () => Promise<T>,
    tags: string[] = []
  ): Promise<T> {
    const now = new Date();

    const l1 = await this.primary.get<T>(key);

    if (l1 && new Date(l1.expiresAt) > now) {
      return { ...(l1.value as any), cached: true } as T;
    }

    if (this.secondary) {
      const l2 = await this.secondary.get<T>(key);

      if (l2 && new Date(l2.expiresAt) > now) {
        await this.primary.set(l2);
        return { ...(l2.value as any), cached: true } as T;
      }
    }

    const value = await loader();

    const entry: CacheEntry<T> = {
      key,
      value,
      version: 1,
      tags,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      ttl,
      expiresAt: new Date(now.getTime() + ttl * 1000).toISOString()
    };

    await this.primary.set(entry);

    if (this.secondary) {
      await this.secondary.set(entry);
    }

    // Maintain tag index
    for (const tag of tags) {
      if (!this.tagIndex.has(tag)) {
        this.tagIndex.set(tag, new Set());
      }

      this.tagIndex.get(tag)!.add(key);
    }

    return value;
  }
}
