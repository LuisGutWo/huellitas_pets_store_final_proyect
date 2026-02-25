import HeroSection from "./components/HeroSection";
import AboutHomeSection from "./components/AboutHomeSection";
import PetCareEssentials from "./components/PetCareEssentials";
import ProductsCardSection from "../products/ProductsCardSection";
import BlogSection from "../blog/BlogSection";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutHomeSection />
      <ProductsCardSection />
      <PetCareEssentials />
      <BlogSection />
    </>
  );
};

export default Home;
