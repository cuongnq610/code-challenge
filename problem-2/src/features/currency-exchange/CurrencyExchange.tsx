import { AppButton, AppCard } from '@/components';
import { cn } from '@/utils';

import { CoinInput, ModalSelectCoin, SwapButton } from './components';
import { useCurrencyExchangeContext } from './contexts';
import { withCurrencyExchange } from './hocs';
import { useCoinSwap } from './hooks';

export const CurrencyExchange = withCurrencyExchange(() => {
  const {
    toggleSelectCoinModal,
    sellCoin,
    receiveCoin,
    sellAmount,
    setSellAmount,
    swapCoin,
    loading,
  } = useCurrencyExchangeContext();

  const disableTransfer = !sellCoin || !sellAmount || !receiveCoin;

  const { receiveAmount, usdAmount, conversionRate } = useCoinSwap({
    receiveCoin,
    sellCoin,
    sellAmount: sellAmount ? Number(sellAmount) : 0,
  });

  return (
    <AppCard className={cn('flex flex-col items-start gap-3 bg-[#0d1421]', 'max-w-[480px]')}>
      <div className="mb-3 text-2xl font-bold text-white">Coin Swap</div>

      <CoinInput
        title="Sell"
        coin={sellCoin}
        onClickSelectCoin={() => toggleSelectCoinModal('sell')}
        usdAmount={usdAmount ?? '0'}
        amount={sellAmount}
        onChangeAmount={setSellAmount}
        loading={loading}
      />

      <SwapButton onClick={swapCoin} />

      <CoinInput
        readOnly
        showConversionRate
        title="Receive"
        conversionRate={conversionRate?.displayText}
        coin={receiveCoin}
        amount={receiveAmount?.toString()}
        showUSDBalance={false}
        onClickSelectCoin={() => toggleSelectCoinModal('receive')}
        loading={loading}
      />

      <AppButton
        disabled={disableTransfer}
        className="mt-3 w-full bg-green-600 text-xl font-semibold"
      >
        Transfer
      </AppButton>

      <ModalSelectCoin />
    </AppCard>
  );
});
