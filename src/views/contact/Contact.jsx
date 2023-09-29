import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import { TextareaAutosize } from "@mui/material";
import blackLogo from "../../assets/img/huellitas-logo-black-500x500.png";

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
    <div className="contact-main-container">
      <article className="main-contact">
        <section className="contact-img"></section>
        <section className="contact-container">
          <img src={blackLogo} alt="" className="img-fluid contact-logo" />
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
              className="about-button mt-2"
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
      <article className="map-section">
        <div className="map-wrap">
          <div className="info-map">
            Huellitas PetsStore,
            <br />
            Santiago de Chile,
            <br />
            <span>agutierrezwong@gmail.com</span>
          </div>
          <MapContainer center={[-33.43659, -70.68413]} zoom={16}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-33.43659, -70.68413]}>
              <Popup>Huellitas Pets Store</Popup>
            </Marker>
          </MapContainer>
        </div>
      </article>
    </div>
  );
};

export default Contact;
