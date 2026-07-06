/**
 * ==========================================================
 * NebulaOS
 * File: src/models/Stream.ts
 * Purpose: Universal Stream Model
 * Phase: 2
 * ==========================================================
 */

export interface NebulaStream {
  id: string;
  provider: string;
  url: string;
  quality?: string;
  format?: string;
  size?: number;
  audio?: string;
  subtitles?: boolean;
}
