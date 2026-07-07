import { Router } from "express";
import { movieBoxClient } from "../providers/moviebox";
import { mapMovieBoxMovie } from "../providers/moviebox";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const movie = await movieBoxClient.getMovie(req.params.id);

    res.json({
      success: true,
      movie: mapMovieBoxMovie(movie)
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load movie."
    });
  }
});

export default router;
