import { useProductsContext } from "../context/ProductsContext";
import { formatPrice } from "../utils/formatPrice";

export default function CartItem({ item }) {
  const { addProduct, removeProduct, findItemCount } = useProductsContext();

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-center flex-wrap align-items-center gap-5">
        <div className="d-flex flex-wrap">
          <img className="me-3" src={item.img} alt="Product" width="100" />
          <h3 className="cart-title-product">{item.name}</h3>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-1">
          <small className="text-muted p-2 ms-5">${formatPrice(item.price)}</small>
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
        </div>
      </div>
    </li>
  );
}