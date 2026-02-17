import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import MainHeader from "../layout/header/MainHeader";
import Home from "../features/home/Home";
import About from "../features/about/About";
import ProductDetail from "../features/product-detail/ProductDetail";
import LoginUserPage from "../features/auth/LoginUserPage";
import CreateUser from "../features/auth/CreateUser";
import Cart from "../features/cart/Cart";
import SelectFavorites from "../features/favorites/SelectFavorites";
import Contact from "../features/contact/Contact";
import NotFound from "../shared/components/NotFound";
import MainProductsList from "../features/products/MainProductsList";
import MainFooter from "../layout/footer/MainFooter";
import BlogMain from "../features/blog/BlogSection";
import BackToTopButton from "../shared/components/BackToTopButton";
import WhatsAppButton from "../shared/components/WhatsAppButton";
import Loader from "../shared/components/Loading"; // Import your loader component

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
