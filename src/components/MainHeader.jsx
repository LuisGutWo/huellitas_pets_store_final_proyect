import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useProductsContext } from "../context/ProductsContext";
import { logout } from "../config/firebase";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Loading from "./Loading";
import imagenes from "../assets/imagenes";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

export default function MainHeader({ item }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectProduct, setSelectProduct] = useState("");
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { totalItemProducts } = useProductsContext();

  const navigate = useNavigate();
  const { user } = useUserContext();

  const getProducts = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get("/products.json");
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

  if (loading) return <Loading />;

  return (
    <header>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="main-navbar m-0"
          fixed="top"
          variant="dark"
        >
          <Container className="header-container">
            <Link to={"/"} href="#">
              <img
                src={imagenes[5].img}
                width="180"
                height="40"
                className="img-fluid"
                alt=""
              />
            </Link>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              style={{ width: "15rem", backgroundColor: "black" }}
            >
              <Offcanvas.Header closeButton className="btn btn-secondary">
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  style={{ color: "white" }}
                >
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end align-items-center flex-grow-1 pe-3 gap-3">
                  {!user && (
                    <NavLink
                      to="/loginPage"
                      className={({ isActive }) =>
                        isActive ? "active-class" : "inactive-class"
                      }
                    >
                      <PermIdentityIcon className="card-image" />
                    </NavLink>
                  )}

                  {user ? (
                    <>
                      <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                          isActive ? "active-class" : "inactive-class"
                        }
                      >
                        <FavoriteIcon className="card-image" />
                      </NavLink>
                    </>
                  ) : null}

                  <div className="container-icon">
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        isActive ? "active-class" : "inactive-class"
                      }
                    >
                      <ShoppingCartIcon className="card-image icon-cart" />
                      {user && (
                        <div className="count-products">
                          <span id="contador-productos">
                            {totalItemProducts(item)}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </div>
                  {user ? (
                    <Button
                      onClick={handleUserLogout}
                      variant="outline-info"
                      className="btn btn-sm p-2 rounded-4"
                    >
                      Logout
                    </Button>
                  ) : null}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      <Navbar className="second-navbar ps-3 pe-3">
        <section className="pb-2">
          {user && (
            <div className="d-flex flex-column align-items-baseline text-dark">
              <h5 className="p-0 m-0">Bienvenido! 🖐🏼</h5>
              <small className="text-header-name">{user.email}</small>
            </div>
          )}
        </section>
        <section className="second-navbar-buttons">
          <NavLink
            to="/"
            href="#action1"
            className={({ isActive }) =>
              isActive ? "active-class-second" : "inactive-class-second"
            }
          >
            <b>HOME</b>
          </NavLink>
          <NavLink
            to="/about"
            href="#action2"
            className={({ isActive }) =>
              isActive ? "active-class-second" : "inactive-class-second"
            }
          >
            <b>ABOUT</b>
          </NavLink>
          <NavLink
            to="/contact"
            href="#action3"
            className={({ isActive }) =>
              isActive ? "active-class-second" : "inactive-class-second"
            }
          >
            <b>CONTACTO</b>
          </NavLink>
        </section>
        <section>
          <Form className="navbar-form">
            <div className="form-container">
              <Form.Select
                size="sm"
                className="navbar-select"
                onChange={handleProductsChange}
              >
                <option value={""}>Productos</option>
                {products.map((product) => (
                  <option key={product.name} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
              <Button className="search-button" onClick={addButtonModalSearch}>
                <SearchIcon />
              </Button>
            </div>
            {!error ? (
              ""
            ) : (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Elige algún producto</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Form>
        </section>
      </Navbar>
    </header>
  );
}
