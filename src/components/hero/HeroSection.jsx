import React from "react";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { motion } from "framer-motion";

import LogoWhite from "../../assets/img/huellitas-logo-white-500x500.png";
import LogoBlack from "../../assets/img/huellitas-logo-black-500x500.png";
import HeroImg1 from "../../assets/img/hero_mascotas.jpg";
import HeroImg2 from "../../assets/img/perrito_cachorro.jpg";
import HeroImg3 from "../../assets/img/gato_portada.jpg";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HeroSection = () => {
  return (
    /// Main Carousel ///  
      <Carousel>
        {/* ///Carousel item 1 /// */}
        <Carousel.Item>
          <section className="main-carousel-item">
            <motion.img
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
              src={HeroImg1}
              alt=""
              className="img-fluid"
            />
            <article className="newhero-container">
              <img src={LogoWhite} alt="" className="img-fluid" />
              <h1 className="text-container text-light text-end">
                ¡Tenemos
                <br /> lo que tu mascota
                <br /> se merece
                <br /> y mucho mas!
              </h1>
              <NavLink
                to={"/products"}
                className="category-buttons-hero"
                variant="dark"
              >
                <ArrowForwardIosIcon style={{ width: "12%" }} />
                Productos
              </NavLink>
            </article>
          </section>
        </Carousel.Item>
        {/* /// Carousel item 2 /// */}
        <Carousel.Item>
          <section className="main-carousel-item">
            <motion.img
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
              src={HeroImg2}
              alt=""
              className="img-fluid"
            />
            <article className="hero-container">
              <img src={LogoBlack} alt="" className="hero-logo img-fluid" />
              <h1 className="text-container text-dark">
                Llegamos a la puerta
                <br />
                de tu casa
                <br />
                con todo lo que necesites
              </h1>
              <NavLink
                to={"/products"}
                className="category-buttons-hero"
                variant="dark"
              >
                <ArrowForwardIosIcon style={{ width: "12%" }} /> Productos
              </NavLink>
            </article>
          </section>
        </Carousel.Item>
        {/* /// Carousel item 3 /// */}
        <Carousel.Item>
          <section className="main-carousel-item">
            <motion.img
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
              src={HeroImg3}
              alt=""
              className="img-fluid"
            />
            <article className="hero-container">
              <img src={LogoWhite} alt="" className="hero-logo img-fluid" />
              <h1 className="text-container text-light">
                Te ofrecemos
                <br />
                una gran variedad
                <br />
                de productos pensados
                <br /> en tu mascota.
              </h1>
              <NavLink
                to={"/products"}
                className="category-buttons-hero"
                variant="dark"
              >
                <ArrowForwardIosIcon style={{ width: "12%" }} />
                Productos
              </NavLink>
            </article>
          </section>
        </Carousel.Item>
      </Carousel>
  );
};

export default HeroSection;
