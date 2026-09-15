"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/catalog";
import { useAuth } from "./AuthProvider";

export type CartLine = { product: Product; units: number };

/**
 * El registro impreso: en vez de un toast flotante, cada acción queda escrita
 * en el documento y la navegación deja rastro de por dónde pasaste.
 */
export type LogEntry = {
  id: number;
  kind: "carrito" | "favoritos" | "vaciado";
  verb: string;
  subject: string;
  detail?: string;
};

type StoreState = {
  cart: CartLine[];
  favorites: Product[];
  log: LogEntry[];
  /** false hasta que se lee localStorage, para no renderizar totales falsos. */
  hydrated: boolean;
  addToCart: (product: Product, units?: number) => void;
  decrementInCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  setUnits: (product: Product, units: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
  unitsInCart: (id: string) => number;
  totalUnits: number;
  totalAmount: number;
};

const StoreContext = createContext<StoreState | null>(null);

const GUEST = "invitado";
const keyFor = (scope: string, resource: "carrito" | "favoritos") =>
  `huellitas:${scope}:${resource}`;

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Modo privado o cuota llena: la sesión sigue funcionando en memoria. */
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const scope = user?.uid ? `cuenta:${user.uid}` : GUEST;

  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const loadedScope = useRef<string | null>(null);
  const logId = useRef(0);

  // Carga al montar y cada vez que cambia la cuenta activa.
  useEffect(() => {
    setCart(read<CartLine[]>(keyFor(scope, "carrito"), []));
    setFavorites(read<Product[]>(keyFor(scope, "favoritos"), []));
    loadedScope.current = scope;
    setHydrated(true);
  }, [scope]);

  // Persiste solo después de haber cargado ese mismo alcance: así un cambio
  // de cuenta nunca escribe el carrito de una sesión sobre el de otra.
  useEffect(() => {
    if (loadedScope.current !== scope) return;
    write(keyFor(scope, "carrito"), cart);
  }, [cart, scope]);

  useEffect(() => {
    if (loadedScope.current !== scope) return;
    write(keyFor(scope, "favoritos"), favorites);
  }, [favorites, scope]);

  const record = useCallback((entry: Omit<LogEntry, "id">) => {
    logId.current += 1;
    const next = { ...entry, id: logId.current };
    setLog((current) => [next, ...current].slice(0, 6));
  }, []);

  const addToCart = useCallback(
    (product: Product, units = 1) => {
      setCart((current) => {
        const existing = current.find((line) => line.product.id === product.id);
        if (existing) {
          return current.map((line) =>
            line.product.id === product.id
              ? { ...line, units: line.units + units }
              : line
          );
        }
        return [...current, { product, units }];
      });
      record({
        kind: "carrito",
        verb: "Al carrito",
        subject: product.name,
        detail: `${units} un.`,
      });
    },
    [record]
  );

  const decrementInCart = useCallback((product: Product) => {
    setCart((current) =>
      current.flatMap((line) => {
        if (line.product.id !== product.id) return [line];
        if (line.units <= 1) return [];
        return [{ ...line, units: line.units - 1 }];
      })
    );
  }, []);

  const removeFromCart = useCallback(
    (product: Product) => {
      setCart((current) =>
        current.filter((line) => line.product.id !== product.id)
      );
      record({ kind: "carrito", verb: "Retirado", subject: product.name });
    },
    [record]
  );

  const setUnits = useCallback((product: Product, units: number) => {
    const safe = Math.max(1, Math.min(99, Math.trunc(units) || 1));
    setCart((current) =>
      current.map((line) =>
        line.product.id === product.id ? { ...line, units: safe } : line
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    record({ kind: "vaciado", verb: "Carrito vaciado", subject: "" });
  }, [record]);

  const toggleFavorite = useCallback(
    (product: Product) => {
      setFavorites((current) => {
        const exists = current.some((item) => item.id === product.id);
        record({
          kind: "favoritos",
          verb: exists ? "Fuera de guardados" : "Guardado",
          subject: product.name,
        });
        return exists
          ? current.filter((item) => item.id !== product.id)
          : [...current, product];
      });
    },
    [record]
  );

  const value = useMemo<StoreState>(() => {
    const totalUnits = cart.reduce((sum, line) => sum + line.units, 0);
    const totalAmount = cart.reduce(
      (sum, line) => sum + line.product.price * line.units,
      0
    );

    return {
      cart,
      favorites,
      log,
      hydrated,
      addToCart,
      decrementInCart,
      removeFromCart,
      setUnits,
      clearCart,
      toggleFavorite,
      isFavorite: (id) => favorites.some((item) => item.id === id),
      unitsInCart: (id) =>
        cart.find((line) => line.product.id === id)?.units ?? 0,
      totalUnits,
      totalAmount,
    };
  }, [
    cart,
    favorites,
    log,
    hydrated,
    addToCart,
    decrementInCart,
    removeFromCart,
    setUnits,
    clearCart,
    toggleFavorite,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore debe usarse dentro de StoreProvider");
  }
  return context;
};
