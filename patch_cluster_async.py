from pathlib import Path

p = Path("src/services/ClusterManager.ts")
text = p.read_text()

old = """        if (provider.id === "moviebox") {
          await clusterManager.ensureMovieBoxAwake();
        }
"""

new = """        if (provider.id === "moviebox") {
          void clusterManager.ensureMovieBoxAwake();
        }
"""

# This patch actually belongs in ProviderManager where we call ClusterManager.
pp = Path("src/services/ProviderManager.ts")
provider = pp.read_text()

if old not in provider:
    raise SystemExit("Target block not found.")

provider = provider.replace(old, new, 1)
pp.write_text(provider)

print("✅ MovieBox wake is now non-blocking.")
