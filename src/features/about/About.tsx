import { NavLink } from "react-router-dom";
import "animate.css";
import Breadcrumbs from "../../shared/components/Breadcrumbs";
import aboutBackground from "../../assets/img/perrito_fondo_rosado_II.webp";
import "./about.scss";

const About: React.FC = () => {
  return (
    <section className="about-container">
      {/* Background image */}
      <figure className="about-container__background">
        <img
          src={aboutBackground}
          alt="Mascota feliz en tienda Huellitas"
          className="about-img"
        />
      </figure>

      {/* Breadcrumb integrated */}
      <div className="about-container__breadcrumb">
        <Breadcrumbs />
      </div>

      {/* Content overlay */}
      <article className="about-container__content">
        <div className="about-content">
          <header className="about-header">
            <h1 className="about-title">
              Tu Tienda Confiable <br /> para el Bienestar <br /> de Tus Mascotas
            </h1>
            <p className="about-tagline">
              Más de 14 años cuidando a tus compañeros peludos
            </p>
          </header>

          <section className="about-description">
            <p className="about-intro">
              En <strong>Huellitas Pet Store</strong>, nos especializa en ofrecer productos premium y asesoría personalizada para el cuidado integral de tus mascotas. Desde alimentos nutritivos hasta accesorios innovadores, tenemos todo lo que necesita tu compañero felino o canino.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <span className="feature-icon">✓</span>
                <div>
                  <strong>Productos Certificados</strong>
                  <p>Seleccionamos marcas premium con garantía de calidad y seguridad</p>
                </div>
              </div>
              <div className="about-feature">
                <span className="feature-icon">✓</span>
                <div>
                  <strong>Asesoría Experta</strong>
                  <p>Nuestro equipo te guía en la elección correcta para tu mascota</p>
                </div>
              </div>
              <div className="about-feature">
                <span className="feature-icon">✓</span>
                <div>
                  <strong>Miles de Clientes Satisfechos</strong>
                  <p>Confían en nosotros para el cuidado y felicidad de sus mascotas</p>
                </div>
              </div>
            </div>
          </section>

          <div className="about-cta">
            <NavLink to="/products" className="about-button">
              Descubre Nuestros Productos
            </NavLink>
            <NavLink to="/contact" className="about-button about-button--secondary">
              Contáctanos
            </NavLink>
          </div>
        </div>
      </article>
    </section>
  );
};

export default About;
