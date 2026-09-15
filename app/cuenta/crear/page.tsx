"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import AuthShell from "@/components/auth/AuthShell";
import { authErrorMessage, isAuthConfigured, signUp } from "@/lib/firebase";
import styles from "@/components/auth/auth.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const repeat = String(data.get("repeat") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setProblem("Ese correo no tiene formato válido. Revisa el @ y el dominio.");
      return;
    }

    if (password.length < 6) {
      setProblem("La contraseña necesita al menos 6 caracteres.");
      return;
    }

    if (password !== repeat) {
      setProblem("Las contraseñas no coinciden. Revisa la segunda.");
      return;
    }

    setBusy(true);
    setProblem(null);

    try {
      await signUp({ email, password });
      router.replace("/cuenta");
    } catch (error) {
      setProblem(authErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Crear cuenta"
      lede="Solo correo y contraseña. No pedimos RUT, teléfono ni dirección para registrarte."
      footer={
        <>
          <p>
            ¿Ya tienes cuenta? <Link href="/cuenta/ingresar">Ingresar</Link>
          </p>
          <p>
            O sigue <Link href="/productos">como invitado</Link>.
          </p>
        </>
      }
    >
      {!isAuthConfigured && (
        <p className={styles.status} data-tone="bad">
          <Icon name="alerta" size={17} />
          El registro no está configurado en este despliegue. El catálogo y el
          carrito funcionan igual.
        </p>
      )}

      <form onSubmit={submit} noValidate>
        <div className={styles.field}>
          <label htmlFor="email">Correo</label>
          <div className={styles.control}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nombre@ejemplo.cl"
              disabled={!isAuthConfigured}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Contraseña</label>
          <div className={styles.control}>
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              disabled={!isAuthConfigured}
            />
            <button
              type="button"
              onClick={() => setShow((value) => !value)}
              aria-pressed={show}
            >
              <Icon name={show ? "cerrar" : "buscar"} size={17} />
              <span className="visuallyHidden">
                {show ? "Ocultar contraseña" : "Mostrar contraseña"}
              </span>
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="repeat">Repetir contraseña</label>
          <div className={styles.control}>
            <input
              id="repeat"
              name="repeat"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              disabled={!isAuthConfigured}
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={busy || !isAuthConfigured}
        >
          {busy ? "Creando…" : "Crear cuenta"}
        </button>

        <div role="status" aria-live="polite">
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
