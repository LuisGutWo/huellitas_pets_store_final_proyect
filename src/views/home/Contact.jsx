import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Contact = () => {
  return (
    <>
      <article className="main-contact">
        <img src={"https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/gato_y_perro.png?alt=media&token=57c3a1cb-c492-487c-96f9-7adc684fb710"} alt="" className="img-fluid contact-img" />
        <section className="contact-container">
          <img src={"https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/huellitas_logo_dark.png?alt=media&token=4686312b-e73e-410a-9c9f-0d03d64c0d4e"} alt="" className="img-fluid" style={{ width: "13rem" }} />
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
