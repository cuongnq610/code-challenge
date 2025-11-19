import { CurrencyExchangeContextProvider } from '../contexts/CurrencyExchangeContext';

export const withCurrencyExchange = <Props extends object>(
  WrappedComponent: React.ComponentType<Props>
) => {
  return (props: Props) => {
    return (
      <CurrencyExchangeContextProvider>
        <WrappedComponent {...props} />
      </CurrencyExchangeContextProvider>
    );
  };
};
