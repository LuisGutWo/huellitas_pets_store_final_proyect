import { useProductsContext } from "../context/ProductsContext";
import MainProductCard from "../components/MainProductCard";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function SelectFavorites() {
  const { favorites } = useProductsContext();

  return (
    <div className="cart-container container overflow-hidden">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2 className="text-start m-2 text-dark">Tus Favoritos</h2>
      </div>
      <hr className="text-dark mb-4 mt-1" />
      <div className="list-group">
        <div className="d-flex flex-wrap container-card gap-3 mb-4">
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
        <NavLink to={"/products"}>
          <Button className="btn btn-secondary">Seguir viendo</Button>
        </NavLink>
      </div>
    </div>
  );
}
