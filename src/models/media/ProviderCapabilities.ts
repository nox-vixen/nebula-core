/**
 * ==========================================================
 * NebulaOS
 * File: src/models/media/ProviderCapabilities.ts
 * Purpose: Universal Provider Descriptor
 * Phase: 3
 * ==========================================================
 */

export interface NebulaProviderCapabilities {
  /** Unique provider ID (tmdb, moviebox, etc.) */
  id: string;

  /** Human-readable provider name */
  name: string;

  /** Provider version */
  version?: string;

  /** Whether Nebula should use this provider */
  enabled: boolean;

  /** Latest health check result */
  healthy: boolean;

  /** Lower value = higher priority */
  priority: number;

  /** Supported features */
  features: {
    search: boolean;
    details: boolean;
    streaming: boolean;
    subtitles: boolean;
    download: boolean;
    anime: boolean;
    liveTV: boolean;
    books: boolean;
    music: boolean;
    collections: boolean;
  };
}
