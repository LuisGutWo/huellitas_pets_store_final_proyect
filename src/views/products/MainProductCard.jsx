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
import { motion } from "framer-motion";

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
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { delay: 0.7, duration: 0.7 },
      }}
      exit={{
        opacity: 0.7,
        transition: { duration: 0.5 },
      }}
    >
      <Card className="product-card">
        <Link to={`/products/${item.id}`} className="m-2">
          <Card.Img variant="top" className="card-image" src={item.img} />
        </Link>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { delay: 1, duration: 1 },
          }}
          exit={{
            opacity: 0.7,
            transition: { duration: 0.5 },
          }}
          style={{ height: "35%" }}
        >
          <Card.Body className="card-body">
            <Card.Title className="card-body-title">{item.name}</Card.Title>
            <Card.Text className="card-body-price">
              <b>${item.price}</b>
            </Card.Text>
          </Card.Body>
          <Card.Body className="card-buttons-section">
            <section className="card-button-add">
              <Button
                className="button-class"
                ref={target}
                onClick={handleShoppingCart}
              >
                Añadir al carro
                <ShoppingCartIcon className="shopping-icon" />
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
              </Modal>
            </section>
            <section className="card-favorite-icon">
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
                    <FavoriteIcon style={{ color: "#d6207b" }} />
                  </NavLink>
                  {user ? (
                    <Modal show={showFavorite} onHide={handleCloseFavorite}>
                      <Modal.Header closeButton>
                        <Modal.Body>
                          <b>{item.name}</b>! se agrego a favoritos 🥰
                        </Modal.Body>
                      </Modal.Header>
                    </Modal>
                  ) : (
                    <Modal show={showFavorite} onHide={handleCloseFavorite}>
                      <Modal.Header closeButton>
                        <Modal.Body>
                          Ingrese para acceder a favoritos
                        </Modal.Body>
                      </Modal.Header>
                    </Modal>
                  )}
                </>
              )}
            </section>
          </Card.Body>
        </motion.div>
      </Card>
    </motion.div>
  );
}
