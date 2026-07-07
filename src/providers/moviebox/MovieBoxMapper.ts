/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxMapper.ts
 * Purpose: MovieBox → Nebula Mapper
 * Phase: 4.3
 * ==========================================================
 */

import {
  NebulaMovie,
  NebulaSearchResult,
  NebulaStream,
  NebulaSubtitle,
  NebulaTVShow
} from "../../models";

import {
  MovieBoxStream,
  MovieBoxSubtitle
} from "./MovieBoxModels";

import { MovieBoxNotImplementedError } from "./MovieBoxExceptions";

export function mapMovieBoxSearchResult(item: any): NebulaSearchResult {
  return {
    id: String(item.id),
    provider: "moviebox",
    type: item.type === "series" ? "tv" : "movie",
    title: item.title,
    poster: item.poster,
    rating: item.rating,
    year: item.year
  };
}

export function mapMovieBoxMovie(movie: any): NebulaMovie {
  const runtime =
    typeof movie.duration === "string"
      ? (() => {
          const h = Number(movie.duration.match(/(\d+)h/)?.[1] ?? 0);
          const m = Number(movie.duration.match(/(\d+)m/)?.[1] ?? 0);
          return h * 60 + m;
        })()
      : undefined;

  return {
    id: String(movie.id),
    providerId: "moviebox",
    sources: {
      metadata: "moviebox",
      artwork: "moviebox",
      ratings: "moviebox"
    },
    title: movie.title,
    originalTitle: movie.title,
    overview: movie.description ?? "",
    releaseDate: movie.year ? `${movie.year}-01-01` : undefined,
    runtime,
    rating: movie.rating,
    genres: movie.genres ?? [],
    language: undefined,
    adult: false,
    poster: movie.poster,
    backdrop: undefined
  };
}

export function mapMovieBoxStream(
  _stream: MovieBoxStream
): NebulaStream {
  throw new MovieBoxNotImplementedError("MovieBox stream mapper");
}

export function mapMovieBoxSubtitle(
  subtitle: MovieBoxSubtitle
): NebulaSubtitle {
  return {
    id: subtitle.language,
    language: subtitle.language,
    label: subtitle.label,
    url: subtitle.url,
    isDefault: subtitle.language === "en"
  };
}


export function mapMovieBoxSeries(series: any): NebulaTVShow {
  return {
    id: String(series.id),
    provider: "moviebox",
    title: series.title,
    originalTitle: series.title,
    overview: series.description ?? "",
    firstAirDate: series.year ? `${series.year}-01-01` : undefined,
    rating: series.rating,
    genres: series.genres ?? [],
    poster: series.poster,
    backdrop: undefined,
    seasonCount: Array.isArray(series.seasons) ? series.seasons.length : undefined,
    episodeCount: Array.isArray(series.seasons)
      ? series.seasons.reduce((t: number, s: any) => t + (s.episodes ?? 0), 0)
      : undefined,
    seasons: (series.seasons ?? []).map((season: any) => ({
      season: season.season,
      episodes: season.episodes,
      maxResolution: season.maxResolution
    }))
  };
}
