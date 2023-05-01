import React from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { motion } from "framer-motion";

const MainNavbar = () => {
  const { user } = useUserContext();
  const [isActive, setIsActive] = React.useState(false);

  return (
    <>
      <Navbar className="second-navbar">
        <div className="second-navbar-buttons">
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
        </div>
        <div className="pb-2">
          {user ? (
            <div className="d-flex flex-column align-items-baseline text-dark fs-6">
              <h6 className="p-0 m-0">Bienvenido 🖐🏼</h6>
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
                User Offline
              </motion.div>
            </NavLink>
          )}
        </div>
      </Navbar>
    </>
  );
};

export default MainNavbar;
