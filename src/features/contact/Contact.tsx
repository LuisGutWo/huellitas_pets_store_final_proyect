import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Form from "react-bootstrap/Form";
import { sendContactEmail } from "../../services/emailjs";
import { TextareaAutosize } from "@mui/material";
import blackLogo from "../../assets/img/huellitas-logo-black-500x500.png";
import Breadcrumbs from "../../shared/components/Breadcrumbs";
import Spinner from "../../shared/components/Spinner";
import SuccessCheckmark from "../../shared/components/SuccessCheckmark";
import "./contact.scss";

const Contact: React.FC = () => {
  const [showEmailSend, setShowEmailSend] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const form = useRef<HTMLFormElement>(null);

  const handleCloseEmailSend = () => setShowEmailSend(false);

  const validateField = (field: "name" | "email" | "message", value: string) => {
    const trimmedValue = value.trim();

    if (field === "name") {
      if (!trimmedValue) return "El nombre es obligatorio";
      if (trimmedValue.length < 2) return "Ingresa al menos 2 caracteres";
    }

    if (field === "email") {
      if (!trimmedValue) return "El email es obligatorio";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedValue)) return "Email no valido";
    }

    if (field === "message") {
      if (!trimmedValue) return "El mensaje es obligatorio";
      if (trimmedValue.length < 10) return "Escribe al menos 10 caracteres";
    }

    return "";
  };

  const handleBlur = (field: "name" | "email" | "message") => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const errorMessage = validateField(field, e.currentTarget.value);
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current || isSending) {
      return;
    }

    const formData = new FormData(form.current);
    const nameValue = String(formData.get("user_name") || "");
    const emailValue = String(formData.get("user_email") || "");
    const messageValue = String(formData.get("message") || "");

    const nextErrors = {
      name: validateField("name", nameValue),
      email: validateField("email", emailValue),
      message: validateField("message", messageValue),
    };

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setErrors(nextErrors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setIsSending(true);
    setSendError(null);

    sendContactEmail(form.current)
      .then((result) => {
        console.log(result.text);
        form.current?.reset();
        setErrors({});
        setTouched({});
        setShowEmailSend(true);
      })
      .catch((error) => {
        console.log(error.text);
        setSendError("No pudimos enviar el correo. Intenta nuevamente.");
        setShowEmailSend(true);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <>
      <div className="container breadcrumbs-wrapper">
        <Breadcrumbs />
      </div>
      <div className="contact-main-container">
        <article className="main-contact">
        <section className="contact-img"></section>
        <section className="contact-container">
          <img src={blackLogo} alt="" className="img-fluid contact-logo" />
          <h3 className="contact-title text-center">
            Hola Pet lover, en que te podemos ayudar...
          </h3>
          <Form ref={form} onSubmit={sendEmail} className="contact-form">
            <Form.Group className="mb-1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                placeholder="Ingresar nombre"
                name="user_name"
                isInvalid={Boolean(touched.name && errors.name)}
                onBlur={handleBlur("name")}
                aria-invalid={Boolean(touched.name && errors.name)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                size="lg"
                placeholder="nombre@ejemplo.com"
                name="user_email"
                isInvalid={Boolean(touched.email && errors.email)}
                onBlur={handleBlur("email")}
                aria-invalid={Boolean(touched.email && errors.email)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Cuéntanos que necesitas?</Form.Label>
              <Form.Control
                as={TextareaAutosize}
                name="message"
                isInvalid={Boolean(touched.message && errors.message)}
                onBlur={handleBlur("message")}
                aria-invalid={Boolean(touched.message && errors.message)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              className="category-buttons mt-3"
              type="submit"
              size="lg"
              value="Send"
              disabled={isSending}
            >
              {isSending ? (
                <span className="d-inline-flex align-items-center gap-2">
                  <Spinner size="sm" variant="light" />
                  Enviando...
                </span>
              ) : (
                "Enviar"
              )}
            </Button>
            <Modal show={showEmailSend} onHide={handleCloseEmailSend}>
              <Modal.Header closeButton>
                <Modal.Body>
                  {sendError ? (
                    <p className="m-0">{sendError}</p>
                  ) : (
                    <SuccessCheckmark message="Correo enviado. Te responderemos de inmediato." />
                  )}
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
    </>
  );
};

export default Contact;
