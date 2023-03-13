import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainProductCard from "../components/MainProductCard";
import Loading from "../components/Loading";
import NotFound from "../views/NotFound";
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
      <NotFound />;
      navigate("/products");
    }
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="text-center">
      <h1 className="mt-4 mb-0">Nuestros productos</h1>
      <p>Explora esta perfecta selección</p>
      <div className="products-container">
        {products.map((item) => {
          return <MainProductCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
