import { useEffect } from "react";
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

AOS.init();

interface BlogArticle {
  id: number;
  title: string;
  description: string;
  image: string;
}

const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "Alimentos holísticos",
    description:
      "Las primeras investigaciones que se adentraron en la elaboración de alimentos de alta gama comenzaron en 1982, y en la actualidad, el mercado de alimentos para mascotas domesticas se ha...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/imagen_blog_1.jpg?alt=media&token=3ad99489-dfaf-40fd-9c78-54e21da6aeaa",
  },
  {
    id: 2,
    title: "Dia mundial de los animales",
    description:
      "El 4 de Octubre se celebra el dia internacional de los animales en conmemoración de San Francisco de Asís. Este santo que nació en 1182 en Italia y dejo...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_2.jpg?alt=media&token=4615a7a9-1d88-4dbc-8d67-d510fd72026d",
  },
  {
    id: 3,
    title: "¿Se aburren de su alimento?",
    description:
      "¿Se aburrirá nuestra mascota si lo alimentamos siempre con la misma dieta? La respuesta es no. El aburrimiento hacia los alimentos es una característica humana. Los perros y los...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_3.jpg?alt=media&token=bbd0b141-1e25-41cb-8986-7773edd16296",
  },
  {
    id: 4,
    title: "Tu perro y las altas temperaturas",
    description:
      "El verano es una gran época para disfrutar de sol, el calor y refrescarse en las piletas y playas. Pero los perros, al igual que las personas, pueden sufrir con las altas temperaturas e...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_4.jpg?alt=media&token=781a89bf-d66e-4d2d-a290-942017535a81",
  },
  {
    id: 5,
    title: "El universo para la moda de las mascotas",
    description:
      "Hoy las mascotas son un miembro mas de las familias en el mundo. Su fidelidad, sus expresiones de cariño y, por su puesto, la compañía que ofrecen, son suficientes para...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_5.jpg?alt=media&token=734a6599-210d-4bc2-b9b7-134cc8419d52",
  },
  {
    id: 6,
    title: "Las Mascotas y el Invierno",
    description:
      "Durante el invierno es imprescindible que limites el tiempo que pasa tu mascota al ire libre. La mayoría de las mascotas que viven en el interior no están acostumbradas a las bajas...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_6.jpg?alt=media&token=223f8d0f-b8d8-4468-a5a8-9428e218f5e5",
  },
  {
    id: 7,
    title: "Cuidados básicos de tu mascota",
    description:
      "¡Hola Adoptantes novatos! Vamos a dar un repaso por los puntos básicos a tener en cuenta para los cuidados de tu animal de compañía. Si quieres ser muy responsable, sigues estos consejos...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_7.jpg?alt=media&token=edeb7b89-1800-4737-a072-497edbff73d2",
  },
  {
    id: 8,
    title: "El Vinculo afectivo con los animales",
    description:
      "Convivir con perros y gatos ayuda a disminuir el estrés, la tensión arterial y la frecuencia cardíaca. No sólo eso, los estudios constatan que esa compañía mejora...",
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_8.jpg?alt=media&token=e0d94e7a-53b6-455b-a477-7b0b192e5054",
  },
];

const BlogSection: React.FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="main-blog-section">
      <Breadcrumbs />
      <article className="blog-title">
        <h2
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          Blog
        </h2>
      </article>

      <Container>
        <div
          className="blog-carousel-wrapper"
        >
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
            {blogArticles.map((article) => (
              <SwiperSlide key={article.id}>
                <article className="blog-card">
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
                    <h3 className="blog-card__title">{article.title}</h3>
                    <p className="blog-card__description">
                      {article.description}
                    </p>
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
      </Container>
    </section>
  );
};

export default BlogSection;
