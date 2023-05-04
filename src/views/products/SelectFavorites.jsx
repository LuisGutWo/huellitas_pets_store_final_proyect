import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useProductsContext } from "../../context/ProductsContext";
import MainProductCard from "./MainProductCard";

export default function SelectFavorites() {
  const { favorites } = useProductsContext();

  return (
    <div className="favorites-main-container">
      <h2>
        <b>Tus Favoritos</b>
      </h2>
      <div className="favorites-list">
        {favorites.map((item) => (
          <MainProductCard key={item.id} item={item} selectFavorites />
        ))}

        {favorites.length === 0 && (
          <div className="d-flex flex-column align-items-center">
            <h1>Aun no tienes favoritos</h1>
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/emoticon_gatito.png?alt=media&token=f77e6efc-d1ab-4a07-b6b7-73e3f98ed959"
              }
              alt=""
              style={{ width: "35%" }}
            />
          </div>
        )}
      </div>
      <NavLink to={"/products"}>
        {favorites.length === 0 ? (
          <Button className="btn m-4" variant="outline-primary">
            Seleccionar favoritos
          </Button>
        ) : (
          <Button className="btn m-4" variant="outline-dark">
            Seguir viendo
          </Button>
        )}
      </NavLink>
    </div>
  );
}
