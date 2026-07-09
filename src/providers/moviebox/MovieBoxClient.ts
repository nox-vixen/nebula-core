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

    let lastError: unknown;

    for (let attempt = 1; attempt <= this.retryCount; attempt++) {
      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, this.timeout);

      try {
        console.log(`[MovieBox] Attempt ${attempt}/${this.retryCount}: ${url}`);

        const res = await fetch(url, {
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (res.ok) {
          return await res.json();
        }

        const body = await res.text();

        console.error("MovieBox URL:", url);
        console.error("Status:", res.status);
        console.error("Response:", body.substring(0, 300));

        if ([502, 503, 504].includes(res.status) && attempt < this.retryCount) {
          console.log(`Retrying in ${attempt} second(s)...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          continue;
        }

        throw new Error(`MovieBox request failed: ${res.status}`);
      } catch (error: any) {
        clearTimeout(timeout);

        lastError = error;

        console.error(
          `MovieBox attempt ${attempt} failed:`,
          error?.message ?? error
        );

        if (attempt >= this.retryCount) {
          break;
        }

        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error("MovieBox request failed");
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

  async getMovieStreams(
    id: string,
    providerRef?: string
  ): Promise<any> {
    let url = `/streams/movie?id=${encodeURIComponent(id)}`;

    if (providerRef) {
      url += `&ref=${encodeURIComponent(providerRef)}`;
    }

    return this.request(url);
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
