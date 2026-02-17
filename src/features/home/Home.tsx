import HeroSection from "./components/HeroSection";
import ProductsCardSection from "../products/ProductsCardSection";
import BlogSection from "../blog/BlogSection";
import IconsSection from "./components/IconsSection";
import DiscountsProducts from "../products/DiscountsProducts";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <IconsSection />
      <ProductsCardSection />
      <DiscountsProducts />
      <BlogSection />
    </>
  );
};

export default Home;
