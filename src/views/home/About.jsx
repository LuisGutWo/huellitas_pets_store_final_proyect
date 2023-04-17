import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import imagenes from "../../assets/imagenes";

function About() {
  return (
    <>
      <div className="about-container bg-light text-dark">
        <div>
          <img
            src={imagenes[7].img}
            alt=""
            className="about-img img-fluid"
          />
        </div>
        <div className="card-overlay container">
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
            src={imagenes[8].img}
            alt=""
            className="about-image"
          />
          <NavLink to={"/products"}>
            {" "}
            <Button size="sm" className="about-button btn-secondary">
              Ver mas
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default About;
