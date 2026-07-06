/**
 * ==========================================================
 * NebulaOS
 * File: src/cache/models/CacheTTL.ts
 * Purpose: Central cache TTL definitions
 * Phase: 3
 * ==========================================================
 */

export const CacheTTL = {
  HOME: 30 * 60,              // 30 minutes
  SEARCH: 10 * 60,            // 10 minutes
  DETAILS: 24 * 60 * 60,      // 24 hours
  WATCH: 5 * 60,              // 5 minutes
  PROVIDER_STATUS: 2 * 60     // 2 minutes
} as const;
