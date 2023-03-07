import React from "react";
import Carousel from "react-bootstrap/Carousel";

const HeroSection = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="main-hero bg-black">
          <div className="hero-background">
            <img
              src="src/assets/img/hero_mascotas.jpg"
              alt=""
              className="card-image hero-img img-fluid"
            />
          </div>
          <div className="hero-container">
            <img
              src="src/assets/img/Logo_blanco.png"
              alt=""
              className="hero-logo img-fluid"
            />
            <h4 className="text-container">
              ¡Tenemos lo que tu mascota necesita y mucho mas!
            </h4>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="main-hero bg-black">
          <div className="hero-background">
            <img
              src="src/assets/img/perrito_fondo_rosado_II.jpg"
              alt=""
              className="card-image hero-img img-fluid"
              style={{ height: "31.5rem" }}
            />
          </div>
          <div className="cat-container text-dark">
            <img
              src="src/assets/img/My project-1.png"
              alt=""
              className="hero-logo img-fluid ms-0"
              style={{ width: "28%", height: "28%" }}
            />
            <h4>
              Dinos que necesitas
              <br />
              y te lo dejamos en la puerta
              <br />
              de tu casa.
            </h4>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="main-hero bg-black">
          <div className="hero-background">
            <img
              src="src/assets/img/gato_portada.jpg"
              alt=""
              className="card-image hero-img img-fluid"
            />
          </div>
          <div className="cat-container">
            <img
              src="src/assets/img/Logo_blanco.png"
              alt=""
              className="hero-logo img-fluid ms-0"
              style={{ width: "30%", height: "30%" }}
            />
            <h4>
              Te ofrecemos
              <br />
              una gran variedad
              <br />
              de productos pensados en tu mascota.
            </h4>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSection;
