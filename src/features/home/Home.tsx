import { lazy, Suspense } from "react";
import HeroSection from "./components/HeroSection";
import AboutHomeSection from "./components/AboutHomeSection";

const PetCareEssentials = lazy(() => import("./components/PetCareEssentials"));
const ProductsCardSection = lazy(() => import("../products/ProductsCardSection"));
const BlogSection = lazy(() => import("../blog/BlogSection"));

const SectionFallback: React.FC = () => (
  <div aria-live="polite" className="py-4 text-center">
    Cargando seccion...
  </div>
);

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutHomeSection />
      <Suspense fallback={<SectionFallback />}>
        <ProductsCardSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PetCareEssentials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BlogSection />
      </Suspense>
    </>
  );
};

export default Home;
