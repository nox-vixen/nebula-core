import watchRoute from "./routes/watch";
import movieRoute from "./routes/movie";
import "./providers";
import express from "express";
import cors from "cors";
import homeRoute from "./routes/home";
import searchRoute from "./routes/search";
import tvRoute from "./routes/tv";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/home", homeRoute);
app.use("/api/search", searchRoute);
app.use("/api/watch", watchRoute);
app.use("/api/movie", movieRoute);
app.use("/api/tv", tvRoute);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    name: "Nebula Core",
    version: "0.1.0-alpha",
    status: "healthy",
  });
});


app.get("/api/debug/moviebox", (_req, res) => {
  res.json({
    moviebox: process.env.MOVIEBOX_SERVICE_URL,
  });
});

export default app;
