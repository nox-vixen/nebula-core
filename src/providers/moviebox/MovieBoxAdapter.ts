/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxAdapter.ts
 * Purpose: MovieBox JS SDK Adapter
 * Phase: 5
 * ==========================================================
 */

import {
  MovieboxSession,
  getMovieStreamUrl,
  getEpisodeStreamUrl,
  getMovieDetails,
  getSeriesDetails,
  search
} from "moviebox-js-sdk";

import type {
  NebulaStream,
  NebulaSubtitle
} from "../../models";


class MovieBoxAdapter {

  private readonly session: MovieboxSession;


  constructor() {
    this.session = new MovieboxSession();
  }


  async search(query: string) {
    return search(this.session, {
      query
    });
  }


  async getMovieDetails(detailPath: string) {
    return getMovieDetails(
      this.session,
      {
        detailPath
      }
    );
  }


  async getSeriesDetails(detailPath: string) {
    return getSeriesDetails(
      this.session,
      {
        detailPath
      }
    );
  }


  async getMovieStream(
    detailPath: string,
    quality?: "best" | "worst" | number
  ): Promise<NebulaStream> {

    const result =
      await getMovieStreamUrl(
        this.session,
        {
          detailPath,
          quality
        }
      );


    return normalizeStreamResult(result);
  }


  async getEpisodeStream(
    detailPath: string,
    season: number,
    episode: number,
    quality?: "best" | "worst" | number
  ): Promise<NebulaStream> {

    const result =
      await getEpisodeStreamUrl(
        this.session,
        {
          detailPath,
          season,
          episode,
          quality
        }
      );


    return normalizeStreamResult(result);
  }


  normalizeSubtitles(
    captions: any[]
  ): NebulaSubtitle[] {

    return captions.map(
      subtitle => ({
        id: subtitle.id,
        language:
          subtitle.languageCode ||
          subtitle.language ||
          "unknown",

        label:
          subtitle.language ||
          subtitle.languageCode ||
          "Unknown",

        url: subtitle.url,

        format: "vtt",

        isDefault: false,

        isForced: false
      })
    );
  }

}


function normalizeStreamResult(
  result: any
): NebulaStream {

  const stream = result.stream;


  if (!stream) {
    throw new Error(
      "MovieBox returned no playable stream"
    );
  }


  return {

    id: stream.id,

    provider: "moviebox",

    url: stream.url,


    quality: stream.quality,

    resolution: stream.resolution,


    format: stream.format,

    container: stream.format,


    codec: stream.codec,

    videoCodec: stream.codec,


    size: stream.sizeBytes,

    duration: stream.durationSeconds,


    subtitles:
      Boolean(result.captions?.length),


    isBrowserCompatible:
      isBrowserCompatible(stream.codec, stream.format)

  };

}



function isBrowserCompatible(
  codec: string,
  format: string
): boolean {

  const value =
    `${codec} ${format}`.toLowerCase();


  if (
    value.includes("hevc") ||
    value.includes("h265") ||
    value.includes("av1")
  ) {
    return false;
  }


  return true;
}



export const movieBoxAdapter =
  new MovieBoxAdapter();
