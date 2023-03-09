import React from "react";
import { useProductsContext } from "../context/ProductsContext";
import CartItem from "../components/CartItem";
import { Button } from "react-bootstrap";
import { formatPrice } from "../utils/formatPrice";
import { NavLink } from "react-router-dom";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

export default function Cart() {
  const { cart, totalCart } = useProductsContext();

  return (
    <div className="cart-container container overflow-hidden">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2 className="text-start m-2 text-dark">Detalle de tu pedido</h2>
        <div className="alert alert-dark p-2 text-dark">
          {" "}
          <b>Total</b> $ {formatPrice(totalCart())}
        </div>
      </div>
      <hr className="text-dark mb-4 mt-1" />
      <ul className="list-group">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        {cart.length === 0 && (
          <li className="list-group-item text-center">
            <h1>Tu Carrito esta vacío</h1>
            <h2 className="fs-2">
              <ProductionQuantityLimitsIcon />
            </h2>
          </li>
        )}

        <li className="list-group-item text-end ps-4 bg-dark mb-5">
          <b className="fs-5">
            Total : $ {totalCart().toLocaleString("de-DE")}
          </b>
          <NavLink to={"/products"}>
            <Button className="btn btn-secondary">Seguir comprando</Button>
          </NavLink>
          <Button className="btn btn-light ms-3">Ir a Pagar</Button>
        </li>
      </ul>
    </div>
  );
}
