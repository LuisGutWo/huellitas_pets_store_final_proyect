import React from "react";
import { NavLink } from "react-router-dom";
import "animate.css";

function About() {
  return (
    <>
      <div className="about-container">
        <figure>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/perrito_fondo_rosado.png?alt=media&token=c0cee521-7c9d-4511-a1f8-44edfd8f66b6"
            }
            alt=""
            className="about-img img-fluid"
          />
        </figure>
        <article className="card-overlay container">
          <div className="">
            <h1>
              En Huellitas lo mas
              <br /> importante son tus
              <br /> mascotas
            </h1>
            <h5 className="text-dark">
              Por mas de 14 años
              <br /> nos preocupamos cada <br /> dia en ser tu mejor aliado y
              amigo. <br />
              En brindarte todo lo que necesitas <br /> para tu mascota <br />{" "}
              Nuestros clientes nos avalan... <br />
            </h5>
          </div>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/hero_gatito.png?alt=media&token=7e600421-8a55-408f-a58c-6aefb6b87414"
            }
            alt=""
            className="about-image"
          />
          <NavLink to={"/products"} className="category-buttons-hero mt-4">
            Volver a la tienda
          </NavLink>
        </article>
      </div>
    </>
  );
}

export default About;
