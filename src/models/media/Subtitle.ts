/**
 * ==========================================================
 * NebulaOS
 * File: src/models/media/Subtitle.ts
 * Purpose: Universal Subtitle Model
 * Phase: 5
 * ==========================================================
 */

export interface NebulaSubtitle {

  id: string;

  language: string;

  label: string;

  url: string;


  // Subtitle format
  format?: string;


  // Playback flags
  isDefault?: boolean;

  isForced?: boolean;

}
