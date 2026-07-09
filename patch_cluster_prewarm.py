from pathlib import Path

p=Path("src/routes/home.ts")
text=p.read_text()

old='''router.get("/", async (_req, res) => {
  const result = await homeService.getHome();
  res.json(result);
});'''

new='''router.get("/", async (_req, res) => {
  // Start waking MovieBox immediately.
  // Do not wait for it.
  void homeService.preWarm();

  const result = await homeService.getHome();

  res.json(result);
});'''

if old not in text:
    raise SystemExit("home route not found")

text=text.replace(old,new,1)
p.write_text(text)

p=Path("src/services/HomeService.ts")
text=p.read_text()

marker="class HomeService {"

if "async preWarm()" not in text:
    text=text.replace(marker,marker+'''

  async preWarm() {
    const { clusterManager } = await import("./ClusterManager");
    void clusterManager.ensureMovieBoxAwake();
  }
''',1)

p.write_text(text)

print("✅ Nebula now pre-warms MovieBox as soon as /api/home is hit.")
