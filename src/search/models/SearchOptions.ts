/**
 * ==========================================================
 * NebulaOS
 * File: src/search/models/SearchOptions.ts
 * Purpose: Universal Search Options
 * Phase: 3
 * ==========================================================
 */

export interface SearchOptions {
  /** Search query */
  query: string;

  /** Page number */
  page?: number;

  /** Maximum results */
  limit?: number;

  /** Restrict media type */
  type?: "movie" | "tv" | "anime" | "person" | "all";

  /** Restrict providers */
  providers?: string[];

  /** Allow cached results */
  useCache?: boolean;
}
