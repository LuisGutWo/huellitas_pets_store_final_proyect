import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import NotFound from "./NotFound";

import MainProductCard from "../components/MainProductCard";
import Loading from "../components/Loading";
import { fakeLoading } from "../utils/fakeLoading";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);

    try {
      await fakeLoading();
      const { data } = await axios.get("products.json");
      setProducts(data);
    } catch (error) {
      console.log(error);
      navigate(<NotFound />);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const originalProducts = [...products];

  function filterResult(item) {
    try {
      const filterData = originalProducts.filter((data) => {
        return data.category === item;
      });
      setProducts(filterData);
    } catch (error) {
      navigate(<NotFound />);
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="text-center">
      <div className="products-section-title">
        <h1 className="mt-4 mb-0">Nuestros productos</h1>
        <p>Explora esta perfecta selección</p>
      </div>
      <div className="products-select">
        <NavLink
          onClick={() => filterResult("perro")}
          className="btn btn-secondary btn-sm mt-2"
        >
          Perros
        </NavLink>

        <NavLink
          onClick={() => filterResult("gato")}
          className="btn btn-secondary btn-sm mt-2"
        >
          Gatos
        </NavLink>

        <NavLink onClick={() => setProducts(category)}>
          <Button className="btn btn-secondary btn-sm mt-2">Todos</Button>
        </NavLink>
      </div>
      <hr />

      <div className="products-container">
        {products.map((item) => {
          return <MainProductCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
