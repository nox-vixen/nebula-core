/**
 * ==========================================================
 * NebulaOS
 * File: src/config/env.ts
 * Purpose: Environment Configuration
 * Phase: 2
 * ==========================================================
 */

import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT ?? 3000),

  TMDB_API_KEY: process.env.TMDB_API_KEY ?? "",

  TMDB_BASE_URL:
    process.env.TMDB_BASE_URL ??
    "https://api.themoviedb.org/3",

  TMDB_IMAGE_URL:
    process.env.TMDB_IMAGE_URL ??
    "https://image.tmdb.org/t/p/original"
};
