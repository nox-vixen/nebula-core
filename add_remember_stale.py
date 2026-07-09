from pathlib import Path

p = Path("src/cache/services/CacheManager.ts")
text = p.read_text()

if "async rememberStale<" in text:
    print("rememberStale() already exists.")
    raise SystemExit(0)

marker = "  async clear(): Promise<void> {"

if marker not in text:
    raise SystemExit("Could not find insertion point.")

insert = '''
  async rememberStale<T>(
    key: string,
    ttl: number,
    loader: () => Promise<T>,
    tags: string[] = []
  ): Promise<T> {

    const now = new Date();

    const l1 = await this.primary.get<T>(key);

    if (l1) {

      if (new Date(l1.expiresAt) > now) {
        return {
          ...(l1.value as any),
          cached: true,
          refreshing: false
        } as T;
      }

      loader()
        .then(async (value) => {

          const updated = {
            ...l1,
            value,
            ttl,
            tags,
            updatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + ttl * 1000).toISOString()
          };

          await this.primary.set(updated);

          if (this.secondary) {
            await this.secondary.set(updated);
          }

        })
        .catch(() => {});

      return {
        ...(l1.value as any),
        cached: true,
        refreshing: true
      } as T;
    }

    if (this.secondary) {

      const l2 = await this.secondary.get<T>(key);

      if (l2) {

        await this.primary.set(l2);

        if (new Date(l2.expiresAt) > now) {
          return {
            ...(l2.value as any),
            cached: true,
            refreshing: false
          } as T;
        }

        loader()
          .then(async (value) => {

            const updated = {
              ...l2,
              value,
              ttl,
              tags,
              updatedAt: new Date().toISOString(),
              expiresAt: new Date(Date.now() + ttl * 1000).toISOString()
            };

            await this.primary.set(updated);

            if (this.secondary) {
              await this.secondary.set(updated);
            }

          })
          .catch(() => {});

        return {
          ...(l2.value as any),
          cached: true,
          refreshing: true
        } as T;
      }
    }

    return this.remember(
      key,
      ttl,
      loader,
      tags
    );
  }

'''

text = text.replace(marker, insert + "\n" + marker)

p.write_text(text)

print("✅ rememberStale() added successfully.")
