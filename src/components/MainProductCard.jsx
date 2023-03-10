import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

import { Button } from "react-bootstrap";
import { useProductsContext } from "../context/ProductsContext";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function MainProductCard({ item, selectFavorites }) {
  const { favorites, addFavorites, removeFavorites } = useProductsContext();
  // const { addProduct } = useProductsContext();

  return (
    <Card
      className="product-card m-1 col-12 col-md-6 col-xl-3"
      style={{ width: "14rem", height: "22rem" }}
      border="light"
    >
      <NavLink to={`/products/${item.id}`} className="m-2">
        <Card.Img
          variant="top"
          className="card-image img-fluid"
          src={item.img}
        />
      </NavLink>

      <Card.Body className="card-body">
        <Card.Title className="text-dark text-start fs-6 mt-3">{item.name}</Card.Title>
        <Card.Text className="text-info d-flex justify-content-between align-items-center gap-5">
          {" "}
          <b>${item.price}</b>{" "}
        {selectFavorites ? (
          <Button
            size="small"
            onClick={() => {
              removeFavorites(item.id);
            }}
            variant="contained"
            color="error"
            style={{ border: "0" }}
          >
            <DeleteIcon />
          </Button>
        ) : (
          <Button
            disabled={favorites.some((i) => i.id == item.id)}
            onClick={() => {
              addFavorites(item);
            }}
            size="small"
            variant="contained"
            style={{ border: "0" }}
          >
            <FavoriteIcon color="info" />
          </Button>
        )}
        </Card.Text>
        {/* {user && (
        <NavLink
          to="/cart"
          className={({isActive}) => isActive ? "active-class" : "inactive-class"}
          onClick={() => addProduct(item)}
        >
          <ShoppingCartIcon />
        </NavLink>)} */}
      </Card.Body>
    </Card>
  );
}
