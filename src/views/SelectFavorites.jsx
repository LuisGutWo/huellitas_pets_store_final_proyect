import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useProductsContext } from "../context/ProductsContext";
import MainProductCard from "../components/MainProductCard";
import imagenes from "../assets/imagenes";

export default function SelectFavorites() {
  const { favorites } = useProductsContext();

  return (
    <div className="cart-container overflow-hidden">
      <h2 className="m-2 text-dark">
        <b>Tus Favoritos</b>
      </h2>
      <div className="list-group">
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
          {favorites.map((item) => (
            <MainProductCard key={item.id} item={item} selectFavorites />
          ))}
        </div>

        {favorites.length === 0 && (
          <div className="text-center">
            <h1>Aun no tienes favoritos</h1>
            <img src={imagenes[12].img} alt="" style={{ width: "8rem" }} />
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
