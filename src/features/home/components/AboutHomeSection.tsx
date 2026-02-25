import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./aboutHomeSection.scss";

interface FeatureCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const AboutHomeSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features: FeatureCard[] = [
    {
      id: 1,
      icon: <PetsIcon />,
      title: "Productos Premium",
      description:
        "Cuidadosamente seleccionados para la salud y felicidad de tus mascotas",
      delay: 0.1,
    },
    {
      id: 2,
      icon: <LocalShippingIcon />,
      title: "Envío 48 Horas",
      description:
        "Recibe tus compras rápidamente en toda la región, seguros y protegidos",
      delay: 0.2,
    },
    {
      id: 3,
      icon: <ThumbUpIcon />,
      title: "Garantía Total",
      description:
        "Devoluciones sin problema si no estás satisfecho con tu compra",
      delay: 0.3,
    },
    {
      id: 4,
      icon: <SecurityIcon />,
      title: "100% Seguro",
      description: "Múltiples métodos de pago seguros para tu tranquilidad",
      delay: 0.4,
    },
  ];

  return (
    <section
      id="about-section"
      className={`about-home-section ${isVisible ? "about-home-section--visible" : ""}`}
    >
      <div className="about-home-section__container">
        {/* Header */}
        <div className="about-home-section__header">
          <h2 className="about-home-section__title">
            Tu tienda de confianza para mascotas
          </h2>
          <p className="about-home-section__subtitle">
            En Huellitas Pet Store, nos dedicamos a proporcionar productos de la
            más alta calidad para mantener a tus compañeros peludos felices,
            saludables y bien cuidados.
          </p>
        </div>

        {/* Features Grid */}
        <div className="about-home-section__features">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="about-home-section__feature-card"
              style={{
                animationDelay: `${feature.delay}s`,
              }}
            >
              <div className="about-home-section__feature-icon">
                {feature.icon}
              </div>
              <h3 className="about-home-section__feature-title">
                {feature.title}
              </h3>
              <p className="about-home-section__feature-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="about-home-section__cta">
          <div className="about-home-section__cta-content">
            <h3 className="about-home-section__cta-title">
              ¿Listo para sorprender a tu mascota?
            </h3>
            <p className="about-home-section__cta-description">
              Explora nuestra amplia variedad de productos y encuentra
              exactamente lo que necesitas para el bienestar de tu compañero.
            </p>
          </div>
          <Link
            to="/products"
            className="about-home-section__cta-button"
            aria-label="Ver todos los productos"
          >
            <span>Explorar Tienda</span>
            <ArrowForwardIcon className="about-home-section__cta-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHomeSection;
