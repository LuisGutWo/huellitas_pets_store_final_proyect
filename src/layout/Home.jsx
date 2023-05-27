import React from "react";
import HeroSection from "../components/HeroSection";
import ProductsCardSection from "../views/products/ProductsCardSection";
import BlogSection from "../views/home/BlogSection";
import IconsSection from "../components/IconsSection";
import BackToTopButton from "./BackToTopButton";

const Home = () => {
  return (
    <>
      <HeroSection />
      <IconsSection />
      <ProductsCardSection />
      <BlogSection />
      <BackToTopButton />
    </>
  );
};

export default Home;
