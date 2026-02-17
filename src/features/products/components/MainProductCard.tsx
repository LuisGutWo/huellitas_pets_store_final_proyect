import { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../shared/utils/formatPrice";
import "animate.css";

import { Button } from "react-bootstrap";
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
  const { addFavorites, removeFavorites, addProduct, favorites } = useProductsContext();

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [hasAddedFeedback, setHasAddedFeedback] = useState<boolean>(false);
  const target = useRef<HTMLButtonElement>(null);

  const { user } = useUserContext();
  const toast = useToast();

  // Check if item is in favorites
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  // Calculate discount percentage
  const originalPrice = (item as any).originalPrice || item.price * 1.2;
  const discount = originalPrice > item.price 
    ? Math.round((1 - item.price / originalPrice) * 100) 
    : 0;

  async function handleShoppingCart() {
    if (!user) {
      toast.warning('Por favor, inicia sesión para añadir productos al carrito');
      return;
    }
    
    setIsAdding(true);
    addProduct(item);
    toast.success(`${item.name} se agregó al carrito correctamente`);
    setHasAddedFeedback(true);
    
    setTimeout(() => {
      setIsAdding(false);
      setHasAddedFeedback(false);
    }, 2000);
  }

  function handleProductButton() {
    if (!user) {
      toast.warning('Por favor, inicia sesión para gestionar favoritos');
      return;
    }
    
    if (isFavorite) {
      removeFavorites(item.id);
      toast.info(`${item.name} se quitó de favoritos`);
    } else {
      addFavorites(item);
      toast.success(`${item.name} se agregó a favoritos`);
    }
  }

  // Default rating (se puede agregar al modelo de Product más adelante)
  const rating = (item as any).rating || 4;
  const reviewsCount = (item as any).reviewsCount || 0;

  return (
    <Card className={`product-card ${!imageLoaded ? 'product-card--loading' : ''}`}>
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="product-card__badge">-{discount}%</div>
      )}

      {/* Quick Actions */}
      {user && !selectFavorites && (
        <div className="product-card__actions">
          <button
            className={`product-card__action-btn product-card__action-btn--favorite ${
              isFavorite ? 'active' : ''
            }`}
            onClick={handleProductButton}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
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
          <Button
            size="small"
            onClick={() => removeFavorites(item.id)}
            variant="contained"
            color="error"
            aria-label="Eliminar de favoritos"
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
      )}

      {/* Product Image */}
      <Link to={`/products/${item.id}`} className="product-card__image-container">
        <img
          src={item.img}
          alt={item.name}
          className="product-card__image"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </Link>

      {/* Card Content */}
      <Card.Body className="product-card__content">
        <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-card__title">{item.name}</h3>
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
                    color: i < rating ? '#fbbf24' : '#e5e5e5',
                    fontSize: '1rem'
                  }}
                />
              ))}
            </div>
            <span className="product-card__rating-count">({reviewsCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="product-card__price-container">
          <span className="product-card__price">${formatPrice(item.price)}</span>
          {discount > 0 && (
            <span className="product-card__price-old">${formatPrice(originalPrice)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className={`product-card__add-button ${
            hasAddedFeedback ? 'product-card__add-button--added' : ''
          }`}
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
              <ShoppingCartIcon fontSize="small" style={{ marginRight: '8px' }} />
              Añadir al carrito
            </>
          )}
        </button>
      </Card.Body>
    </Card>
  );
};

export default MainProductCard;
