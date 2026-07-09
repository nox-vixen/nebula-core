from pathlib import Path

p = Path("src/routes/debug.ts")
text = p.read_text()

if 'clusterManager' not in text:
    text = text.replace(
        'import { providerRegistry } from "../providers";',
        'import { providerRegistry } from "../providers";\nimport { clusterManager } from "../services/ClusterManager";'
    )

marker = 'router.post("/cache/clear", async (_req, res) => {'

insert = '''
router.get("/cluster", (_req, res) => {
  res.json({
    waking: clusterManager.isWaking("moviebox")
  });
});

'''

if insert not in text:
    text = text.replace(marker, insert + marker)

p.write_text(text)

print("✅ Cluster status endpoint added.")
