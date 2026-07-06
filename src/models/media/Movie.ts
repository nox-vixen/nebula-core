/**
 * ==========================================================
 * NebulaOS
 * File: src/models/media/Movie.ts
 * Purpose: Universal Movie Model
 * Phase: 3
 * ==========================================================
 */

import { NebulaEntity } from "./NebulaEntity";

export interface NebulaMovie extends NebulaEntity {
  /** Display title */
  title: string;

  /** Original title */
  originalTitle?: string;

  /** Overview */
  overview: string;

  /** Release date */
  releaseDate?: string;

  /** Runtime (minutes) */
  runtime?: number;

  /** Average rating */
  rating?: number;

  /** Vote count */
  voteCount?: number;

  /** Genres */
  genres?: string[];

  /** Original language */
  language?: string;

  /** Adult content */
  adult?: boolean;

  /** Images */
  poster?: string;
  backdrop?: string;
  logo?: string;

  /** Trailer */
  trailer?: string;

  /** Franchise / Collection */
  collectionId?: string;
}
