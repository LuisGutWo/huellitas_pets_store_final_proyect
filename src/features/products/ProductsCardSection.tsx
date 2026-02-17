import { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MainProductCard from "./components/MainProductCard";
import Loading from "../../shared/components/Loading";
import type { Product } from "../../services/productsApi";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const ProductsCardSection: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_URL);
      const data = await res.json();

      setData(data);
      setCategories(["all", ...new Set(data.map((item: Product) => (item as any).category))]);
      setTypes([...new Set(data.map((item: Product) => (item as any).type))]);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchData = (item: Product, search: string): boolean => {
    return (item as any).name.toLowerCase().includes(search.toLowerCase());
  };

  const filteredData = () => {
    if (filter === "all") {
      return data.filter((item) => searchData(item, search));
    } else {
      return data
        .filter((item: Product) => (item as any).category === filter || (item as any).type === filter)
        .filter((item) => searchData(item, search));
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      {/* Products Header */}
      <Container>
        <section className="products-header">
          <div className="products-text-container">
            <h1
              data-aos="fade-right"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine"
            >
              NUESTRA TIENDA EN LINEA
            </h1>
            <h3
              data-aos="fade-left"
              data-aos-offset="200"
              data-aos-easing="ease-in-sine"
            >
              Conoce esta selección hecha para ti y obtenlos en solo un click
            </h3>
          </div>
          <input
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-offset="0"
            type="text"
            className="form-products-categories"
            placeholder="Buscar producto"
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
        {/* Category Buttons Navbar */}
        <section className="products-navbar">
          <Navbar className="products-buttons-section">
            {categories.map((category) => (
              <NavLink
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-offset="0"
                key={category}
                to={`/categories/${category}`}
                onClick={() => setFilter(category)}
                className="category-buttons"
                style={{ alignItems: "center" }}
              >
                {category}
              </NavLink>
            ))}
            {types.map((type) => (
              <NavLink
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-offset="0"
                key={type}
                to={`/types/${type}`}
                onClick={() => setFilter(type)}
                className="category-buttons"
                style={{ alignItems: "center" }}
              >
                {type}
              </NavLink>
            ))}
          </Navbar>
        </section>
        {/* Carousel de productos */}
        {loading ? (
          <Loading />
        ) : (
          <Container>
            <Carousel
              responsive={responsive}
              additionalTransfrom={0}
              arrows={true}
              autoPlay={true}
              autoPlaySpeed={9000}
              customTransition="all 5s linear"
              centerMode={false}
              containerClass="container-with-dots"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              draggable
              focusOnSelect={true}
              infinite={true}
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover={true}
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={true}
              renderDotsOutside={true}
              className="products-carousel"
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide
              swipeable={true}
            >
              {filteredData().map((item) => (
                <MainProductCard key={item.id} item={item} />
              ))}
            </Carousel>
          </Container>
        )}
      </Container>
    </main>
  );
};

export default ProductsCardSection;
