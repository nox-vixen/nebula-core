import { Router } from "express";
import { tmdbService } from "../providers/tmdb/TMDBService";
import { mapTMDBMovieDetailsToMovie } from "../providers/tmdb/mapper";
import { TMDBMovieDetails } from "../providers/tmdb/types";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const movie = await tmdbService.getMovieDetails(req.params.id) as TMDBMovieDetails;

    res.json({
      success: true,
      movie: mapTMDBMovieDetailsToMovie(movie)
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
