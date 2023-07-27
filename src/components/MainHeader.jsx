import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { motion } from "framer-motion";
import 'animate.css';

import { useUserContext } from "../context/UserContext";
import { useProductsContext } from "../context/ProductsContext";
import { logout } from "../config/firebase";
import { formatPrice } from "../utils/formatPrice";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Loading from "../utils/Loading";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

export default function MainHeader({ item }) {
  const [products, setProducts] = useState([]);
  const [selectProduct, setSelectProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [sticky, setSticky] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const { totalItemProducts, totalCart } = useProductsContext();

  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className={`${sticky ? "sticky" : ""}`}>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="main-navbar m-0"
          variant="dark"
        >
          {/* Contenedor principal del Navbar */}
          <Container fluid>
            {/* Header Navbar logo */}
            <Link to={"/"} className="header-logo animate__animated animate__rotateIn">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/huellitas_logo_blanco.png?alt=media&token=1a021733-a8f1-4b0f-9f5b-d5ef83d24e22"
                }
                className="img-fluid"
                alt=""
              />
            </Link>

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
              <Button className="search-button" onClick={addButtonModalSearch}>
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
                width: "60%",
                height: "100%",
                backgroundColor: "#2A2F4F",
              }}
            >
              <Offcanvas.Header closeButton>
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
                            width: "3rem",
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
                        <FavoriteIcon
                          style={{ width: "3rem", fontSize: "2rem" }}
                        />
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

      {/* second navbar */}
      {["md"].map((expand) => (
        <Navbar collapseOnSelect expand="md" className="second-navbar">
          <Container className="second-navbar-buttons">
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
              placement="top"
              style={{
                width: "100%",
                height: "50%",
                backgroundColor: "#917FB3",
              }}
            >
              <Offcanvas.Body>
                <Nav>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active-class-second" : "inactive-class-second"
                    }
                  >
                    <b>HOME</b>
                  </NavLink>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive ? "active-class-second" : "inactive-class-second"
                    }
                  >
                    <b>PRODUCTOS</b>
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? "active-class-second" : "inactive-class-second"
                    }
                  >
                    <b>ABOUT</b>
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? "active-class-second" : "inactive-class-second"
                    }
                  >
                    <b>CONTACTO</b>
                  </NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>

          <section>
            {user ? (
              <div className="welcome-user-section">
                <p className="m-0 text-light">Bienvenido 🖐🏼</p>
                <small className="text-header-name">{user.email}</small>
              </div>
            ) : (
              <NavLink
                to={"/loginPage"}
                className={(isActive) =>
                  isActive ? "active-class" : "inactive-class"
                }
              >
                <motion.div
                  onClick={() => setIsActive(!isActive)}
                  animate={{
                    rotate: isActive ? 180 : 360,
                  }}
                  className="offline-user-warning"
                >
                  Offline
                </motion.div>
              </NavLink>
            )}
            <a
              rel=""
              href="https://api.whatsapp.com/send?phone=56920390272&text=Hola, bienvenido a Huellitas. En que podemos ayudarte...😀"
              className="btn-wsp"
              target="_blank"
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/wa_chat_icon.png?alt=media&token=ce6cb743-6822-4223-9279-0bdd5efe6677"
                alt=""
                className="wsp-image"
              />
            </a>
          </section>
        </Navbar>
      ))}
    </header>
  );
}
