import { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import Modal from "react-bootstrap/Modal";
import { useProductsContext } from "../../context/ProductsContext";
import type { Product } from "../../services/productsApi";

import { formatPrice } from "../../shared/utils/formatPrice";
import Loading from "../../shared/components/Loading";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ProductDetailProps {
  item?: Product;
  selectFavorites?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ item, selectFavorites }) => {
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const target = useRef<HTMLButtonElement>(null);
  const [showFavorite, setShowFavorite] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const params = useParams();
  const { id } = useParams();

  const handleCloseFavorite = () => setShowFavorite(false);
  const handleShowFavorite = () => setShowFavorite(true);

  const { addProduct, addFavorites, removeFavorites } = useProductsContext();
  const { user } = useUserContext();

  function handleProductButton() {
    addFavorites(item);
    handleShowFavorite(!showFavorite);
  }

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_URL)
      .then((response) => response.json({ id }))
      .then((data: Product[]) => {
        const product = data.find((item) => item.id === id);
        setProduct(product);
      })
      .finally(() => setLoading(false));
  }, [params]);

  function addButtonShoppingCart() {
    addProduct(product);
    handleShow(!show);
  }
  const setNewRating = (rating) =>
    // eslint-disable-next-line no-undef
    this.props.dispatch(fooActions.setRating(rating));

  // eslint-disable-next-line react/react-in-jsx-scope
  if (loading) return <Loading />;

  return (
    <Container className="detail-container">
      <Card className="detail-card">
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
                  isActive ? "inactive-class" : "active-class"
                }
              >
                <FavoriteIcon className="card-icons" />
              </NavLink>
              {user ? (
                <Modal show={showFavorite} onHide={handleCloseFavorite}>
                  <Modal.Header closeButton>
                    <Modal.Body>
                      <b>{product.name}</b>! se agrego a favoritos 🥰
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
        <Card.Img
          src={product.img}
          className="card-image img-fluid"
          alt="..."
        />
        <Card.Body className="card-body-detail">
          <Card.Title className="card-title">{product.name} </Card.Title>
          <Card.Text className="card-text">{product.desc}</Card.Text>
          <div className="card-price-button">
            <b>$ {formatPrice(product.price)}</b>
            <NavLink to={"/products"} className="text-end">
              <Button className="btn mt-2" variant="outline-primary">
                Volver
              </Button>
            </NavLink>
          </div>
          {user ? (
            <>
              <Button
                className="category-buttons"
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
              </Modal>
            </>
          ) : null}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;
