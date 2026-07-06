/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/tmdb/mapper.ts
 * Purpose: TMDB → Nebula Mapper
 * Phase: 2
 * ==========================================================
 */

import { env } from "../../config/env";
import { NebulaSearchResult } from "../../models";
import { TMDBMovie } from "./types";

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
      ? `${env.TMDB_IMAGE_URL}${movie.poster_path}`
      : undefined,
    backdrop: movie.backdrop_path
      ? `${env.TMDB_IMAGE_URL}${movie.backdrop_path}`
      : undefined
  };
}
