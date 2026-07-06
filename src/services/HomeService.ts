/**
 * ==========================================================
 * NebulaOS
 * File: src/services/HomeService.ts
 * Purpose: Home Service
 * Phase: 2
 * ==========================================================
 */

import { providerManager } from "./ProviderManager";

class HomeService {

  async getHome() {

    const provider = providerManager.getDefaultProvider();

    const data = await provider.getHome();

    return {
      success: true,
      provider: provider.id,
      data
    };

  }

}

export const homeService = new HomeService();
