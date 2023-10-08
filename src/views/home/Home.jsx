import React from "react";
import HeroSection from "../../components/hero/HeroSection";
import ProductsCardSection from "../products/ProductsCardSection";
import BlogSection from "../blog/BlogSection";
import IconsSection from "../../components/icons/IconsSection";
import DiscountsProducts from "../products/DiscountsProducts";

const Home = () => {
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
