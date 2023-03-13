import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useProductsContext } from "../context/ProductsContext";
import { fakeLoading } from "../utils/fakeLoading";
import Loading from "../components/Loading";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductDetail() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { addProduct } = useProductsContext();
  const { id } = useParams(); 

  const params = useParams();

  fakeLoading(2000);
  
  useEffect(() => {
    setLoading(true);
    fetch("/products.json")
      .then((response) => response.json({id}))
      .then((data) => {
        const product = data.find((item) => item.id === params.id);
        setProduct(product);
        
      })
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) return <Loading />;

  return (
    <div className="product-container">
      <div className="card">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={product.img}
              className="card-image img-fluid rounded-start"
              alt="..."
            />
            <NavLink to={"/products"} className="text-end">
              <Button className="btn btn-secondary btn-sm mt-3">Volver</Button>
            </NavLink>
          </div>
          <div className="col-md-8">
            <div className="card-body text-start">
              <h5 className="fs-3">{product.name} </h5>
              <hr />
              <p className="card-text">{product.desc}</p>
              <div className="card-text">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
