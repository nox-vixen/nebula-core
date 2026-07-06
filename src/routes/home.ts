import { Router } from "express";
import { homeService } from "../services/HomeService";

const router = Router();

router.get("/", async (_req, res) => {
  const result = await homeService.getHome();
  res.json(result);
});

export default router;
