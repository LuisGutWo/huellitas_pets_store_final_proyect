"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Icon from "@/components/ui/Icon";
import { BRAND_LABELS, discountPercent, type Product } from "@/lib/catalog";
import { formatAmount, formatPrice } from "@/lib/format";
import styles from "./HeroSack.module.css";

export default function HeroSack({
  product,
  catalogSize,
}: {
  product: Product;
  catalogSize: number;
}) {
  const root = useRef<HTMLElement>(null);
  const off = discountPercent(product);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const context = gsap.context(() => {
      // Un solo momento autorado: la plancha entra y el numeral asienta.
      // Solo transformaciones: nada del contenido depende de la animación
      // para ser legible, así que una entrada a medias nunca deja un hueco.
      const timeline = gsap.timeline({
        defaults: { ease: "expo.out", duration: 0.9 },
      });

      timeline
        .from(`.${styles.numeral}`, { yPercent: 16 })
        .from(`.${styles.headline}`, { yPercent: 22 }, "-=0.72")
        .from(`.${styles.shot}`, { xPercent: 7, duration: 1.1 }, "-=0.82")
        .from(
          `.${styles.spec} tr`,
          { x: -14, duration: 0.5, stagger: 0.055 },
          "-=0.66"
        )
        .from(`.${styles.cta}`, { y: 10, duration: 0.45 }, "-=0.3")
        .from(`.${styles.seamRail}`, { opacity: 0, duration: 0.6 }, 0.2);
    }, node);

    return () => context.revert();
  }, []);

  return (
    <section className={styles.hero} ref={root} aria-labelledby="hero-titulo">
      <div className={styles.inkField}>
        {/* El numeral y su producto son una sola unidad: la cifra nunca queda
            sin decir de qué es. */}
        <div className={styles.quote}>
          <p className={styles.numeral} data-numeral aria-hidden="true">
            <span className={styles.currency}>$</span>
            {formatAmount(product.price)}
          </p>

          <p className={styles.quoteFor}>
            <b>{product.name}</b>
            <span>
              {BRAND_LABELS[product.brand]} · {product.type} para{" "}
              {product.category}
            </span>
            {off !== null && (
              <em>
                <s aria-label={`Antes ${formatPrice(product.originalPrice ?? 0)}`}>
                  {formatPrice(product.originalPrice ?? 0)}
                </s>
                <i>−{off}%</i>
              </em>
            )}
          </p>
        </div>

        <hr className={`seam ${styles.split}`} />

        {/* Recién después viene la promesa de la tienda, que es lo que alguien
            que llega en frío necesita saber sin tener que bajar. */}
        <h1 id="hero-titulo" className={styles.headline}>
          Alimento, accesorios y salud para perros y gatos
        </h1>

        <p className={styles.claim}>
          Tienda en Quinta Normal, Santiago. Despacho a todo Chile.
        </p>

        <p className={styles.lede}>
          Precio de la semana, de los <b>{catalogSize} productos</b> del
          catálogo. Marca y precio a la vista antes de que preguntes.
        </p>
      </div>

      <div className={`${styles.seamRail} seamVertical`} aria-hidden="true" />

      <div className={styles.shot}>
        <Image
          src={product.image}
          alt={product.name}
          width={760}
          height={760}
          priority
          sizes="(max-width: 62rem) 78vw, 42vw"
        />
      </div>

      <div className={styles.panel}>
        <table className={styles.spec}>
          <caption>Ficha del destacado</caption>
          <tbody>
            <tr>
              <th scope="row">Marca</th>
              <td>{BRAND_LABELS[product.brand]}</td>
            </tr>
            <tr>
              <th scope="row">Tipo</th>
              <td>{product.type}</td>
            </tr>
            <tr>
              <th scope="row">Para</th>
              <td>{product.category}</td>
            </tr>
            <tr>
              <th scope="row">Código</th>
              <td data-numeral>{product.id}</td>
            </tr>
            <tr>
              <th scope="row">Precio</th>
              <td data-numeral>{formatPrice(product.price)}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.actions}>
          <Link href="/productos" className={styles.cta}>
            Ver catálogo
            <Icon name="flecha" size={19} />
          </Link>
          <Link href={`/productos/${product.slug}`} className={styles.ctaGhost}>
            Ver este producto
          </Link>
        </div>
      </div>
    </section>
  );
}
