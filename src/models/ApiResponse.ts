/**
 * ==========================================================
 * NebulaOS
 * File: src/models/ApiResponse.ts
 * Purpose: Standard API Response
 * Phase: 2
 * ==========================================================
 */

export interface NebulaApiResponse<T> {
  success: boolean;
  provider?: string;
  data: T;
  error?: string;
}
