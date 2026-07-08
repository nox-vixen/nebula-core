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
  NebulaHome,
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
  mapMovieBoxSeries,
  mapMovieBoxSubtitle
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

  async getHome(): Promise<NebulaHome> {
    const data = await movieBoxClient.getHome();

    const banner =
      (data.sections?.find((s: any) => s.type === "BANNER")?.items ?? [])
        .map(mapMovieBoxSearchResult);

    const sections =
      (data.sections ?? [])
        .filter((s: any) => Array.isArray(s.items) && s.items.length > 0)
        .map((section: any) => ({
          title: section.title,
          type: section.type,
          items: section.items.map(mapMovieBoxSearchResult)
        }));

    return {
      provider: "moviebox",
      banner,
      sections
    };
  }

  async search(query: string): Promise<NebulaSearchResult[]> {
    const response = await movieBoxClient.search(query);
    return (response.results ?? []).map(mapMovieBoxSearchResult);
  }

  async getTrending() {
    return (await this.getHome()).sections[0]?.items ?? [];
  }

  async getLatest() {
    return (await this.getHome()).sections[0]?.items ?? [];
  }

  async getGenres(): Promise<NebulaGenre[]> {
    return [];
  }

  async getMovie(id: string): Promise<NebulaMovie> {
    return mapMovieBoxMovie(await movieBoxClient.getMovie(id));
  }

  async getSeries(id: string): Promise<NebulaTVShow> {
    return mapMovieBoxSeries(await movieBoxClient.getSeries(id));
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
    return movieBoxClient.getEpisodeStreams(seriesId, season, episode);
  }

  async getSubtitles(
    id: string,
    resourceId: string
  ): Promise<NebulaSubtitle[]> {
    return (await movieBoxClient.getSubtitles(id, resourceId))
      .map(mapMovieBoxSubtitle);
  }
}

export const movieBoxProvider = new MovieBoxProvider();
