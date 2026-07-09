from pathlib import Path

p = Path("src/cache/services/CacheManager.ts")
text = p.read_text()

if "private readonly refreshJobs" in text:
    print("Refresh queue already exists.")
    raise SystemExit(0)

marker = "export class CacheManager {"

replacement = """export class CacheManager {

  private readonly refreshJobs = new Map<string, Promise<void>>();

"""

if marker not in text:
    raise SystemExit("Couldn't locate CacheManager declaration.")

text = text.replace(marker, replacement, 1)

p.write_text(text)

print("✅ Refresh queue state added.")
