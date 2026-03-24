import { useEffect, useMemo, useState } from "react";
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

const BLOG_CATEGORIES = ["nutricion", "salud", "cuidados", "moda"] as const;
type BlogCategory = (typeof BLOG_CATEGORIES)[number];

AOS.init();

interface BlogArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  category: BlogCategory;
  readTime: number;
  date: string;
}

const isString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isValidCategory = (value: unknown): value is BlogCategory =>
  typeof value === "string" && BLOG_CATEGORIES.includes(value as BlogCategory);

const parseBlogArticle = (item: unknown): BlogArticle | null => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const article = item as Partial<BlogArticle>;
  if (
    typeof article.id !== "number" ||
    !isString(article.title) ||
    !isString(article.description) ||
    !isString(article.image) ||
    !isValidCategory(article.category) ||
    typeof article.readTime !== "number" ||
    article.readTime <= 0 ||
    !isString(article.date)
  ) {
    return null;
  }

  return {
    id: article.id,
    title: article.title.trim(),
    description: article.description.trim(),
    image: article.image.trim(),
    category: article.category,
    readTime: article.readTime,
    date: article.date.trim(),
  };
};

const parseBlogResponse = (payload: unknown): BlogArticle[] => {
  const rawArticles = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object" && "articles" in payload
      ? (payload as { articles: unknown }).articles
      : null;

  if (!Array.isArray(rawArticles)) {
    throw new Error("Formato inválido en blogInfo.json");
  }

  const validatedArticles = rawArticles
    .map((article) => parseBlogArticle(article))
    .filter((article): article is BlogArticle => article !== null);

  if (validatedArticles.length === 0) {
    throw new Error("blogInfo.json no contiene artículos válidos");
  }

  return validatedArticles;
};

interface CategoryConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

const BlogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [retryAttempt, setRetryAttempt] = useState<number>(0);

  const handleRetryLoad = () => {
    setIsRetrying(true);
    setRetryAttempt((currentValue) => currentValue + 1);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadArticles = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/blogInfo.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar la información del blog");
        }

        const payload: unknown = await response.json();
        const articles = parseBlogResponse(payload);

        if (isMounted) {
          setBlogArticles(articles);
          setLoadError(null);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        if (isMounted) {
          const message =
            error instanceof Error
              ? error.message
              : "Ocurrió un error inesperado al cargar el blog";
          setLoadError(message);
          setBlogArticles([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsRetrying(false);
        }
      }
    };

    loadArticles();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [retryAttempt]);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredArticles([...blogArticles]);
    } else {
      setFilteredArticles(
        blogArticles.filter((article) => article.category === activeCategory)
      );
    }
  }, [activeCategory, blogArticles]);

  useEffect(() => {
    AOS.refresh();
  }, [filteredArticles.length, isLoading]);

  const categories: CategoryConfig[] = useMemo(
    () => [
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
    ],
    [blogArticles]
  );

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
          {loadError ? (
            <div className="blog-empty-state" role="alert" aria-live="assertive">
              <p>{loadError}</p>
              <button
                type="button"
                className="blog-empty-state__retry-btn"
                onClick={handleRetryLoad}
                disabled={isRetrying}
              >
                {isRetrying ? "Reintentando..." : "Reintentar"}
              </button>
            </div>
          ) : isLoading ? (
            <div className="blog-empty-state" role="status" aria-live="polite">
              <p>Cargando artículos del blog...</p>
            </div>
          ) : (
            <>
              <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1.12, spaceBetween: 16 },
                  768: { slidesPerView: 1.45, spaceBetween: 18 },
                  900: { slidesPerView: 2, spaceBetween: 20 },
                  1200: { slidesPerView: 2.35, spaceBetween: 22 },
                  1440: { slidesPerView: 3, spaceBetween: 24 },
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
            </>
          )}
        </div>

        {/* Empty State */}
        {!isLoading && !loadError && filteredArticles.length === 0 && (
          <div className="blog-empty-state">
            <p>No hay artículos en esta categoría</p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default BlogSection;
