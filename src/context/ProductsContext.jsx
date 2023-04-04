import { createContext, useContext, useState } from "react";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addProduct = (item) => {
    const itemExists = cart.find((i) => i.id === item.id);

    if (itemExists) {
      setCart(
        cart.map((i) => (i.id === item.id ? { ...i, count: i.count + 1 } : i))
      );
    } else {
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  const removeProduct = (item) => {
    const itemExists = cart.find((i) => i.id === item.id);
    if (itemExists.count === 1) {
      setCart(cart.filter((i) => i.id !== item.id));
    } else {
      setCart(
        cart.map((i) => (i.id === item.id ? { ...i, count: i.count - 1 } : i))
      );
    }
  };

  const totalItemProducts = () => {
    return cart.reduce((acc, item) => acc + item.count, 0);
    };
    

  const totalCart = () => {
    return cart.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const onCleanCart = () => {
		setCart([]);
		totalCart(0);
		totalItemProducts(0);
	};

  const findItemCount = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.count : 0;
  };

  const addFavorites = (item) => {
    setFavorites([...favorites, item]);
  };
  const removeFavorites = (id) => {
    setFavorites(favorites.filter((item) => item.id != id));
  };


  return (
    <ProductsContext.Provider
      value={{ cart, addProduct, removeProduct, totalItemProducts, totalCart, onCleanCart, findItemCount, favorites, addFavorites, removeFavorites }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);
