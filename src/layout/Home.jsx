import React from "react";
import HeroSection from "../components/HeroSection";
import ProductsCardSection from "../views/products/ProductsCardSection";
import BlogSection from "../views/home/BlogSection";
import { motion } from "framer-motion";
import IconsSection from "../components/IconsSection";

const Home = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4 },
      }}
      exit={{
        opacity: 0.7,
        transition: { duration: 0.5 },
      }}
      className="mt-0"
    >
      <HeroSection />
      <IconsSection />
      <ProductsCardSection />
      <BlogSection />
    </motion.div>
  );
};

export default Home;
