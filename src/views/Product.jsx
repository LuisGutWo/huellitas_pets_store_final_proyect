import { useEffect, useState } from "react";
import { useProductsContext } from "../context/ProductsContext";
import { useParams, NavLink } from "react-router-dom";

export default function Product() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { addProduct } = useProductsContext();

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        const product = data.find((item) => item.id === params.id);
        setProduct(product);
      })
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="card-detail card bg-light m-5 p-3">
      <div className="row">
        <div className="col-md-4">
          <img
            src={product.img}
            className="card-image img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body text-start">
            <h5 className="fs-3">{product.name} </h5>
            <hr />
            <p className="card-text">{product.desc}</p>
            <p className="card-text">
              <h5 className="text-center d-flex justify-content-between">
                Precio: ${product.price}
                <NavLink
                  className="btn btn-warning"
                  onClick={() => addProduct(product)}
                  to="/cart"
                >
                  Añadir 🛒
                </NavLink>
              </h5>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
