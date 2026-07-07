/**
 * ==========================================================
 * NebulaOS
 * File: src/models/media/TVShow.ts
 * Purpose: Universal TV Show Model
 * Phase: 4.6
 * ==========================================================
 */

import { NebulaSeason } from "./Season";

export interface NebulaTVShow {
  /** Unique ID within the provider */
  id: string;

  /** Provider identifier */
  provider: string;

  /** Series title */
  title: string;

  /** Original title */
  originalTitle?: string;

  /** Description */
  overview: string;

  /** First air date */
  firstAirDate?: string;

  /** Last air date */
  lastAirDate?: string;

  /** Current status */
  status?: string;

  /** Total number of seasons */
  seasonCount?: number;

  /** Total number of episodes */
  episodeCount?: number;

  /** Season list */
  seasons?: NebulaSeason[];

  /** Average rating */
  rating?: number;

  /** Vote count */
  voteCount?: number;

  /** Genre names */
  genres?: string[];

  /** Original language */
  language?: string;

  /** Poster image */
  poster?: string;

  /** Backdrop image */
  backdrop?: string;

  /** Logo image */
  logo?: string;

  /** Trailer URL */
  trailer?: string;
}
