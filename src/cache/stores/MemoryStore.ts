/**
 * ==========================================================
 * NebulaOS
 * File: src/cache/stores/MemoryStore.ts
 * Purpose: In-memory cache implementation (L1 Cache)
 * Phase: 3
 * ==========================================================
 */

import { CacheEntry } from "../models/CacheEntry";
import { CacheStore } from "./CacheStore";

export class MemoryStore implements CacheStore {
  private readonly cache = new Map<string, CacheEntry<unknown>>();

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    const entry = this.cache.get(key);
    return (entry as CacheEntry<T>) ?? null;
  }

  async set<T>(entry: CacheEntry<T>): Promise<void> {
    this.cache.set(entry.key, entry as CacheEntry<unknown>);
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  /** Number of cached entries (debugging/metrics) */
  size(): number {
    return this.cache.size;
  }
}
