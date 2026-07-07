/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxModels.ts
 * Purpose: Internal MovieBox Models
 * Phase: 4.1
 * ==========================================================
 */

export interface MovieBoxStream {
  id: string;
  url: string;
  quality: string;
  format: string;
}

export interface MovieBoxSubtitle {
  language: string;
  label: string;
  url: string;
  delay?: number;
  size?: number;
}

export interface MovieBoxHealth {
  online: boolean;
  version?: string;
  latency?: number;
}
