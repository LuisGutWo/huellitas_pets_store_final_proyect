import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import MainHeader from "../layout/header/MainHeader";
import MainFooter from "../layout/footer/MainFooter";
import BackToTopButton from "../shared/components/BackToTopButton";
import WhatsAppButton from "../shared/components/WhatsAppButton";
import ToastContainer from "../shared/components/Toast/ToastContainer";
import Loader from "../shared/components/Loading"; // Import your loader component

const homeImport = () => import("../features/home/Home");
const aboutImport = () => import("../features/about/About");
const productDetailImport = () => import("../features/product-detail/ProductDetail");
const loginImport = () => import("../features/auth/LoginUserPage");
const createUserImport = () => import("../features/auth/CreateUser");
const cartImport = () => import("../features/cart/Cart");
const favoritesImport = () => import("../features/favorites/SelectFavorites");
const contactImport = () => import("../features/contact/Contact");
const notFoundImport = () => import("../shared/components/NotFound");
const productsImport = () => import("../features/products/MainProductsList");
const blogImport = () => import("../features/blog/BlogSection");

const Home = lazy(homeImport);
const About = lazy(aboutImport);
const ProductDetail = lazy(productDetailImport);
const LoginUserPage = lazy(loginImport);
const CreateUser = lazy(createUserImport);
const Cart = lazy(cartImport);
const SelectFavorites = lazy(favoritesImport);
const Contact = lazy(contactImport);
const NotFound = lazy(notFoundImport);
const MainProductsList = lazy(productsImport);
const BlogMain = lazy(blogImport);

type RouteFallbackProps = {
  label: string;
};

const RouteFallback = ({ label }: RouteFallbackProps) => (
  <div aria-live="polite">
    <Loader />
    <p>{label}</p>
  </div>
);

function App() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching user data or app initialization)
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void productsImport();
      void aboutImport();
      void contactImport();
      void blogImport();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && mainRef.current) {
      mainRef.current.focus();
    }
  }, [loading, location.pathname]);

  if (loading) {
    return <Loader />; // Show the loader while loading
  }

  return (
    <div id="app">
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>
      <header id="header">
        <MainHeader />
      </header>

      <main
        id="main-content"
        className="app-container"
        ref={mainRef}
        tabIndex={-1}
        aria-label="Contenido principal"
      >
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<RouteFallback label="Cargando inicio..." />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/products"
            element={
              <Suspense fallback={<RouteFallback label="Cargando productos..." />}>
                <MainProductsList />
              </Suspense>
            }
          />
          <Route
            path="/products/:id"
            element={
              <Suspense fallback={<RouteFallback label="Cargando detalle..." />}>
                <ProductDetail />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<RouteFallback label="Cargando carrito..." />}>
                {user ? <Cart /> : <LoginUserPage />}
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<RouteFallback label="Cargando contacto..." />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<RouteFallback label="Cargando acerca de..." />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<RouteFallback label="Cargando blog..." />}>
                <BlogMain />
              </Suspense>
            }
          />
          <Route
            path="/loginPage"
            element={
              <Suspense fallback={<RouteFallback label="Cargando acceso..." />}>
                <LoginUserPage />
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense fallback={<RouteFallback label="Cargando registro..." />}>
                <CreateUser />
              </Suspense>
            }
          />
          <Route
            path="/favorites"
            element={
              <Suspense fallback={<RouteFallback label="Cargando favoritos..." />}>
                {user ? <SelectFavorites /> : <LoginUserPage />}
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback label="Cargando..." />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <ToastContainer />
      <BackToTopButton />
      <WhatsAppButton />
      <MainFooter />
    </div>
  );
}

export default App;
