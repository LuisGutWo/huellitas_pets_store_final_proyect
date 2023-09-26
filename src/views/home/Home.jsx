import React from "react";
import HeroSection from "../../components/hero/HeroSection";
import ProductsCardSection from "../products/ProductsCardSection";
import BlogSection from "../blog/BlogSection";
import IconsSection from "../../components/icons/IconsSection";
import BackToTopButton from "../../utils/BackToTopButton";
import DiscountsProducts from "../products/DiscountsProducts";

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
