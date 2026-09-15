import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { address, email, phone, whatsappLink } from "@/lib/contact";
import styles from "./SiteFooter.module.css";

const YEAR = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <hr className="seam" />

      <div className={styles.grid}>
        <div className={styles.identity}>
          <Image
            src="/assets/img/huellitas-logo-white.webp"
            alt="Huellitas Pet Store"
            width={130}
            height={100}
          />
          <p>
            Alimento, accesorios y salud para perros y gatos. Atendemos en Quinta
            Normal y despachamos a todo Chile.
          </p>
          <ul className={styles.social}>
            <li>
              <a href="https://instagram.com" aria-label="Instagram de Huellitas">
                <Icon name="instagram" size={20} />
              </a>
            </li>
            <li>
              <a href="https://facebook.com" aria-label="Facebook de Huellitas">
                <Icon name="facebook" size={20} />
              </a>
            </li>
            {whatsappLink() && (
              <li>
                <a
                  href={whatsappLink() ?? undefined}
                  aria-label="Escribir por WhatsApp"
                >
                  <Icon name="whatsapp" size={20} />
                </a>
              </li>
            )}
          </ul>
        </div>

        <nav className={styles.column} aria-label="Tienda">
          <h2>Tienda</h2>
          <ul>
            <li>
              <Link href="/productos">Catálogo completo</Link>
            </li>
            <li>
              <Link href="/productos?tipo=Alimentos">Alimentos</Link>
            </li>
            <li>
              <Link href="/productos?tipo=Accesorios">Accesorios</Link>
            </li>
            <li>
              <Link href="/productos?tipo=Salud">Salud</Link>
            </li>
            <li>
              <Link href="/favoritos">Guardados</Link>
            </li>
          </ul>
        </nav>

        <nav className={styles.column} aria-label="Información">
          <h2>Información</h2>
          <ul>
            <li>
              <Link href="/nosotros">La tienda</Link>
            </li>
            <li>
              <Link href="/blog">Cuidados</Link>
            </li>
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.column}>
          <h2>Local</h2>
          <address className={styles.contact}>
            <p>
              <Icon name="lugar" size={17} />
              {address.line1}
              <br />
              {address.line2}
            </p>
            {phone && (
              <p>
                <Icon name="telefono" size={17} />
                <a href={`tel:${phone.tel}`} data-numeral>
                  {phone.label}
                </a>
              </p>
            )}
            <p>
              <Icon name="correo" size={17} />
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          </address>
        </div>
      </div>

      <div className={styles.baseline}>
        <p>© {YEAR} Huellitas Pet Store - Lagmedia</p>
        <p className={styles.disclosure}>
          Proyecto de portafolio desarrollado por Lagmedia. El catálogo y los datos de local son material de
          demostración: no se procesan pagos ni pedidos reales.
        </p>
      </div>
    </footer>
  );
}
