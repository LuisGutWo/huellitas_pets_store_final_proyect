import { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import Modal from "react-bootstrap/Modal";

import { useProductsContext } from "../../context/ProductsContext";
import { FakeLoading } from "../../utils/FakeLoading";
import Loading from "../../utils/Loading";

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

  FakeLoading(2000);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_URL)
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
    <main className="container p-5">
      <Card className="detail-card">
        <Card.Img
          src={product.img}
          className="card-image img-fluid"
          alt="..."
        />
        <Card.Body className="card-body-detail">
          <Card.Title className="card-title">{product.name} </Card.Title>
          <Card.Text className="card-text">{product.desc}</Card.Text>
          <div className="card-price-button">
            <b>$ {product.price}</b>
            <NavLink to={"/products"} className="text-end">
              <Button className="btn btn-sm mt-2" variant="outline-primary">Volver</Button>
            </NavLink>
          </div>

          {user ? (
            <>
              <Button
                className="button-class"
                ref={target}
                onClick={addButtonShoppingCart}
              >
                Añadir al carrito
                <ShoppingCartIcon className="shopping-icon" />
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
        </Card.Body>
      </Card>
    </main>
  );
}
