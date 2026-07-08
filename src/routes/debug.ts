import { Router } from "express";
import { cache } from "../cache";
import { providerRegistry } from "../providers";

const router = Router();

router.get("/", async (_req, res) => {
  res.json({
    providers: await providerRegistry.health()
  });
});

router.post("/cache/clear", async (_req, res) => {
  await cache.clear();

  res.json({
    success: true,
    message: "Cache cleared"
  });
});

export default router;
