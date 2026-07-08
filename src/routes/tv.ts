import { Router } from "express";
import { tvService } from "../services/TVService";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const series = await tvService.getSeries(req.params.id);

    res.json({
      success: true,
      series
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Unable to fetch series details."
    });
  }
});

export default router;
