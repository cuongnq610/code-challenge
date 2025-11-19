import { useMemo, useState } from 'react';

import { AppImage, AppInputSearch, AppModal } from '@/components';
import type { Coin } from '@/types';
import { cn } from '@/utils';

import { useCurrencyExchangeContext } from '../contexts';

export const ModalSelectCoin = () => {
  const {
    selectCoinModalRef,
    listCoins,
    toggleSelectCoinModal,
    selectCointType,
    setReceiveCoin,
    setSellCoin,
  } = useCurrencyExchangeContext();

  const [searchValue, setSearchValue] = useState<string>('');

  const filteredCoins = useMemo(() => {
    if (!searchValue) return listCoins;
    return listCoins.filter(coin =>
      coin.currency.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [listCoins, searchValue]);

  const handleSelectCoin = (coin: Coin) => {
    if (selectCointType === 'sell') {
      setSellCoin(coin);
    } else if (selectCointType === 'receive') {
      setReceiveCoin(coin);
    }
    toggleSelectCoinModal(null);
  };

  return (
    <AppModal ref={selectCoinModalRef} onClose={() => toggleSelectCoinModal(null)}>
      <div className="w-80">
        <div className="font-xl font-semibold">Select Token</div>
        <AppInputSearch
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="my-3"
          placeholder="Search Token"
        />
        <div className="flex h-96 flex-col gap-1 overflow-auto">
          {filteredCoins.length > 0 ? (
            filteredCoins.map(coin => (
              <div
                key={coin.currency}
                className={cn(
                  'flex cursor-pointer items-center gap-4 rounded px-2 py-3',
                  'transition-all hover:bg-[#222531]'
                )}
                onClick={() => handleSelectCoin(coin)}
              >
                <AppImage
                  src={`/coin-icon/${coin.currency}.svg`}
                  alt={coin.currency}
                  className="h-10 w-10"
                />
                <div>{coin.currency}</div>
              </div>
            ))
          ) : (
            <div>No Tokens Found</div>
          )}
        </div>
      </div>
    </AppModal>
  );
};
