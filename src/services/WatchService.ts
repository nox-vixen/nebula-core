import { movieBoxProvider } from "../providers/moviebox";

export class WatchService {
  async getWatchData(id: string) {
    return movieBoxProvider.getWatchData(id);
  }

  async getEpisodeStreams(
    seriesId: string,
    season: number,
    episode: number,
  ) {
    return movieBoxProvider.getEpisodeStreams(
      seriesId,
      season,
      episode,
    );
  }


  async getSubtitles(
    id: string,
    resourceId: string
  ) {
    return movieBoxProvider.getSubtitles(
      id,
      resourceId
    );
  }
}

export const watchService = new WatchService();
