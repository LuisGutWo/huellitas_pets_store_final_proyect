import { Route, Routes } from "react-router-dom";

import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";
import Home from "./views/Home";
import LoginUserPage from "./views/LoginUserPage";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";
import About from "./views/About";
import CreateUser from "./views/CreateUser";
import ProductsCardSection from "./views/ProductsCardSection";
import ProductDetail from "./views/ProductDetail";
import SelectFavorites from "./views/SelectFavorites";
import { useUserContext } from "./context/UserContext";

import Contact from "./views/Contact";


function App() {
  const {user} = useUserContext();



  return (
    <div className="app">
      <MainHeader />
      <div className="routes-section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsCardSection />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={user? <Cart /> : <LoginUserPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/loginPage" element={<LoginUserPage />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/favorites" element={user? <SelectFavorites /> : <LoginUserPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <MainFooter />
    </div>
  );
}

export default App;
