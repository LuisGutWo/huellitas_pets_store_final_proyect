import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "animate.css";

import { useUserContext } from "../../context/UserContext";
import { useProductsContext } from "../../context/ProductsContext";
import { logout } from "../../config/firebase";
import { formatPrice } from "../../utils/formatPrice";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Loading from "../../utils/Loading";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

import LogoWhite from "../../assets/img/huellitas-logo-white-500x500.png";

export default function MainHeader({ item, index }) {
  const [products, setProducts] = useState([]);
  const [selectProduct, setSelectProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const { totalItemProducts, totalCart } = useProductsContext();

  const navigate = useNavigate();
  const { user } = useUserContext();

  const getProducts = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(import.meta.env.VITE_URL);
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleProductsChange = (e) => {
    setSelectProduct(e.target.value);
    if (e.target.value) setError(false);
  };
  const handleProductsClick = () => {
    if (selectProduct) {
      navigate(`/products/${selectProduct}`);
    } else {
      setError(true);
    }
  };

  const handleUserLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  function addButtonModalSearch() {
    handleProductsClick(products);
    handleShow(!show);
  }
  function addButtonModalCart() {
    handleProductsClick(products);
    handleShowCart(!showCart);
  }
  function addButtonModalLogin() {
    handleProductsClick(products);
    handleShowLogin(!showLogin);
  }

  if (loading) return <Loading />;

  return (
    <>
      {["md"].map((expand) => (
        <Navbar expand={expand} className="main-navbar m-0" variant="dark">
          {/* Contenedor principal del Navbar */}
          <Container fluid>
            {/* Header Navbar logo */}
            <Link
              to={"/"}
              className="header-logo animate__animated animate__fadeIn"
            >
              <img src={LogoWhite} className="img-fluid" alt="" />
            </Link>

            {/* Toggler y Link del Navbar */}
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              style={{
                padding: "4px",
                border: "0px",
                fontSize: "0.7rem",
              }}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              style={{
                width: "40%",
                paddingRight: "5%",
                height: "100%",
                backgroundColor: "#2A2F4F",
              }}
            >
              {/* Buscador o Search del Navbar */}
              <Form className="navbar-form">
                <Form.Select
                  size="sm"
                  className="navbar-select"
                  onChange={handleProductsChange}
                >
                  <option value={""}>Buscar productos...</option>
                  {products.map((product) => (
                    <option key={product.name} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  className="search-button"
                  onClick={addButtonModalSearch}
                >
                  <SearchIcon style={{ width: "17px" }} />
                </Button>
                {!error ? (
                  ""
                ) : (
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Body>Elige algún producto 😉</Modal.Body>
                    </Modal.Header>
                  </Modal>
                )}
              </Form>
              <Offcanvas.Header closeButton style={{ alignContent: "center" }}>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  style={{ color: "white" }}
                >
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  style={{
                    backgroundColor: "transparent",
                    width: "50%",
                    textAlign: "center",
                  }}
                >
                  {!user && (
                    <>
                      <NavLink
                        to="/loginPage"
                        className={({ isActive }) =>
                          isActive ? "active-class" : "inactive-class"
                        }
                        onClick={addButtonModalLogin}
                      >
                        <PermIdentityIcon
                          style={{
                            fontSize: "2rem",
                          }}
                        />
                      </NavLink>
                      <Modal show={showLogin} onHide={handleCloseLogin}>
                        <Modal.Header closeButton>
                          <Modal.Body>
                            Ingrese sus datos o Cree una cuenta nueva... 👀
                          </Modal.Body>
                        </Modal.Header>
                      </Modal>
                    </>
                  )}
                  {user ? (
                    <>
                      <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                          isActive ? "active-class" : "inactive-class"
                        }
                      >
                        <FavoriteIcon style={{ fontSize: "2rem" }} />
                      </NavLink>
                    </>
                  ) : null}
                  <section className="container-icon">
                    {!user ? (
                      <>
                        <NavLink
                          to="/cart"
                          className={({ isActive }) =>
                            isActive ? "active-class" : "inactive-class"
                          }
                          onClick={addButtonModalCart}
                        >
                          <ShoppingCartIcon
                            className="icon-cart"
                            style={{
                              width: "3rem",
                              fontSize: "1.8rem",
                            }}
                          />
                          {user && (
                            <div className="count-products">
                              <span id="contador-productos">
                                {totalItemProducts(item)}
                              </span>
                            </div>
                          )}
                        </NavLink>
                        {!user && (
                          <Modal show={showCart} onHide={handleCloseCart}>
                            <Modal.Header closeButton>
                              <Modal.Body>
                                Ingrese para acceder al carrito... 👀
                              </Modal.Body>
                            </Modal.Header>
                          </Modal>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                          isActive ? "active-class" : "inactive-class"
                        }
                        onClick={addButtonModalCart}
                      >
                        <ShoppingCartIcon
                          className="icon-cart"
                          style={{ width: "3rem", fontSize: "1.8rem" }}
                        />
                        {user && (
                          <div className="count-products">
                            <span id="contador-productos">
                              {totalItemProducts(item)}
                            </span>
                          </div>
                        )}
                      </NavLink>
                    )}
                  </section>
                  {user && (
                    <>
                      <div className="navbar-total-price">
                        ${formatPrice(totalCart())}
                      </div>
                      <Button
                        onClick={handleUserLogout}
                        variant="outline-danger"
                        className="logout-button"
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
