/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxConfig.ts
 * Purpose: MovieBox Provider Configuration
 * Phase: 4.1
 * ==========================================================
 */

export const movieBoxConfig = {
  serviceUrl:
    process.env.MOVIEBOX_SERVICE_URL || "http://127.0.0.1:8000",

  timeout: Number(process.env.MOVIEBOX_TIMEOUT || 10000),

  retryCount: Number(process.env.MOVIEBOX_RETRY_COUNT || 3),

  cacheTTL: Number(process.env.MOVIEBOX_CACHE_TTL || 300),

  preferredLanguage:
    process.env.MOVIEBOX_PREFERRED_LANGUAGE || "en",

  preferredQuality:
    process.env.MOVIEBOX_PREFERRED_QUALITY || "1080p",

  subtitleLanguage:
    process.env.MOVIEBOX_SUBTITLE_LANGUAGE || "en"
};
