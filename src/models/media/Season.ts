/**
 * ==========================================================
 * NebulaOS
 * File: src/models/media/Season.ts
 * Purpose: Universal Season Model
 * Phase: 4.6
 * ==========================================================
 */

export interface NebulaSeason {
  /** Season number */
  season: number;

  /** Number of episodes */
  episodes: number;

  /** Best available stream resolution */
  maxResolution?: number;
}
