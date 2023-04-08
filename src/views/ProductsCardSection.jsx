import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import MainProductCard from "../components/MainProductCard";
import Loading from "../components/Loading";
import NotFound from "../views/NotFound";
import { fakeLoading } from "../utils/fakeLoading";
import axios from "axios";
import { Button } from "react-bootstrap";

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
      <NotFound />;
      navigate("/products");
    }
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  function filterResult(item) {
    const res = products.filter((data) => {
      return data.category === item;
    });
    setProducts(res);
  }

  console.log(filterResult);

  if (loading) return <Loading />;

  return (
    <div className="text-center">
      <div className="products-section-title">
        <h1 className="mt-4 mb-0">Nuestros productos</h1>
        <p>Explora esta perfecta selección</p>
      </div>
      <div className="products-select">
        <Button
          name="perro"
          value={"perro"}
          id="perro"
          onClick={() => filterResult("perro")}
          className="btn btn-secondary btn-sm mt-2"
        >
          Perros
        </Button>

        <Button
          name="gato"
          value={"gato"}
          id="gato"
          onClick={() => filterResult("gato")}
          className="btn btn-secondary btn-sm mt-2"
        >
          Gatos
        </Button>

        <NavLink to={"/products"} onClick={() => setProducts(categories)}>
          <Button className="btn btn-secondary btn-sm mt-2">Todos</Button>
        </NavLink>
      </div>
      <hr />

      <div className="products-container">
        {products.map((item) => {
          return (
            <MainProductCard
              key={item.id}
              item={item}
              category={item.category}
            />
          );
        })}
      </div>
    </div>
  );
}
