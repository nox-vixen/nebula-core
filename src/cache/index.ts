/**
 * ==========================================================
 * NebulaOS
 * File: src/cache/index.ts
 * Purpose: Shared cache instance
 * Phase: 3
 * ==========================================================
 */

import { CacheManager } from "./services/CacheManager";
import { MemoryStore } from "./stores/MemoryStore";
import { SupabaseStore } from "./stores/SupabaseStore";

export const cache = new CacheManager(
  new MemoryStore(),
  new SupabaseStore()
);
