import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/chrome/PageHeader";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductCard from "@/components/product/ProductCard";
import {
  BRAND_LABELS,
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/catalog";
import styles from "./detail.module.css";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Producto no encontrado" };

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[
          { href: "/productos", label: "Catálogo" },
          { href: `/productos/${product.slug}`, label: product.name },
        ]}
      />

      <div className={styles.layout}>
        <div className={styles.shot}>
          {/* Sin optimizador: las fuentes de producto ya están al tamaño que se
              muestran (tope 800px, ver scripts/fit-images.mjs). Pasarlas por el
              optimizador cuesta el 62% de la cuota de transformaciones de Vercel
              para ahorrar 121 KB en todo el catálogo. */}
          <Image
            src={product.image}
            alt={product.name}
            width={880}
            height={880}
            priority
            unoptimized
          />
        </div>

        <div className={styles.panel}>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.desc}>{product.description}</p>

          <table className={styles.spec}>
            <caption>Ficha</caption>
            <tbody>
              <tr>
                <th scope="row">Código</th>
                <td data-numeral>{product.id}</td>
              </tr>
              <tr>
                <th scope="row">Marca</th>
                <td>{BRAND_LABELS[product.brand]}</td>
              </tr>
              <tr>
                <th scope="row">Pasillo</th>
                <td>
                  <Link href={`/productos?tipo=${product.type}`}>
                    {product.type}
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Para</th>
                <td>
                  <Link href={`/productos?para=${product.category}`}>
                    {product.category}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

          {/* La advertencia viaja junto al producto, no escondida. */}
          {product.type === "Salud" && (
            <p className={styles.caution}>
              Producto de uso veterinario. Confirma dosis y compatibilidad con el
              veterinario de tu mascota antes de administrarlo.
            </p>
          )}

          <ProductPurchase product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="relacionados">
          <hr className="seam" />
          <h2 id="relacionados" className={styles.relatedTitle}>
            Del mismo pasillo
          </h2>
          <ul>
            {related.map((item) => (
              <li key={item.id}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
