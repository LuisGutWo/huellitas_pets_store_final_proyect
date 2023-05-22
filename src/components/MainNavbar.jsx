import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { motion } from "framer-motion";

const MainNavbar = () => {
  const { user } = useUserContext();
  const [isActive, setIsActive] = React.useState(false);

  return (
    <section className="second-navbar-container">
      <Navbar expand="lg" className="second-navbar">
        <Container className="second-navbar-buttons">
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ border:"0", fontSize:"1.2rem" }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
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
          </Navbar.Collapse>
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
              style={{ width: "4rem" }}
            />
          </a>
        </section>
      </Navbar>
    </section>
  );
};

export default MainNavbar;
