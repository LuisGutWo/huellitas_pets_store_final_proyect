import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useProductsContext } from "../context/ProductsContext";
import CartItem from "../components/CartItem";
import { formatPrice } from "../utils/formatPrice";

import imagenes from "../assets/imagenes";

export default function Cart({ item }) {
  const { cart, totalCart, totalItemProducts, onCleanCart } =
    useProductsContext();

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="text-start m-2 text-dark">
          <b>Detalle de tu pedido</b>
        </h2>
        <div className="alert alert-info p-2 m-0 text-dark">
          {" "}
          <b>Total:</b> $ {formatPrice(totalCart())}
        </div>
      </div>
      <hr className="text-dark mb-4 mt-1" />
      <ul className="list-group">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        {cart.length === 0 && (
          <li className="list-group-empty">
            <h4>Tu Carrito esta vacío</h4>
            <img
              src={imagenes[12].img}
              alt=""
              className="img-fluid"
              style={{ width: "8rem" }}
            />
          </li>
        )}

        {cart.length !== 0 && (
          <div className="cart-total">
            <p>total productos: {totalItemProducts(item)}</p>
            <Button variant="danger" size="sm" onClick={onCleanCart}>
              Vaciar carrito
            </Button>
          </div>
        )}

        <li className="cart-button-footer">
          <NavLink to={"/products"}>
            {cart.length === 0 ? (
              <Button variant="danger" size="sm">
                Seleccionar productos
              </Button>
            ) : (
              <Button variant="info" size="sm">
                Seguir comprando
              </Button>
            )}
          </NavLink>

          {cart.length !== 0 && (
            <Button variant="warning" size="sm">
              Ir a Pagar
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
}
