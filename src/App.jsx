import "./index.css";
import MainNavbar from "./components/MainNavbar";
import MainFooter from "./components/MainFooter";
import Home from "./views/Home";
import LoginPage from "./views/LoginPage";
import MainProductCard from "./views/MainProductCard";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";
import About from "./views/About";
import CreateUser from "./views/CreateUser";
import ProductsCardSection from "./views/ProductsCardSection";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <MainNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductsCardSection />} />
        <Route path="/products:id" element={<MainProductCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <MainFooter />
    </div>
  );
}

export default App;
