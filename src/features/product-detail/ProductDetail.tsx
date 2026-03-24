import { useEffect, useState, useRef } from "react";
import { useParams, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { useProductsContext } from "../../context/ProductsContext";
import type { Product } from "../../services/productsApi";

type ProductWithPrice = Product & { price: number };

import { formatPrice } from "../../shared/utils/formatPrice";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../shared/components/Breadcrumbs";
import CartSwingAnimation from "../../shared/components/CartSwingAnimation";
import { Skeleton } from "../../shared/components/SkeletonLoader";
import { useToast } from "../../context/ToastContext";
import { userFeedback } from "../../shared/utils/userFeedback";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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
  const cartAnimRef = useRef<{
    triggerAnimation: (name?: string) => void;
  } | null>(null);
  const params = useParams();
  const { id } = useParams();

  const { addProduct, addFavorites, removeFavorites, favorites } = useProductsContext();
  const { user } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const isFavorite = product
    ? favorites.some((favorite) => favorite.id === product.id)
    : false;

  function handleProductButton() {
    if (!product) return;

    if (!user) {
      toast.warning(userFeedback.authRequiredForFavorites);
      navigate(`/loginPage?return=${encodeURIComponent(location.pathname)}`);
      return;
    }

    if (isFavorite) {
      removeFavorites(product.id);
      toast.info(userFeedback.favoriteRemoved(product.name as string));
      return;
    }

    if (product) {
      addFavorites(product);
      toast.success(userFeedback.favoriteAdded(product.name as string));
    }
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

    if (!user) {
      toast.warning(userFeedback.authRequiredForCart);
      navigate(`/loginPage?return=${encodeURIComponent(location.pathname)}`);
      return;
    }

    addProduct(product);
    toast.success(userFeedback.cartAdded(product.name as string));
    cartAnimRef.current?.triggerAnimation(product.name as string);
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
                  type="button"
                  size="sm"
                  onClick={() => {
                    if (item) {
                      removeFavorites(item.id);
                      toast.info(userFeedback.favoriteRemoved(item.name as string));
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
                    type="button"
                    onClick={handleProductButton}
                    size="sm"
                    variant="light"
                    style={{ border: "0" }}
                  >
                    {isFavorite ? (
                      <FavoriteIcon className="card-icons" />
                    ) : (
                      <FavoriteBorderIcon className="card-icons" />
                    )}
                  </Button>
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
                type="button"
                onClick={addButtonShoppingCart}
              >
                Añadir al carrito
                <ShoppingCartIcon className="shopping-icon" />
              </Button>
            </Card.Body>
          </Card>
        </section>

        <CartSwingAnimation ref={cartAnimRef} />
      </Container>
    </main>
  );
};

export default ProductDetail;
