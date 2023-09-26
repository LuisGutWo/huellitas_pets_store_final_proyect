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
    <section>
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
                <div
                  onClick={() => setIsActive(!isActive)}
                  animate={{
                    rotate: isActive ? 180 : 360,
                  }}
                  className="offline-user-warning"
                >
                  Offline
                </div>
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
    </section>
  );
};

export default SecondHeader;
