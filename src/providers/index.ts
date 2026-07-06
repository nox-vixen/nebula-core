/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/index.ts
 * Purpose: Provider Bootstrap
 * ==========================================================
 */

import { providerRegistry } from "./ProviderRegistry";

import { tmdbProvider } from "./tmdb";
import { movieBoxProvider } from "./moviebox";

providerRegistry.register(tmdbProvider);
providerRegistry.register(movieBoxProvider);

export * from "./Provider";
export * from "./Capability";
export * from "./ProviderRegistry";

export * from "./tmdb";
export * from "./moviebox";
