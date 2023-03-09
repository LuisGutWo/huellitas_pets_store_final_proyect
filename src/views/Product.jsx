import { useEffect, useState } from "react";
import { useProductsContext } from "../context/ProductsContext";
import { useParams, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "react-bootstrap";

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
    <div className="container d-flex justify-content-center">
      <div className="card">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={product.img}
              className="card-image img-fluid rounded-start"
              alt="..."
            />
            <NavLink to={"/products"} className="text-end">
              <Button className="btn btn-secondary btn-sm mb-2">Volver</Button>
            </NavLink>
          </div>
          <div className="col-md-8">
            <div className="card-body text-start">
              <h5 className="fs-3">{product.name} </h5>
              <hr />
              <p className="card-text">{product.desc}</p>
              <p className="card-text">
                <p className="text-center d-flex justify-content-between align-items-center text-primary m-0">
                  <b>Precio: ${product.price}</b>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-class" : "inactive-class"
                    }
                    onClick={() => addProduct(product)}
                    to="/cart"
                  >
                    <ShoppingCartIcon />
                  </NavLink>
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
