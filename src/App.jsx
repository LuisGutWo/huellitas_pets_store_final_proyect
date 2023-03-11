import { Route, Routes } from "react-router-dom";

import MainNavbar from "./components/MainNavbar";
import MainFooter from "./components/MainFooter";
import Home from "./views/Home";
import LoginPage from "./views/LoginPage";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";
import About from "./views/About";
import CreateUser from "./views/CreateUser";
import ProductsCardSection from "./views/ProductsCardSection";
import ProductDetail from "./views/ProductDetail";

import Contact from "./views/Contact";

import "./index.css";

function App() {
  return (
    <div className="app">
      <MainNavbar />
      <div className="routes-section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsCardSection />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <MainFooter />
    </div>
  );
}

export default App;
