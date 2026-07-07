import { Router } from "express";
import { providerManager } from "../services/ProviderManager";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const provider = providerManager.getDefaultProvider();

    const series = await provider.getSeries(req.params.id);

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
