/**
 * NebulaOS Universal TV Show Model
 * Every provider must map TV series into this format.
 */

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

  /** Current status (Returning, Ended, etc.) */
  status?: string;

  /** Number of seasons */
  seasons?: number;

  /** Number of episodes */
  episodes?: number;

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
