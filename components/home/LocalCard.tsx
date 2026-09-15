import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import styles from "./LocalCard.module.css";

export default function LocalCard() {
  return (
    <section className={styles.section} aria-labelledby="local-titulo">
      <div className={styles.card}>
        <div className={styles.text}>
          <h2 id="local-titulo" className={styles.title}>
            El local está en San Pablo
          </h2>
          <p className={styles.copy}>
            Atendemos en Quinta Normal de lunes a sábado. Si prefieres que llegue a
            tu casa, despachamos a todo Chile. Y si no sabes qué darle a tu
            mascota, escríbenos: contestamos nosotros, no un formulario.
          </p>

          <dl className={styles.facts}>
            <div>
              <dt>
                <Icon name="lugar" size={17} />
                Dirección
              </dt>
              <dd>San Pablo 3610, local 2 · Quinta Normal, Santiago</dd>
            </div>
            <div>
              <dt>
                <Icon name="telefono" size={17} />
                Teléfono
              </dt>
              <dd>
                <a href="tel:+56920390272" data-numeral>
                  +569 2039 0272
                </a>
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="whatsapp" size={17} />
                WhatsApp
              </dt>
              <dd>
                <a href="https://wa.me/56920390272">Escribir ahora</a>
              </dd>
            </div>
          </dl>

          <Link href="/contacto" className={styles.cta}>
            Ver mapa y escribirnos
            <Icon name="flecha" size={19} />
          </Link>
        </div>

        <div className={styles.shot}>
          <Image
            src="/assets/img/gato_y_perro.webp"
            alt="Un perro y un gato juntos"
            width={720}
            height={720}
            sizes="(max-width: 62rem) 92vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}
