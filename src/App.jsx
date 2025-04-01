import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

import MainHeader from "./components/header/MainHeader";
import Home from "./views/home/Home";
import About from "./views/about/About";
import ProductDetail from "./views/productsDetail/ProductDetail";
import LoginUserPage from "./views/log/LoginUserPage";
import CreateUser from "./views/log/CreateUser";
import Cart from "./views/cart/Cart";
import SelectFavorites from "./views/favorites/SelectFavorites";
import Contact from "./views/contact/Contact";
import NotFound from "./utils/NotFound";
import MainProductsList from "./views/products/MainProductsList";
import MainFooter from "./components/footer/MainFooter";
import BlogMain from "./views/blog/BlogSection";
import BackToTopButton from "./utils/BackToTopButton";
import WhatsAppButton from "./utils/WhatsAppButton";
import Loader from "./utils/Loading"; // Import your loader component

function App() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching user data or app initialization)
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // Show the loader while loading
  }

  return (
    <div id="app">
      <header id="header">
        <MainHeader />
      </header>

      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<MainProductsList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={user ? <Cart /> : <LoginUserPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogMain />} />
          <Route path="/loginPage" element={<LoginUserPage />} />
          <Route path="/create" element={<CreateUser />} />
          <Route
            path="/favorites"
            element={user ? <SelectFavorites /> : <LoginUserPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BackToTopButton />
      <WhatsAppButton />
      <MainFooter />
    </div>
  );
}

export default App;
