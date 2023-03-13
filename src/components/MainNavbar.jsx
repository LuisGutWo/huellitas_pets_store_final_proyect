import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Alert from "react-bootstrap/Alert";

import CreateUser from "../views/CreateUser";
import LoginPage from "../views/LoginPage";
import Loading from "./Loading";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export default function MainNavbar() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectProduct, setSelectProduct] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const getProduct = async () => {
    setLoading(true);

    try {
      const {data} = await axios.get("/products.json");
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

  if (loading) return <Loading />;

  return (
    <div className="navbar-content">
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="main-navbar m-0"
          fixed="top"
        >
          <Container fluid>
            <Navbar.Brand href="#">
              <img
                src="src/assets/img/huellitas_logo_dark.png"
                width="180"
                height="70"
                className="card-image d-inline-block align-top"
                alt=""
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end align-items-center flex-grow-1 pe-3 gap-3">
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
                          height: "1.7rem",
                          width: "7rem",
                          padding: "0px",
                        }}
                        onClick={handleProductsClick}
                      >
                        Buscar
                      </Button>
                    </div>
                    {error && <AlertProductSelect />}
                  </Form>
                  <NavDropdown
                    title={<PermIdentityIcon className="card-image" />}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action4">
                      <CreateUser />
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action5">
                      <LoginPage />
                    </NavDropdown.Item>
                  </NavDropdown>
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
            isActive ? "active-class" : "inactive-class"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/about"
          href="#action2"
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          href="#action3"
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          CONTACTO
        </NavLink>
      </Navbar>
    </div>
  );
}
