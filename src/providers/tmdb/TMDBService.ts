/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/tmdb/TMDBService.ts
 * Purpose: TMDB HTTP Client
 * Phase: 2
 * ==========================================================
 */

import { env } from "../../config/env";
import { TMDBTrendingResponse } from "./types";

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
    try {
      if (!this.token) {
        throw new Error("TMDB_API_KEY is missing in .env");
      }

      const url = `${this.baseUrl}${path}`;

      console.log("==================================");
      console.log("TMDB Request");
      console.log("URL:", url);
      console.log("==================================");

      const response = await fetch(url, {
        headers: this.headers
      });

      console.log("Status:", response.status);

      if (!response.ok) {
        const text = await response.text();

        console.error("TMDB Error Response:");
        console.error(text);

        throw new Error(
          `TMDB request failed (${response.status} ${response.statusText})`
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("==================================");
      console.error("TMDB FETCH FAILED");
      console.error(error);
      console.error("==================================");
      throw error;
    }
  }

  async getTrendingMovies(): Promise<TMDBTrendingResponse> {
    return this.request<TMDBTrendingResponse>(
      "/trending/movie/week"
    );
  }
}

export const tmdbService = new TMDBService();
