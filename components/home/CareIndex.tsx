import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { ARTICLE_CATEGORY_LABELS, type Article } from "@/lib/data/articles";
import styles from "./CareIndex.module.css";

export default function CareIndex({ articles }: { articles: Article[] }) {
  return (
    <section className={styles.section} aria-labelledby="cuidados-titulo">
      <hr className="seam" />

      <div className={styles.head}>
        <h2 id="cuidados-titulo" className={styles.title}>
          Cuidados
        </h2>
        <Link href="/blog" className={styles.all}>
          Todos los artículos
          <Icon name="flecha" size={18} />
        </Link>
      </div>

      <ul className={styles.list}>
        {articles.map((article) => (
          <li key={article.id} className={styles.row}>
            {/* Caja fija de 140x100 por CSS. Sin `sizes`, Next pide solo 1x y 2x
                (256 y 384); un `sizes` en px pediria los seis anchos. Ver IMAGES.md,
                regla 9. */}
            <Image
              src={article.image}
              alt=""
              width={140}
              height={100}
              className={styles.thumb}
            />
            <div className={styles.text}>
              <p className={styles.tag}>
                <span>{ARTICLE_CATEGORY_LABELS[article.category]}</span>
                <em data-numeral>{article.readTime} min</em>
              </p>
              <h3 className={styles.name}>{article.title}</h3>
              <p className={styles.excerpt}>{article.excerpt}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
