/**
 * NebulaOS Universal Movie Model
 * Every provider must map its movie data into this format.
 */

export interface NebulaMovie {
  /** Unique ID within the provider */
  id: string;

  /** Provider identifier (tmdb, moviebox, etc.) */
  provider: string;

  /** Display title */
  title: string;

  /** Original title, if different */
  originalTitle?: string;

  /** Synopsis */
  overview: string;

  /** Release date (ISO format preferred) */
  releaseDate?: string;

  /** Runtime in minutes */
  runtime?: number;

  /** Average rating */
  rating?: number;

  /** Number of votes */
  voteCount?: number;

  /** Genre names */
  genres?: string[];

  /** Original language */
  language?: string;

  /** Adult content flag */
  adult?: boolean;

  /** Poster image URL */
  poster?: string;

  /** Backdrop image URL */
 backdrop?: string;

  /** Logo image URL */
  logo?: string;

  /** Trailer URL */
  trailer?: string;
}
