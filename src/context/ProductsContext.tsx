import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ProductBase = {
  id: number | string;
  price: number;
  [key: string]: unknown;
};

type CartItem = ProductBase & {
  count: number;
};

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

export const ProductsContext = createContext<
  ProductsContextValue | undefined
>(undefined);

type ProductsContextProviderProps = {
  children: ReactNode;
};

export default function ProductsContextProvider({
  children,
}: ProductsContextProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<ProductBase[]>([]);

  const addProduct = (item: ProductBase) => {
    const itemExists = cart.find((current) => current.id === item.id);

    if (itemExists) {
      setCart(
        cart.map((current) =>
          current.id === item.id
            ? { ...current, count: current.count + 1 }
            : current
        )
      );
      return;
    }

    setCart([...cart, { ...item, count: 1 }]);
  };

  const removeProduct = (item: ProductBase) => {
    const itemExists = cart.find((current) => current.id === item.id);

    if (!itemExists) {
      return;
    }

    if (itemExists.count === 1) {
      setCart(cart.filter((current) => current.id !== item.id));
      return;
    }

    setCart(
      cart.map((current) =>
        current.id === item.id
          ? { ...current, count: current.count - 1 }
          : current
      )
    );
  };

  const removeProductCart = (item: ProductBase) => {
    setCart(cart.filter((current) => item.id !== current.id));
  };

  const totalItemProducts = () => {
    return cart.reduce((acc, item) => acc + item.count, 0);
  };

  const totalCart = () => {
    return cart.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const onCleanCart = () => {
    setCart([]);
  };

  const findItemCount = (id: ProductBase["id"]) => {
    const item = cart.find((current) => current.id === id);
    return item ? item.count : 0;
  };

  const addFavorites = (item: ProductBase) => {
    setFavorites([...favorites, item]);
  };

  const removeFavorites = (id: ProductBase["id"]) => {
    setFavorites(favorites.filter((item) => item.id !== id));
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
