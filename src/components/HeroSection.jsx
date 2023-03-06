import React from "react";

const HeroSection = () => {
  return (
    <div className="main-hero bg-black">
      <div className="hero-background">
        <img
          src="src/assets/img/hero_mascotas.jpg"
          alt=""
          className="hero-img img-fluid"
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
  );
};

export default HeroSection;
