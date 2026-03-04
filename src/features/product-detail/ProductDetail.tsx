import { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import Modal from "react-bootstrap/Modal";
import { useProductsContext } from "../../context/ProductsContext";
import type { Product } from "../../services/productsApi";

type ProductWithPrice = Product & { price: number };

import { formatPrice } from "../../shared/utils/formatPrice";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../shared/components/Breadcrumbs";
import CartSwingAnimation from "../../shared/components/CartSwingAnimation";
import { Skeleton } from "../../shared/components/SkeletonLoader";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ProductDetailProps {
  item?: Product;
  selectFavorites?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  item,
  selectFavorites,
}) => {
  const [product, setProduct] = useState<ProductWithPrice | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const target = useRef<HTMLButtonElement>(null);
  const cartAnimRef = useRef<{
    triggerAnimation: (name?: string) => void;
  } | null>(null);
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
    if (product) {
      addFavorites(product);
    }
    handleShowFavorite();
  }

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_URL)
      .then((response) => response.json())
      .then((data: ProductWithPrice[]) => {
        const product = data.find((item) => item.id === id);
        setProduct(product);
      })
      .finally(() => setLoading(false));
  }, [params]);

  function addButtonShoppingCart() {
    if (!product) return;
    addProduct(product);
    cartAnimRef.current?.triggerAnimation(product.name as string);
    handleShow();
  }

  // Generar breadcrumbs dinámicos con información del producto
  if (loading) {
    return (
      <main className="product-detail-page">
        <Container className="detail-container">
          <div className="product-detail-page__breadcrumb">
            <Breadcrumbs />
          </div>

          <section className="detail-layout" aria-busy="true" aria-label="Cargando producto">
            <Card className="detail-card">
              <div className="card-favorite-icon">
                <Skeleton variant="circle" width="40px" height="40px" />
              </div>
              <div className="card-image img-fluid">
                <Skeleton variant="rectangular" width="100%" height="100%" />
              </div>
              <Card.Body className="card-body-detail">
                <Skeleton variant="text" width="60%" height="26px" />
                <Skeleton variant="text" width="90%" height="18px" />
                <Skeleton variant="text" width="80%" height="18px" />
                <div className="card-price-button">
                  <Skeleton variant="text" width="40%" height="22px" />
                  <Skeleton variant="rectangular" width="120px" height="36px" />
                </div>
                <Skeleton variant="rectangular" width="100%" height="44px" />
              </Card.Body>
            </Card>
          </section>
        </Container>
      </main>
    );
  }

  // Generar breadcrumbs dinámicos con información del producto
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Inicio", path: "/" },
    { label: "Productos", path: "/products" },
    {
      label: (product?.category as string) || "Categoría",
      path: `/products?category=${(product?.category as string) || ""}`,
    },
    { label: (product?.name as string) || "Producto" },
  ];

  return (
    <main className="product-detail-page">
      <Container className="detail-container">
        <div className="product-detail-page__breadcrumb">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <section className="detail-layout">
          <Card className="detail-card">
            <div className="card-favorite-icon">
              {selectFavorites ? (
                <Button
                  size="sm"
                  onClick={() => {
                    if (item) {
                      removeFavorites(item.id);
                    }
                  }}
                  variant="outline-danger"
                  style={{ border: "0" }}
                >
                  <DeleteIcon color="warning" className="card-icons" />
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleProductButton}
                    size="sm"
                    variant="light"
                    style={{ border: "0" }}
                  >
                    <FavoriteIcon className="card-icons" />
                  </Button>
                  {user ? (
                    <Modal show={showFavorite} onHide={handleCloseFavorite}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <b>{product?.name as string}</b>! se agrego a favoritos 🥰
                        </Modal.Title>
                      </Modal.Header>
                    </Modal>
                  ) : (
                    <Modal show={showFavorite} onHide={handleCloseFavorite}>
                      <Modal.Header closeButton>
                        <Modal.Title>Ingrese para acceder a favoritos</Modal.Title>
                      </Modal.Header>
                    </Modal>
                  )}
                </>
              )}
            </div>
            <Card.Img
              src={(product?.img as string) || ""}
              className="card-image img-fluid"
              alt={(product?.name as string) || "Imagen del producto"}
            />
            <Card.Body className="card-body-detail">
              <Card.Title className="card-title">
                {product?.name as string}{" "}
              </Card.Title>
              <Card.Text className="card-text">{product?.desc as string}</Card.Text>
              <div className="card-price-button">
                <b>$ {product?.price ? formatPrice(product.price) : "0.00"}</b>
                <NavLink to={"/products"} className="text-end">
                  <Button className="btn mt-2" variant="outline-primary">
                    Volver
                  </Button>
                </NavLink>
              </div>
              <Button
                className="category-buttons"
                ref={target}
                onClick={addButtonShoppingCart}
              >
                Añadir al carrito
                <ShoppingCartIcon className="shopping-icon" />
              </Button>
              {user ? (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      ¡<b>{product?.name as string}</b> se agregó al carrito! 😎
                    </Modal.Title>
                  </Modal.Header>
                </Modal>
              ) : null}
            </Card.Body>
          </Card>
        </section>

        <CartSwingAnimation ref={cartAnimRef} />
      </Container>
    </main>
  );
};

export default ProductDetail;
