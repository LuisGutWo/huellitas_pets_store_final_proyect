import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Form from "react-bootstrap/Form";
import L from "leaflet";
import { sendContactEmail } from "../../services/emailjs";
import { TextareaAutosize } from "@mui/material";
import Breadcrumbs from "../../shared/components/Breadcrumbs";
import Spinner from "../../shared/components/Spinner";
import SuccessCheckmark from "../../shared/components/SuccessCheckmark";
import "./contact.scss";

const CONTACT_COOLDOWN_SECONDS = 30;
const CONTACT_COOLDOWN_KEY = "contact-form-cooldown-until";

const Contact: React.FC = () => {
  const [showEmailSend, setShowEmailSend] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);
  const [sendError, setSendError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const form = useRef<HTMLFormElement>(null);

  const handleCloseEmailSend = () => setShowEmailSend(false);

  useEffect(() => {
    const storedUntil = sessionStorage.getItem(CONTACT_COOLDOWN_KEY);
    if (!storedUntil) return;

    const until = Number(storedUntil);
    if (Number.isNaN(until)) {
      sessionStorage.removeItem(CONTACT_COOLDOWN_KEY);
      return;
    }

    const remainingMs = until - Date.now();
    if (remainingMs > 0) {
      setCooldownSeconds(Math.ceil(remainingMs / 1000));
    } else {
      sessionStorage.removeItem(CONTACT_COOLDOWN_KEY);
    }
  }, []);

  useEffect(() => {
    if (cooldownSeconds <= 0) return undefined;

    const intervalId = setInterval(() => {
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cooldownSeconds]);

  useEffect(() => {
    if (cooldownSeconds <= 0) {
      sessionStorage.removeItem(CONTACT_COOLDOWN_KEY);
    }
  }, [cooldownSeconds]);

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

    if (!form.current || isSending || cooldownSeconds > 0) {
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
        setCooldownSeconds(CONTACT_COOLDOWN_SECONDS);
        sessionStorage.setItem(
          CONTACT_COOLDOWN_KEY,
          String(Date.now() + CONTACT_COOLDOWN_SECONDS * 1000)
        );
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
    <section className="contact-wrapper">
      {/* Breadcrumb integrado */}
      <div className="contact-wrapper__breadcrumb">
        <Breadcrumbs />
      </div>

      {/* Contact form section */}
      <section className="contact-wrapper__content">
        <div className="contact-section">
          {/* Background image */}
          <figure className="contact-section__background"></figure>

          {/* Form overlay */}
          <article className="contact-section__form-container">
            <div className="contact-form-box">
              <header className="contact-form-box__header">
                <h1 className="contact-form-box__title">
                  ¿Cómo podemos ayudarte?
                </h1>
                <p className="contact-form-box__subtitle">
                  Cuéntanos tu pregunta o necesidad y nos pondremos en contacto pronto
                </p>
              </header>
          <Form ref={form} onSubmit={sendEmail} className="contact-form">
                <Form.Group className="contact-form__group">
                  <Form.Label className="contact-form__label">Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre completo"
                name="user_name"
                className="contact-form__input"
                isInvalid={Boolean(touched.name && errors.name)}
                onBlur={handleBlur("name")}
                aria-invalid={Boolean(touched.name && errors.name)}
              />
                  <Form.Control.Feedback type="invalid" className="contact-form__error">
                {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="contact-form__group">
                  <Form.Label className="contact-form__label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="nombre@ejemplo.com"
                name="user_email"
                className="contact-form__input"
                isInvalid={Boolean(touched.email && errors.email)}
                onBlur={handleBlur("email")}
                aria-invalid={Boolean(touched.email && errors.email)}
              />
                  <Form.Control.Feedback type="invalid" className="contact-form__error">
                {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="contact-form__group">
                  <Form.Label className="contact-form__label">Tu mensaje</Form.Label>
              <Form.Control
                as={TextareaAutosize}
                placeholder="Cuéntanos con detalle qué necesitas..."
                name="message"
                className="contact-form__textarea"
                minRows={4}
                isInvalid={Boolean(touched.message && errors.message)}
                onBlur={handleBlur("message")}
                aria-invalid={Boolean(touched.message && errors.message)}
              />
                  <Form.Control.Feedback type="invalid" className="contact-form__error">
                {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

            <Button
                  className="contact-form__submit"
              type="submit"
              disabled={isSending || cooldownSeconds > 0}
            >
              {isSending ? (
                <span className="d-inline-flex align-items-center gap-2">
                  <Spinner size="sm" variant="light" />
                  Enviando...
                </span>
              ) : cooldownSeconds > 0 ? (
                `Reenviar en ${cooldownSeconds}s`
              ) : (
                    "Enviar Mensaje"
              )}
            </Button>
            {cooldownSeconds > 0 && (
              <p className="contact-form__hint" aria-live="polite">
                Puedes volver a enviar el formulario cuando finalice el contador.
              </p>
            )}
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
            </div>
          </article>
        </div>
      </section>

      {/* Map section */}
      <section className="contact-wrapper__map">
        <div className="map-container">
          <div className="map-info">
            <h2 className="map-info__title">Huellitas Pet Store</h2>
            <address className="map-info__address">
              Santiago de Chile
            </address>
            <a href="mailto:agutierrezwong@gmail.com" className="map-info__link">
              agutierrezwong@gmail.com
            </a>
          </div>
          <div className="map-wrapper">
          <MapContainer center={L.latLng(-33.43659, -70.68413)} zoom={16}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={L.latLng(-33.43659, -70.68413)}>
              <Popup>Huellitas Pets Store</Popup>
            </Marker>
          </MapContainer>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;
