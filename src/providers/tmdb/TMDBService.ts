/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/tmdb/TMDBService.ts
 * Purpose: TMDB HTTP Client
 * Phase: 2
 * ==========================================================
 */

import { env } from "../../config/env";
import { TMDBTrendingResponse, TMDBMovieDetails } from "./types";

class TMDBService {
  private readonly baseUrl = env.TMDB_BASE_URL;
  private readonly token = env.TMDB_API_KEY;

  private get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/json"
    };
  }

  async request<T>(path: string): Promise<T> {
    if (!this.token) {
      throw new Error("TMDB_API_KEY is missing in .env");
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: this.headers
    });

    if (!response.ok) {
      throw new Error(
        `TMDB request failed (${response.status} ${response.statusText})`
      );
    }

    return (await response.json()) as T;
  }

  async getTrendingMovies(): Promise<TMDBTrendingResponse> {
    return this.request("/trending/movie/week");
  }

  async getTopRatedMovies(): Promise<TMDBTrendingResponse> {
    return this.request("/movie/top_rated");
  }

  async getActionMovies(): Promise<TMDBTrendingResponse> {
    return this.request("/discover/movie?with_genres=28");
  }

  async getComedyMovies(): Promise<TMDBTrendingResponse> {
    return this.request("/discover/movie?with_genres=35");
  }

  async getHorrorMovies(): Promise<TMDBTrendingResponse> {
    return this.request("/discover/movie?with_genres=27");
  }

  async getRomanceMovies(): Promise<TMDBTrendingResponse> {
    return this.request("/discover/movie?with_genres=10749");
  }

  async searchMovies(query: string, page = 1): Promise<TMDBTrendingResponse> {
    return this.request(
      `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    );
  }

  async getMovieDetails(id: string): Promise<TMDBMovieDetails> {
    return this.request<TMDBMovieDetails>(`/movie/${id}`);
  }

  async getDocumentaryMovies(): Promise<TMDBTrendingResponse> {
    return this.request("/discover/movie?with_genres=99");
  }
}

export const tmdbService = new TMDBService();
