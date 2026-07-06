/**
 * ==========================================================
 * NebulaOS
 * File: src/cache/stores/CacheStore.ts
 * Purpose: Universal Cache Store Interface
 * Phase: 3
 * ==========================================================
 */

import { CacheEntry } from "../models/CacheEntry";

export interface CacheStore {
  get<T>(key: string): Promise<CacheEntry<T> | null>;

  set<T>(entry: CacheEntry<T>): Promise<void>;

  delete(key: string): Promise<void>;

  clear(): Promise<void>;
}
