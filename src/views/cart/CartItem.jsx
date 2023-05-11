import { useProductsContext } from "../../context/ProductsContext";
import { formatPrice } from "../../utils/formatPrice";

export default function CartItem({ item }) {
  const { addProduct, removeProduct, findItemCount } = useProductsContext();

  return (
      <main className="cart-product-card">
        <article className="cart-product-title">
          <img src={item.img} alt="Product" />
          <h3>{item.name}</h3>
        </article>
        <section className="cart-product-body">
          <small className="text-muted">${formatPrice(item.price)}</small>
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
        </section>
      </main>
  );
}