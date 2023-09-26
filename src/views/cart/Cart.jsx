import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useProductsContext } from "../../context/ProductsContext";
import CartItem from "../cart/CartItem";
import { formatPrice } from "../../utils/formatPrice";

export default function Cart({ item }) {
  const { cart, totalCart, totalItemProducts, onCleanCart } =
    useProductsContext();

  return (
    <main className="cart-container">
      <article className="cart-header">
        <h2>
          <b>Detalle de tu pedido</b>
        </h2>
        <>
          {" "}
          <b>Total:</b> $ {formatPrice(totalCart())}
        </>
      </article>
      <section className="list-group">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        {cart.length === 0 && (
          <li className="list-group-empty">
            <h4>Tu Carrito esta vacío</h4>
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/emoticon_gatito.png?alt=media&token=f77e6efc-d1ab-4a07-b6b7-73e3f98ed959"
              }
              alt=""
              className="img-fluid"
              style={{ width: "8rem" }}
            />
          </li>
        )}

        {cart.length !== 0 && (
          <section className="cart-total">
            <p>total productos: {totalItemProducts(item)}</p>
            <Button variant="outline-danger" size="sm" onClick={onCleanCart}>
              Vaciar carrito
            </Button>
          </section>
        )}

        <li className="cart-button-footer">
          <NavLink to={"/products"}>
            {cart.length === 0 ? (
              <Button>Volver a la Tienda</Button>
            ) : (
              <Button variant="outline-warning">Seguir comprando</Button>
            )}
          </NavLink>

          {cart.length !== 0 && (
            <Button variant="dark" size="sm">
              Pagar
            </Button>
          )}
        </li>
      </section>
    </main>
  );
}
