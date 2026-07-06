import "./providers";
import express from "express";
import cors from "cors";
import homeRoute from "./routes/home";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/home", homeRoute);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    name: "Nebula Core",
    version: "0.1.0-alpha",
    status: "healthy",
  });
});

export default app;
