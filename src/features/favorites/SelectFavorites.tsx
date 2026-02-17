import { NavLink } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useProductsContext } from "../../context/ProductsContext";
import MainProductCard from "../products/components/MainProductCard";
import Breadcrumbs from "../../shared/components/Breadcrumbs";

const SelectFavorites: React.FC = () => {
  const { favorites } = useProductsContext();

  return (
    <main className="favorites-page">
      <Container>
        <Breadcrumbs />
        <div className="favorites-header">
          <div className="favorites-header__content">
            <FavoriteIcon className="favorites-header__icon" />
            <h1 className="favorites-header__title">Tus Favoritos</h1>
          </div>
          <p className="favorites-header__count">
            {favorites.length} {favorites.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/emoticon_gatito.png?alt=media&token=f77e6efc-d1ab-4a07-b6b7-73e3f98ed959"
              alt="Sin favoritos"
              className="favorites-empty__image"
            />
            <h2 className="favorites-empty__title">Aún no tienes favoritos</h2>
            <p className="favorites-empty__text">
              Explora nuestra tienda y guarda tus productos favoritos aquí
            </p>
            <NavLink to="/products">
              <Button className="category-buttons favorites-empty__button">
                Explorar productos
              </Button>
            </NavLink>
          </div>
        ) : (
          <>
            <div className="favorites-grid">
              {favorites.map((item) => (
                <MainProductCard key={item.id} item={item} selectFavorites />
              ))}
            </div>
            <div className="favorites-actions">
              <NavLink to="/products">
                <Button className="category-buttons" variant="outline-dark">
                  Seguir comprando
                </Button>
              </NavLink>
            </div>
          </>
        )}
      </Container>
    </main>
  );
};

export default SelectFavorites;
