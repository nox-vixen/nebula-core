/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/tmdb/mapper.ts
 * Purpose: TMDB → Nebula Mapper
 * Phase: 2
 * ==========================================================
 */

import { NebulaSearchResult } from "../../models";
import { TMDBMovie } from "./types";

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780";

export function mapTMDBMovieToSearchResult(
  movie: TMDBMovie
): NebulaSearchResult {
  return {
    id: String(movie.id),
    provider: "tmdb",
    type: "movie",
    title: movie.title,
    overview: movie.overview,
    rating: movie.vote_average,
    year: movie.release_date
      ? Number(movie.release_date.substring(0, 4))
      : undefined,
    poster: movie.poster_path
      ? `${POSTER_BASE}${movie.poster_path}`
      : undefined,
    backdrop: movie.backdrop_path
      ? `${BACKDROP_BASE}${movie.backdrop_path}`
      : undefined,
  };
}
