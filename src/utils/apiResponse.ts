/**
 * ==========================================================
 * NebulaOS
 * File: src/utils/apiResponse.ts
 * Purpose: Standard API Response Helpers
 * Phase: 5.4
 * ==========================================================
 */

export interface SuccessResponse<T> {
  success: true;
  data: T;
  provider?: string;
  message?: string;
  timestamp: string;
  requestId?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  provider?: string;
  timestamp: string;
  requestId?: string;
}

function now() {
  return new Date().toISOString();
}

export function successResponse<T>(
  data: T,
  options?: {
    provider?: string;
    message?: string;
    requestId?: string;
  }
): SuccessResponse<T> {
  return {
    success: true,
    data,
    provider: options?.provider,
    message: options?.message,
    timestamp: now(),
    requestId: options?.requestId
  };
}

export function errorResponse(
  error: unknown,
  options?: {
    provider?: string;
    message?: string;
    requestId?: string;
  }
): ErrorResponse {
  return {
    success: false,
    error:
      error instanceof Error
        ? error.message
        : String(error),
    message:
      options?.message ?? "Request failed.",
    provider: options?.provider,
    timestamp: now(),
    requestId: options?.requestId
  };
}
