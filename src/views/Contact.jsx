import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import imagenes from "../assets/imagenes";

const Contact = () => {
  return (
    <div>
      <div className="main-contact bg-black">
        <div>
          <img
            src={imagenes[4].img}
            alt=""
            className="card-image img-fluid"
          />
        </div>
        <div className="contact-container">
          <img
            src={imagenes[6].img}
            alt=""
            className="hero-logo img-fluid"
          />
          <Form className="contact-form text-dark h6">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingresar nombre" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="number" placeholder="Numero telefónico" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="nombre@ejemplo.com" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Cuéntanos que necesitas?</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button className="btn-info">Enviar</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
