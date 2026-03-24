import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useUserContext } from "./UserContext";

type ProductBase = {
  id: number | string;
  price: number;
  [key: string]: unknown;
};

export type CartItem = ProductBase & {
  count: number;
};

const LEGACY_CART_STORAGE_KEY = "huellitas:cart";
const LEGACY_FAVORITES_STORAGE_KEY = "huellitas:favorites";
const GUEST_SCOPE = "guest";

type ProductsState = {
  scope: string;
  cart: CartItem[];
  favorites: ProductBase[];
};

const readStorage = <T,>(storageKey: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);

    if (!rawValue) {
      return fallback;
    }

    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
};

const buildStorageKey = (scope: string, resource: "cart" | "favorites") =>
  `huellitas:${scope}:${resource}`;

const readScopedStorage = <T,>(
  storageKey: string,
  fallback: T,
  legacyKey?: string
): T => {
  const scopedValue = readStorage<T | null>(storageKey, null);

  if (scopedValue !== null) {
    return scopedValue;
  }

  if (legacyKey) {
    return readStorage<T>(legacyKey, fallback);
  }

  return fallback;
};

const loadProductsState = (scope: string): ProductsState => ({
  scope,
  cart: readScopedStorage<CartItem[]>(
    buildStorageKey(scope, "cart"),
    [],
    scope === GUEST_SCOPE ? LEGACY_CART_STORAGE_KEY : LEGACY_CART_STORAGE_KEY
  ),
  favorites: readScopedStorage<ProductBase[]>(
    buildStorageKey(scope, "favorites"),
    [],
    scope === GUEST_SCOPE
      ? LEGACY_FAVORITES_STORAGE_KEY
      : LEGACY_FAVORITES_STORAGE_KEY
  ),
});

type ProductsContextValue = {
  cart: CartItem[];
  favorites: ProductBase[];
  addProduct: (item: ProductBase) => void;
  removeProduct: (item: ProductBase) => void;
  removeProductCart: (item: ProductBase) => void;
  totalItemProducts: () => number;
  totalCart: () => number;
  onCleanCart: () => void;
  findItemCount: (id: ProductBase["id"]) => number;
  addFavorites: (item: ProductBase) => void;
  removeFavorites: (id: ProductBase["id"]) => void;
};

const ProductsContext = createContext<
  ProductsContextValue | undefined
>(undefined);

type ProductsContextProviderProps = {
  children: ReactNode;
};

export default function ProductsContextProvider({
  children,
}: ProductsContextProviderProps) {
  const { user } = useUserContext();
  const activeScope = useMemo(
    () => (user?.uid ? `user:${user.uid}` : GUEST_SCOPE),
    [user]
  );
  const [productsState, setProductsState] = useState<ProductsState>(() =>
    loadProductsState(activeScope)
  );

  const { cart, favorites } = productsState;

  useEffect(() => {
    if (productsState.scope !== activeScope) {
      setProductsState(loadProductsState(activeScope));
      return;
    }

    window.localStorage.setItem(
      buildStorageKey(activeScope, "cart"),
      JSON.stringify(cart)
    );
    window.localStorage.setItem(
      buildStorageKey(activeScope, "favorites"),
      JSON.stringify(favorites)
    );
  }, [activeScope, cart, favorites, productsState.scope]);

  const addProduct = (item: ProductBase) => {
    setProductsState((currentState) => {
      const itemExists = currentState.cart.find(
        (current) => current.id === item.id
      );

      if (itemExists) {
        return {
          ...currentState,
          cart: currentState.cart.map((current) =>
            current.id === item.id
              ? { ...current, count: current.count + 1 }
              : current
          ),
        };
      }

      return {
        ...currentState,
        cart: [...currentState.cart, { ...item, count: 1 }],
      };
    });
  };

  const removeProduct = (item: ProductBase) => {
    setProductsState((currentState) => {
      const itemExists = currentState.cart.find(
        (current) => current.id === item.id
      );

      if (!itemExists) {
        return currentState;
      }

      if (itemExists.count === 1) {
        return {
          ...currentState,
          cart: currentState.cart.filter((current) => current.id !== item.id),
        };
      }

      return {
        ...currentState,
        cart: currentState.cart.map((current) =>
          current.id === item.id
            ? { ...current, count: current.count - 1 }
            : current
        ),
      };
    });
  };

  const removeProductCart = (item: ProductBase) => {
    setProductsState((currentState) => ({
      ...currentState,
      cart: currentState.cart.filter((current) => item.id !== current.id),
    }));
  };

  const totalItemProducts = () => {
    return cart.reduce((acc, item) => acc + item.count, 0);
  };

  const totalCart = () => {
    return cart.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const onCleanCart = () => {
    setProductsState((currentState) => ({
      ...currentState,
      cart: [],
    }));
  };

  const findItemCount = (id: ProductBase["id"]) => {
    const item = cart.find((current) => current.id === id);
    return item ? item.count : 0;
  };

  const addFavorites = (item: ProductBase) => {
    setProductsState((currentState) => {
      const alreadyExists = currentState.favorites.some(
        (favorite) => favorite.id === item.id
      );

      if (alreadyExists) {
        return currentState;
      }

      return {
        ...currentState,
        favorites: [...currentState.favorites, item],
      };
    });
  };

  const removeFavorites = (id: ProductBase["id"]) => {
    setProductsState((currentState) => ({
      ...currentState,
      favorites: currentState.favorites.filter((item) => item.id !== id),
    }));
  };

  return (
    <ProductsContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        removeProductCart,
        totalItemProducts,
        totalCart,
        onCleanCart,
        findItemCount,
        favorites,
        addFavorites,
        removeFavorites,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProductsContext must be used within a ProductsContextProvider"
    );
  }

  return context;
};
