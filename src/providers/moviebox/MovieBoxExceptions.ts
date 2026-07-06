/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxExceptions.ts
 * Purpose: MovieBox Provider Exceptions
 * Phase: 4.1
 * ==========================================================
 */

export class MovieBoxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MovieBoxError";
  }
}

export class MovieBoxConnectionError extends MovieBoxError {
  constructor(message = "Unable to connect to MovieBox service.") {
    super(message);
    this.name = "MovieBoxConnectionError";
  }
}

export class MovieBoxTimeoutError extends MovieBoxError {
  constructor(message = "MovieBox request timed out.") {
    super(message);
    this.name = "MovieBoxTimeoutError";
  }
}

export class MovieBoxResponseError extends MovieBoxError {
  constructor(message = "Invalid response received from MovieBox.") {
    super(message);
    this.name = "MovieBoxResponseError";
  }
}

export class MovieBoxNotImplementedError extends MovieBoxError {
  constructor(feature = "Requested feature") {
    super(`${feature} has not been implemented yet.`);
    this.name = "MovieBoxNotImplementedError";
  }
}
