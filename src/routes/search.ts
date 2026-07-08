/**
 * ==========================================================
 * NebulaOS
 * File: src/routes/search.ts
 * Purpose: Universal Search API
 * Phase: 4.3
 * ==========================================================
 */

import { Router } from "express";
import { searchService } from "../services/SearchService";

const router = Router();

router.get("/", async (req, res) => {
  const query = String(req.query.q ?? "").trim();

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "Missing search query."
    });
  }

  try {
    const result = await searchService.search(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
