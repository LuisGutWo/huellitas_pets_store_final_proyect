import React from "react";
import { NavLink } from "react-router-dom";
import "animate.css";

const NavbarButtons = () => {
  return (
    <>
      <section className="navbar-buttons">
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
          to="/about"
          key="about"
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          <b>ABOUT</b>
        </NavLink>
        <NavLink
          to="/products"
          key="products"
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          <b>SHOP</b>
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
      </section>
    </>
  );
};

export default NavbarButtons;
