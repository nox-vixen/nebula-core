/**
 * ==========================================================
 * NebulaOS
 * File: src/config/env.ts
 * Purpose: Environment Configuration
 * Phase: 3
 * ==========================================================
 */

import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  PORT: Number(process.env.PORT ?? 3000),

  TMDB_API_KEY: required("TMDB_API_KEY"),

  TMDB_BASE_URL:
    process.env.TMDB_BASE_URL ??
    "https://api.themoviedb.org/3",

  TMDB_IMAGE_URL:
    process.env.TMDB_IMAGE_URL ??
    "https://image.tmdb.org/t/p/original",

  SUPABASE_URL: required("SUPABASE_URL"),

  SUPABASE_SERVICE_ROLE_KEY: required("SUPABASE_SERVICE_ROLE_KEY")
};
