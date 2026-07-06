import { providerManager } from "./ProviderManager";

export class WatchService {
  async getWatchData(id: string) {
    const provider = providerManager.getDefaultProvider();
    return provider.getWatchData(id);
  }
}

export const watchService = new WatchService();
