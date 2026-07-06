/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/tmdb/TMDBProvider.ts
 * Purpose: TMDB Provider
 * Phase: 2
 * ==========================================================
 */

import { NebulaProvider } from "../Provider";
import { ProviderCapability } from "../Capability";

import {
  NebulaEpisode,
  NebulaGenre,
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

  async getHome(): Promise<NebulaSearchResult[]> {
    const response = await tmdbService.getTrendingMovies();

    return response.results.map(mapTMDBMovieToSearchResult);
  },

  async search(_query: string): Promise<NebulaSearchResult[]> {
    return [];
  },

  async getTrending(): Promise<NebulaSearchResult[]> {
    return this.getHome();
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

  async getWatchData(_id: string): Promise<NebulaStream> {
    throw new Error("Not implemented");
  },

  async getSubtitles(_id: string): Promise<NebulaSubtitle[]> {
    return [];
  }
};
