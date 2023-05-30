import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { TextareaAutosize } from "@mui/material";

const Contact = () => {
  const [showEmailSend, setShowEmailSend] = useState(false);
  const form = useRef();

  const handleCloseEmailSend = () => setShowEmailSend(false);
  const handleShowEmailSend = () => setShowEmailSend(true);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_EMAILJS,
        import.meta.env.VITE_TEMPLATE_EMAILJS,
        form.current,
        import.meta.env.VITE_FORM_CURRENT
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
      className="contact-main-container"
    >
      <article className="main-contact">
        <section className="contact-img"></section>
        <section className="contact-container">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/huellitas_logo_dark.png?alt=media&token=4686312b-e73e-410a-9c9f-0d03d64c0d4e"
            }
            alt=""
            className="img-fluid"
            style={{ width: "30%", padding: "0rem", margin: "0rem" }}
          />
          <Form ref={form} onSubmit={sendEmail} className="contact-form">
            <Form.Group className="mb-1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar nombre"
                name="user_name"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="nombre@ejemplo.com"
                name="user_email"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Cuéntanos que necesitas?</Form.Label>
              <Form.Control as={TextareaAutosize} name="message" />
            </Form.Group>
            <Button
              onClick={handleShowEmailSend}
              className="about-button"
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
            </Modal>
          </Form>
        </section>
      </article>
      <section className="map-section">
        <div className="info-map">
          Huellitas PetsStore,
          <br />
          Santiago de Chile,
          <br />
          <span>agutierrezwong@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[-33.43659, -70.68413]} zoom={16}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-33.43659, -70.68413]}>
              <Popup>Huellitas Pets Store</Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
