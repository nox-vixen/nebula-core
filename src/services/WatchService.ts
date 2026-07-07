import { movieBoxProvider } from "../providers/moviebox";

export class WatchService {
  async getWatchData(id: string) {
    return movieBoxProvider.getWatchData(id);
  }
}

export const watchService = new WatchService();
