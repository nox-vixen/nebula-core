/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxProvider.ts
 * Purpose: MovieBox Provider
 * Phase: 4.3
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

import { movieBoxClient } from "./MovieBoxClient";
import {
  mapMovieBoxSearchResult,
  mapMovieBoxMovie,
  mapMovieBoxSeries
} from "./MovieBoxMapper";

class MovieBoxProvider implements NebulaProvider {
  id = "moviebox";
  name = "MovieBox";

  capabilities = [
    ProviderCapability.MOVIE,
    ProviderCapability.SERIES,
    ProviderCapability.EPISODE,
    ProviderCapability.WATCH,
    ProviderCapability.SUBTITLES
  ];

  async healthCheck() {
    return movieBoxClient.health();
  }

  async getHome(): Promise<NebulaSearchResult[]> {
    const data = await movieBoxClient.getHome();

    const section =
      data.sections.find((s: any) => s.type === "SUBJECTS_MOVIE") ??
      data.sections[0];

    return (section?.items ?? []).map(mapMovieBoxSearchResult);
  }

  async search(query: string): Promise<NebulaSearchResult[]> {
    const response = await movieBoxClient.search(query);
    return (response.results ?? []).map(mapMovieBoxSearchResult);
  }

  async getTrending() {
    return this.getHome();
  }

  async getLatest() {
    return this.getHome();
  }

  async getGenres(): Promise<NebulaGenre[]> {
    return [];
  }

  async getMovie(id: string): Promise<NebulaMovie> {
    const movie = await movieBoxClient.getMovie(id);
    return mapMovieBoxMovie(movie);
  }

  async getSeries(id: string): Promise<NebulaTVShow> {
    const data = await movieBoxClient.getSeries(id);
    return mapMovieBoxSeries(data);
  }

  async getEpisode(
    _seriesId: string,
    _season: number,
    _episode: number
  ): Promise<NebulaEpisode> {
    throw new Error("Coming in Phase 4.3");
  }

  async getWatchData(id: string): Promise<NebulaStream> {
    return movieBoxClient.getMovieStreams(id);
  }

  async getEpisodeStreams(
    seriesId: string,
    season: number,
    episode: number
  ): Promise<NebulaStream> {
    return movieBoxClient.getEpisodeStreams(
      seriesId,
      season,
      episode
    );
  }

  async getSubtitles(id: string): Promise<NebulaSubtitle[]> {
    return movieBoxClient.getSubtitles(id);
  }
}

export const movieBoxProvider = new MovieBoxProvider();
