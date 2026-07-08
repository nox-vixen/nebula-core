/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/index.ts
 * Purpose: Provider Bootstrap
 * Phase: 4.7
 * ==========================================================
 */

import { providerRegistry } from "./ProviderRegistry";

import { movieBoxProvider } from "./moviebox";
import { tmdbProvider } from "./tmdb";

/**
 * Lower number = higher priority
 *
 * Current strategy:
 *  - MovieBox: primary streaming/content provider
 *  - TMDB: metadata and fallback provider
 */
providerRegistry.register(movieBoxProvider, 10);
providerRegistry.register(tmdbProvider, 20);

export * from "./Provider";
export * from "./Capability";
export * from "./ProviderRegistry";

export * from "./tmdb";
export * from "./moviebox";
