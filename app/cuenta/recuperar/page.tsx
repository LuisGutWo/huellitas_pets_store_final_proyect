"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import AuthShell from "@/components/auth/AuthShell";
import {
  authErrorMessage,
  isAuthConfigured,
  sendRecoveryEmail,
} from "@/lib/firebase";
import styles from "@/components/auth/auth.module.css";

export default function RecoverPage() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setProblem("Ese correo no tiene formato válido. Revisa el @ y el dominio.");
      return;
    }

    setBusy(true);
    setProblem(null);

    try {
      await sendRecoveryEmail(email);
      setSent(true);
    } catch (error) {
      setProblem(authErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Recuperar contraseña"
      lede="Te enviamos un enlace para definir una nueva. Llega en unos minutos; revisa también el correo no deseado."
      footer={
        <>
          <p>
            ¿La recordaste? <Link href="/cuenta/ingresar">Ingresar</Link>
          </p>
          <p>
            ¿Sin cuenta? <Link href="/cuenta/crear">Crear una</Link>
          </p>
        </>
      }
    >
      {!isAuthConfigured && (
        <p className={styles.status} data-tone="bad">
          <Icon name="alerta" size={17} />
          La recuperación no está configurada en este despliegue.
        </p>
      )}

      <form onSubmit={submit} noValidate>
        <div className={styles.field}>
          <label htmlFor="email">Correo de la cuenta</label>
          <div className={styles.control}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nombre@ejemplo.cl"
              disabled={!isAuthConfigured || sent}
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={busy || sent || !isAuthConfigured}
        >
          {busy ? "Enviando…" : sent ? "Enlace enviado" : "Enviar enlace"}
        </button>

        <div role="status" aria-live="polite">
          {sent && (
            <p className={styles.status} data-tone="ok">
              <Icon name="listo" size={17} />
              Si ese correo tiene cuenta, el enlace ya va en camino.
            </p>
          )}
          {problem && (
            <p className={styles.status} data-tone="bad">
              <Icon name="alerta" size={17} />
              {problem}
            </p>
          )}
        </div>
      </form>
    </AuthShell>
  );
}
