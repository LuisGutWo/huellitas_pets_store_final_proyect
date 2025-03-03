import React from "react";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MainProductCard from "../productsCard/MainProductCard";
import Loading from "../../utils/Loading";

import AOS from "aos";
import "aos/dist/aos.css";
import { Container } from "react-bootstrap";
AOS.init();

const DiscountsProducts = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_URL);
      const data = await res.json();

      setData(data);
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

  const searchData = (item, search) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  };

  const filteredDataDiscounts = () => {
    if (filter === "discount") {
      setSearch(true);
      setFilter(true);
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
    <main className="discount-container">
      {/* Discount products carousel */}
      <div className="main-featured-container">
        <section>
          <h2
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
          >
            Productos con Descuentos
          </h2>
        </section>
        {loading ? (
          <Loading />
        ) : (
          <Container>
            <Carousel
              responsive={responsive}
              additionalTransfrom={0}
              arrows={false}
              autoPlay={true}
              autoPlaySpeed={9000}
              customTransition="all 5s linear"
              centerMode={false}
              containerClass="container-with-dots"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              draggable
              focusOnSelect={false}
              infinite={true}
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover={true}
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              className="products-carousel"
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
          </Container>
        )}
        {/* News products carouse */}
        <section>
          <h2
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
          >
            Novedades
          </h2>
        </section>

        {loading ? (
          <Loading />
        ) : (
          <Container>
            <Carousel
              responsive={responsive}
              additionalTransfrom={0}
              arrows={false}
              autoPlay={true}
              autoPlaySpeed={6000}
              customTransition="all 2s linear"
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
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              className="products-carousel"
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
          </Container>
        )}
      </div>
    </main>
  );
};

export default DiscountsProducts;
