/**
 * ==========================================================
 * NebulaOS
 * File: src/utils/logger.ts
 * Purpose: Centralized Logger
 * Phase: 5.2
 * ==========================================================
 */

type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

function write(
  level: LogLevel,
  source: string,
  message: string,
  meta?: unknown
) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}] [${source}]`;

  if (meta !== undefined) {
    console.log(prefix, message, meta);
  } else {
    console.log(prefix, message);
  }
}

export const logger = {
  info(source: string, message: string, meta?: unknown) {
    write("INFO", source, message, meta);
  },

  warn(source: string, message: string, meta?: unknown) {
    write("WARN", source, message, meta);
  },

  error(source: string, message: string, meta?: unknown) {
    write("ERROR", source, message, meta);
  },

  debug(source: string, message: string, meta?: unknown) {
    if (process.env.NODE_ENV !== "production") {
      write("DEBUG", source, message, meta);
    }
  }
};
