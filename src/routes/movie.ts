/**
 * ==========================================================
 * NebulaOS
 * File: src/routes/movie.ts
 * Purpose: Universal Movie API
 * Phase: 4.3
 * ==========================================================
 */

import { Router } from "express";
import { movieService } from "../services/MovieService";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const result = await movieService.getMovie(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
