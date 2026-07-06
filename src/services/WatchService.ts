import { providerManager } from "./ProviderManager";

export class WatchService {
  async getWatchData(id: string) {
    const provider = providerManager.getDefault();
    return provider.getWatchData(id);
  }
}

export const watchService = new WatchService();
