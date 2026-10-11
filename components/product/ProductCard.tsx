"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useStore } from "@/components/providers/StoreProvider";
import { BRAND_LABELS, discountPercent, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import StampedNumber from "@/components/ui/StampedNumber";
import styles from "./ProductCard.module.css";

/**
 * Espécimen en repisa: la foto arriba, y debajo la tira de atributos reales.
 * Cada producto muestra su ficha al lado; nada queda escondido tras un clic.
 */
export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addToCart, toggleFavorite, isFavorite, unitsInCart, hydrated } =
    useStore();
  const off = discountPercent(product);
  const saved = hydrated && isFavorite(product.id);
  const units = hydrated ? unitsInCart(product.id) : 0;

  return (
    <article className={styles.card}>
      <div className={styles.frame}>
        <Link href={`/productos/${product.slug}`} className={styles.shot}>
          {/* Sin optimizador: las fuentes de producto ya están al tamaño que se
              muestran (tope 800px, ver scripts/fit-images.mjs). Pasarlas por el
              optimizador cuesta el 62% de la cuota de transformaciones de Vercel
              para ahorrar 121 KB en todo el catálogo. */}
          <Image
            src={product.image}
            alt={product.name}
            width={420}
            height={420}
            priority={priority}
            unoptimized
          />
          <span className="visuallyHidden">Ver {product.name}</span>
        </Link>

        <div className={styles.flags}>
          {off !== null && <span className={styles.off}>−{off}%</span>}
          {product.isNew && <span className={styles.new}>Nuevo</span>}
        </div>

        <button
          type="button"
          className={styles.save}
          data-on={saved ? "true" : "false"}
          onClick={() => toggleFavorite(product)}
          aria-pressed={saved}
        >
          <Icon name={saved ? "guardado-lleno" : "guardado"} size={19} />
          <span className="visuallyHidden">
            {saved ? `Quitar ${product.name} de guardados` : `Guardar ${product.name}`}
          </span>
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link href={`/productos/${product.slug}`}>{product.name}</Link>
        </h3>

        <dl className={styles.attrs}>
          <div>
            <dt>Marca</dt>
            <dd>{BRAND_LABELS[product.brand]}</dd>
          </div>
          <div>
            <dt>Tipo</dt>
            <dd>{product.type}</dd>
          </div>
          <div>
            <dt>Para</dt>
            <dd>{product.category}</dd>
          </div>
        </dl>

        <p className={styles.price}>
          <StampedNumber value={product.price} className={styles.priceNow} />
          {off !== null && product.originalPrice !== null && (
            <s data-numeral>{formatPrice(product.originalPrice)}</s>
          )}
        </p>

        <button
          type="button"
          className={styles.add}
          onClick={() => addToCart(product)}
        >
          <Icon name="carrito" size={18} />
          {units > 0 ? (
            <>
              En carrito
              <span className={styles.units} data-numeral>
                {units}
              </span>
            </>
          ) : (
            "Agregar"
          )}
        </button>
      </div>
    </article>
  );
}
