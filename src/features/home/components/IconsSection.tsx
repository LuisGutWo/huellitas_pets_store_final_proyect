import { motion, easeOut } from "framer-motion";
import Icon1 from "../../../assets/img/1-Petstore-Despacho-48hrs.jpg";
import Icon2 from "../../../assets/img/2-petstore-wp.jpg";
import Icon3 from "../../../assets/img/3-Petstore-Sitio-100-seguro.jpg";
import Icon4 from "../../../assets/img/4-Petstore-devoluciones.jpg";
import Icon5 from "../../../assets/img/5-Petstore-depacho-chile.jpg";

interface IconItem {
  id: number;
  image: string;
  alt: string;
  description: string;
}

const iconItems: IconItem[] = [
  {
    id: 1,
    image: Icon1,
    alt: "Despacho rápido en 48 horas",
    description: "Despacho en 48hrs en región metropolitana",
  },
  {
    id: 2,
    image: Icon2,
    alt: "Atención personalizada",
    description: "Atención personalizada al +56 9 20390272",
  },
  {
    id: 3,
    image: Icon3,
    alt: "Sitio seguro de compras",
    description: "Sitio 100% seguro",
  },
  {
    id: 4,
    image: Icon4,
    alt: "Política de cambios y devoluciones",
    description: "Fácil cambios y devoluciones",
  },
  {
    id: 5,
    image: Icon5,
    alt: "Envíos a nivel nacional",
    description: "Despacho a todo Chile",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const IconsSection: React.FC = () => {
  return (
    <section className="icons-section" aria-labelledby="icons-title">
      <div className="icons-section__header">
        <motion.h2
          id="icons-title"
          className="icons-section__title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Comprando en Huellitas
        </motion.h2>
      </div>

      <motion.div
        className="icons-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {iconItems.map((item) => (
          <motion.div
            key={item.id}
            className="icons-card"
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="icons-card__image-wrapper">
              <img
                src={item.image}
                alt={item.alt}
                className="icons-card__image"
                loading="lazy"
              />
            </div>
            <p className="icons-card__description">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default IconsSection;
