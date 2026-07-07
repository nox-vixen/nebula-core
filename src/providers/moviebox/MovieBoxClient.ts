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
      const body = await res.text();
      throw new Error(`MovieBox request failed: ${res.status}\n${body}`);
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

  async getSeries(id: string) {
    return this.request(`/movie?id=${encodeURIComponent(id)}`);
  }

  async getMovieStreams(id: string): Promise<any> {
    return this.request(
      `/streams/movie?id=${encodeURIComponent(id)}`
    );
  }

  async getEpisodeStreams(
    seriesId: string,
    season: number,
    episode: number
  ): Promise<any> {
    return this.request(
      `/streams/episode?id=${encodeURIComponent(seriesId)}&season=${season}&episode=${episode}`
    );
  }

  async getSubtitles(_id: string): Promise<any[]> {
    return [];
  }
}

export const movieBoxClient = new MovieBoxClient();
