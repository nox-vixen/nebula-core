/**
 * ==========================================================
 * NebulaOS
 * File: src/models/SearchResult.ts
 * Purpose: Universal Search Result Model
 * Phase: 2
 * ==========================================================
 */

export type NebulaContentType = "movie" | "tv";

export interface NebulaSearchResult {
  id: string;
  provider: string;
  type: NebulaContentType;
  title: string;
  overview?: string;
  poster?: string;
  backdrop?: string;
  rating?: number;
  year?: number;
}
