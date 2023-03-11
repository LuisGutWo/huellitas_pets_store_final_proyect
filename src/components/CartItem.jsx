import { useProductsContext } from "../context/ProductsContext";
import { formatPrice } from "../utils/formatPrice";

export default function CartItem({ item }) {
  const { addProduct, removeProduct, findItemCount } = useProductsContext();

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <img className="me-3" src={item.img} alt="Product" width="100" />
          <h3 className="mt-3 p-2 fs-5">{item.name}</h3>
        </div>
        <div className="d-flex gap-1">
          <small className="text-muted p-2">${formatPrice(item.price)}</small>
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