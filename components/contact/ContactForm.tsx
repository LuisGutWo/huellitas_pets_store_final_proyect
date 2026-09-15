"use client";

import { useRef, useState, type FormEvent } from "react";
import Icon from "@/components/ui/Icon";
import { isEmailConfigured, sendContactEmail } from "@/lib/emailjs";
import styles from "./ContactForm.module.css";

type Field = "user_name" | "user_email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "failed" | "unconfigured";

const validate = (field: Field, value: string): string | undefined => {
  const trimmed = value.trim();

  if (field === "user_name") {
    if (!trimmed) return "Escribe tu nombre para saber con quién hablamos.";
    if (trimmed.length < 2) return "El nombre necesita al menos 2 letras.";
    return undefined;
  }

  if (field === "user_email") {
    if (!trimmed) return "Necesitamos tu correo para poder responderte.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      return "Ese correo no tiene formato válido. Revisa el @ y el dominio.";
    }
    return undefined;
  }

  if (!trimmed) return "Cuéntanos qué necesitas.";
  if (trimmed.length < 10) return "Con un poco más de detalle podemos ayudarte mejor.";
  return undefined;
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const check = (field: Field, value: string) => {
    setErrors((current) => ({ ...current, [field]: validate(field, value) }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {
      user_name: validate("user_name", String(data.get("user_name") ?? "")),
      user_email: validate("user_email", String(data.get("user_email") ?? "")),
      message: validate("message", String(data.get("message") ?? "")),
    };

    setErrors(next);
    setTouched({ user_name: true, user_email: true, message: true });

    if (Object.values(next).some(Boolean)) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    if (!isEmailConfigured) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");

    try {
      await sendContactEmail(form);
      setStatus("sent");
      form.reset();
      setTouched({});
    } catch {
      setStatus("failed");
    }
  };

  const fieldError = (field: Field) =>
    touched[field] && errors[field] ? errors[field] : undefined;

  return (
    <form ref={formRef} className={styles.form} onSubmit={submit} noValidate>
      <h2 className={styles.title}>Escríbenos</h2>

      <div className={styles.field}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="user_name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(fieldError("user_name"))}
          aria-describedby={fieldError("user_name") ? "err-nombre" : undefined}
          onBlur={(event) => {
            setTouched((t) => ({ ...t, user_name: true }));
            check("user_name", event.target.value);
          }}
        />
        {fieldError("user_name") && (
          <p id="err-nombre" className={styles.error}>
            <Icon name="alerta" size={15} />
            {fieldError("user_name")}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          name="user_email"
          type="email"
          autoComplete="email"
          placeholder="nombre@ejemplo.cl"
          aria-invalid={Boolean(fieldError("user_email"))}
          aria-describedby={fieldError("user_email") ? "err-correo" : undefined}
          onBlur={(event) => {
            setTouched((t) => ({ ...t, user_email: true }));
            check("user_email", event.target.value);
          }}
        />
        {fieldError("user_email") && (
          <p id="err-correo" className={styles.error}>
            <Icon name="alerta" size={15} />
            {fieldError("user_email")}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="message"
          rows={6}
          aria-invalid={Boolean(fieldError("message"))}
          aria-describedby={fieldError("message") ? "err-mensaje" : undefined}
          onBlur={(event) => {
            setTouched((t) => ({ ...t, message: true }));
            check("message", event.target.value);
          }}
        />
        {fieldError("message") && (
          <p id="err-mensaje" className={styles.error}>
            <Icon name="alerta" size={15} />
            {fieldError("message")}
          </p>
        )}
      </div>

      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>

      {/* El resultado se imprime bajo el formulario, no flota. */}
      <div className={styles.status} role="status" aria-live="polite">
        {status === "sent" && (
          <p data-tone="ok">
            <Icon name="listo" size={17} />
            Mensaje enviado. Respondemos dentro del día hábil siguiente.
          </p>
        )}
        {status === "failed" && (
          <p data-tone="bad">
            <Icon name="alerta" size={17} />
            No se pudo enviar. Vuelve a intentar, o escríbenos directo por
            WhatsApp al +569 2039 0272.
          </p>
        )}
        {status === "unconfigured" && (
          <p data-tone="bad">
            <Icon name="alerta" size={17} />
            El envío de correo no está configurado en este despliegue. Escríbenos
            por WhatsApp al +569 2039 0272 y te respondemos igual.
          </p>
        )}
      </div>
    </form>
  );
}
