/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/Provider.ts
 * Purpose: Universal Provider Interface
 * Phase: 4.3
 * ==========================================================
 */

import {
  NebulaMovie,
  NebulaTVShow,
  NebulaEpisode,
  NebulaGenre,
  NebulaStream,
  NebulaSubtitle,
  NebulaSearchResult,
  NebulaHome
} from "../models";

import { ProviderCapability } from "./Capability";

export interface NebulaProvider {
  id: string;
  name: string;
  capabilities: ProviderCapability[];

  healthCheck(): Promise<boolean>;

  getHome(): Promise<NebulaHome>;

  search(query: string): Promise<NebulaSearchResult[]>;
  getTrending(): Promise<NebulaSearchResult[]>;
  getLatest(): Promise<NebulaSearchResult[]>;
  getGenres(): Promise<NebulaGenre[]>;

  getMovie(id: string): Promise<NebulaMovie>;
  getSeries(id: string): Promise<NebulaTVShow>;

  getEpisode(
    seriesId: string,
    season: number,
    episode: number
  ): Promise<NebulaEpisode>;

  getWatchData(id: string): Promise<NebulaStream>;

  getEpisodeStreams(
    seriesId: string,
    season: number,
    episode: number
  ): Promise<NebulaStream>;

  getSubtitles(
    id: string,
    resourceId: string
  ): Promise<NebulaSubtitle[]>;
}
