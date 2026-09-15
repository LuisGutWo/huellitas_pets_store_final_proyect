"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import AuthShell from "@/components/auth/AuthShell";
import { useAuth } from "@/components/providers/AuthProvider";
import { authErrorMessage, isAuthConfigured, signIn } from "@/lib/firebase";
import styles from "@/components/auth/auth.module.css";

export default function SignInPage() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  useEffect(() => {
    if (ready && user) router.replace("/cuenta");
  }, [ready, user, router]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email || !password) {
      setProblem("Completa correo y contraseña para entrar.");
      return;
    }

    setBusy(true);
    setProblem(null);

    try {
      await signIn({ email, password });
      router.replace("/cuenta");
    } catch (error) {
      setProblem(authErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Ingresar"
      lede="Tu cuenta guarda el carrito y los favoritos aparte de los de invitado."
      footer={
        <>
          <p>
            ¿Primera vez? <Link href="/cuenta/crear">Crear una cuenta</Link>
          </p>
          <p>
            ¿Olvidaste la contraseña?{" "}
            <Link href="/cuenta/recuperar">Recuperarla</Link>
          </p>
          <p>
            También puedes <Link href="/productos">comprar como invitado</Link>.
          </p>
        </>
      }
    >
      {!isAuthConfigured && (
        <p className={styles.status} data-tone="bad">
          <Icon name="alerta" size={17} />
          El acceso con cuenta no está configurado en este despliegue. El catálogo
          y el carrito funcionan igual.
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
              autoComplete="current-password"
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

        <button
          type="submit"
          className={styles.submit}
          disabled={busy || !isAuthConfigured}
        >
          {busy ? "Entrando…" : "Entrar"}
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
