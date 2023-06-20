import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Navbar, Row, Col } from "react-bootstrap";

import MainProductCard from "./MainProductCard";
import Loading from "../../utils/Loading";
import BackToTopButton from "../../layout/BackToTopButton";
import { FakeLoading } from "../../utils/FakeLoading";
import { motion } from "framer-motion";

const MainProductsList = () => {
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

  if (loading) return <Loading />;

  return (
    <main>
      {/* Products Header */}
      <section className="products-list-header">
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
          <input
            type="text"
            style={{
              fontStyle: "italic",
              borderRadius: "5px",
              backgroundColor: "Background",
            }}
            placeholder="Buscar producto"
            className="main-form-products-categories"
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>
      </section>

      {/* Category Navbar */}
      <section className="main-products-navbar">
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
          <Navbar className="main-products-buttons-section">
            {categories.map((category) => (
              <NavLink
                key={category}
                to={`/categories/${category}`}
                onClick={() => setFilter(category)}
                className="main-category-buttons"
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
                className="main-category-buttons"
              >
                {type}
              </NavLink>
            ))}
          </Navbar>
        </motion.div>
      </section>

      <Row
        xs={2}
        md={3}
        lg={4}
        className="g-0 mt-0 ms-3 d-flex justify-content-center align-items-center align-content-center justify-self-center main-products-container"
      >
        {filteredData().map((item) => (
          <Col>
            <MainProductCard key={item.id} item={item} />
          </Col>
        ))}
      </Row>
      <BackToTopButton />
    </main>
  );
};

export default MainProductsList;
