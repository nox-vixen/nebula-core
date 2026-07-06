/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxClient.ts
 * Purpose: Internal MovieBox Service Client
 * Phase: 4.1
 * ==========================================================
 */

import { movieBoxConfig } from "./MovieBoxConfig";
import { MovieBoxNotImplementedError } from "./MovieBoxExceptions";

export class MovieBoxClient {
  readonly baseUrl = movieBoxConfig.serviceUrl;

  readonly timeout = movieBoxConfig.timeout;

  readonly retryCount = movieBoxConfig.retryCount;

  async health() {
    throw new MovieBoxNotImplementedError("MovieBox health check");
  }

  async getMovieStreams(_id: string) {
    throw new MovieBoxNotImplementedError("Movie stream resolution");
  }

  async getEpisodeStreams(
    _seriesId: string,
    _season: number,
    _episode: number
  ) {
    throw new MovieBoxNotImplementedError("Episode stream resolution");
  }

  async getSubtitles(_id: string) {
    throw new MovieBoxNotImplementedError("Subtitle resolution");
  }
}

export const movieBoxClient = new MovieBoxClient();
