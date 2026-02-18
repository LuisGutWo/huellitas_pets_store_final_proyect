import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MainProductCard from "./components/MainProductCard";
import {
  ProductListSkeleton,
  Skeleton,
} from "../../shared/components/SkeletonLoader";
import type { Product } from "../../services/productsApi";

const ProductsCardSection: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_URL);
      const data = await res.json();

      setData(data);
      const categoryList = Array.from(
        new Set(
          data
            .map((item: Product) => (item as { category?: string }).category)
            .filter(Boolean)
        )
      ) as string[];
      const typeList = Array.from(
        new Set(
          data
            .map((item: Product) => (item as { type?: string }).type)
            .filter(Boolean)
        )
      ) as string[];

      setCategories(["all", ...categoryList]);
      setTypes(typeList);
    } catch (error) {
      setError(error as Error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    const matchesSearch = (item: Product) => {
      const name = (item as { name?: string }).name ?? "";
      return name.toLowerCase().includes(normalizedSearch);
    };

    if (filter === "all") {
      return data.filter((item) =>
        normalizedSearch ? matchesSearch(item) : true
      );
    }

    return data
      .filter((item: Product) => {
        const category = (item as { category?: string }).category;
        const type = (item as { type?: string }).type;
        return category === filter || type === filter;
      })
      .filter((item) => (normalizedSearch ? matchesSearch(item) : true));
  }, [data, filter, normalizedSearch]);

  const filterOptions = useMemo(
    () => Array.from(new Set([...categories, ...types])),
    [categories, types]
  );

  const canLoop = filteredItems.length > 4;

  if (loading) {
    return (
      <main>
        <Container>
          <section className="products-hero">
            <div className="products-hero__content">
              <Skeleton variant="text" width="40%" height="18px" />
              <Skeleton variant="text" width="70%" height="32px" />
              <Skeleton variant="text" width="80%" height="18px" />
            </div>
            <div className="products-hero__search">
              <Skeleton variant="rectangular" width="100%" height="44px" />
              <Skeleton variant="text" width="65%" height="16px" />
            </div>
          </section>
          <section className="products-filters">
            <div className="products-filters__scroll">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width="90px"
                  height="36px"
                />
              ))}
            </div>
          </section>
          <ProductListSkeleton count={8} />
        </Container>
      </main>
    );
  }
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <main>
      <Container>
        <section className="products-hero" aria-labelledby="products-title">
          <div className="products-hero__content">
            <span className="products-hero__eyebrow">Tienda online</span>
            <h1 id="products-title" className="products-hero__title">
              Nuestra tienda en linea
            </h1>
            <p className="products-hero__subtitle">
              Conoce esta selección hecha para ti y obtenlos en solo un click.
            </p>
          </div>
          <div className="products-hero__search">
            <label className="sr-only" htmlFor="products-search">
              Buscar producto
            </label>
            <div className="products-search">
              <span className="products-search__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                  <path
                    d="M11 3a8 8 0 1 0 5.293 14.293l3.707 3.707 1.414-1.414-3.707-3.707A8 8 0 0 0 11 3Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <input
                id="products-search"
                type="search"
                className="products-search__input"
                placeholder="Buscar productos, marcas o categorías"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Buscar productos"
              />
            </div>
            <p className="products-hero__hint">
              Filtra por nombre, categoría o tipo para encontrar mas rápido.
            </p>
          </div>
        </section>

        <section className="products-filters" aria-label="Filtros de productos">
          <div className="products-filters__scroll">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`category-buttons products-filter ${
                  filter === option ? "is-active" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section
          className="products-carousel-section"
          aria-label="Carrusel de productos"
        >
          {filteredItems.length === 0 ? (
            <div className="products-empty">
              No encontramos productos con ese filtro.
            </div>
          ) : (
            <>
              <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                className="products-swiper"
                navigation={{
                  prevEl: ".products-swiper-button-prev",
                  nextEl: ".products-swiper-button-next",
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 6500, disableOnInteraction: false }}
                loop={canLoop}
                rewind={!canLoop}
                spaceBetween={16}
                slidesPerView={1.05}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 16 },
                  1024: { slidesPerView: 3, spaceBetween: 18 },
                  1280: { slidesPerView: 4, spaceBetween: 20 },
                }}
                a11y={{ enabled: true }}
              >
                {filteredItems.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MainProductCard item={item} />
                  </SwiperSlide>
                ))}
                <div className="products-carousel-header">
                  <div className="products-carousel-nav" aria-hidden="true">
                    <button
                      className="products-swiper-button products-swiper-button-prev"
                      type="button"
                      aria-label="Productos anteriores"
                    >
                      <svg viewBox="0 0 24 24" role="presentation">
                        <path
                          d="M15.5 5.5 9 12l6.5 6.5-1.5 1.5L6 12l8-8 1.5 1.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <button
                      className="products-swiper-button products-swiper-button-next"
                      type="button"
                      aria-label="Productos siguientes"
                    >
                      <svg viewBox="0 0 24 24" role="presentation">
                        <path
                          d="m8.5 18.5 6.5-6.5-6.5-6.5L10 4l8 8-8 8-1.5-1.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Swiper>
            </>
          )}
        </section>
      </Container>
    </main>
  );
};

export default ProductsCardSection;
