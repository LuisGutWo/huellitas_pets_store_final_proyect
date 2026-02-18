import { Button } from "react-bootstrap";
import { useProductsContext } from "../../context/ProductsContext";
import { formatPrice } from "../../shared/utils/formatPrice";
import type { CartItem as CartItemType } from "../../context/ProductsContext";

import DeleteIcon from "@mui/icons-material/Delete";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { addProduct, removeProduct, findItemCount, removeProductCart } =
    useProductsContext();

  return (
    <main className="cart-product-card">
      <article className="cart-product-title">
        <img src={item.img as string} alt="Product" />
        <h3>{item.name as string}</h3>
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
          size="sm"
          onClick={() => removeProductCart(item)}
          variant="contained"
          className="cart-delete-button"
        >
          <DeleteIcon color="warning" className="card-icons" />
        </Button>
      </section>
    </main>
  );
};

export default CartItem;
