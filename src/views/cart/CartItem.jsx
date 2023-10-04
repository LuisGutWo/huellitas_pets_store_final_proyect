import { Button } from "react-bootstrap";
import { useProductsContext } from "../../context/ProductsContext";
import { formatPrice } from "../../utils/formatPrice";

import DeleteIcon from "@mui/icons-material/Delete";

export default function CartItem({ item }) {
  const { addProduct, removeProduct, findItemCount, removeProductCart } =
    useProductsContext();

  return (
    <main className="cart-product-card">
      <article className="cart-product-title">
        <img src={item.img} alt="Product" />
        <h3>{item.name}</h3>
      </article>
      <section className="cart-product-body">
        <section className="cart-product-buttons">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => removeProduct(item)}
          >
            -
          </button>
          <button className="btn btn-outline-dark btn-sm disabled">
            {findItemCount(item.id)}
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => addProduct(item)}
          >
            +
          </button>
        </section>
        <small className="text-muted fs-5">${formatPrice(item.price)}</small>
        <Button
          size="small"
          onClick={() => removeProductCart(item)}
          variant="contained"
          style={{ border: "0" }}
        >
          <DeleteIcon color="warning" className="card-icons" />
        </Button>
      </section>
    </main>
  );
}
