from pathlib import Path

p = Path("src/services/HomeService.ts")
text = p.read_text()

old = "return cache.remember("
new = "return cache.rememberStale("

if old not in text:
    raise SystemExit("Target not found.")

p.write_text(text.replace(old, new, 1))

print("✅ HomeService migrated to rememberStale().")
