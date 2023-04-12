import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import imagenes from "../assets/imagenes";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HeroSection = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="main-hero">
          <div>
            <img
              src={imagenes[0].img}
              alt=""
              className="hero-img img-fluid"
            />
          </div>
          <div className="newhero-container">
            <img
              src={imagenes[5].img}
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
              <Button className="btn btn-sm" variant="dark"> <ArrowForwardIosIcon /> Compre Ahora</Button>
            </NavLink>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="main-hero">
          <div>
            <img
              src={imagenes[2].img}
              alt=""
              className="hero-img img-fluid"
            />
          </div>
          <div className="hero-container">
            <img
              src={imagenes[6].img}
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
              <Button className="btn btn-sm" variant="dark"> <ArrowForwardIosIcon /> Compre Ahora</Button>
            </NavLink>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="main-hero">
          <div>
            <img
              src={imagenes[1].img}
              alt=""
              className="hero-img img-fluid"
            />
          </div>
          <div className="hero-container">
            <img
              src={imagenes[5].img}
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
              <Button className="btn btn-sm" variant="dark"> <ArrowForwardIosIcon /> Compre Ahora</Button>
            </NavLink>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSection;
