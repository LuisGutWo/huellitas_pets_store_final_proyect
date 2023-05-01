import React from "react";
import HeroSection from "../components/HeroSection";
import ProductsCardSection from "../views/products/ProductsCardSection";
import BlogSection from "../views/home/BlogSection";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{
        opacity: 0.7,
      }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.5 },
      }}
      exit={{
        opacity: 0.7,
        transition: { duration: 0.5 },
      }}
      className="home-section"
    >
      <HeroSection />
      <ProductsCardSection />
      <BlogSection />
    </motion.div>
  );
};

export default Home;
