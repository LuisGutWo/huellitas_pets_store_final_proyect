import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SpaIcon from "@mui/icons-material/Spa";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../styles/petCareEssentials.scss";

interface CarePillar {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  tips: string;
  accentColor: string;
}

interface PetCareStats {
  label: string;
  value: string;
  unit: string;
}

const PetCareEssentials: React.FC = () => {
  const navigate = useNavigate();
  const [activePillar, setActivePillar] = useState<string>("nutrition");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const carePillars: CarePillar[] = [
    {
      id: "nutrition",
      icon: <RestaurantIcon />,
      title: "Nutrición",
      subtitle: "Alimentación Balanceada",
      description: "Una dieta de calidad es el fundamento de una mascota saludable y feliz.",
      benefits: [
        "Energía sostenida",
        "Pelaje brillante",
        "Sistema inmune fuerte",
        "Digestión óptima",
      ],
      tips: "Elige alimentos con ingredientes naturales. La calidad importa más que la cantidad.",
      accentColor: "linear-gradient(135deg, #f48b48 0%, #fdba74 100%)",
    },
    {
      id: "hygiene",
      icon: <SpaIcon />,
      title: "Higiene",
      subtitle: "Cuidado Personal",
      description: "El aseo regular previene enfermedades y mantiene a tu mascota cómoda.",
      benefits: [
        "Piel saludable",
        "Prevención de infecciones",
        "Bienestar general",
        "Vínculo reforzado",
      ],
      tips: "Baños regulares con productos suaves. La frecuencia depende de la raza y clima.",
      accentColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    },
    {
      id: "exercise",
      icon: <DirectionsRunIcon />,
      title: "Ejercicio",
      subtitle: "Actividad Física",
      description: "El movimiento es esencial para mantener un peso saludable y una mente activa.",
      benefits: [
        "Peso ideal",
        "Músculos fuertes",
        "Comportamiento equilibrado",
        "Longevidad",
      ],
      tips: "30-60 minutos de actividad diaria. Juegos variados mantienen el interés.",
      accentColor: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    },
    {
      id: "health",
      icon: <FavoriteBorderIcon />,
      title: "Salud",
      subtitle: "Bienestar Integral",
      description: "Revisiones veterinarias regulares garantizan la detección temprana de problemas.",
      benefits: [
        "Chequeos preventivos",
        "Vacunación al día",
        "Detección temprana",
        "Vida más larga",
      ],
      tips: "Visita al veterinario 1-2 veces al año. La prevención es el mejor remedio.",
      accentColor: "linear-gradient(135deg, #10b981 0%, #6ee7b7 100%)",
    },
  ];

  const careStats: PetCareStats[] = [
    { label: "Mascotas", value: "2K+", unit: "cuidadas anualmente" },
    { label: "Expertos", value: "50+", unit: "veterinarios consultados" },
    { label: "Satisfacción", value: "98%", unit: "de nuestros clientes" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getActivePillar = () => {
    return carePillars.find((p) => p.id === activePillar) || carePillars[0];
  };

  const active = getActivePillar();

  return (
    <section
      ref={sectionRef}
      className={`pet-care-essentials ${isVisible ? "visible" : ""}`}
    >
      {/* Background Orbes */}
      <div className="pet-care-essentials__orb pet-care-essentials__orb--1" />
      <div className="pet-care-essentials__orb pet-care-essentials__orb--2" />

      <div className="pet-care-essentials__container">
        {/* Header Section */}
        <div className="pet-care-essentials__header">
          <h2 className="pet-care-essentials__title">
            Cuidados Completos para tu Mascota
          </h2>
          <p className="pet-care-essentials__subtitle">
            Descubre los 4 pilares esenciales para una vida saludable y feliz
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="pet-care-essentials__content">
          {/* Pillars Grid */}
          <div className="pet-care-essentials__pillars">
            {carePillars.map((pillar, index) => (
              <button
                key={pillar.id}
                className={`pet-care-essentials__pillar-card ${
                  activePillar === pillar.id ? "active" : ""
                }`}
                onClick={() => setActivePillar(pillar.id)}
                style={{
                  "--animation-delay": `${index * 100}ms`,
                } as React.CSSProperties}
              >
                <div className="pet-care-essentials__pillar-icon">
                  {pillar.icon}
                </div>
                <h3 className="pet-care-essentials__pillar-title">
                  {pillar.title}
                </h3>
                <p className="pet-care-essentials__pillar-subtitle">
                  {pillar.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="pet-care-essentials__detail">
            <div
              className="pet-care-essentials__detail-header"
              style={{ backgroundImage: active.accentColor }}
            >
              <div className="pet-care-essentials__detail-icon">
                {active.icon}
              </div>
            </div>

            <div className="pet-care-essentials__detail-content">
              <div className="pet-care-essentials__detail-title-group">
                <h3 className="pet-care-essentials__detail-main-title">
                  {active.title}
                </h3>
                <span className="pet-care-essentials__detail-subtitle">
                  {active.subtitle}
                </span>
              </div>

              <p className="pet-care-essentials__detail-description">
                {active.description}
              </p>

              {/* Benefits Checklist */}
              <div className="pet-care-essentials__benefits">
                <h4 className="pet-care-essentials__benefits-title">
                  Beneficios principales
                </h4>
                <ul className="pet-care-essentials__benefits-list">
                  {active.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="pet-care-essentials__benefit-item"
                      style={{
                        "--item-index": i,
                      } as React.CSSProperties}
                    >
                      <span className="pet-care-essentials__benefit-check">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tip */}
              <div className="pet-care-essentials__tip">
                <span className="pet-care-essentials__tip-label">💡 Consejo:</span>
                <p className="pet-care-essentials__tip-text">{active.tips}</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => navigate("/products")}
                className="pet-care-essentials__cta-button"
              >
                Explorar Productos
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="pet-care-essentials__stats">
          {careStats.map((stat, index) => (
            <div
              key={index}
              className="pet-care-essentials__stat-card"
              style={{
                "--stat-delay": `${index * 100}ms`,
              } as React.CSSProperties}
            >
              <div className="pet-care-essentials__stat-value">{stat.value}</div>
              <div className="pet-care-essentials__stat-label">{stat.label}</div>
              <div className="pet-care-essentials__stat-unit">{stat.unit}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pet-care-essentials__bottom-cta">
          <h3>¿Listo para darle lo mejor a tu mascota?</h3>
          <p>Encuentra todo lo que necesitas en nuestra tienda</p>
          <button
            onClick={() => navigate("/products")}
            className="pet-care-essentials__primary-button"
          >
            Ver Todos los Productos
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PetCareEssentials;
