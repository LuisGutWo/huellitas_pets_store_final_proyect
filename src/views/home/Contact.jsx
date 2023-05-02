import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import { TextareaAutosize } from "@mui/material";
import { useState } from "react";

const Contact = () => {
  const [showEmailSend, setShowEmailSend] = useState(false);
  const form = useRef();

  const handleCloseEmailSend = () => setShowEmailSend(false);
  const handleShowEmailSend = () => setShowEmailSend(true);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_a6l6xm9",
        "template_6jdtamc",
        form.current,
        "QVDHpjw6RiU7JDfap"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <motion.div
      initial={{
        opacity: 0.7,
      }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.5 },
      }}
      exit={{
        opacity: 0.7,
        transition: { duration: 0.5 },
      }}
    >
      <article className="main-contact">
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/gato_y_perro.png?alt=media&token=57c3a1cb-c492-487c-96f9-7adc684fb710"
          }
          alt=""
          className="contact-img"
        />
        <section className="contact-container">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/huellitas_logo_dark.png?alt=media&token=4686312b-e73e-410a-9c9f-0d03d64c0d4e"
            }
            alt=""
            className="img-fluid"
            style={{ width: "50%", padding: "0rem", margin: "0rem" }}
          />
          <Form ref={form} onSubmit={sendEmail} className="contact-form">
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar nombre"
                name="user_name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="nombre@ejemplo.com"
                name="user_email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cuéntanos que necesitas?</Form.Label>
              <Form.Control as={TextareaAutosize} name="message" />
            </Form.Group>
            <Button
              onClick={handleShowEmailSend}
              className="btn-info"
              type="submit"
              value="Send"
            >
              Enviar
            </Button>
            <Modal show={showEmailSend} onHide={handleCloseEmailSend}>
              <Modal.Header closeButton>
                <Modal.Body>
                  Correo Enviado! 🛸 <br /> Te responderemos de inmediato.
                  Gracias
                </Modal.Body>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="info" onClick={handleCloseEmailSend}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </section>
      </article>
    </motion.div>
  );
};

export default Contact;
