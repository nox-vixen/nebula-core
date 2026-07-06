/**
 * ==========================================================
 * NebulaOS
 * File: src/search/models/SearchResponse.ts
 * Purpose: Universal Search Response
 * Phase: 3
 * ==========================================================
 */

import { NebulaSearchResult } from "../../models";

export interface SearchResponse {
  /** Search results */
  results: NebulaSearchResult[];

  /** Current page */
  page: number;

  /** Total pages (if known) */
  totalPages?: number;

  /** Total results (if known) */
  totalResults?: number;

  /** Provider(s) that produced the results */
  providers: string[];

  /** Whether results came from cache */
  cached: boolean;
}
