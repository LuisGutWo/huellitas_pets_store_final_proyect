import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";
import PageHeader from "@/components/chrome/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import StoreMap from "@/components/contact/StoreMap";
import { address, email, phone, whatsappLink } from "@/lib/contact";
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
                {address.line1}
                <br />
                {address.line2}
              </dd>
            </div>
            {phone && (
              <div>
                <dt>
                  <Icon name="telefono" size={17} />
                  Teléfono
                </dt>
                <dd>
                  <a href={`tel:${phone.tel}`} data-numeral>
                    {phone.label}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt>
                <Icon name="correo" size={17} />
                Correo
              </dt>
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
            {whatsappLink() && (
              <div>
                <dt>
                  <Icon name="whatsapp" size={17} />
                  WhatsApp
                </dt>
                <dd>
                  <a href={whatsappLink() ?? undefined}>Abrir conversación</a>
                </dd>
              </div>
            )}
          </dl>

          <StoreMap />
        </div>
      </div>
    </>
  );
}
