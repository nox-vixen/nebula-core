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
    const url = `${this.baseUrl}${path}`;

    console.log("[MovieBox]", url);

    const res = await fetch(url);

    if (!res.ok) {
      const body = await res.text();

      console.error("MovieBox URL:", url);
      console.error("Status:", res.status);
      console.error("Response:", body.substring(0, 300));

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

  async getSubtitles(
    id: string,
    resourceId: string
  ): Promise<any[]> {
    const data = await this.request(
      `/subtitles?id=${encodeURIComponent(id)}&resourceId=${encodeURIComponent(resourceId)}`
    );

    return data.subtitles ?? [];
  }
}

export const movieBoxClient = new MovieBoxClient();
