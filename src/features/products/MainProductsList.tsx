import { useState, useEffect } from "react";
import { Navbar, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import MainProductCard from "./components/MainProductCard";
import Loading from "../../shared/components/Loading";
import BackToTopButton from "../../shared/components/BackToTopButton";
import type { Product } from "../../services/productsApi";

const MainProductsList: React.FC = () => {
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

  if (loading) return <Loading />;
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <div className="container">
      {/* Products list section */}
      <section className="products-list-header">
        <div className="products-list-container__text">
          <div className="products-list__text">
            <h1>NUESTRA TIENDA ONLINE</h1>
            <h3>Selecciona tu producto favorito de nuestra tienda online</h3>
          </div>
          <input
            type="text"
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
    </div>
  );
};

export default MainProductsList;
