/**
 * ==========================================================
 * NebulaOS
 * File: src/routes/watch.ts
 * Purpose: Universal Watch API
 * Phase: 5.4
 * ==========================================================
 */

import { Router } from "express";
import { watchService } from "../services/WatchService";
import {
  successResponse,
  errorResponse
} from "../utils/apiResponse";
import { logger } from "../utils/logger";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const stream = await watchService.getWatchData(req.params.id);

    res.json(
      successResponse(stream, {
        provider: stream.provider,
        message: "Stream resolved successfully."
      })
    );
  } catch (error) {
    logger.error("WatchRoute", "Failed to resolve movie stream", error);

    res.status(500).json(
      errorResponse(error, {
        message: "Unable to resolve stream."
      })
    );
  }
});

router.get("/:id/subtitles/:resourceId", async (req, res) => {
  try {
    const subtitles = await watchService.getSubtitles(
      req.params.id,
      req.params.resourceId
    );

    res.json(
      successResponse(subtitles, {
        message: "Subtitles retrieved successfully."
      })
    );
  } catch (error) {
    logger.error("WatchRoute", "Failed to retrieve subtitles", error);

    res.status(500).json(
      errorResponse(error, {
        message: "Unable to fetch subtitles."
      })
    );
  }
});

router.get("/series/:id/:season/:episode", async (req, res) => {
  try {
    const stream = await watchService.getEpisodeStreams(
      req.params.id,
      Number(req.params.season),
      Number(req.params.episode)
    );

    res.json(
      successResponse(stream, {
        provider: stream.provider,
        message: "Episode stream resolved successfully."
      })
    );
  } catch (error) {
    logger.error("WatchRoute", "Failed to resolve episode stream", error);

    res.status(500).json(
      errorResponse(error, {
        message: "Unable to resolve episode stream."
      })
    );
  }
});

export default router;
