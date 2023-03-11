import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { useProductsContext } from "../context/ProductsContext";
import { Button } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function MainProductCard({ item, selectFavorites }) {
  const { favorites, addFavorites, removeFavorites } = useProductsContext();
  // const { addProduct } = useProductsContext();

  return (
    <Card
      className=" product-card text-center m-1 col-12 col-md-6 col-xl-3 p-0 overflow-hidden"
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

      <Card.Body className="m-0 p-0">
        <Card.Title className="text-dark fs-6 mt-0 m-3">{item.name}</Card.Title>
        <Card.Text className="text-primary">
          {" "}
          <b>${item.price}</b>{" "}
        </Card.Text>
        {selectFavorites ? (
          <Button
            size="small"
            onClick={() => {
              removeFavorites(item.id);
            }}
            variant="contained"
            color="error"
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
            color="primary"
            sx={{ padding: 0.5 }}
          >
            <SendIcon />
          </Button>
        )}
        {/* {user ? (
        <NavLink
          to="/cart"
          className={({isActive}) => isActive ? "active-class" : "inactive-class"}
          onClick={() => addProduct(item)}
        >
          <ShoppingCartIcon />
        </NavLink>) :  null } */}

      </Card.Body>
    </Card>
  );
}
