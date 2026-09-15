import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import PageHeader from "@/components/chrome/PageHeader";
import { getAllProducts, getBrandsInUse } from "@/lib/catalog";
import styles from "./nosotros.module.css";

export const metadata: Metadata = {
  title: "La tienda",
  description:
    "Huellitas Pet Store: tienda de barrio en Quinta Normal, Santiago, con alimento, accesorios y salud para perros y gatos.",
};

export default function AboutPage() {
  const products = getAllProducts();
  const brands = getBrandsInUse();

  const figures = [
    { value: products.length, label: "Productos en catálogo" },
    { value: brands.length, label: "Marcas distintas" },
    { value: 3, label: "Pasillos" },
    { value: 2, label: "Especies atendidas" },
  ];

  return (
    <>
      <PageHeader
        title="La tienda"
        crumbs={[{ href: "/nosotros", label: "La tienda" }]}
        lede="Un local de barrio en Quinta Normal que vende lo mismo que usaría con sus propias mascotas."
      />

      <div className={styles.wrap}>
        <section className={styles.intro}>
          <div className={styles.copy}>
            <h2>Vendemos lo que conocemos</h2>
            <p>
              Huellitas parte de una idea simple: quien atiende el mostrador tiene
              que poder explicar por qué un alimento cuesta lo que cuesta. Por eso
              el catálogo muestra marca, pasillo y precio antes de que preguntes, y
              por eso no hay reseñas inventadas ni sellos de calidad que nadie
              otorgó.
            </p>
            <p>
              Trabajamos con {brands.length} marcas, desde las que se encuentran en
              cualquier supermercado hasta alimento clínico que solo se compra con
              indicación veterinaria. Si no sabes cuál corresponde, preguntar sale
              gratis.
            </p>
          </div>

          <Image
            src="/assets/img/perrito_fondo_rosado_II.webp"
            alt="Un perro pequeño"
            width={640}
            height={640}
            className={styles.portrait}
            priority
          />
        </section>

        <section className={styles.figures} aria-label="El catálogo en cifras">
          {figures.map((figure) => (
            <div key={figure.label}>
              <b data-numeral>{figure.value}</b>
              <span>{figure.label}</span>
            </div>
          ))}
        </section>

        {/* Tres cláusulas impresas en una sola plancha. No van numeradas: el
            orden no le sirve de nada a quien las lee. */}
        <section className={styles.rules} aria-labelledby="como-trabajamos">
          <h2 id="como-trabajamos">Cómo trabajamos</h2>
          <dl>
            <div>
              <dt>El precio va primero</dt>
              <dd>
                Nada de “consultar por precio”. Todo el catálogo tiene su valor a
                la vista, en pesos, y el descuento muestra el precio anterior.
              </dd>
            </div>
            <div>
              <dt>Si no lo tenemos, lo decimos</dt>
              <dd>
                No publicamos productos que no podamos conseguir. El catálogo es
                corto a propósito.
              </dd>
            </div>
            <div>
              <dt>Alimento clínico con indicación</dt>
              <dd>
                Las dietas veterinarias y los antiparasitarios se venden con la
                advertencia puesta en la ficha, no escondida en letra chica.
              </dd>
            </div>
          </dl>
        </section>

        <section className={styles.cta}>
          <div>
            <h2>¿Vamos al catálogo?</h2>
            <p>
              {products.length} productos, filtros que te dicen cuántos quedan
              antes de aplicarlos.
            </p>
          </div>
          <Link href="/productos">
            Ver catálogo
            <Icon name="flecha" size={19} />
          </Link>
        </section>
      </div>
    </>
  );
}
