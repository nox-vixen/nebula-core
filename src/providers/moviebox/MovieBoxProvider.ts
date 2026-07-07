/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxProvider.ts
 * Purpose: MovieBox Provider
 * Phase: 4.2
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

    return (section?.items ?? []).map((item: any) => ({
      id: item.id,
      provider: "moviebox",
      type: item.type === "series" ? "tv" : "movie",
      title: item.title,
      poster: item.poster,
      rating: item.rating,
      year: item.year
    }));
  }

  async search(query: string): Promise<NebulaSearchResult[]> {
    return movieBoxClient.search(query);
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

  async getMovie(_id: string): Promise<NebulaMovie> {
    throw new Error("Coming in Phase 4.3");
  }

  async getSeries(_id: string): Promise<NebulaTVShow> {
    throw new Error("Coming in Phase 4.3");
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

  async getSubtitles(id: string): Promise<NebulaSubtitle[]> {
    return movieBoxClient.getSubtitles(id);
  }
}

export const movieBoxProvider = new MovieBoxProvider();
