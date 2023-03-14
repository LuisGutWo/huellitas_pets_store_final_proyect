import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HeroSection = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="main-hero">
          <div>
            <img
              src="src/assets/img/hero_mascotas.jpg"
              alt=""
              className="hero-img img-fluid"
            />
          </div>
          <div className="newhero-container">
            <img
              src="src/assets/img/huellitas_logo_blanco.png"
              alt=""
              className="hero-logo img-fluid"
            />
            <h5 className="newtext-container text-light">
              ¡Tenemos
              <br /> lo que tu mascota
              <br /> se merece
              <br /> y mucho mas!
            </h5>
            <NavLink
              to={"/products"}
            >
              <Button className="btn btn-secondary btn-sm"> <ArrowForwardIosIcon /> Compre Ahora</Button>
            </NavLink>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="main-hero">
          <div>
            <img
              src="src/assets/img/perrito_cachorro.jpg"
              alt=""
              className="hero-img img-fluid"
            />
          </div>
          <div className="hero-container">
            <img
              src="src/assets/img/huellitas_logo_dark.png"
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
            <NavLink
              to={"/products"}
              style={{ marginLeft: "2rem" }}
            >
              <Button className="btn btn-secondary btn-sm"> <ArrowForwardIosIcon /> Compre Ahora</Button>
            </NavLink>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="main-hero">
          <div>
            <img
              src="src/assets/img/gato_portada.jpg"
              alt=""
              className="hero-img img-fluid"
            />
          </div>
          <div className="hero-container">
            <img
              src="src/assets/img/huellitas_logo_blanco.png"
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
            <NavLink
              to={"/products"}
              style={{ marginLeft: "2rem" }}
            >
              <Button className="btn btn-secondary btn-sm"> <ArrowForwardIosIcon /> Compre Ahora</Button>
            </NavLink>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSection;
