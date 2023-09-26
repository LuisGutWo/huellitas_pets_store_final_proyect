import { useEffect, useState } from "react";
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
import SecondHeader from "./components/header/SecondHeader";

function App() {
  const { user } = useUserContext();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="app">
      <MainHeader />
      <header id="header" className={`${sticky ? "sticky" : ""}`}>
        <SecondHeader />
      </header>

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<MainProductsList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={user ? <Cart /> : <LoginUserPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/loginPage" element={<LoginUserPage />} />
          <Route path="/create" element={<CreateUser />} />
          <Route
            path="/favorites"
            element={user ? <SelectFavorites /> : <LoginUserPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <MainFooter />
    </div>
  );
}

export default App;
