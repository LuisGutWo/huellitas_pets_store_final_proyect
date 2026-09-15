import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import styles from "./Departments.module.css";

type Department = {
  href: string;
  title: string;
  copy: string;
  count: number;
  image: string;
};

export default function Departments({ items }: { items: Department[] }) {
  return (
    <section className={styles.section} aria-labelledby="secciones-titulo">
      <hr className="seam" />
      <h2 id="secciones-titulo" className={styles.title}>
        Tres pasillos
      </h2>

      <ul className={styles.grid}>
        {items.map((item, index) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.card}>
              <span className={styles.shot}>
                <Image
                  src={item.image}
                  alt=""
                  width={520}
                  height={360}
                  sizes="(max-width: 62rem) 92vw, 30vw"
                />
              </span>

              <span className={styles.meta}>
                <b data-numeral>{String(index + 1).padStart(2, "0")}</b>
                <em data-numeral>{item.count} productos</em>
              </span>

              <h3 className={styles.name}>{item.title}</h3>
              <p className={styles.copy}>{item.copy}</p>

              <span className={styles.go}>
                Ver pasillo
                <Icon name="flecha" size={18} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
