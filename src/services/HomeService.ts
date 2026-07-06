/**
 * ==========================================================
 * NebulaOS
 * File: src/services/HomeService.ts
 * Purpose: Home Service
 * Phase: 3
 * ==========================================================
 */

import { cache } from "../cache";
import { CacheKey } from "../cache/models/CacheKey";
import { CacheTTL } from "../cache/models/CacheTTL";

import { tmdbService } from "../providers/tmdb/TMDBService";
import { mapTMDBMovieToSearchResult } from "../providers/tmdb/mapper";

class HomeService {
  async getHome() {
    return cache.remember(
      CacheKey.home("default"),
      CacheTTL.HOME,
      async () => {
        const [
          trending,
          topRated,
          action,
          comedy,
          horror,
          romance,
          documentaries
        ] = await Promise.all([
          tmdbService.getTrendingMovies(),
          tmdbService.getTopRatedMovies(),
          tmdbService.getActionMovies(),
          tmdbService.getComedyMovies(),
          tmdbService.getHorrorMovies(),
          tmdbService.getRomanceMovies(),
          tmdbService.getDocumentaryMovies()
        ]);

        const trendingData = trending.results.map(mapTMDBMovieToSearchResult);

        return {
          success: true,
          provider: "tmdb",

          featured: trendingData.slice(0, 5),
          trending: trendingData,

          topRated: topRated.results.map(mapTMDBMovieToSearchResult),
          action: action.results.map(mapTMDBMovieToSearchResult),
          comedy: comedy.results.map(mapTMDBMovieToSearchResult),
          horror: horror.results.map(mapTMDBMovieToSearchResult),
          romance: romance.results.map(mapTMDBMovieToSearchResult),
          documentaries: documentaries.results.map(mapTMDBMovieToSearchResult)
        };
      },
      ["home", "tmdb"]
    );
  }
}

export const homeService = new HomeService();
