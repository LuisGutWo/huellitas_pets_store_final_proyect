import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useProductsContext } from "../context/ProductsContext";
import MainProductCard from "../components/MainProductCard";

export default function SelectFavorites() {
  const { favorites } = useProductsContext();

  return (
    <div className="cart-container overflow-hidden">
      <h2 className="m-2 text-dark">
        <b>Tus Favoritos</b>
      </h2>
      <hr className="text-dark mb-4 mt-1" />
      <div className="list-group">
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
          {favorites.map((item) => (
            <MainProductCard key={item.id} item={item} selectFavorites />
          ))}
        </div>

        {favorites.length === 0 && (
          <li className="text-center">
            <h1>Aun no tienes favoritos</h1>
            <img
              src="src/assets/img/emoticon_gatito.png"
              alt=""
              style={{ width: "8rem" }}
            />
          </li>
        )}
      </div>
      <NavLink to={"/products"}>
        {favorites.length === 0 ? (
          <Button className="btn m-4" variant="info">
            Seleccionar favoritos
          </Button>
        ) : (
          <Button className="btn m-4" variant="info">
            Seguir viendo
          </Button>
        )}
      </NavLink>
    </div>
  );
}
