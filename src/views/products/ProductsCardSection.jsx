import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Navbar } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MainProductCard from "./MainProductCard";
import Loading from "../../utils/Loading";
import { FakeLoading } from "../../utils/FakeLoading";
import { motion } from "framer-motion";

export default function Products() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [season, setSeason] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [brand, setBrand] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  FakeLoading(200);

  useEffect(() => {
    setLoading(true);

    fetch(import.meta.env.VITE_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setCategories(["all", ...new Set(data.map((item) => item.category))]);
        setTypes([...new Set(data.map((item) => item.type))]);
        setDiscounts([...new Set(data.map((item) => item.promotion))]);
        setSeason([...new Set(data.map((item) => item.season))]);
        setFeatured([...new Set(data.map((item) => item.product))]);
        setBrand([...new Set(data.map((item) => item.brand))]);
        setLoading(false);
      })

      .finally(() => setLoading(false));
  }, []);

  const searchData = (item, search) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  };

  const filteredData = () => {
    if (filter === "all") {
      return data.filter((item) => searchData(item, search));
    } else {
      return data
        .filter(
          (item) =>
            item.category === filter ||
            item.type === filter ||
            item.season === filter ||
            item.brand === filter
        )
        .filter((item) => searchData(item, search));
    }
  };
  const filteredProduct = filteredData().map((item) => (
    <MainProductCard key={item.id} item={item} />
  ));

  const filteredDataDiscounts = () => {
    if (filter === "discount") {
      return data.filter((item) => item.promotion === "discount");
    } else {
      return data
        .filter((item) => item.promotion === "discount")
        .filter((item) => searchData(item, search));
    }
  };
  const filteredProductDiscount = filteredDataDiscounts().map((item) => (
    <MainProductCard key={item.id} item={item} />
  ));

  const filteredDataNews = () => {
    if (filter === "news") {
      return data.filter((item) => item.season === "news");
    } else {
      return data
        .filter((item) => item.season === "news")
        .filter((item) => searchData(item, search));
    }
  };
  const filteredProductNews = filteredDataNews().map((item) => (
    <MainProductCard key={item.id} item={item} />
  ));

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  if (loading) return <Loading />;

  return (
    <main>
      {/* Products Header */}
      <section className="products-header">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { delay: 0.9, duration: 0.9 },
          }}
          exit={{
            opacity: 0.5,
            transition: { duration: 0.7 },
          }}
        >
          <h3>NUESTROS PRODUCTOS</h3>
          <h6>Conoce esta selección hecha para ti</h6>
        </motion.div>
      </section>

      {/* Category Navbar */}
      <section className="products-navbar">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { delay: 1, duration: 1 },
          }}
          exit={{
            opacity: 0.5,
            transition: { duration: 0.7 },
          }}
        >
          <Navbar className="products-buttons-section">
            {categories.map((category) => (
              <NavLink
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
                key={type}
                to={`/types/${type}`}
                onClick={() => setFilter(type)}
                className="category-buttons"
              >
                {type}
              </NavLink>
            ))}
          </Navbar>
          <nav className="form-products-categories">
            <input
              type="text"
              style={{
                fontStyle: "italic",
                borderRadius: "5px",
                backgroundColor: "Background",
              }}
              placeholder="Buscar producto"
              onChange={(e) => setSearch(e.target.value)}
            />
          </nav>
        </motion.div>
      </section>

      {/* Carousel de productos */}
      <motion.div
        initial={{
          opacity: 0.3,
        }}
        animate={{
          opacity: 1,
          transition: { delay: 0.5, duration: 0.7 },
        }}
        exit={{
          opacity: 0.5,
          transition: { duration: 0.7 },
        }}
        className="products-carousel"
      >
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Carousel
              responsive={responsive}
              additionalTransfrom={0}
              arrows={false}
              autoPlay={false}
              autoPlaySpeed={3000}
              customTransition="all 2s linear"
              centerMode={false}
              containerClass="container-with-dots"
              draggable
              focusOnSelect={false}
              infinite
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              className="container products-container"
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide
              swipeable
            >
              {filteredProduct}
            </Carousel>
          </div>
        )}
      </motion.div>

      {/* Discount products carousel */}
      <div className="main-featured-container">
        <section>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { delay: 0.9, duration: 0.9 },
            }}
            exit={{
              opacity: 0.5,
              transition: { duration: 0.7 },
            }}
            className="products-header-discount"
          >
            <h2>Descuentos</h2>
          </motion.div>
        </section>
        <motion.div
          initial={{
            opacity: 0.3,
          }}
          animate={{
            opacity: 1,
            transition: { delay: 0.5, duration: 0.7 },
          }}
          exit={{
            opacity: 0.5,
            transition: { duration: 0.7 },
          }}
          className="products-carousel-discount"
        >
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Carousel
                responsive={responsive}
                additionalTransfrom={0}
                arrows={false}
                autoPlay
                autoPlaySpeed={6000}
                customTransition="all 2s linear"
                centerMode={false}
                containerClass="container-with-dots"
                draggable
                focusOnSelect={false}
                infinite
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                className="container products-carousel-featured"
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass="additionalTransfrom"
                slidesToSlide
                swipeable
              >
                {filteredProductDiscount}
              </Carousel>
            </div>
          )}
        </motion.div>
        {/* News products carouse */}
        <section>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { delay: 0.9, duration: 0.9 },
            }}
            exit={{
              opacity: 0.5,
              transition: { duration: 0.7 },
            }}
            className="products-header-news"
          >
            <h2>Novedades</h2>
          </motion.div>
        </section>
        <motion.div
          initial={{
            opacity: 0.3,
          }}
          animate={{
            opacity: 1,
            transition: { delay: 0.5, duration: 0.7 },
          }}
          exit={{
            opacity: 0.5,
            transition: { duration: 0.7 },
          }}
          className="products-carousel-discount"
        >
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Carousel
                responsive={responsive}
                additionalTransfrom={0}
                arrows={false}
                autoPlay
                autoPlaySpeed={7000}
                customTransition="all 2s linear"
                centerMode={false}
                containerClass="container-with-dots"
                draggable
                focusOnSelect={false}
                infinite
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                className="container products-carousel-featured"
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide
                swipeable
              >
                {filteredProductNews}
              </Carousel>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
