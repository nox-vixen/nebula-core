import { Router } from "express";
import { watchService } from "../services/WatchService";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const stream = await watchService.getWatchData(req.params.id);
    res.json({ success: true, stream });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch watch data."
    });
  }
});

export default router;
