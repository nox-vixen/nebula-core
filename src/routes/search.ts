import { Router } from "express";
import { searchService } from "../search/services/SearchService";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const query = String(req.query.q ?? "").trim();

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Missing search query."
      });
    }

    const result = await searchService.search({
      query,
      page: Number(req.query.page ?? 1)
    });

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Search failed."
    });
  }
});

export default router;
