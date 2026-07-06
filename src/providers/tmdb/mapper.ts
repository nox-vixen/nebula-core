/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/tmdb/mapper.ts
 * Purpose: TMDB → Nebula Mapper
 * Phase: 2
 * ==========================================================
 */

import { NebulaMovie, NebulaSearchResult } from "../../models";
import { TMDBMovie, TMDBMovieDetails } from "./types";

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780";

export function mapTMDBMovieToSearchResult(
  movie: TMDBMovie
): NebulaSearchResult {
  return {
    id: String(movie.id),
    providerId: "tmdb",
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


export function mapTMDBMovieDetailsToMovie(
  movie: TMDBMovieDetails
): NebulaMovie {
  return {
    id: String(movie.id),
    providerId: "tmdb",
    title: movie.title,
    originalTitle: movie.original_title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    runtime: movie.runtime,
    rating: movie.vote_average,
    voteCount: movie.vote_count,
    genres: movie.genres.map(g => g.name),
    language: movie.original_language,
    adult: movie.adult,
    poster: movie.poster_path
      ? `${POSTER_BASE}${movie.poster_path}`
      : undefined,
    backdrop: movie.backdrop_path
      ? `${BACKDROP_BASE}${movie.backdrop_path}`
      : undefined,
  };
}
