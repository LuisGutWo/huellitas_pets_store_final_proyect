import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import LogoWhite from "../../../assets/img/huellitas-logo-white-500x500.png";
import LogoBlack from "../../../assets/img/huellitas-logo-black-500x500.png";
import HeroImg1 from "../../../assets/img/hero_mascotas.jpg";
import HeroImg2 from "../../../assets/img/perrito_cachorro.jpg";
import HeroImg3 from "../../../assets/img/gato_portada.jpg";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface HeroSlide {
  id: number;
  image: string;
  logo: string;
  title: string;
  subtitle?: string;
  alignment: "left" | "right";
  titleColor: "light" | "dark";
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: HeroImg1,
    logo: LogoWhite,
    title: "¡Tenemos lo que tu mascota se merece y mucho mas!",
    alignment: "right",
    titleColor: "light",
  },
  {
    id: 2,
    image: HeroImg2,
    logo: LogoBlack,
    title: "Llegamos a la puerta de tu casa con todo lo que necesites",
    alignment: "left",
    titleColor: "dark",
  },
  {
    id: 3,
    image: HeroImg3,
    logo: LogoWhite,
    title: "Te ofrecemos una gran variedad de productos pensados en tu mascota",
    alignment: "left",
    titleColor: "light",
  },
];

const HeroSection: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="hero-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: ".hero-pagination",
          type: "bullets",
          clickable: true,
          dynamicBullets: false,
        }}
        a11y={{
          enabled: true,
        }}
        className="hero-swiper"
        loop={true}
        role="region"
        aria-label="Carrusel de hero con productos destacados"
        aria-live="polite"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide">
              {/* Background Image */}
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="hero-slide__image"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* Gradient Overlay */}
              <div className="hero-slide__overlay"></div>

              {/* Content Container */}
              <motion.div
                className={`hero-slide__content hero-slide__content--${slide.alignment}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Logo */}
                <motion.img
                  src={slide.logo}
                  alt="Huellitas Pet Store logo"
                  className="hero-slide__logo"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />

                {/* Title */}
                <motion.h1
                  className={`hero-slide__title hero-slide__title--${slide.titleColor}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {slide.title}
                </motion.h1>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link to="/products" className="hero-slide__cta">
                    <ArrowForwardIosIcon className="hero-slide__cta-icon" />
                    <span>Explorar Productos</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots */}
      <div
        className="hero-pagination"
        role="tablist"
        aria-label="Navegación del carousel"
      ></div>
    </section>
  );
};

export default HeroSection;
