"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import PageHeader from "@/components/chrome/PageHeader";
import { useAuth } from "@/components/providers/AuthProvider";
import { useStore } from "@/components/providers/StoreProvider";
import { authErrorMessage, signOutUser } from "@/lib/firebase";
import { formatPrice } from "@/lib/format";
import styles from "./cuenta.module.css";

export default function AccountPage() {
  const router = useRouter();
  const { user, ready, configured } = useAuth();
  const { cart, favorites, totalUnits, totalAmount, hydrated } = useStore();
  const [problem, setProblem] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !user) router.replace("/cuenta/ingresar");
  }, [ready, user, router]);

  if (!configured) {
    return (
      <>
        <PageHeader title="Mi cuenta" crumbs={[{ href: "/cuenta", label: "Mi cuenta" }]} />
        <p className={styles.notice}>
          El acceso con cuenta no está configurado en este despliegue.
        </p>
      </>
    );
  }

  if (!ready || !user) {
    return (
      <>
        <PageHeader title="Mi cuenta" crumbs={[{ href: "/cuenta", label: "Mi cuenta" }]} />
        <p className={styles.notice}>Revisando tu sesión…</p>
      </>
    );
  }

  const leave = async () => {
    try {
      await signOutUser();
      router.replace("/");
    } catch (error) {
      setProblem(authErrorMessage(error));
    }
  };

  return (
    <>
      <PageHeader
        title="Mi cuenta"
        crumbs={[{ href: "/cuenta", label: "Mi cuenta" }]}
        lede="Tu carrito y tus guardados quedan atados a esta cuenta, separados de los de invitado."
      />

      <div className={styles.wrap}>
        <dl className={styles.identity}>
          <div>
            <dt>Correo</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Identificador</dt>
            <dd data-numeral>{user.uid.slice(0, 12)}…</dd>
          </div>
        </dl>

        <div className={styles.cards}>
          <Link href="/carrito" className={styles.card}>
            <Icon name="carrito" size={22} />
            <b data-numeral>{hydrated ? totalUnits : 0}</b>
            <span>
              {cart.length === 1 ? "producto" : "productos"} en el carrito
            </span>
            <em data-numeral>{hydrated ? formatPrice(totalAmount) : "—"}</em>
          </Link>

          <Link href="/favoritos" className={styles.card}>
            <Icon name="guardado" size={22} />
            <b data-numeral>{hydrated ? favorites.length : 0}</b>
            <span>guardados</span>
            <em>para decidir después</em>
          </Link>
        </div>

        <button type="button" className={styles.leave} onClick={leave}>
          Cerrar sesión
        </button>

        <div role="status" aria-live="polite">
          {problem && <p className={styles.problem}>{problem}</p>}
        </div>
      </div>
    </>
  );
}
