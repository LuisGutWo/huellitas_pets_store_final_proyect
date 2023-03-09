import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import CreateUser from "../views/CreateUser";
import LoginPage from "../views/LoginPage";

function MainNavbar() {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="main-navbar m-0"
          fixed="top"
        >
          <Container fluid>
            <Navbar.Brand href="#">
              <NavLink to="/">
                <img
                  src="src/assets/img/huellitas_logo_dark.png"
                  width="170"
                  height="70"
                  className="card-image d-inline-block align-top"
                  alt=""
                />
              </NavLink>
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
                  <NavLink
                    to="/"
                    href="#action1"
                    className={({ isActive }) =>
                      isActive ? "active-class" : "inactive-class"
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/about"
                    href="#action2"
                    className={({ isActive }) =>
                      isActive ? "active-class" : "inactive-class"
                    }
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/contact"
                    href="#action3"
                    className={({ isActive }) =>
                      isActive ? "active-class" : "inactive-class"
                    }
                  >
                    Contacto
                  </NavLink>
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
                    <NavDropdown.Item href="#action6"></NavDropdown.Item>
                  </NavDropdown>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive ? "active-class" : "inactive-class"
                    }
                  >
                    <ShoppingCartIcon className="card-image" />
                  </NavLink>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Buscar producto"
                    className="m-3 me-0 p-2"
                    aria-label="Search"
                  />
                  <Button color="primary" className="m-3 p-2">
                    Buscar
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MainNavbar;
