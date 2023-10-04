import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useUserContext } from "../../context/UserContext";
import "animate.css";

const SecondHeader = () => {
  const { user } = useUserContext();
  const [isActive, setIsActive] = useState(false);

  return (
    <>
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
                height: "45%",
                backgroundColor: "#917FB3",
              }}
            >
              <Offcanvas.Body>
                <Nav>
                  <NavLink
                    to="/"
                    key="home"
                    className={({ isActive }) =>
                      isActive ? "active-class" : "inactive-class"
                    }
                  >
                    <b>HOME</b>
                  </NavLink>
                  <NavLink
                    to="/products"
                    key="products"
                    className={({ isActive }) =>
                      isActive ? "active-class" : "inactive-class"
                    }
                  >
                    <b>PRODUCTOS</b>
                  </NavLink>
                  <NavLink
                    to="/about"
                    key="about"
                    className={({ isActive }) =>
                      isActive ? "active-class" : "inactive-class"
                    }
                  >
                    <b>ABOUT</b>
                  </NavLink>
                  <NavLink
                    to="/contact"
                    key="contact"
                    className={({ isActive }) =>
                      isActive ? "active-class" : "inactive-class"
                    }
                  >
                    <b>CONTACTO</b>
                  </NavLink>
                  {user && (
                    <div className="welcome-user-section">
                      <p className="m-0 text-light">Bienvenido 🖐🏼</p>
                      <small className="text-header-name">{user.email}</small>
                    </div>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default SecondHeader;
