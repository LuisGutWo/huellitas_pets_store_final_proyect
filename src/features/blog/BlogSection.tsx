import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Container } from "react-bootstrap";
import Breadcrumbs from "../../shared/components/Breadcrumbs";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SpaIcon from "@mui/icons-material/Spa";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import blogImage1 from "../../assets/img/1-Petstore-Despacho-48hrs.jpg";
import blogImage2 from "../../assets/img/2-petstore-wp.jpg";
import blogImage3 from "../../assets/img/3-Petstore-Sitio-100-seguro.jpg";
import blogImage4 from "../../assets/img/4-Petstore-devoluciones.jpg";
import blogImage5 from "../../assets/img/5-Petstore-depacho-chile.jpg";
import blogImage6 from "../../assets/img/gato_portada.jpg";
import blogImage7 from "../../assets/img/perrito_cachorro.jpg";
import blogImage8 from "../../assets/img/hero_mascotas.jpg";

AOS.init();

interface BlogArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  category: "nutricion" | "salud" | "cuidados" | "moda";
  readTime: number;
  date: string;
}

const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "Alimentos holísticos",
    description:
      "Las primeras investigaciones que se adentraron en la elaboración de alimentos de alta gama comenzaron en 1982, y en la actualidad, el mercado de alimentos para mascotas domesticas se ha...",
    image: blogImage1,
    category: "nutricion",
    readTime: 4,
    date: "15 Feb 2026",
  },
  {
    id: 2,
    title: "Dia mundial de los animales",
    description:
      "El 4 de Octubre se celebra el dia internacional de los animales en conmemoración de San Francisco de Asís. Este santo que nació en 1182 en Italia y dejo...",
    image: blogImage2,
    category: "cuidados",
    readTime: 3,
    date: "12 Feb 2026",
  },
  {
    id: 3,
    title: "¿Se aburren de su alimento?",
    description:
      "¿Se aburrirá nuestra mascota si lo alimentamos siempre con la misma dieta? La respuesta es no. El aburrimiento hacia los alimentos es una característica humana. Los perros y los...",
    image: blogImage3,
    category: "nutricion",
    readTime: 5,
    date: "10 Feb 2026",
  },
  {
    id: 4,
    title: "Tu perro y las altas temperaturas",
    description:
      "El verano es una gran época para disfrutar de sol, el calor y refrescarse en las piletas y playas. Pero los perros, al igual que las personas, pueden sufrir con las altas temperaturas e...",
    image: blogImage4,
    category: "salud",
    readTime: 6,
    date: "8 Feb 2026",
  },
  {
    id: 5,
    title: "El universo para la moda de las mascotas",
    description:
      "Hoy las mascotas son un miembro mas de las familias en el mundo. Su fidelidad, sus expresiones de cariño y, por su puesto, la compañía que ofrecen, son suficientes para...",
    image: blogImage5,
    category: "moda",
    readTime: 4,
    date: "5 Feb 2026",
  },
  {
    id: 6,
    title: "Las Mascotas y el Invierno",
    description:
      "Durante el invierno es imprescindible que limites el tiempo que pasa tu mascota al ire libre. La mayoría de las mascotas que viven en el interior no están acostumbradas a las bajas...",
    image: blogImage6,
    category: "cuidados",
    readTime: 5,
    date: "3 Feb 2026",
  },
  {
    id: 7,
    title: "Cuidados básicos de tu mascota",
    description:
      "¡Hola Adoptantes novatos! Vamos a dar un repaso por los puntos básicos a tener en cuenta para los cuidados de tu animal de compañía. Si quieres ser muy responsable, sigues estos consejos...",
    image: blogImage7,
    category: "cuidados",
    readTime: 7,
    date: "1 Feb 2026",
  },
  {
    id: 8,
    title: "El Vinculo afectivo con los animales",
    description:
      "Convivir con perros y gatos ayuda a disminuir el estrés, la tensión arterial y la frecuencia cardíaca. No sólo eso, los estudios constatan que esa compañía mejora...",
    image: blogImage8,
    category: "salud",
    readTime: 6,
    date: "28 Jan 2026",
  },
];

interface CategoryConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

const BlogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredArticles, setFilteredArticles] =
    useState<BlogArticle[]>(blogArticles);

  useEffect(() => {
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredArticles(blogArticles);
    } else {
      setFilteredArticles(
        blogArticles.filter((article) => article.category === activeCategory)
      );
    }
  }, [activeCategory]);

  const categories: CategoryConfig[] = [
    {
      id: "all",
      label: "Todos",
      icon: <span>✨</span>,
      color: "primary",
      count: blogArticles.length,
    },
    {
      id: "nutricion",
      label: "Nutrición",
      icon: <RestaurantIcon />,
      color: "nutrition",
      count: blogArticles.filter((a) => a.category === "nutricion").length,
    },
    {
      id: "salud",
      label: "Salud",
      icon: <FavoriteBorderIcon />,
      color: "health",
      count: blogArticles.filter((a) => a.category === "salud").length,
    },
    {
      id: "cuidados",
      label: "Cuidados",
      icon: <SpaIcon />,
      color: "care",
      count: blogArticles.filter((a) => a.category === "cuidados").length,
    },
    {
      id: "moda",
      label: "Moda & Accesorios",
      icon: <ShoppingBagIcon />,
      color: "fashion",
      count: blogArticles.filter((a) => a.category === "moda").length,
    },
  ];

  const getCategoryColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      nutricion: "nutrition",
      salud: "health",
      cuidados: "care",
      moda: "fashion",
    };
    return colorMap[category] || "primary";
  };

  return (
    <section className="blog-section">
      <Breadcrumbs />

      {/* Header Section */}
      <div className="blog-section__header">
        <div className="blog-section__header-content">
          <h2 className="blog-section__title">Blog</h2>
          <p className="blog-section__subtitle text-center">
            Descubre consejos, historias y guías para el cuidado integral de tu
            mascota
          </p>
        </div>

        {/* Category Filter */}
        <div className="blog-section__filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`blog-category-button ${
                activeCategory === category.id ? "active" : ""
              } blog-category-button--${category.color}`}
              onClick={() => setActiveCategory(category.id)}
              type="button"
            >
              <span className="blog-category-button__icon">
                {category.icon}
              </span>
              <div className="blog-category-button__content">
                <span className="blog-category-button__label">
                  {category.label}
                </span>
                <span className="blog-category-button__count">
                  {category.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Container>
        {/* Articles Grid/Carousel */}
        <div className="blog-carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 2, spaceBetween: 24 },
              1280: { slidesPerView: 2, spaceBetween: 24 },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".blog-swiper-button-next",
              prevEl: ".blog-swiper-button-prev",
            }}
            pagination={{
              el: ".blog-swiper-pagination",
              type: "bullets",
              clickable: true,
              dynamicBullets: true,
            }}
            a11y={{
              enabled: true,
            }}
            className="blog-swiper"
            role="region"
            aria-label="Carrusel de artículos del blog"
            aria-live="polite"
          >
            {filteredArticles.map((article) => (
              <SwiperSlide key={article.id}>
                <article
                  className={`blog-card blog-card--${getCategoryColor(
                    article.category
                  )}`}
                >
                  <div className="blog-card__image-wrapper">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="blog-card__image"
                      loading="lazy"
                    />
                    <div className="blog-card__overlay"></div>
                  </div>

                  <div className="blog-card__content">
                    {/* Category Badge */}
                    <div className="blog-card__category-badge">
                      {article.category === "nutricion" && <RestaurantIcon />}
                      {article.category === "salud" && <FavoriteBorderIcon />}
                      {article.category === "cuidados" && <SpaIcon />}
                      {article.category === "moda" && <ShoppingBagIcon />}
                      <span>
                        {article.category.charAt(0).toUpperCase() +
                          article.category.slice(1)}
                      </span>
                    </div>

                    {/* Main Content */}
                    <div>
                      <h3 className="blog-card__title">{article.title}</h3>
                      <p className="blog-card__description">
                        {article.description}
                      </p>
                    </div>

                    {/* Meta Info & CTA */}
                    <div className="blog-card__footer">
                      <div className="blog-card__meta">
                        <span className="blog-card__date">{article.date}</span>
                        <span className="blog-card__read-time">
                          {article.readTime} min lectura
                        </span>
                      </div>
                      <button className="blog-card__read-more">
                        Leer más
                        <ArrowForwardIcon />
                      </button>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="blog-swiper-button-prev"
            aria-label="Artículo anterior"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            className="blog-swiper-button-next"
            aria-label="Siguiente artículo"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Pagination */}
          <div
            className="blog-swiper-pagination"
            role="tablist"
            aria-label="Paginación del carousel"
          ></div>
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="blog-empty-state">
            <p>No hay artículos en esta categoría</p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default BlogSection;
