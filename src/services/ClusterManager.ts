/**
 * ==========================================================
 * NebulaOS
 * File: src/services/ClusterManager.ts
 * Purpose: Nebula Cluster Orchestrator
 * Phase: 4.8
 * ==========================================================
 */

type ServiceStatus = "sleeping" | "waking" | "awake" | "timeout";

interface ClusterServiceState {
  status: ServiceStatus;
  startedAt?: number;
  lastSuccess?: number;
}

class ClusterManager {
  private readonly wakeJobs = new Map<string, Promise<void>>();

  private readonly state = new Map<string, ClusterServiceState>();

  private readonly movieBoxUrl =
    process.env.MOVIEBOX_API_URL ??
    process.env.MOVIEBOX_URL ??
    "";

  constructor() {
    this.state.set("moviebox", {
      status: "sleeping"
    });
  }

  private setStatus(
    service: string,
    status: ServiceStatus
  ) {
    const previous =
      this.state.get(service) ??
      { status: "sleeping" };

    this.state.set(service, {
      ...previous,
      status,
      ...(status === "waking"
        ? { startedAt: Date.now() }
        : {}),
      ...(status === "awake"
        ? { lastSuccess: Date.now() }
        : {})
    });
  }

  getStatus() {
    const moviebox =
      this.state.get("moviebox")!;

    const elapsed =
      moviebox.startedAt
        ? Math.floor((Date.now() - moviebox.startedAt) / 1000)
        : 0;

    return {
      moviebox: {
        status: moviebox.status,
        elapsed,
        remaining: Math.max(0, 60 - elapsed),
        waking: this.wakeJobs.has("moviebox"),
        lastSuccess: moviebox.lastSuccess ?? null
      }
    };
  }

  isWaking(service: string): boolean {
    return this.wakeJobs.has(service);
  }

  async ensureMovieBoxAwake(): Promise<void> {
    if (!this.movieBoxUrl) {
      return;
    }

    const existing =
      this.wakeJobs.get("moviebox");

    if (existing) {
      return existing;
    }

    this.setStatus("moviebox", "waking");

    const task = (async () => {
      try {
        for (let attempt = 1; attempt <= 12; attempt++) {
          try {
            const response = await fetch(
              `${this.movieBoxUrl}/health`
            );

            if (response.ok) {
              console.log(
                "[ClusterManager] MovieBox is awake."
              );

              this.setStatus(
                "moviebox",
                "awake"
              );

              return;
            }
          } catch {}

          console.log(
            `[ClusterManager] Waking MovieBox (${attempt}/12)...`
          );

          await new Promise(resolve =>
            setTimeout(resolve, 5000)
          );
        }

        this.setStatus(
          "moviebox",
          "timeout"
        );

        console.warn(
          "[ClusterManager] MovieBox wake timed out."
        );
      } finally {
        this.wakeJobs.delete("moviebox");
      }
    })();

    this.wakeJobs.set("moviebox", task);

    return task;
  }
}

export const clusterManager = new ClusterManager();
