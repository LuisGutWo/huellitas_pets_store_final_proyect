"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import PageHeader from "@/components/chrome/PageHeader";
import ProductCard from "@/components/product/ProductCard";
import { useStore } from "@/components/providers/StoreProvider";
import { formatPrice } from "@/lib/format";
import styles from "./favoritos.module.css";

export default function FavoritesPage() {
  const { favorites, hydrated, addToCart } = useStore();

  const total = favorites.reduce((sum, product) => sum + product.price, 0);

  return (
    <>
      <PageHeader
        title="Guardados"
        crumbs={[{ href: "/favoritos", label: "Guardados" }]}
        tally={
          hydrated
            ? `${favorites.length} ${favorites.length === 1 ? "producto" : "productos"}`
            : undefined
        }
        lede="Lo que apartaste para decidir después. Se guarda en este navegador y, si tienes cuenta, queda separado del carrito de invitado."
      />

      {!hydrated ? (
        <p className={styles.loading}>Leyendo tus guardados…</p>
      ) : favorites.length === 0 ? (
        <div className={styles.empty}>
          <Image
            src="/assets/img/hero_gatito.webp"
            alt=""
            width={360}
            height={360}
          />
          <div>
            <h2>Todavía no guardas nada</h2>
            <p>
              Toca el corazón en cualquier producto del catálogo y aparecerá aquí.
              No se compra nada al guardarlo.
            </p>
            <Link href="/productos" className={styles.cta}>
              Ir al catálogo
              <Icon name="flecha" size={19} />
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.wrap}>
          <div className={styles.bar}>
            <p data-numeral>
              Si te llevas todo: <b>{formatPrice(total)}</b>
            </p>
            <button
              type="button"
              onClick={() => favorites.forEach((product) => addToCart(product))}
            >
              <Icon name="carrito" size={18} />
              Agregar todo al carrito
            </button>
          </div>

          <ul className={styles.grid}>
            {favorites.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
