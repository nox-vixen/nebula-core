/**
 * ==========================================================
 * NebulaOS
 * File: src/models/Episode.ts
 * Purpose: Universal Episode Model
 * Phase: 2
 * ==========================================================
 */

export interface NebulaEpisode {
  /** Episode ID */
  id: string;

  /** Provider identifier */
  provider: string;

  /** Parent series ID */
  seriesId: string;

  /** Episode title */
  title: string;

  /** Episode overview */
  overview?: string;

  /** Season number */
  season: number;

  /** Episode number */
  episode: number;

  /** Air date */
  airDate?: string;

  /** Runtime in minutes */
  runtime?: number;

  /** Average rating */
  rating?: number;

  /** Vote count */
  voteCount?: number;

  /** Still image */
  thumbnail?: string;
}
