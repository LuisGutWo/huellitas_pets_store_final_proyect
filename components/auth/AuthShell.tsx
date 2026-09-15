import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./auth.module.css";

export default function AuthShell({
  title,
  lede,
  children,
  footer,
}: {
  title: string;
  lede: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <div className={styles.panel}>
        <Link href="/" className={styles.mark}>
          <Image
            src="/assets/img/huellitas-logo-black-500x500.webp"
            alt="Huellitas Pet Store"
            width={56}
            height={56}
          />
        </Link>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>{lede}</p>

        {children}

        <div className={styles.footer}>{footer}</div>
      </div>

      <aside className={styles.side}>
        <Image
          src="/assets/img/gato_portada.webp"
          alt=""
          width={720}
          height={900}
          priority
        />
        <p>
          La cuenta separa tu carrito y tus guardados del de invitado. Puedes
          comprar sin ella: el catálogo completo está abierto.
        </p>
      </aside>
    </div>
  );
}
