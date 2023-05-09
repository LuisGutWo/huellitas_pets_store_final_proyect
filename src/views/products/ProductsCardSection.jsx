import { useState, useEffect } from "react";
import { NavLink } from "react-bootstrap";
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
        .filter((item) => item.category === filter || item.type === filter)
        .filter((item) => searchData(item, search));
    }
  };
  const filteredProduct = filteredData().map((item) => (
    <MainProductCard key={item.id} item={item} />
  ));

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (loading) return <Loading />;

  return (
    <motion.div
      initial={{
        opacity: 0.7,
      }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.5 },
      }}
      exit={{
        opacity: 0.7,
        transition: { duration: 0.5 },
      }}
      className="text-center mt-6"
    >
      {/* Products Header */}
      <div className="products-header">
        <h3>NUESTROS PRODUCTOS</h3>
        <h6>Conoce esta selección hecha para ti</h6>
      </div>

      {/* Products Navbar */}
      <section className="products-navbar">
        <div className="products-buttons">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/categories/${category}`}
              onClick={() => setFilter(category)}
              type="button"
              className="btn btn-outline-secondary fs-6"
              style={{
                width: "6rem",
                height: "1.6rem",
                display: "flex",
                justifyContent: "center",
                alignContent: "flex-end",
              }}
            >
              {category}
            </NavLink>
          ))}
          {types.map((type) => (
            <NavLink
              key={type}
              to={`/types/${type}`}
              onClick={() => setFilter(type)}
              type="button"
              className="btn btn-outline-secondary fs-6"
              style={{
                width: "6rem",
                height: "1.6rem",
                display: "flex",
                justifyContent: "center",
                alignContent: "flex-end",
              }}
            >
              {type}
            </NavLink>
          ))}
        </div>

        <div className="form-products-categories">
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
        </div>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <div>
          <Carousel
            responsive={responsive}
            className="container products-container"
          >
            {filteredProduct}
          </Carousel>
        </div>
      )}
    </motion.div>
  );
}
