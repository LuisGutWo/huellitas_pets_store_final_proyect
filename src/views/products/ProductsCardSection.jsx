import React from "react";
import { useState, useEffect } from "react";
import { Container, NavLink, Navbar } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MainProductCard from "../productsCard/MainProductCard";
import Loading from "../../utils/Loading";
import { FakeLoading } from "../../utils/FakeLoading";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function Products() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  FakeLoading(2000);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_URL);
      const data = await res.json();

      setData(data);
      setCategories(["all", ...new Set(data.map((item) => item.category))]);
      setTypes([...new Set(data.map((item) => item.type))]);
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

  // useEffect(() => {
  //   setLoading(true);

  //   fetch(import.meta.env.VITE_URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setCategories(["all", ...new Set(data.map((item) => item.category))]);
  //       setTypes([...new Set(data.map((item) => item.type))]);
  //       setLoading(false);
  //     })

  //     .finally(() => setLoading(false));
  // }, []);

  const searchData = (item, search) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  };

  const filteredData = () => {
    if (filter === "all") {
      return data.filter((item) => searchData(item, search));
    } else {
      return data
        .filter((item) => item.category === filter || item.type === filter)
        .filter((item) => searchData(item, search));
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      {/* Products Header */}
      <section className="products-header">
        <h1
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          NUESTROS PRODUCTOS
        </h1>
        <h3
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          Conoce esta selección hecha para ti
        </h3>
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

      {/* Category Navbar */}
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
            autoPlaySpeed={8000}
            customTransition="all 3s linear"
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
    </main>
  );
}
