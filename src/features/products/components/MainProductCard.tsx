import { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../shared/utils/formatPrice";
import OptimizedImage from "../../../shared/components/OptimizedImage";
import CartSwingAnimation from "../../../shared/components/CartSwingAnimation";
import "animate.css";

import { useProductsContext } from "../../../context/ProductsContext";
import { useUserContext } from "../../../context/UserContext";
import { useToast } from "../../../context/ToastContext";
import type { Product } from "../../../services/productsApi";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarIcon from "@mui/icons-material/Star";

interface MainProductCardProps {
  item: Product;
  selectFavorites?: boolean;
}

const MainProductCard: React.FC<MainProductCardProps> = ({
  item,
  selectFavorites,
}) => {
  const { addFavorites, removeFavorites, addProduct, favorites } =
    useProductsContext();

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [hasAddedFeedback, setHasAddedFeedback] = useState<boolean>(false);
  const target = useRef<HTMLButtonElement>(null);
  const cartAnimRef = useRef<{
    triggerAnimation: (name?: string) => void;
  } | null>(null);

  const { user } = useUserContext();
  const toast = useToast();

  // Check if item is in favorites
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  // Calculate discount percentage - solo si tiene originalPrice o promotion="discount"
  const hasPromotion = (item as any).promotion === "discount";
  const originalPrice = (item as any).originalPrice;
  const price = (item as any).price as number;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round((1 - price / originalPrice) * 100)
      : hasPromotion && !originalPrice
        ? 15 // Descuento por defecto si tiene promotion pero no originalPrice
        : 0;

  async function handleShoppingCart() {
    if (!user) {
      toast.warning(
        "Por favor, inicia sesión para añadir productos al carrito"
      );
      return;
    }

    setIsAdding(true);
    addProduct({ ...item, price });
    toast.success(`${item.name} se agregó al carrito correctamente`);
    setHasAddedFeedback(true);
    cartAnimRef.current?.triggerAnimation(item.name as string);

    setTimeout(() => {
      setIsAdding(false);
      setHasAddedFeedback(false);
    }, 2000);
  }

  function handleProductButton() {
    if (!user) {
      toast.warning("Por favor, inicia sesión para gestionar favoritos");
      return;
    }

    if (isFavorite) {
      removeFavorites(item.id);
      toast.info(`${item.name} se quitó de favoritos`);
    } else {
      addFavorites({ ...item, price });
      toast.success(`${item.name} se agregó a favoritos`);
    }
  }

  // Default rating (se puede agregar al modelo de Product más adelante)
  const rating = (item as any).rating || 4;
  const reviewsCount = (item as any).reviewsCount || 0;

  return (
    <Card
      className={`product-card ${!imageLoaded ? "product-card--loading" : ""}`}
    >
      {/* Discount Badge */}
      {discount > 0 && <div className="product-card__badge">-{discount}%</div>}

      {/* Quick Actions */}
      {user && !selectFavorites && (
        <div className="product-card__actions">
          <button
            className={`product-card__action-btn product-card__action-btn--favorite ${
              isFavorite ? "active" : ""
            }`}
            onClick={handleProductButton}
            aria-label={
              isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
            }
          >
            {isFavorite ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </button>

          <Link to={`/products/${item.id}`}>
            <button
              className="product-card__action-btn"
              aria-label="Ver detalles"
            >
              <InfoOutlinedIcon fontSize="small" />
            </button>
          </Link>
        </div>
      )}

      {/* Delete button for favorites view */}
      {selectFavorites && (
        <div className="product-card__delete-btn">
          <button
            className="product-card__action-btn product-card__action-btn--delete"
            onClick={() => removeFavorites(item.id)}
            aria-label="Eliminar de favoritos"
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      )}

      {/* Product Image */}
      <Link
        to={`/products/${item.id}`}
        className="product-card__image-container"
      >
        <OptimizedImage
          src={item.img as string}
          alt={item.name as string}
          className="product-card__image"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          aspectRatio="4/3"
          objectFit="contain"
        />
      </Link>

      {/* Card Content */}
      <Card.Body className="product-card__content">
        <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
          <h3 className="product-card__title">{item.name as string}</h3>
        </Link>

        {/* Rating */}
        {reviewsCount > 0 && (
          <div className="product-card__rating">
            <div className="product-card__rating-stars">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  fontSize="small"
                  style={{
                    color: i < rating ? "#fbbf24" : "#e5e5e5",
                    fontSize: "1rem",
                  }}
                />
              ))}
            </div>
            <span className="product-card__rating-count">({reviewsCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="product-card__price-container">
          {discount > 0 && originalPrice ? (
            <>
              <span className="product-card__price-old">
                ${formatPrice(originalPrice)}
              </span>
              <span className="product-card__price product-card__price--discounted">
                ${formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="product-card__price">${formatPrice(price)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className={`product-card__add-button ${
            hasAddedFeedback ? "product-card__add-button--added" : ""
          } ${isAdding ? "loading" : ""}`}
          onClick={handleShoppingCart}
          disabled={isAdding}
          ref={target}
          aria-label="Añadir al carrito"
        >
          {isAdding ? (
            <>Añadiendo...</>
          ) : hasAddedFeedback ? (
            <>✓ Añadido</>
          ) : (
            <>
              <ShoppingCartIcon
                fontSize="small"
                style={{ marginRight: "8px" }}
              />
              Añadir al carrito
            </>
          )}
        </button>
      </Card.Body>
      <CartSwingAnimation ref={cartAnimRef} />
    </Card>
  );
};

export default MainProductCard;
