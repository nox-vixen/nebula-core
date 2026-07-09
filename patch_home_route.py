from pathlib import Path

p = Path("src/routes/home.ts")
text = p.read_text()

if 'import { clusterManager } from "../services/ClusterManager";' not in text:
    text = text.replace(
        'import { homeService } from "../services/HomeService";',
        'import { homeService } from "../services/HomeService";\nimport { clusterManager } from "../services/ClusterManager";'
    )

old = """router.get("/", async (_req, res) => {
  const result = await homeService.getHome();
  res.json(result);
});"""

new = """router.get("/", async (_req, res) => {
  void clusterManager.ensureMovieBoxAwake();

  const result = await homeService.getHome();

  res.json({
    ...result,
    cluster: {
      waking: clusterManager.isWaking("moviebox")
    }
  });
});"""

if old not in text:
    raise SystemExit("Route block not found.")

text = text.replace(old, new, 1)
p.write_text(text)

print("✅ Home route now triggers cluster wake.")
