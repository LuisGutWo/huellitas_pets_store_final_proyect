import { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { formatPrice } from "../../../shared/utils/formatPrice";
import "animate.css";

import { Button } from "react-bootstrap";
import { useProductsContext } from "../../../context/ProductsContext";
import { useUserContext } from "../../../context/UserContext";
import type { Product } from "../../../services/productsApi";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface MainProductCardProps {
  item: Product;
  selectFavorites?: boolean;
}

const MainProductCard: React.FC<MainProductCardProps> = ({
  item,
  selectFavorites,
}) => {
  const { addFavorites, removeFavorites, addProduct } = useProductsContext();

  const [showCart, setShowCart] = useState<boolean>(false);
  const [rating, setRating] = useState<boolean>(false);
  const [showFavorite, setShowFavorite] = useState<boolean>(false);
  const target = useRef<HTMLButtonElement>(null);

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
            >
              <FavoriteIcon
                color="warning"
                onClick={handleShowFavorite}
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

      <Card.Body className="card-body">
        <Card.Title className="card-body-title">{item.name}</Card.Title>
        <Card.Text className="card-body-price">
          <b>${formatPrice(item.price)}</b>
        </Card.Text>
        <Button
          className="category-buttons mb-4"
          ref={target}
          onClick={handleShoppingCart}
        >
          <div className="category-buttons-text">+ Añadir al carrito</div>
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
      </Card.Body>
    </Card>
  );
};

export default MainProductCard;
