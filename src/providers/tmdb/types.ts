/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/tmdb/types.ts
 * Purpose: TMDB API Types
 * Phase: 2
 * ==========================================================
 */

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  original_language: string;
  adult: boolean;
  genre_ids: number[];
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TMDBTrendingResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}


export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number;
  genres: TMDBGenre[];
}
