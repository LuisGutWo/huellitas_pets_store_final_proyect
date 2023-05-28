import React from "react";
import HeroSection from "../components/HeroSection";
import ProductsCardSection from "../views/products/ProductsCardSection";
import BlogSection from "../views/home/BlogSection";
import IconsSection from "../components/IconsSection";
import BackToTopButton from "./BackToTopButton";
import DiscountsProducts from "../views/products/DiscountsProducts";

const Home = () => {
  return (
    <>
      <HeroSection />
      <IconsSection />
      <ProductsCardSection />
      <DiscountsProducts />
      <BlogSection />
      <BackToTopButton />
    </>
  );
};

export default Home;
