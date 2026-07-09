/**
 * ==========================================================
 * NebulaOS
 * File: src/routes/movie.ts
 * Purpose: Universal Movie API
 * Phase: 5.4
 * ==========================================================
 */

import { Router } from "express";
import { movieService } from "../services/MovieService";
import {
  successResponse,
  errorResponse
} from "../utils/apiResponse";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const result = await movieService.getMovie(req.params.id);

    res.json(
      successResponse(result, {
        provider: result.provider,
        message: "Movie retrieved successfully."
      })
    );
  } catch (error) {
    res.status(500).json(
      errorResponse(error, {
        message: "Unable to retrieve movie."
      })
    );
  }
});

export default router;
