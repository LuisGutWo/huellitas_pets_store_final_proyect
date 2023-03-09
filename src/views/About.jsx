import { Button } from "@mui/material";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

function About() {
  return (
    <div className="container about-container">
      <Card className="bg-light text-dark about-card">
        <Card.Img
          src="src/assets/img/perrito_fondo_rosado.jpg"
          alt="Card image"
        />
        <Card.ImgOverlay className="card-overlay">
          <Card.Title className="fs-3">
            En Huellitas lo mas
            <br /> importante son tus
            <br /> mascotas
          </Card.Title>
          <Card.Text>
            Por mas de 14 años nos preocupamos cada <br /> dia en ser tu mejor
            aliado y amigo. <br />
            En brindarte todo lo que necesitas <br /> para tu mascota <br />{" "}
            Nuestros clientes nos avalan... <br />
          </Card.Text>
          <Card.Text>Siempre estaremos gustosos de poder ayudarte</Card.Text>
          <img
            src="src/assets/img/hero_gatito.jpg"
            alt=""
            className="about-image"
          />
          <NavLink to="/products" className="about-button mt-2">
            <Button variant="outlined">Ver Productos</Button>
          </NavLink>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default About;
