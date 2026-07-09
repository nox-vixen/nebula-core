/**
 * ==========================================================
 * NebulaOS
 * File: src/models/media/NebulaEntity.ts
 * Purpose: Base Entity for all Nebula media models
 * Phase: 3
 * ==========================================================
 */

export interface NebulaEntity {
  /** Nebula Universal Resource Identifier (NURI) */
  id: string;

  /** Original provider ID */
  providerId: string;

  /** Provider-specific opaque reference (e.g. MovieBox detailPath) */
  providerRef?: string;

  /** Source attribution */
  sources: {
    metadata: string;
    artwork?: string;
    streams?: string;
    subtitles?: string;
    ratings?: string;
  };

  /** External IDs indexed by provider name */
  externalIds?: Record<string, string>;

  /** Cache timestamps */
  createdAt?: string;
  updatedAt?: string;
}
