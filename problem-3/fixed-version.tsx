
import React, { useMemo } from "react";
import {omit} from 'lodash-es'

type PricesMap = Record<string, number| undefined> 

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
    formatted: string
}
type BoxProps = React.HTMLAttributes<HTMLDivElement>;

interface Props extends BoxProps {}

declare function useWalletBalances(): WalletBalance[];
declare function usePrices(): PricesMap;
declare const classes: { row?: string };

const getPriority = (blockchain: string): number => {
    switch (blockchain) {
        case 'Osmosis':
            return 100
        case 'Ethereum':
            return 50
        case 'Arbitrum':
            return 30
        case 'Zilliqa':
            return 20
        case 'Neo':
            return 20
        default:
            return -99
    }
}

export const WalletPage: React.FC<Props> = (props: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const forwardedProps = useMemo(() => {
    return omit(props, 'children')
  }, [props])

  const sortedBalances = useMemo(() => {
    return balances
        .filter((balance) => balance.amount > 0)
        .map((balance) => ({
            ...balance,
            priority: getPriority(balance.blockchain),
        }))
        .filter((balance) => {
          return balance.priority > -99
		})
        .sort((lhs, rhs) => {
            return rhs.priority - lhs.priority
        });
  }, [balances, prices]);

  const rows = sortedBalances.map((balance) => {
    const price = prices[balance.currency] ?? 0
    const usdValue = price * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...forwardedProps}>
      {rows}
    </div>
  )
}