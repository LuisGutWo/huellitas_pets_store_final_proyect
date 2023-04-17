import React from "react";
import HeroSection from "../components/HeroSection";
import ProductsCardSection from "../views/products/ProductsCardSection";
// import BlogSection from "../views/home/BlogSection";


const Home = () => {
  return (
    <div>
      <HeroSection />
      <ProductsCardSection />
      {/* <BlogSection /> */}
    </div>
  );
};

export default Home;
