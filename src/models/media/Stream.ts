/**
 * ==========================================================
 * NebulaOS
 * File: src/models/media/Stream.ts
 * Purpose: Universal Streaming Model
 * Phase: 5
 * ==========================================================
 */

export interface NebulaStream {

  id: string;

  provider: string;

  url: string;


  // Quality
  quality?: string;
  resolution?: number;


  // Container / delivery
  format?: string;
  container?: string;
  mimeType?: string;


  // Encoding
  codec?: string;
  videoCodec?: string;
  audioCodec?: string;


  // Technical metadata
  bitrate?: number;
  size?: number;
  duration?: number;


  // Audio
  audio?: string;
  language?: string;


  // Video features
  hdr?: boolean;


  // Subtitle availability
  subtitles?: boolean;


  // Browser playback
  isBrowserCompatible?: boolean;


  // URL lifecycle
  expiresAt?: string;

}
