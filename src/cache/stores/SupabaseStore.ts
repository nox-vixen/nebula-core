/**
 * ==========================================================
 * NebulaOS
 * File: src/cache/stores/SupabaseStore.ts
 * Purpose: Persistent L2 Cache Store
 * Phase: 3
 * ==========================================================
 */

import { supabase } from "../../lib/supabase";
import { CacheEntry } from "../models/CacheEntry";
import { CacheStore } from "./CacheStore";

export class SupabaseStore implements CacheStore {

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    try {
      const { data, error } = await supabase
        .from("nebula_cache")
        .select("*")
        .eq("key", key)
        .maybeSingle();

      if (error) {
        console.error("[SupabaseStore:get]", error.message);
        return null;
      }

      if (!data) {
        return null;
      }

      return {
        key: data.key,
        value: data.value,
        version: data.version,
        tags: data.tags,
        ttl: data.ttl,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        expiresAt: data.expires_at
      };
    } catch (err) {
      console.error("[SupabaseStore:get]", err);
      return null;
    }
  }

  async set<T>(entry: CacheEntry<T>): Promise<void> {
    try {
      const { error } = await supabase
        .from("nebula_cache")
        .upsert({
          key: entry.key,
          value: entry.value,
          version: entry.version,
          tags: entry.tags,
          ttl: entry.ttl,
          created_at: entry.createdAt,
          updated_at: entry.updatedAt,
          expires_at: entry.expiresAt
        });

      if (error) {
        console.error("[SupabaseStore:set]", error.message);
      }
    } catch (err) {
      console.error("[SupabaseStore:set]", err);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("nebula_cache")
        .delete()
        .eq("key", key);

      if (error) {
        console.error("[SupabaseStore:delete]", error.message);
      }
    } catch (err) {
      console.error("[SupabaseStore:delete]", err);
    }
  }

  async clear(): Promise<void> {
    try {
      const { error } = await supabase
        .from("nebula_cache")
        .delete()
        .neq("key", "");

      if (error) {
        console.error("[SupabaseStore:clear]", error.message);
      }
    } catch (err) {
      console.error("[SupabaseStore:clear]", err);
    }
  }
}
