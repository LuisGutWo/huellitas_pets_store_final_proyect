import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import MainProductCard from "./MainProductCard";
import Loading from "../../utils/Loading";
import { FakeLoading } from "../../utils/FakeLoading";

export default function Products() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setCategories([...new Set(data.map((item) => item.category))]);
        setLoading(false);
      })

      .finally(() => setLoading(false), 1000);
  }, []);

  const searchData = (item, search) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  };

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
  if (loading) return <FakeLoading />;

  return (
    <div className="products-main-container container text-center">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="products-section-title">
            <h2>NUESTROS PRODUCTOS</h2>
            <p>conoce esta selección hecha para ti</p>
          </div>
          <div className="products-navbar">
            <div className="products-select">
              <h6>Categorías</h6>
              <Form.Select
                className="form-products-categories"
                aria-label="Buscador por categoría"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                size="sm"
              >
                <option value="all">Todas</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="products-select">
              <h6>Encuentra tu producto</h6>
              <input
                type="text"
                placeholder="productos"
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
