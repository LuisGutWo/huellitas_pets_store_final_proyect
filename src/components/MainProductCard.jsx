import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import { Button } from "react-bootstrap";
import { useProductsContext } from "../context/ProductsContext";
import { useUserContext } from "../context/UserContext";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MainProductCard({ item, selectFavorites }) {
  const { favorites, addFavorites, removeFavorites } = useProductsContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleProductButton() {
    addFavorites(item);
    handleShow(!show);
  }

  const { user } = useUserContext();

  return (
    <Card
      className="product-card m-1 col-12 col-md-6 col-xl-3"
      style={{ width: "14rem", borderRadius: "7px", backgroundColor: "Menu" }}
      border="light"
    >
      <NavLink to={`/products/${item.id}`} className="m-2">
        <Card.Img
          variant="top"
          className="card-image img-fluid"
          src={item.img}
        />
      </NavLink>

      <Card.Body className="card-body">
        <Card.Title className="text-dark text-start fs-6 mt-3">
          {item.name}
        </Card.Title>
        <Card.Text className="text-info d-flex justify-content-between align-items-center gap-5">
          {" "}
          <b>${item.price}</b>
          {selectFavorites ? (
            <Button
              size="small"
              onClick={() => {
                removeFavorites(item.id);
              }}
              variant="contained"
              style={{ border: "0" }}
            >
              <DeleteIcon color="warning" />
            </Button>
          ) : (
            <>
              <Button
                disabled={favorites.some((i) => i.id == item.id)}
                onClick={handleProductButton}
                size="small"
                variant="contained"
                className={({ isActive }) =>
                  isActive ? "active-class" : "inactive-class"
                }
              >
                <FavoriteIcon color="info" />
              </Button>
              {user ? (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Se agrego: <b>{item.name}</b> a favoritos
                    </Modal.Title>
                  </Modal.Header>

                  <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              ) : (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ingrese para acceder a favoritos</Modal.Title>
                  </Modal.Header>

                  <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
