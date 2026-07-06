/**
 * ==========================================================
 * NebulaOS
 * File: src/cache/models/CacheEntry.ts
 * Purpose: Universal Cache Entry
 * Phase: 3
 * ==========================================================
 */

export interface CacheEntry<T = unknown> {
  /** Unique cache key */
  key: string;

  /** Cached data */
  value: T;

  /** Schema version */
  version: number;

  /** Cache tags for grouped invalidation */
  tags: string[];

  /** Creation timestamp */
  createdAt: string;

  /** Last update timestamp */
  updatedAt: string;


  /** Time-to-live (seconds) */
  ttl: number;

  /** Expiration timestamp */
  expiresAt: string;
}
