import type { FC } from 'react';

import { AppButton, AppCard, AppImage, AppInputNumber } from '@/components';
import type { Coin } from '@/types';
import { cn } from '@/utils';

export type CoinInputProps = {
  title: string;
  onClickSelectCoin?: () => void;
  coin: Coin | null;
  showUSDBalance?: boolean;
  usdAmount?: string;
  readOnly?: boolean;
  amount?: string;
  onChangeAmount?: (val: string) => void;
  showConversionRate?: boolean;
  conversionRate?: string;
  loading?: boolean;
};

export const CoinInput: FC<CoinInputProps> = ({
  title,
  coin,
  showUSDBalance = true,
  showConversionRate = false,
  conversionRate,
  usdAmount = '0',
  readOnly,
  amount,
  onClickSelectCoin,
  onChangeAmount,
  loading,
}) => {
  return (
    <AppCard
      className={cn(
        'flex w-full flex-col items-start gap-2 p-3',
        'border border-gray-700 transition-all'
      )}
    >
      <div className="text-base text-gray-400">{title}</div>
      <div className="flex w-full items-center justify-between gap-4">
        <AppInputNumber
          className="flex-1 text-3xl font-semibold text-white"
          borderless
          silentFocus
          allowNegative={false}
          placeholder="0"
          readOnly={readOnly}
          value={amount}
          onChangeValue={onChangeAmount}
          disabled={loading}
        />

        <AppButton
          loading={loading}
          onClick={onClickSelectCoin}
          className="rounded-4xl border border-gray-700 bg-[#0d1421] px-3 py-0.5"
        >
          <div className="flex h-9 items-center gap-1.5">
            {coin ? (
              <>
                <AppImage
                  alt={coin.currency}
                  src={`/coin-icon/${coin.currency}.svg`}
                  className="h-8 w-8"
                />
                <div className="font-semibold text-white">{coin.currency}</div>
              </>
            ) : (
              <div>Select Token</div>
            )}
            <img className="mr-1 h-4 w-4" src={'/chevron-down.svg'} />
          </div>
        </AppButton>
      </div>
      {showUSDBalance && <div className="text-xs text-gray-500">{usdAmount} USD</div>}
      {showConversionRate && <div className={cn('text-xs text-gray-500')}>{conversionRate}</div>}
    </AppCard>
  );
};
