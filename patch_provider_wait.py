from pathlib import Path

p = Path("src/services/ProviderManager.ts")
text = p.read_text()

old = """        console.log("[ProviderManager] Checking:", provider.id);

        const healthy = await provider.healthCheck();"""

new = """        console.log("[ProviderManager] Checking:", provider.id);

        if (provider.id === "moviebox") {
          await clusterManager.ensureMovieBoxAwake();
        }

        const healthy = await provider.healthCheck();"""

if old not in text:
    raise SystemExit("Target block not found.")

text = text.replace(old, new, 1)

p.write_text(text)

print("✅ ProviderManager now waits for MovieBox wake before health check.")
