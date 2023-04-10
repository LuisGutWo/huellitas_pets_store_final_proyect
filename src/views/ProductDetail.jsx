import { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserContext } from "../context/UserContext";
import Modal from "react-bootstrap/Modal";

import { useProductsContext } from "../context/ProductsContext";
import { fakeLoading } from "../utils/fakeLoading";
import Loading from "../components/Loading";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductDetail() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const params = useParams();
  const { id } = useParams();

  const { addProduct } = useProductsContext();
  const { user } = useUserContext();

  fakeLoading(2000);

  useEffect(() => {
    setLoading(true);
    fetch("/products.json")
      .then((response) => response.json({ id }))
      .then((data) => {
        const product = data.find((item) => item.id === params.id);
        setProduct(product);
      })
      .finally(() => setLoading(false));
  }, [params]);

  function addButtonShoppingCart() {
    addProduct(product);
    handleShow(!show);
  }

  if (loading) return <Loading />;

  return (
    <div className="products-container">
      <div className="card">
        <div className="row">
          <div className="img-card-detail col col-sm-3 text-center">
            <img
              src={product.img}
              className="card-image img-fluid rounded-start"
              alt="..."
            />
            <NavLink to={"/products"} className="text-end">
              <Button className="btn btn-secondary btn-sm mt-2">Volver</Button>
            </NavLink>
          </div>
          <div className="col-md-8">
            <div className="card-body text-start">
              <h5 className="fs-3">{product.name} </h5>
              <hr />
              <p className="card-text">{product.desc}</p>
              <div className="card-text">
                <p className="text-center d-flex justify-content-between align-items-center text-primary m-0">
                  <b>$ {product.price}</b>
                  {user ? (
                    <>
                      <Button
                        className="button-class"
                        ref={target}
                        onClick={addButtonShoppingCart}
                        style={{ width: "50%", height: "2rem" }}
                      >Añadir al carrito 
                        <ShoppingCartIcon style={{ fontSize: "1.3rem" }} />
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <b>{product.name}</b>! se agrego al carrito 😎
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
