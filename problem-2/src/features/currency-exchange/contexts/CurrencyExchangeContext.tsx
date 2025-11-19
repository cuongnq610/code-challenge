import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { AppModalRef } from '@/components';
import { coinService } from '@/services';
import type { Coin } from '@/types';
import { delay } from '@/utils';

export type SelectCoinType = 'sell' | 'receive' | null;

export type CurrencyExchangeContextType = {
  sellCoin: Coin | null;
  receiveCoin: Coin | null;
  sellAmount: string;
  listCoins: Coin[];
  loading: boolean;
  selectCointType: SelectCoinType;
  setSellCoin: (coin: Coin) => void;
  setReceiveCoin: (coin: Coin) => void;
  setSellAmount: (amount: string) => void;
  getListCoins: () => Promise<void>;
  selectCoinModalRef: React.RefObject<AppModalRef | null>;
  toggleSelectCoinModal: (type: SelectCoinType) => void;
  swapCoin: () => void;
};

export const CurrencyExchangeContext = createContext<CurrencyExchangeContextType>({
  sellCoin: null,
  receiveCoin: null,
  sellAmount: '',
  listCoins: [],
  loading: false,
  setSellCoin: () => {},
  setReceiveCoin: () => {},
  setSellAmount: () => {},
  getListCoins: async () => {},
  selectCoinModalRef: { current: null },
  toggleSelectCoinModal: () => {},
  selectCointType: null,
  swapCoin: () => {},
});

export const useCurrencyExchangeContext = () => useContext(CurrencyExchangeContext);

export type CurrencyExchangeContextProviderProps = PropsWithChildren;

export const CurrencyExchangeContextProvider: FC<CurrencyExchangeContextProviderProps> = ({
  children,
}) => {
  const [sellCoin, setSellCoin] = useState<Coin | null>(null);
  const [receiveCoin, setReceiveCoin] = useState<Coin | null>(null);
  const [sellAmount, setSellAmount] = useState<string>('');
  const [listCoins, setListCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectCointType, setSelectCointType] = useState<SelectCoinType>(null);

  const selectCoinModalRef = useRef<AppModalRef | null>(null);

  const getListCoins = useCallback(async () => {
    setLoading(true);
    try {
      const _listCoins: Coin[] = await coinService.getListCoins();

      // Fake delay behavior
      await delay(500);

      setListCoins(_listCoins);
      setSellCoin(_listCoins[0]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getListCoins();
  }, [getListCoins]);

  const toggleSelectCoinModal = (type: SelectCoinType) => {
    setSelectCointType(type);
    if (selectCoinModalRef.current) {
      type ? selectCoinModalRef.current.open() : selectCoinModalRef.current.close();
    }
  };

  const swapCoin = useCallback(async () => {
    try {
      setLoading(true);

      // Fake delay behavior
      await delay(1000);

      setSellCoin(receiveCoin);
      setReceiveCoin(sellCoin);
    } finally {
      setLoading(false);
    }
  }, [receiveCoin, sellCoin]);

  return (
    <CurrencyExchangeContext.Provider
      value={{
        sellCoin,
        getListCoins,
        listCoins,
        loading,
        receiveCoin,
        sellAmount,
        selectCointType,
        setSellCoin,
        setReceiveCoin,
        setSellAmount,
        selectCoinModalRef,
        toggleSelectCoinModal,
        swapCoin,
      }}
    >
      {children}
    </CurrencyExchangeContext.Provider>
  );
};
