import { useState, useEffect } from "react";
import { Button, NavLink } from "react-bootstrap";

import MainProductCard from "./MainProductCard";
import Loading from "../../utils/Loading";
import { FakeLoading } from "../../utils/FakeLoading";

export default function Products() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  FakeLoading(2000);

  useEffect(() => {
    setLoading(true);

    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setCategories(["all", ...new Set(data.map((item) => item.category))]);
        setLoading(false);
      })

      .finally(() => setLoading(false), 1000);
  }, []);

  const searchData = (item, search) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  };

  FakeLoading(2000);

  const filteredData = () => {
    if (filter === "all") {
      return data.filter((item) => searchData(item, search));
    } else {
      return data
        .filter((item) => item.category === filter)
        .filter((item) => searchData(item, search));
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container text-center">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="products-section-title">
            <h2>NUESTROS PRODUCTOS</h2>
            <p>conoce esta selección hecha para ti</p>
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
          <div className="products-container">
            {filteredData().map((item) => {
              return <MainProductCard key={item.id} item={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
