"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useStore } from "@/components/providers/StoreProvider";
import { discountPercent, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import styles from "./ProductPurchase.module.css";

export default function ProductPurchase({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, unitsInCart, hydrated } =
    useStore();
  const [units, setUnits] = useState(1);
  const [added, setAdded] = useState(false);

  const off = discountPercent(product);
  const saved = hydrated && isFavorite(product.id);
  const inCart = hydrated ? unitsInCart(product.id) : 0;

  const submit = () => {
    addToCart(product, units);
    setAdded(true);
  };

  return (
    <div className={styles.buy}>
      <p className={styles.price}>
        <span className={styles.now} data-numeral>
          {formatPrice(product.price)}
        </span>
        {off !== null && product.originalPrice !== null && (
          <>
            <s data-numeral>{formatPrice(product.originalPrice)}</s>
            <b>−{off}%</b>
          </>
        )}
      </p>

      <div className={styles.row}>
        <div className={styles.stepper}>
          <button
            type="button"
            onClick={() => setUnits((value) => Math.max(1, value - 1))}
            disabled={units <= 1}
          >
            <Icon name="menos" size={17} />
            <span className="visuallyHidden">Quitar una unidad</span>
          </button>
          <span data-numeral aria-live="polite">
            {units}
          </span>
          <button
            type="button"
            onClick={() => setUnits((value) => Math.min(99, value + 1))}
            disabled={units >= 99}
          >
            <Icon name="mas" size={17} />
            <span className="visuallyHidden">Agregar una unidad</span>
          </button>
        </div>

        <button type="button" className={styles.add} onClick={submit}>
          <Icon name="carrito" size={19} />
          Agregar al carrito
        </button>

        <button
          type="button"
          className={styles.save}
          data-on={saved ? "true" : "false"}
          onClick={() => toggleFavorite(product)}
          aria-pressed={saved}
        >
          <Icon name={saved ? "guardado-lleno" : "guardado"} size={19} />
          <span className="visuallyHidden">
            {saved ? "Quitar de guardados" : "Guardar"}
          </span>
        </button>
      </div>

      {/* El estado se imprime aquí, en el documento, no flota sobre la página. */}
      {added && inCart > 0 && (
        <p className={styles.state}>
          <Icon name="listo" size={17} />
          Llevas <b data-numeral>{inCart}</b> en el carrito.
          <Link href="/carrito">Ir al carrito</Link>
        </p>
      )}

      <p className={styles.note}>
        Retiro en San Pablo 3610, Quinta Normal, o despacho a todo Chile. El pago
        se coordina al confirmar el pedido: este sitio no procesa tarjetas.
      </p>
    </div>
  );
}
