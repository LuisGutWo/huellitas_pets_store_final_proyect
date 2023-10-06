import React from "react";
import HeroSection from "../../components/hero/HeroSection";
import ProductsCardSection from "../products/ProductsCardSection";
import BlogSection from "../blog/BlogSection";
import IconsSection from "../../components/icons/IconsSection";
import DiscountsProducts from "../products/DiscountsProducts";
import BackToTopButton from "../../utils/BackToTopButton";
import WhatsAppButton from "../../utils/WhatsAppButton";

const Home = () => {
  return (
    <>
      <HeroSection />
      <IconsSection />
      <ProductsCardSection />
      <DiscountsProducts />
      <BlogSection />
      <BackToTopButton />
      <WhatsAppButton />
    </>
  );
};

export default Home;
