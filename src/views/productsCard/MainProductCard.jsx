import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { formatPrice } from "../../utils/formatPrice";
import "animate.css";

import { Button } from "react-bootstrap";
import { useProductsContext } from "../../context/ProductsContext";
import { useUserContext } from "../../context/UserContext";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarRatings from "react-star-ratings";

export default function MainProductCard({ item, selectFavorites }) {
  const { addFavorites, removeFavorites, addProduct } = useProductsContext();

  const [showCart, setShowCart] = useState(false);
  const [rating, setRating] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const target = useRef(null);

  const { user } = useUserContext();

  const handleCloseCart = () => setShowCart(false);
  const handleCloseFavorite = () => setShowFavorite(false);
  const handleShowCart = () => setShowCart(true);
  const handleShowFavorite = () => setShowFavorite(true);
  const setNewRating = (rating) =>
    this.props.dispatch(fooActions.setRating(rating));

  function handleShoppingCart() {
    addProduct(item);
    handleShowCart(!showCart);
  }
  function handleProductButton() {
    addFavorites(item);
    handleShowFavorite(!showFavorite);
  }

  return (
    <Card className="product-card">
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
            <DeleteIcon color="warning" className="card-icons" />
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
              <FavoriteIcon
                style={{ color: "#484a77" }}
                className="card-icons"
              />
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
                  <Modal.Body>Ingrese para acceder a favoritos</Modal.Body>
                </Modal.Header>
              </Modal>
            )}
          </>
        )}
      </div>
      <NavLink to={`/products/${item.id}`} className="card-image-container">
        <Card.Img variant="top" src={item.img} className="card-image" />
      </NavLink>
      <Button
        className="card-buttons"
        ref={target}
        onClick={handleShoppingCart}
      >
        + Añadir al carrito
        <ShoppingCartIcon />
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

      <Card.Body className="card-body">
        <Card.Text className="card-body-price">
          <b>${formatPrice(item.price)}</b>
        </Card.Text>
        <Card.Title className="card-body-title">{item.name}</Card.Title>
        <StarRatings
          rating={3}
          starRatedColor="orange"
          changeRating={setNewRating}
          starDimension="0.9rem"
          numberOfStars={5}
          name="rating"
        />
      </Card.Body>
    </Card>
  );
}
