import React from "react";
import axios from "axios";

export interface CurrencyData {
  currencyFrom?: string;
  currencyTo?: string;
  valueFrom?: string;
  valueTo?: string;
}

export interface HistoryRecord extends CurrencyData {
  createdAt: string;
}

export interface Options {
  force: boolean;
}

export interface ContextValue {
  symbols: string[];
  history: HistoryRecord[];
  convertedCurrency: CurrencyData | undefined;
  loading: boolean;
  convertCurrency: (currencyData: CurrencyData, options?: Options) => void;
  reloadSymbols: (options?: Options) => void;
  reloadHistory: (options?: Options) => void;
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
  const [history, setHistory] = React.useState<HistoryRecord[]>([]);

  const [convertedCurrency, setConvertedCurrency] = React.useState<
    CurrencyData | undefined
  >({ valueTo: "" });

  const convertCurrency = async (
    currencyData: CurrencyData,
    options?: Options
  ) => {
    try {
      if (!options?.force) {
        if (loading) return;
        setLoading(true);
      }

      const { data } = await axios.post<CurrencyData>(
        process.env.REACT_APP_API_URL + "/api/currency/convert",
        currencyData
      );

      if (!mountedRef.current) return;

      setConvertedCurrency(data);
    } catch (err) {
      console.error(err);

      if (!mountedRef.current) return;
      setConvertedCurrency(undefined);
    } finally {
      if (!mountedRef.current) return;
      if (!options?.force) setLoading(false);
    }
  };

  const reloadSymbols = async (options?: Options) => {
    try {
      if (!options?.force) {
        if (loading) return;
        setLoading(true);
      }

      const { data } = await axios.post<string[]>(
        process.env.REACT_APP_API_URL + "/api/currency/get-list"
      );

      if (!mountedRef.current) return;

      setSymbols(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      if (!mountedRef.current) return;
      setSymbols([]);
    } finally {
      if (!mountedRef.current) return;
      if (!options?.force) setLoading(false);
    }
  };

  const reloadHistory = async (options?: Options) => {
    try {
      if (!options?.force) {
        if (loading) return;
        setLoading(true);
      }

      const { data } = await axios.post<HistoryRecord[]>(
        process.env.REACT_APP_API_URL + "/api/currency/get-history"
      );

      if (!mountedRef.current) return;

      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      if (!mountedRef.current) return;
      setHistory([]);
    } finally {
      if (!mountedRef.current) return;
      if (!options?.force) setLoading(false);
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
    history,
    convertedCurrency,
    loading,
    convertCurrency,
    reloadSymbols,
    reloadHistory
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}
