import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/chrome/PageHeader";
import { ARTICLES, ARTICLE_CATEGORY_LABELS } from "@/lib/data/articles";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Cuidados",
  description:
    "Notas de cuidado de mascotas: nutrición, salud, higiene y temporada.",
};

export default function BlogPage() {
  return (
    <div className="reading">
      <PageHeader
        title="Cuidados"
        crumbs={[{ href: "/blog", label: "Cuidados" }]}
        tally={`${ARTICLES.length} notas`}
        lede="Notas breves sobre alimentación, salud y temporada, escritas para quien acaba de llegar con una mascota a casa."
      />

      <div className={styles.wrap}>
        <ul className={styles.grid}>
          {ARTICLES.map((article, index) => (
            <li key={article.id} className={styles.card}>
              <Image
                src={article.image}
                alt=""
                width={640}
                height={420}
                priority={index < 2}
                sizes="(max-width: 48rem) 92vw, (max-width: 72rem) 46vw, 30vw"
              />

              <div className={styles.body}>
                <p className={styles.meta}>
                  <span>{ARTICLE_CATEGORY_LABELS[article.category]}</span>
                  <em data-numeral>{article.readTime} min</em>
                  <time data-numeral>{article.date}</time>
                </p>
                <h2 className={styles.title}>{article.title}</h2>
                <p className={styles.excerpt}>{article.excerpt}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Ausencia diseñada: no hay cuerpo completo, y no se inventa. */}
        <p className={styles.disclosure}>
          Estas notas se publican como extractos. El texto completo de cada
          artículo no forma parte de este proyecto, así que no encontrarás una
          página de lectura detrás de cada título.
        </p>
      </div>
    </div>
  );
}
