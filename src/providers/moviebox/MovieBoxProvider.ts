/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxProvider.ts
 * Purpose: MovieBox Provider
 * Phase: 4.1
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

import { MovieBoxNotImplementedError } from "./MovieBoxExceptions";

export const movieBoxProvider: NebulaProvider = {
  id: "moviebox",

  name: "MovieBox",

  capabilities: [
    ProviderCapability.MOVIE,
    ProviderCapability.SERIES,
    ProviderCapability.EPISODE,
    ProviderCapability.WATCH,
    ProviderCapability.SUBTITLES
  ],

  async healthCheck() {
    return false;
  },

  async getHome(): Promise<NebulaSearchResult[]> {
    throw new MovieBoxNotImplementedError("Home");
  },

  async search(_query: string): Promise<NebulaSearchResult[]> {
    throw new MovieBoxNotImplementedError("Search");
  },

  async getTrending(): Promise<NebulaSearchResult[]> {
    throw new MovieBoxNotImplementedError("Trending");
  },

  async getLatest(): Promise<NebulaSearchResult[]> {
    throw new MovieBoxNotImplementedError("Latest");
  },

  async getGenres(): Promise<NebulaGenre[]> {
    throw new MovieBoxNotImplementedError("Genres");
  },

  async getMovie(_id: string): Promise<NebulaMovie> {
    throw new MovieBoxNotImplementedError("Movie");
  },

  async getSeries(_id: string): Promise<NebulaTVShow> {
    throw new MovieBoxNotImplementedError("Series");
  },

  async getEpisode(
    _seriesId: string,
    _season: number,
    _episode: number
  ): Promise<NebulaEpisode> {
    throw new MovieBoxNotImplementedError("Episode");
  },

  async getWatchData(_id: string): Promise<NebulaStream> {
    throw new MovieBoxNotImplementedError("Watch");
  },

  async getSubtitles(_id: string): Promise<NebulaSubtitle[]> {
    throw new MovieBoxNotImplementedError("Subtitles");
  }
};
