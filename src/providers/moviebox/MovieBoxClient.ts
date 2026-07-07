/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxClient.ts
 * Purpose: Internal MovieBox Service Client
 * Phase: 4.2
 * ==========================================================
 */

import { movieBoxConfig } from "./MovieBoxConfig";

export class MovieBoxClient {
  readonly baseUrl = movieBoxConfig.serviceUrl;
  readonly timeout = movieBoxConfig.timeout;
  readonly retryCount = movieBoxConfig.retryCount;

  private async request(path: string) {
    const res = await fetch(`${this.baseUrl}${path}`);

    if (!res.ok) {
      throw new Error(`MovieBox request failed: ${res.status}`);
    }

    return res.json();
  }

  async health() {
    return this.request("/health");
  }

  async getHome(page = 1) {
    return this.request(`/home?page=${page}`);
  }

  async search(query: string, page = 1) {
    return this.request(
      `/search?query=${encodeURIComponent(query)}&page=${page}`
    );
  }

  async getMovie(id: string) {
    return this.request(`/movie?id=${encodeURIComponent(id)}`);
  }

  async getMovieStreams(id: string): Promise<any> {
    return this.request(
      `/streams/movie?id=${encodeURIComponent(id)}`
    );
  }

  async getEpisodeStreams(
    _seriesId: string,
    _season: number,
    _episode: number
  ): Promise<any> {
    throw new Error("Episode streams not implemented yet.");
  }

  async getSubtitles(_id: string): Promise<any[]> {
    return [];
  }
}

export const movieBoxClient = new MovieBoxClient();
