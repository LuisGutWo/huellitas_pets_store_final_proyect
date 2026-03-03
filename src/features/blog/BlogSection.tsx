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
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/imagen_blog_1.jpg?alt=media&token=3ad99489-dfaf-40fd-9c78-54e21da6aeaa",
    category: "nutricion",
    readTime: 4,
    date: "15 Feb 2026",
  },
  {
    id: 2,
    title: "Dia mundial de los animales",
    description:
      "El 4 de Octubre se celebra el dia internacional de los animales en conmemoración de San Francisco de Asís. Este santo que nació en 1182 en Italia y dejo...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_2.jpg?alt=media&token=4615a7a9-1d88-4dbc-8d67-d510fd72026d",
    category: "cuidados",
    readTime: 3,
    date: "12 Feb 2026",
  },
  {
    id: 3,
    title: "¿Se aburren de su alimento?",
    description:
      "¿Se aburrirá nuestra mascota si lo alimentamos siempre con la misma dieta? La respuesta es no. El aburrimiento hacia los alimentos es una característica humana. Los perros y los...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_3.jpg?alt=media&token=bbd0b141-1e25-41cb-8986-7773edd16296",
    category: "nutricion",
    readTime: 5,
    date: "10 Feb 2026",
  },
  {
    id: 4,
    title: "Tu perro y las altas temperaturas",
    description:
      "El verano es una gran época para disfrutar de sol, el calor y refrescarse en las piletas y playas. Pero los perros, al igual que las personas, pueden sufrir con las altas temperaturas e...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_4.jpg?alt=media&token=781a89bf-d66e-4d2d-a290-942017535a81",
    category: "salud",
    readTime: 6,
    date: "8 Feb 2026",
  },
  {
    id: 5,
    title: "El universo para la moda de las mascotas",
    description:
      "Hoy las mascotas son un miembro mas de las familias en el mundo. Su fidelidad, sus expresiones de cariño y, por su puesto, la compañía que ofrecen, son suficientes para...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_5.jpg?alt=media&token=734a6599-210d-4bc2-b9b7-134cc8419d52",
    category: "moda",
    readTime: 4,
    date: "5 Feb 2026",
  },
  {
    id: 6,
    title: "Las Mascotas y el Invierno",
    description:
      "Durante el invierno es imprescindible que limites el tiempo que pasa tu mascota al ire libre. La mayoría de las mascotas que viven en el interior no están acostumbradas a las bajas...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_6.jpg?alt=media&token=223f8d0f-b8d8-4468-a5a8-9428e218f5e5",
    category: "cuidados",
    readTime: 5,
    date: "3 Feb 2026",
  },
  {
    id: 7,
    title: "Cuidados básicos de tu mascota",
    description:
      "¡Hola Adoptantes novatos! Vamos a dar un repaso por los puntos básicos a tener en cuenta para los cuidados de tu animal de compañía. Si quieres ser muy responsable, sigues estos consejos...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_7.jpg?alt=media&token=edeb7b89-1800-4737-a072-497edbff73d2",
    category: "cuidados",
    readTime: 7,
    date: "1 Feb 2026",
  },
  {
    id: 8,
    title: "El Vinculo afectivo con los animales",
    description:
      "Convivir con perros y gatos ayuda a disminuir el estrés, la tensión arterial y la frecuencia cardíaca. No sólo eso, los estudios constatan que esa compañía mejora...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_8.jpg?alt=media&token=e0d94e7a-53b6-455b-a477-7b0b192e5054",
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
