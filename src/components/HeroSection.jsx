import React from "react";
import { Button, NavLink } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const HeroSection = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="main-hero bg-black">
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
            <NavLink to={"/products"}> <Button size="sm">Ver mas</Button></NavLink>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="main-hero bg-black">
          <div className="hero-background">
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
              <br />de tu casa
              <br />con todo lo que necesites
            </h5>
            <NavLink to={"/products"} className="ms-5"> <Button size="sm">Ver mas</Button></NavLink>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="main-hero bg-black">
          <div className="hero-background">
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
            <NavLink to={"/products"} className="ms-5"> <Button size="sm">Ver mas</Button></NavLink>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSection;
