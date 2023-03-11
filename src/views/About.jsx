import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function About() {
  return (
    <div className="about-container bg-light text-dark">
      <img
        src="src/assets/img/perrito_fondo_rosado.jpg"
        alt=""
        className="about-img img-fluid"
      />
      <div className="card-overlay">
        <h1>
          En Huellitas lo mas
          <br /> importante son tus
          <br /> mascotas
        </h1>
        <h5 className="text-dark">
          Por mas de 14 años 
          <br /> nos preocupamos cada <br /> dia en ser tu mejor
          aliado y amigo. <br />
          En brindarte todo lo que necesitas <br /> para tu mascota <br />{" "}
          Nuestros clientes nos avalan... <br />
        </h5>
        <img
          src="src/assets/img/hero_gatito.jpg"
          alt=""
          className="about-image"
        />
        <NavLink to={"/products"}>
          {" "}
          <Button size="sm" className="about-button">
            Ver mas
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default About;
