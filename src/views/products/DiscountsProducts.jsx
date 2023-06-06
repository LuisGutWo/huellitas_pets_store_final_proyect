import React from "react";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MainProductCard from "./MainProductCard";
import Loading from "../../utils/Loading";
import { FakeLoading } from "../../utils/FakeLoading";
import { motion } from "framer-motion";

const DiscountsProducts = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [discounts, setDiscounts] = useState([]);
  const [season, setSeason] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  FakeLoading(200);

  useEffect(() => {
    setLoading(true);

    fetch(import.meta.env.VITE_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setDiscounts(["all", ...new Set(data.map((item) => item.promotion))]);
        setSeason([...new Set(data.map((item) => item.season))]);
        setLoading(false);
      })

      .finally(() => setLoading(false));
  }, []);

  const searchData = (item, search) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  };

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
      items: 4,
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
    <main className="discount-container">
      <div className="wave"></div>
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
        >
          {loading ? (
            <Loading />
          ) : (
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
              className="products-carousel-featured"
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
              className="products-carousel-featured"
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
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default DiscountsProducts;
