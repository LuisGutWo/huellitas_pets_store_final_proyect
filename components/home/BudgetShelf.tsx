"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Icon from "@/components/ui/Icon";
import ProductCard from "@/components/product/ProductCard";
import StampedNumber from "@/components/ui/StampedNumber";
import type { Product } from "@/lib/catalog";
import styles from "./BudgetShelf.module.css";

const STEP = 1000;

/**
 * Interacción firma: el presupuesto manda. El control recorre el catálogo,
 * el numeral se re-troquela con resorte y la repisa se recompone. El conteo
 * se adelanta al clic: ves cuántos productos caben antes de ir al catálogo.
 */
export default function BudgetShelf({
  products,
  floor,
  ceiling,
  catalogSize,
}: {
  products: Product[];
  floor: number;
  ceiling: number;
  catalogSize: number;
}) {
  const start = Math.min(ceiling, 30000);
  const [budget, setBudget] = useState(start);
  const shelfRef = useRef<HTMLUListElement>(null);

  const fitting = useMemo(
    () => products.filter((product) => product.price <= budget),
    [products, budget]
  );

  const visible = fitting.slice(0, 4);

  const totalFitting = useMemo(
    () => products.filter((p) => p.price <= budget).length,
    [products, budget]
  );

  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const context = gsap.context(() => {
      // Solo transformación: la repisa se recompone sin que un producto
      // llegue a estar invisible en ningún momento.
      gsap.fromTo(
        `.${styles.slot}`,
        { y: 18 },
        {
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.05,
          overwrite: "auto",
        }
      );
    }, shelf);

    return () => context.revert();
  }, [visible.length, budget]);

  const min = Math.floor(floor / STEP) * STEP;
  const max = Math.ceil(ceiling / STEP) * STEP;

  return (
    <section className={styles.section} aria-labelledby="presupuesto-titulo">
      <div className={styles.head}>
        <h2 id="presupuesto-titulo" className={styles.title}>
          Dime cuánto tienes
        </h2>
        <p className={styles.lede}>
          Mueve el presupuesto y la repisa se rehace. El conteo se actualiza
          mientras arrastras, así sabes qué encontrarás antes de entrar.
        </p>
      </div>

      <div className={styles.control}>
        {/* El mecanismo tiene que leerse más fuerte que el filtro: la cifra que
            importa es cuántos alcanzan, no solo cuánto tienes. */}
        <div className={styles.readout}>
          <StampedNumber value={budget} className={styles.numeral} />
          <p className={styles.tally}>
            <span>alcanzan para</span>
            <b data-numeral>{totalFitting}</b>
            <span>
              de <i data-numeral>{catalogSize}</i> productos
            </span>
          </p>
        </div>

        <label className={styles.slider}>
          <span className="visuallyHidden">
            Presupuesto máximo en pesos chilenos
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={STEP}
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
            aria-valuetext={`${budget.toLocaleString("es-CL")} pesos`}
          />
          <span className={styles.bounds} aria-hidden="true">
            <b data-numeral>${min.toLocaleString("es-CL")}</b>
            <b data-numeral>${max.toLocaleString("es-CL")}</b>
          </span>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className={styles.nothing}>
          <Icon name="alerta" size={20} />
          Con ese presupuesto no alcanza ningún producto. El más barato del
          catálogo cuesta ${floor.toLocaleString("es-CL")}.
        </p>
      ) : (
        <>
          <ul className={styles.shelf} ref={shelfRef}>
            {visible.map((product) => (
              <li key={product.id} className={styles.slot}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <p className={styles.shelfEdge} aria-hidden="true">
            <span>Repisa · muestra</span>
            <span data-numeral>
              {visible.length} de {totalFitting}
            </span>
          </p>
        </>
      )}

      <Link
        href={`/productos?hasta=${budget}`}
        className={styles.jump}
        prefetch={false}
      >
        Ver los {totalFitting} en el catálogo
        <Icon name="flecha" size={19} />
      </Link>
    </section>
  );
}
