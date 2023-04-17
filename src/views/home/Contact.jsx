import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import imagenes from "../../assets/imagenes";

const Contact = () => {
  return (
    <>
      <article className="main-contact">
        <img src={imagenes[4].img} alt="" className="img-fluid contact-img" />
        <section className="contact-container">
          <img src={imagenes[6].img} alt="" className="img-fluid" style={{ width: "13rem" }} />
          <Form className="contact-form">
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingresar nombre" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="number" placeholder="Numero telefónico" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="nombre@ejemplo.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cuéntanos que necesitas?</Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
            <Button className="btn-info">Enviar</Button>
          </Form>
        </section>
      </article>
    </>
  );
};

export default Contact;
