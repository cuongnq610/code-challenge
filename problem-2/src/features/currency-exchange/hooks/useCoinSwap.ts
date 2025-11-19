import { useCallback, useMemo } from 'react';

import type { Coin } from '@/types';
import { formatCurrency } from '@/utils';

export const useCoinSwap = ({
  sellCoin,
  sellAmount,
  receiveCoin,
}: {
  sellCoin: Coin | null;
  receiveCoin: Coin | null;
  sellAmount: number;
}) => {
  // Calculate Usd Amount Of Token
  const calculateUSDAmount = useCallback((coin: Coin, amount: number): string => {
    return formatCurrency(coin.price * amount, 2);
  }, []);

  // Calculate Conversion Rate Between 2 Tokens
  const calculateConversionRate = useCallback((fromCoin: Coin, toCoin: Coin): number => {
    return parseFloat((fromCoin.price / toCoin.price).toFixed(6));
  }, []);

  const usdAmount = useMemo(() => {
    if (!sellCoin || !sellAmount) {
      return null;
    }

    return calculateUSDAmount(sellCoin, sellAmount);
  }, [sellCoin, sellAmount, calculateUSDAmount]);

  const conversionRate = useMemo(() => {
    if (!sellCoin || !receiveCoin) {
      return null;
    }
    const value = calculateConversionRate(sellCoin, receiveCoin);
    const displayText = `1 ${sellCoin.currency} = ${value} ${receiveCoin.currency}`;

    return {
      value,
      displayText,
    };
  }, [sellCoin, receiveCoin]);

  const receiveAmount = useMemo(() => {
    if (!sellAmount || !conversionRate) return null;

    return (sellAmount * conversionRate.value).toFixed(6);
  }, [conversionRate, sellAmount]);

  return {
    usdAmount,
    receiveAmount,
    conversionRate,
  };
};
