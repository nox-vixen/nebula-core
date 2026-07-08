/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/tmdb/TMDBProvider.ts
 * Purpose: TMDB Provider
 * Phase: 4.3
 * ==========================================================
 */

import { NebulaProvider } from "../Provider";
import { ProviderCapability } from "../Capability";

import {
  NebulaEpisode,
  NebulaGenre,
  NebulaHome,
  NebulaMovie,
  NebulaSearchResult,
  NebulaStream,
  NebulaSubtitle,
  NebulaTVShow
} from "../../models";

import { tmdbService } from "./TMDBService";
import { mapTMDBMovieToSearchResult } from "./mapper";

export const tmdbProvider: NebulaProvider = {
  id: "tmdb",

  name: "TMDB",

  capabilities: [
    ProviderCapability.HOME,
    ProviderCapability.SEARCH,
    ProviderCapability.TRENDING,
    ProviderCapability.LATEST,
    ProviderCapability.MOVIE,
    ProviderCapability.SERIES,
    ProviderCapability.EPISODE,
    ProviderCapability.WATCH,
    ProviderCapability.SUBTITLES,
    ProviderCapability.GENRES
  ],

  async healthCheck() {
    return true;
  },

  async getHome(): Promise<NebulaHome> {
    const response = await tmdbService.getTrendingMovies();

    const items = response.results.map(mapTMDBMovieToSearchResult);

    return {
      provider: "tmdb",
      banner: items.slice(0, 5),
      sections: [
        {
          title: "Trending",
          type: "TRENDING",
          items
        }
      ]
    };
  },

  async search(_query: string): Promise<NebulaSearchResult[]> {
    return [];
  },

  async getTrending(): Promise<NebulaSearchResult[]> {
    return (await this.getHome()).sections[0]?.items ?? [];
  },

  async getLatest(): Promise<NebulaSearchResult[]> {
    return [];
  },

  async getGenres(): Promise<NebulaGenre[]> {
    return [];
  },

  async getMovie(_id: string): Promise<NebulaMovie> {
    throw new Error("Not implemented");
  },

  async getSeries(_id: string): Promise<NebulaTVShow> {
    throw new Error("Not implemented");
  },

  async getEpisode(
    _seriesId: string,
    _season: number,
    _episode: number
  ): Promise<NebulaEpisode> {
    throw new Error("Not implemented");
  },

  async getWatchData(id: string): Promise<NebulaStream> {
    return {
      id,
      provider: "tmdb",
      url: "https://example.com/not-implemented",
      quality: "1080p",
      format: "mp4"
    };
  },

  async getEpisodeStreams(): Promise<any> {
    throw new Error("TMDB does not provide streams.");
  },

  async getSubtitles(): Promise<NebulaSubtitle[]> {
    return [];
  }
};
