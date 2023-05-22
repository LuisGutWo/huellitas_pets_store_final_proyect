import { Route, Routes } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

import Home from "./layout/Home";
import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";
import LoginUserPage from "./views/log/LoginUserPage";
import Cart from "./views/cart/Cart";
import About from "./views/home/About";
import CreateUser from "./views/log/CreateUser";
import ProductsCardSection from "./views/products/ProductsCardSection";
import ProductDetail from "./views/products/ProductDetail";
import SelectFavorites from "./views/products/SelectFavorites";
import Contact from "./views/home/Contact";
import NotFound from "./utils/NotFound";
import MainNavbar from "./components/MainNavbar";

function App() {
  const { user } = useUserContext();

  return (
    <div className="app">
      <MainHeader />
      <MainNavbar />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsCardSection />} />
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
