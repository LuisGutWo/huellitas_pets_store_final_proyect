import { useState, useEffect } from "react";
import { NavLink, Navbar } from "react-bootstrap";

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
      className="text-center"
    >
      <div className="products-section-title">
        <h3>NUESTROS PRODUCTOS</h3>
        <h6>Conoce esta selección hecha para ti</h6>
      </div>
      <Navbar className="products-navbar">
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

        <div>
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
      </Navbar>

      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="container products-container">
            {filteredData().map((item) => {
              return <MainProductCard key={item.id} item={item} />;
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
