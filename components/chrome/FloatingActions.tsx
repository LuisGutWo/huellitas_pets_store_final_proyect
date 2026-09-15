"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import styles from "./FloatingActions.module.css";

/* Rutas donde escribir por WhatsApp ya está a la vista dentro de la página:
   repetirlo flotando encima solo tapa contenido. */
const SIN_PILDORA = ["/contacto", "/carrito"];

export default function FloatingActions() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Solo aparece una vez que el visitante dejó atrás la primera pantalla: así
  // no aterriza sobre la imagen del héroe ni sobre el panel de compra.
  const mostrarPildora = scrolled && !SIN_PILDORA.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.dock}>
      {mostrarPildora && (
        <a
          className={styles.whatsapp}
          href="https://wa.me/56920390272"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="whatsapp" size={22} />
          <span>Escríbenos</span>
        </a>
      )}

      <button
        type="button"
        className={styles.top}
        data-visible={scrolled ? "true" : "false"}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
          })
        }
        tabIndex={scrolled ? 0 : -1}
        aria-hidden={!scrolled}
      >
        <Icon name="arriba" size={20} />
        <span className="visuallyHidden">Volver arriba</span>
      </button>
    </div>
  );
}
