/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/tmdb/mapper.ts
 * Purpose: TMDB → Nebula Mapper
 * Phase: 2
 * ==========================================================
 */

import { NebulaMovie, NebulaSearchResult, NebulaTVShow } from "../../models";
import { TMDBMovie, TMDBMovieDetails, TMDBTVDetails } from "./types";

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


export function mapTMDBMovieDetailsToMovie(
  movie: TMDBMovieDetails
): NebulaMovie {
  return {
    id: String(movie.id),
    providerId: "tmdb",
    sources: {
      metadata: "tmdb",
      artwork: "tmdb",
      ratings: "tmdb"
    },
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


export function mapTMDBTVDetailsToTVShow(
  show: TMDBTVDetails
): NebulaTVShow {
  return {
    id: String(show.id),
    provider: "tmdb",
    title: show.name,
    originalTitle: show.original_name,
    overview: show.overview,
    firstAirDate: show.first_air_date,
    rating: show.vote_average,
    voteCount: show.vote_count,
    seasonCount: show.number_of_seasons,
    episodeCount: show.number_of_episodes,
    genres: show.genres.map(g => g.name),
    language: show.original_language,
    poster: show.poster_path
      ? `${POSTER_BASE}${show.poster_path}`
      : undefined,
    backdrop: show.backdrop_path
      ? `${BACKDROP_BASE}${show.backdrop_path}`
      : undefined,
    seasons: show.seasons.map(s => ({
      season: s.season_number,
      episodes: s.episode_count
    }))
  };
}
