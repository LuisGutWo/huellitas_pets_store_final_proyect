import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";
import PageHeader from "@/components/chrome/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import StoreMap from "@/components/contact/StoreMap";
import styles from "./contacto.module.css";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos o visítanos en San Pablo 3610, local 2, Quinta Normal, Santiago.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contacto"
        crumbs={[{ href: "/contacto", label: "Contacto" }]}
        lede="Consultas de productos, disponibilidad y despachos. Contesta alguien de la tienda, no un bot."
      />

      <div className={styles.layout}>
        <ContactForm />

        <div className={styles.aside}>
          <dl className={styles.facts}>
            <div>
              <dt>
                <Icon name="lugar" size={17} />
                Dirección
              </dt>
              <dd>
                San Pablo 3610, local 2
                <br />
                Quinta Normal, Santiago
              </dd>
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
                <Icon name="correo" size={17} />
                Correo
              </dt>
              <dd>
                <a href="mailto:agutierrezwong@gmail.com">
                  agutierrezwong@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="whatsapp" size={17} />
                WhatsApp
              </dt>
              <dd>
                <a href="https://wa.me/56920390272">Abrir conversación</a>
              </dd>
            </div>
          </dl>

          <StoreMap />
        </div>
      </div>
    </>
  );
}
