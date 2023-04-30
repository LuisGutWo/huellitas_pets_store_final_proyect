import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import { Button } from "react-bootstrap";
import { useProductsContext } from "../../context/ProductsContext";
import { useUserContext } from "../../context/UserContext";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function MainProductCard({ item, selectFavorites }) {
  const { addFavorites, removeFavorites, addProduct } = useProductsContext();

  const [showCart, setShowCart] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const target = useRef(null);

  const handleCloseCart = () => setShowCart(false);
  const handleCloseFavorite = () => setShowFavorite(false);
  const handleShowCart = () => setShowCart(true);
  const handleShowFavorite = () => setShowFavorite(true);

  function handleShoppingCart() {
    addProduct(item);
    handleShowCart(!showCart);
  }
  function handleProductButton() {
    addFavorites(item);
    handleShowFavorite(!showFavorite);
  }

  const { user } = useUserContext();

  return (
    <Card
      className="product-card m-1 col-12 col-md-6 col-xl-3"
      style={{ height: "22rem", borderRadius: "7px", padding: "1rem" }}
      border="light"
    >
      <Link to={`/products/${item.id}`} className="m-2">
        <Card.Img
          variant="top"
          className="card-image img-fluid p-3"
          src={item.img}
        />
      </Link>

      <Card.Body className="card-body">
        <Card.Title className="card-body-title">{item.name}</Card.Title>
        <Card.Text className="card-body-price">
          <b>${item.price}</b>
        </Card.Text>
      </Card.Body>

      <div className="card-footer">
        <div className="card-cart-icon">
          <Button
            className="button-class"
            ref={target}
            onClick={handleShoppingCart}
            style={{
              width: "100%",
              height: "1.8rem",
              fontSize: "0.6rem",
              marginRight: "2.5rem",
            }}
          >
            Añadir al carro
            <ShoppingCartIcon style={{ fontSize: "1rem" }} />
          </Button>
          <Modal show={showCart} onHide={handleCloseCart}>
            <Modal.Header closeButton>
              <Modal.Body>
                {user ? (
                  <div>
                    <b>{item.name}</b>! se agrego al carrito 😎...
                  </div>
                ) : (
                  "Ingrese para acceder al carrito"
                )}
              </Modal.Body>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCart}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="card-favorite-icon">
          {selectFavorites ? (
            <Button
              size="small"
              onClick={() => {
                removeFavorites(item.id);
              }}
              variant="contained"
              style={{ border: "0" }}
            >
              <DeleteIcon color="warning" />
            </Button>
          ) : (
            <>
              <NavLink
                onClick={handleProductButton}
                size="small"
                variant="contained"
                className={({ isActive }) =>
                  isActive ? "inactive-class-second" : "active-class-second"
                }
              >
                <FavoriteIcon />
              </NavLink>

              {user ? (
                <Modal show={showFavorite} onHide={handleCloseFavorite}>
                  <Modal.Header closeButton>
                    <Modal.Body>
                      <b>{item.name}</b>! se agrego a favoritos 🥰
                    </Modal.Body>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button variant="info" onClick={handleCloseFavorite}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              ) : (
                <Modal show={showFavorite} onHide={handleCloseFavorite}>
                  <Modal.Header closeButton>
                    <Modal.Body>Ingrese para acceder a favoritos</Modal.Body>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button variant="info" onClick={handleCloseFavorite}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
