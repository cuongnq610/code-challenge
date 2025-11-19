import type { Coin } from '@/types';

import { axiosInstance } from './axios.service';

export const coinService = {
  async getListCoins(): Promise<Coin[]> {
    const response = await axiosInstance.get<Coin[]>('/prices.json');

    /**
     * The response may contain multiple entries for the same currency with different dates.
     * We need to filter these entries to keep only the latest one for each currency.
     */
    const latestPricesMap: Map<string, Coin> = new Map();
    response.data.forEach(coint => {
      const existingCoin = latestPricesMap.get(coint.currency);
      if (!existingCoin || new Date(coint.date) >= new Date(existingCoin.date)) {
        latestPricesMap.set(coint.currency, coint);
      }
    });

    return Array.from(latestPricesMap.values());
  },
};
