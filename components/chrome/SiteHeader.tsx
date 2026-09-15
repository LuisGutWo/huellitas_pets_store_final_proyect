"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { useAuth } from "@/components/providers/AuthProvider";
import { useStore } from "@/components/providers/StoreProvider";
import styles from "./SiteHeader.module.css";

const NAV = [
  { href: "/productos", label: "Catálogo" },
  { href: "/blog", label: "Cuidados" },
  { href: "/nosotros", label: "La tienda" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { user, configured } = useAuth();
  const { totalUnits, favorites, hydrated } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.header}>
      <p className={styles.stamp}>
        <span>San Pablo 3610 · Quinta Normal · Santiago</span>
        <span aria-hidden="true">—</span>
        <span>Despacho a todo Chile</span>
      </p>

      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label="Huellitas, ir al inicio">
          <Image
            src="/assets/img/huellitas-logo-white.webp"
            alt=""
            width={130}
            height={100}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? styles.linkActive : styles.link}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/favoritos" className={styles.action}>
            <Icon name="guardado" size={19} />
            <span className={styles.actionLabel}>Guardados</span>
            {hydrated && favorites.length > 0 && (
              <span className={styles.count} data-numeral>
                {favorites.length}
              </span>
            )}
          </Link>

          <Link href="/carrito" className={styles.action}>
            <Icon name="carrito" size={19} />
            <span className={styles.actionLabel}>Carrito</span>
            {hydrated && totalUnits > 0 && (
              <span className={styles.count} data-numeral>
                {totalUnits}
              </span>
            )}
          </Link>

          {configured && (
            <Link
              href={user ? "/cuenta" : "/cuenta/ingresar"}
              className={styles.action}
            >
              <Icon name="cuenta" size={19} />
              <span className={styles.actionLabel}>
                {user ? "Mi cuenta" : "Ingresar"}
              </span>
            </Link>
          )}

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "cerrar" : "filtros"} size={22} />
            <span className="visuallyHidden">
              {menuOpen ? "Cerrar menú" : "Abrir menú"}
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        className={styles.drawer}
        data-open={menuOpen ? "true" : "false"}
        hidden={!menuOpen}
      >
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {item.label}
                <Icon name="flecha" size={18} />
              </Link>
            </li>
          ))}
          {configured && (
            <li>
              <Link href={user ? "/cuenta" : "/cuenta/ingresar"}>
                {user ? "Mi cuenta" : "Ingresar"}
                <Icon name="flecha" size={18} />
              </Link>
            </li>
          )}
        </ul>
      </div>

      <hr className="seam" />
    </header>
  );
}
