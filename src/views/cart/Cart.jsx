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
    <section className="h-100 cart-container">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h1>Detalle de tu pedido</h1>
                <h3>
                  Total de Productos:{" "}
                  <b className="fs-5">{totalItemProducts(item)}</b>
                </h3>
              </div>
              <div className="card-body p-0">
                {/* /// Single item /// */}
                <section className="list-group">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </section>
                <section
                  className={
                    cart.length === 0 ? "cart-total-flex" : "cart-total"
                  }
                >
                  <NavLink to={"/products"}>
                    {cart.length === 0 ? (
                      <Button>Volver a la Tienda</Button>
                    ) : (
                      <Button className="category-buttons">
                        Seguir comprando
                      </Button>
                    )}
                  </NavLink>
                  {cart.length === 0 ? (
                    <li className="list-group-empty">
                      <img
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/emoticon_gatito.png?alt=media&token=f77e6efc-d1ab-4a07-b6b7-73e3f98ed959"
                        }
                        alt=""
                        className="img-fluid"
                        style={{ width: "20%" }}
                      />
                      <h4>Tu Carrito esta vacío</h4>
                    </li>
                  ) : (
                    <Button
                      variant="outline-danger"
                      size="md"
                      onClick={onCleanCart}
                    >
                      Vaciar carrito
                    </Button>
                  )}
                </section>
                {/* /// Single item /// */}
              </div>
            </div>
            <div className="card mb-4 card-detail-style">
              <div className="card-body">
                <p>
                  <strong>Tiempo estimado de entrega</strong>
                </p>
                <p className="mb-0">12.10.2023 - 14.10.2023</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0 card-detail-style">
              <div className="card-body">
                <p>
                  <strong>Aceptamos</strong>
                </p>
                <img
                  className="me-2"
                  width="170rem"
                  src="src/assets/img/tarjetas_logo.png"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Resumen</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Productos
                    <span>${formatPrice(totalCart())}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Monto Total</strong>
                      <strong>
                        <p className="mb-0">(IVA incluido)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>${formatPrice(totalCart())}</strong>
                    </span>
                  </li>
                </ul>
                <NavLink to={"/products"}>
                  <button type="button" className="category-buttons">
                    Ir a Pagar
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
