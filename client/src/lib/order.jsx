import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [state, setState] = useState({ open: false, product: null });

  const openOrder = useCallback((product = null) => {
    setState({ open: true, product });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeOrder = useCallback(() => {
    setState({ open: false, product: null });
    document.body.style.overflow = '';
  }, []);

  const value = useMemo(
    () => ({ ...state, openOrder, closeOrder }),
    [state, openOrder, closeOrder]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider');
  return ctx;
}
