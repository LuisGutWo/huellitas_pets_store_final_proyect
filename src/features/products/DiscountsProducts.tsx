import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MainProductCard from "./components/MainProductCard";
import { ProductListSkeleton, Skeleton } from "../../shared/components/SkeletonLoader";
import type { Product } from "../../services/productsApi";

import AOS from "aos";
import "aos/dist/aos.css";
import { Container } from "react-bootstrap";
AOS.init();

const DiscountsProducts: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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

  const searchData = (item: Product, search: string): boolean => {
    return (item as any).name.toLowerCase().includes(search.toLowerCase());
  };

  const filteredDataDiscounts = () => {
    if (filter === "discount") {
      setSearch(true);
      setFilter(true);
      return data.filter((item: Product) => (item as any).promotion === "discount");
    } else {
      return data
        .filter((item: Product) => (item as any).promotion === "discount")
        .filter((item) => searchData(item, search));
    }
  };
  const filteredProductDiscount = filteredDataDiscounts().map((item) => (
    <MainProductCard key={item.id} item={item} />
  ));

  const filteredDataNews = () => {
    if (filter === "news" && data !== null) {
      return data.filter((item) => item.season === "news");
    } else if (data !== null) {
      return data
        .filter((item) => item.season === "news")
        .filter((item) => searchData(item, search));
    } else {
      return [];
    }
  };
  const filteredProductNews = filteredDataNews().map((item) => (
    <MainProductCard key={item.id} item={item} />
  ));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  if (loading) {
    return (
      <main className="discount-container">
        <div className="main-featured-container">
          <section>
            <Skeleton variant="text" width="50%" height="24px" />
          </section>
          <Container>
            <ProductListSkeleton count={6} />
          </Container>
          <section>
            <Skeleton variant="text" width="35%" height="24px" />
          </section>
          <Container>
            <ProductListSkeleton count={6} />
          </Container>
        </div>
      </main>
    );
  }
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
            {filteredProductDiscount}
          </Carousel>
        </Container>
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
            {filteredProductNews}
          </Carousel>
        </Container>
      </div>
    </main>
  );
};

export default DiscountsProducts;
