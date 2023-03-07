import { useState, useEffect } from "react";
import MainProductCard from "../components/MainProductCard";
import Loading from "../components/Loading";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("products.json");
      if (!res.ok) setError(true);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: Producto no encontrada</div>;

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
