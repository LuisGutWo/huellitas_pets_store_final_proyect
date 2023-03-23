import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { logout } from "../config/firebase";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Alert from "react-bootstrap/Alert";
import Loading from "./Loading";
import imagenes from "../assets/imagenes";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MainNavbar() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectProduct, setSelectProduct] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { user } = useUserContext();

  const getProduct = async () => {
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
    getProduct();
  }, []);

  const handleChange = (e) => {
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

  function AlertProductSelect() {
    const [show, setShow] = useState(true);

    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <p>Seleccione un producto!</p>
        </Alert>
      );
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="navbar-content">
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="main-navbar m-0"
          fixed="top"
          variant="dark"
        >
          <Container fluid>
            <Link to={"/"} href="#">
              <img
                src={imagenes[5].img}
                width="210"
                height="65"
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
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} style={{ color: "white" }}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end align-items-center flex-grow-1 pe-3 gap-3">
                  {user && (
                    <div className="d-flex align-items-baseline gap-2 mt-4 text-light">
                      <h6>Bienvenido</h6>
                      <p>{user.email}</p>
                    </div>
                  )}
                  <Form className="navbar-form">
                    <div className="form-container">
                      <Form.Select
                        size="sm"
                        className="bg-light navbar-select"
                        onChange={handleChange}
                      >
                        <option value={""}>Productos</option>
                        {products.map((product) => (
                          <option key={product.name} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Button
                        variant="outline-info"
                        size="small"
                        style={{
                          height: "1.9rem",
                          width: "8rem",
                          padding: "1px",
                        }}
                        onClick={handleProductsClick}
                      >
                        Buscar
                      </Button>
                    </div>
                    {error && <AlertProductSelect />}
                  </Form>
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
                        to="/cart"
                        className={({ isActive }) =>
                          isActive ? "active-class" : "inactive-class"
                        }
                      >
                        <ShoppingCartIcon className="card-image" />
                      </NavLink>
                      <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                          isActive ? "active-class" : "inactive-class"
                        }
                      >
                        <FavoriteIcon className="card-image" />
                      </NavLink>
                      <Button onClick={handleLogout} variant="outline-info" className="btn btn-sm p-1 mt-1">
                        Logout
                      </Button>
                    </>
                  ) : null}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      <Navbar className="second-navbar">
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
      </Navbar>
    </div>
  );
}
