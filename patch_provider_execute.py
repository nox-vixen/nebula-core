from pathlib import Path

p = Path("src/services/ProviderManager.ts")
text = p.read_text()

if 'import { clusterManager } from "./ClusterManager";' not in text:
    text = text.replace(
        '} from "../providers";',
        '} from "../providers";\nimport { clusterManager } from "./ClusterManager";'
    )

old = """      try {
        const healthy = await provider.healthCheck();
"""

new = """      try {

        if (provider.id === "moviebox") {
          await clusterManager.ensureMovieBoxAwake();
        }

        const healthy = await provider.healthCheck();
"""

if old not in text:
    raise SystemExit("Target block not found.")

text = text.replace(old, new, 1)

p.write_text(text)

print("✅ ProviderManager integrated with ClusterManager.")
