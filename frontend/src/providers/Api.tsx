import React from "react";
import axios from "axios";

export interface CurrencyData {
  currencyFrom?: string;
  currencyTo?: string;
  valueFrom?: number;
  valueTo?: number;
}

export interface ContextValue {
  symbols: string[];
  convertedCurrency: CurrencyData;
  loading: boolean;
  convertCurrency: (currencyData: CurrencyData) => void;
  reloadSymbols: () => void;
}

export const ApiContext = React.createContext<ContextValue | null>(null);

export function useApi() {
  return React.useContext(ApiContext) as ContextValue;
}

export interface Props {
  children: React.ReactNode;
}

export default function Api({ children }: Props) {
  const mountedRef = React.useRef(true);

  const [loading, setLoading] = React.useState(false);

  const [symbols, setSymbols] = React.useState<string[]>([]);
  const [convertedCurrency, setConvertedCurrency] =
    React.useState<CurrencyData>({});

  const convertCurrency = async (currencyData: CurrencyData) => {
    try {
      if (loading) return;
      setLoading(true);

      const { data } = await axios.post<CurrencyData>(
        process.env.REACT_APP_API_URL + "/currency/convert",
        currencyData
      );

      if (!mountedRef.current) return;

      setConvertedCurrency(data || {});
    } catch (err) {
      console.error(err);

      if (!mountedRef.current) return;
      setConvertedCurrency({ ...currencyData, valueTo: undefined });
    } finally {
      if (!mountedRef.current) return;
      setLoading(false);
    }
  };

  const reloadSymbols = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const { data } = await axios.post<string[]>(
        process.env.REACT_APP_API_URL + "/currency/get-list"
      );

      if (!mountedRef.current) return;

      setSymbols(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      if (!mountedRef.current) return;
      setSymbols([]);
    } finally {
      if (!mountedRef.current) return;
      setLoading(false);
    }
  };

  React.useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  const contextValue: ContextValue = {
    symbols,
    convertedCurrency,
    loading,
    convertCurrency,
    reloadSymbols
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}
