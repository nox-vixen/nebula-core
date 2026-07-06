/**
 * ==========================================================
 * NebulaOS
 * File: src/models/Subtitle.ts
 * Purpose: Universal Subtitle Model
 * Phase: 2
 * ==========================================================
 */

export interface NebulaSubtitle {
  id: string;
  language: string;
  label: string;
  url: string;
  isDefault?: boolean;
}
