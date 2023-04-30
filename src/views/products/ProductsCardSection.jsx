import { useState, useEffect } from "react";
import { Button, NavLink } from "react-bootstrap";

import MainProductCard from "./MainProductCard";
import Loading from "../../utils/Loading";
import { FakeLoading } from "../../utils/FakeLoading";

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
        setTypes([ ...new Set(data.map((item) => item.type))]);
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
    <div className="text-center">
      <div className="products-section-title">
        <h2>NUESTROS PRODUCTOS</h2>
        <h5>Conoce esta selección hecha para ti</h5>
      </div>
      <div className="products-navbar">
        <div className="products-buttons">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/categories/${category}`}
              onClick={() => setFilter(category)}
            >
              <Button
                style={{ fontSize: "1rem", fontWeight: "bolder" }}
                variant="outline-secondary"
                color="white"
              >
                {category}
              </Button>
            </NavLink>
          ))}
          {types.map((type) => (
            <NavLink
              key={type}
              to={`/types/${type}`}
              onClick={() => setFilter(type)}
            >
              <Button
                style={{ fontSize: "1rem", fontWeight: "bolder" }}
                variant="outline-secondary"
                color="white"
              >
                {type}
              </Button>
            </NavLink>
          ))}
        </div>

        <div>
          <input
            type="text"
            style={{
              fontStyle: "italic",
              borderRadius: "5px",
              boxShadow: "unset",
              backgroundColor: "-moz-initial",
            }}
            placeholder="Buscar producto"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

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
    </div>
  );
}
