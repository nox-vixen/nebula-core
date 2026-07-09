import { Router } from "express";
import { homeService } from "../services/HomeService";
import { clusterManager } from "../services/ClusterManager";

const router = Router();

router.get("/", async (_req, res) => {
  void clusterManager.ensureMovieBoxAwake();

  const result = await homeService.getHome();

  res.json({
    ...result,
    cluster: {
      waking: clusterManager.isWaking("moviebox")
    }
  });
});

export default router;
