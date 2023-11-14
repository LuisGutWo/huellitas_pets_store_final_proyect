import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Navbar, Row, Col } from "react-bootstrap";

import MainProductCard from "../../views/productsCard/MainProductCard";
import Loading from "../../utils/Loading";
import BackToTopButton from "../../utils/BackToTopButton";
import { FakeLoading } from "../../utils/FakeLoading";

const MainProductsList = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  FakeLoading(200);

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
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* Products list section */}
      <section className="products-list-header">
        <div>
          <div className="products-list-container__text"> 
            <h1>NUESTRA TIENDA ONLINE</h1>
            <h3>Selecciona tu producto favorito de nuestra tienda online</h3>
          </div>
          <input
            type="text"
            style={{
              fontStyle: "roboto",
              borderRadius: "5px",
              backgroundColor: "Background",
            }}
            placeholder="Buscar producto"
            className="main-form-products-categories"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Category Navbar */}
      <Navbar className="products-list-buttons">
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

      <Row xs={2} md={3} lg={4} className="products-list-container">
        {filteredData().map((item) => (
          <Col key={item.id}>
            <MainProductCard key={item.id} item={item} />
          </Col>
        ))}
      </Row>
      <BackToTopButton />
    </>
  );
};

export default MainProductsList;
