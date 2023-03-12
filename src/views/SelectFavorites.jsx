import { useProductsContext } from "../context/ProductsContext";
import MainProductCard from "../components/MainProductCard";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function SelectFavorites() {
  const { favorites } = useProductsContext();

  return (
    <div className="cart-container container overflow-hidden">
      <h2 className="m-2 text-dark">Tus Favoritos</h2>
      <hr className="text-dark mb-4 mt-1" />
      <div className="list-group">
        <div className="d-flex flex-wrap gap-3 mb-4">
          {favorites.map((item) => (
            <MainProductCard key={item.id} item={item} selectFavorites />
          ))}
        </div>

        {favorites.length === 0 && (
          <li className="list-group-item text-center">
            <h1>Aun no tienes favoritos</h1>
            <h2 className="fs-2">
              <SentimentVeryDissatisfiedIcon />
            </h2>
          </li>
        )}
      </div>
      <NavLink to={"/products"}>
        <Button className="btn" variant="outline-info">Seguir viendo</Button>
      </NavLink>
    </div>
  );
}
