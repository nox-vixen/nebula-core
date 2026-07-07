/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxMapper.ts
 * Purpose: MovieBox → Nebula Mapper
 * Phase: 4.3
 * ==========================================================
 */

import { NebulaSearchResult } from "../../models";

export function mapMovieBoxSearchResult(item: any): NebulaSearchResult {
  return {
    id: String(item.id),
    provider: "moviebox",
    type: item.type === "series" ? "tv" : "movie",
    title: item.title,
    overview: item.overview,
    poster: item.poster,
    backdrop: item.backdrop,
    rating: item.rating,
    year: item.year
  };
}
