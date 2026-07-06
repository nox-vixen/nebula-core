/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/index.ts
 * Purpose: Provider Bootstrap
 * ==========================================================
 */

import { providerRegistry } from "./ProviderRegistry";
import { tmdbProvider } from "./tmdb";

providerRegistry.register(tmdbProvider);

export * from "./Provider";
export * from "./Capability";
export * from "./ProviderRegistry";
export * from "./tmdb";
