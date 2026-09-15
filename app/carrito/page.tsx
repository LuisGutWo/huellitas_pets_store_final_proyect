"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import PageHeader from "@/components/chrome/PageHeader";
import StampedNumber from "@/components/ui/StampedNumber";
import { useStore } from "@/components/providers/StoreProvider";
import { BRAND_LABELS } from "@/lib/catalog";
import { formatPrice, formatUnits } from "@/lib/format";
import styles from "./carrito.module.css";

const WHATSAPP = "56936352145";

export default function CartPage() {
  const {
    cart,
    hydrated,
    addToCart,
    decrementInCart,
    removeFromCart,
    clearCart,
    totalUnits,
    totalAmount,
  } = useStore();

  const orderText = encodeURIComponent(
    `Hola Huellitas, quiero coordinar este pedido:\n\n${cart
      .map(
        (line) =>
          `· ${line.units} × ${line.product.name} (${line.product.id}) — ${formatPrice(
            line.product.price * line.units
          )}`
      )
      .join("\n")}\n\nTotal: ${formatPrice(totalAmount)}`
  );

  return (
    <>
      <PageHeader
        title="Carrito"
        crumbs={[{ href: "/carrito", label: "Carrito" }]}
        tally={hydrated ? formatUnits(totalUnits) : undefined}
      />

      {!hydrated ? (
        <p className={styles.loading}>Leyendo tu carrito…</p>
      ) : cart.length === 0 ? (
        <div className={styles.empty}>
          <Image
            src="/assets/img/hero_gatito.webp"
            alt=""
            width={360}
            height={360}
          />
          <div>
            <h2>El carrito está vacío</h2>
            <p>
              Todavía no agregaste nada. El catálogo tiene 57 productos y los
              filtros te dicen cuántos quedan antes de aplicarlos.
            </p>
            <Link href="/productos" className={styles.cta}>
              Ir al catálogo
              <Icon name="flecha" size={19} />
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.lines}>
            {cart.map((line) => (
              <li key={line.product.id} className={styles.line}>
                <Link
                  href={`/productos/${line.product.slug}`}
                  className={styles.thumb}
                >
                  <Image
                    src={line.product.image}
                    alt={line.product.name}
                    width={180}
                    height={180}
                  />
                </Link>

                <div className={styles.info}>
                  <p className={styles.brand}>
                    {BRAND_LABELS[line.product.brand]}
                  </p>
                  <h2 className={styles.name}>
                    <Link href={`/productos/${line.product.slug}`}>
                      {line.product.name}
                    </Link>
                  </h2>
                  <p className={styles.unit} data-numeral>
                    {formatPrice(line.product.price)} c/u
                  </p>
                </div>

                <div className={styles.stepper}>
                  <button
                    type="button"
                    onClick={() => decrementInCart(line.product)}
                  >
                    <Icon name="menos" size={16} />
                    <span className="visuallyHidden">
                      Quitar una unidad de {line.product.name}
                    </span>
                  </button>
                  <span data-numeral>{line.units}</span>
                  <button type="button" onClick={() => addToCart(line.product)}>
                    <Icon name="mas" size={16} />
                    <span className="visuallyHidden">
                      Agregar una unidad de {line.product.name}
                    </span>
                  </button>
                </div>

                <p className={styles.lineTotal} data-numeral>
                  {formatPrice(line.product.price * line.units)}
                </p>

                <button
                  type="button"
                  className={styles.drop}
                  onClick={() => removeFromCart(line.product)}
                >
                  <Icon name="quitar" size={18} />
                  <span className="visuallyHidden">
                    Retirar {line.product.name} del carrito
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <aside className={styles.summary} aria-label="Resumen del pedido">
            <h2 className={styles.summaryTitle}>Resumen</h2>

            <dl className={styles.totals}>
              <div>
                <dt>Productos</dt>
                <dd data-numeral>{cart.length}</dd>
              </div>
              <div>
                <dt>Unidades</dt>
                <dd data-numeral>{totalUnits}</dd>
              </div>
            </dl>

            <p className={styles.grand}>
              <span>Total</span>
              <StampedNumber value={totalAmount} className={styles.grandNum} />
            </p>

            <a
              className={styles.confirm}
              href={`https://wa.me/${WHATSAPP}?text=${orderText}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="whatsapp" size={19} />
              Coordinar por WhatsApp
            </a>

            <p className={styles.honesty}>
              Este sitio no procesa pagos. El pedido se confirma por WhatsApp y el
              pago se coordina al retirar o despachar.
            </p>

            <div className={styles.secondary}>
              <Link href="/productos">Seguir comprando</Link>
              <button type="button" onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>

            <Image
              src="/assets/img/tarjetas_logo.webp"
              alt="Medios de pago aceptados en el local"
              width={320}
              height={60}
              className={styles.cards}
            />
          </aside>
        </div>
      )}
    </>
  );
}
