import React from "react";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { motion } from "framer-motion";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HeroSection = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <section className="main-hero">
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
            src={
              "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/hero_mascotas.png?alt=media&token=5fbc177a-da21-4d65-a4de-b7232ad85612"
            }
            alt=""
            className="img-fluid"
          />
          <motion.article
            className="newhero-container"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { delay: 0.7, duration: 0.7 },
            }}
            exit={{
              opacity: 0.7,
              transition: { duration: 0.5 },
            }}
          >
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/huellitas_logo_blanco.png?alt=media&token=1a021733-a8f1-4b0f-9f5b-d5ef83d24e22"
              }
              alt=""
              className="hero-logo img-fluid"
            />
            <h5 className="text-container text-light text-end">
              ¡Tenemos
              <br /> lo que tu mascota
              <br /> se merece
              <br /> y mucho mas!
            </h5>
            <NavLink to={"/products"} className="hero-button" variant="dark">
              <ArrowForwardIosIcon style={{ width: "1rem" }} /> Compre Ahora
            </NavLink>
          </motion.article>
        </section>
      </Carousel.Item>
      <Carousel.Item>
        <section className="main-hero">
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
            src={
              "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/perrito_cachorro.png?alt=media&token=3324764a-2adf-46b8-b611-f23225475b96"
            }
            alt=""
            className="hero-img img-fluid"
          />
          <motion.article
            className="hero-container"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { delay: 0.7, duration: 0.7 },
            }}
            exit={{
              opacity: 0.7,
              transition: { duration: 0.5 },
            }}
          >
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/huellitas_logo_dark.png?alt=media&token=4686312b-e73e-410a-9c9f-0d03d64c0d4e"
              }
              alt=""
              className="hero-logo img-fluid"
            />
            <h5 className="text-container text-dark">
              Llegamos a la puerta
              <br />
              de tu casa
              <br />
              con todo lo que necesites
            </h5>
            <NavLink to={"/products"} className="hero-button" variant="dark">
              <ArrowForwardIosIcon style={{ width: "1rem" }} /> Compre Ahora
            </NavLink>
          </motion.article>
        </section>
      </Carousel.Item>
      <Carousel.Item>
        <section className="main-hero">
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
            src={
              "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/gato_portada.png?alt=media&token=1ba95cc0-7014-4584-a50e-21adb58bdfa3"
            }
            alt=""
            className="img-fluid"
          />
          <motion.article
            className="hero-container"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { delay: 0.7, duration: 0.7 },
            }}
            exit={{
              opacity: 0.7,
              transition: { duration: 0.5 },
            }}
          >
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/huellitas_logo_blanco.png?alt=media&token=1a021733-a8f1-4b0f-9f5b-d5ef83d24e22"
              }
              alt=""
              className="hero-logo img-fluid"
            />
            <h5 className="text-container text-light">
              Te ofrecemos
              <br />
              una gran variedad
              <br />
              de productos pensados
              <br /> en tu mascota.
            </h5>
            <NavLink to={"/products"} className="hero-button" variant="dark">
              <ArrowForwardIosIcon style={{ width: "1rem" }} /> Compre Ahora
            </NavLink>
          </motion.article>
        </section>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSection;
