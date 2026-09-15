import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.text}>
        <p className={styles.code} data-numeral aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>Esa página no existe</h1>
        <p className={styles.copy}>
          El enlace está roto o el producto ya no está publicado. El catálogo
          completo sigue en su lugar.
        </p>

        <div className={styles.actions}>
          <Link href="/productos" className={styles.primary}>
            Ir al catálogo
            <Icon name="flecha" size={19} />
          </Link>
          <Link href="/" className={styles.secondary}>
            Volver al inicio
          </Link>
        </div>
      </div>

      <Image
        src="/assets/img/perrito_cachorro.webp"
        alt=""
        width={520}
        height={520}
        className={styles.shot}
      />
    </div>
  );
}
