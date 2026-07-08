import { Router } from "express";
import { cache } from "../cache";

const router = Router();

router.post("/cache/clear", async (_req, res) => {
  await cache.clear();
  res.json({
    success: true,
    message: "Cache cleared"
  });
});

export default router;
