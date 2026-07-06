/**
 * ==========================================================
 * NebulaOS
 * File: src/providers/moviebox/MovieBoxMapper.ts
 * Purpose: MovieBox → Nebula Model Mapper
 * Phase: 4.1
 * ==========================================================
 */

import {
  NebulaStream,
  NebulaSubtitle
} from "../../models";

import {
  MovieBoxStream,
  MovieBoxSubtitle
} from "./MovieBoxModels";

import { MovieBoxNotImplementedError } from "./MovieBoxExceptions";

export function mapMovieBoxStream(
  _stream: MovieBoxStream
): NebulaStream {
  throw new MovieBoxNotImplementedError("MovieBox stream mapper");
}

export function mapMovieBoxSubtitle(
  _subtitle: MovieBoxSubtitle
): NebulaSubtitle {
  throw new MovieBoxNotImplementedError("MovieBox subtitle mapper");
}
