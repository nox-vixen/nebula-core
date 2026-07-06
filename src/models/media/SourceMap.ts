/**
 * ==========================================================
 * NebulaOS
 * File: src/models/media/SourceMap.ts
 * Purpose: Universal source attribution model
 * Phase: 3
 * ==========================================================
 */

export interface NebulaSourceMap {
  metadata: string;
  artwork?: string;
  streams?: string;
  subtitles?: string;
  ratings?: string;
}
