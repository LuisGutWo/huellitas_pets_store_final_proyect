import React from "react";
import HeroSection from "../components/HeroSection";
import ProductsCardSection from "./ProductsCardSection";
import BlogSection from "./BlogSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ProductsCardSection />
      <BlogSection />
    </div>
  );
};

export default Home;
