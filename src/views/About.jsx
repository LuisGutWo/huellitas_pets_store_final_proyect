import { Button } from "@mui/material";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

function About() {
  return (
    <Card className="bg-light text-dark about-card">
      <Card.Img
        src="src/assets/img/perrito_fondo_rosado.jpg"
        alt="Card image"
      />
      <Card.ImgOverlay className="d-flex flex-column justify-content-center" >
        <Card.Title className="display-5 mb-2 mt-4">
          En Huellitas lo mas importante son tus mascotas
        </Card.Title>
        <Card.Text className="h6 mt-3">
          Por mas de 14 años nos preocupamos cada <br /> dia en ser tu mejor
          aliado y amigo. <br />
          En brindarte todo lo que necesitas <br /> para tu mascota <br />{" "}
          Nuestros clientes nos avalan... <br />
        </Card.Text>
        <Card.Text className="h6 mt-3">
          Siempre estaremos gustosos de poder ayudarte
        </Card.Text>
        <img
          src="src/assets/img/hero_gatito.jpg"
          alt=""
          className="about-image"
        />
        <Button variant="outlined">
          <NavLink 
          to="/"
          className="about-button"
          >Ver Productos</NavLink>
        </Button>
      </Card.ImgOverlay>
    </Card>
  );
}

export default About;
