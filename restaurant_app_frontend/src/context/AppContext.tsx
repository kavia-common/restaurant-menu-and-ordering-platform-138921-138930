import React, { createContext, useContext, useMemo, useReducer, ReactNode } from 'react';
import { MenuItem } from '../components/MenuItemCard';

type CartItem = { item: MenuItem; quantity: number };
type Order = { id: string; items: CartItem[]; total: number; status: 'pending' | 'confirmed' | 'delivered' };

type State = {
  cart: Record<string, CartItem>;
  orders: Order[];
  loading: boolean;
  restaurantInfo: {
    name: string;
    address: string;
    phone: string;
    description: string;
    bannerImage?: string;
    hours?: Record<string, string>;
  } | null;
};

type Action =
  | { type: 'ADD_TO_CART'; payload: MenuItem }
  | { type: 'INCREMENT_QTY'; payload: string }
  | { type: 'DECREMENT_QTY'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_RESTAURANT_INFO'; payload: State['restaurantInfo'] };

const initialState: State = {
  cart: {},
  orders: [],
  loading: false,
  restaurantInfo: null
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const id = action.payload.id;
      const existing = state.cart[id];
      const quantity = existing ? existing.quantity + 1 : 1;
      return { ...state, cart: { ...state.cart, [id]: { item: action.payload, quantity } } };
    }
    case 'INCREMENT_QTY': {
      const existing = state.cart[action.payload];
      if (!existing) return state;
      return { ...state, cart: { ...state.cart, [action.payload]: { ...existing, quantity: existing.quantity + 1 } } };
    }
    case 'DECREMENT_QTY': {
      const existing = state.cart[action.payload];
      if (!existing) return state;
      const nextQty = existing.quantity - 1;
      const nextCart = { ...state.cart };
      if (nextQty <= 0) delete nextCart[action.payload];
      else nextCart[action.payload] = { ...existing, quantity: nextQty };
      return { ...state, cart: nextCart };
    }
    case 'CLEAR_CART':
      return { ...state, cart: {} };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'SET_RESTAURANT_INFO':
      return { ...state, restaurantInfo: action.payload };
    default:
      return state;
  }
}

type ContextValue = {
  state: State;
  // PUBLIC_INTERFACE
  addToCart: (item: MenuItem) => void;
  // PUBLIC_INTERFACE
  incrementQty: (id: string) => void;
  // PUBLIC_INTERFACE
  decrementQty: (id: string) => void;
  // PUBLIC_INTERFACE
  clearCart: () => void;
  // PUBLIC_INTERFACE
  addOrder: (order: Order) => void;
  // PUBLIC_INTERFACE
  setLoading: (v: boolean) => void;
  // PUBLIC_INTERFACE
  setRestaurantInfo: (info: State['restaurantInfo']) => void;
};

const AppContext = createContext<ContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<ContextValue>(
    () => ({
      state,
      addToCart: (item) => dispatch({ type: 'ADD_TO_CART', payload: item }),
      incrementQty: (id) => dispatch({ type: 'INCREMENT_QTY', payload: id }),
      decrementQty: (id) => dispatch({ type: 'DECREMENT_QTY', payload: id }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      addOrder: (order) => dispatch({ type: 'ADD_ORDER', payload: order }),
      setLoading: (v) => dispatch({ type: 'SET_LOADING', payload: v }),
      setRestaurantInfo: (info) => dispatch({ type: 'SET_RESTAURANT_INFO', payload: info }),
    }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// PUBLIC_INTERFACE
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
