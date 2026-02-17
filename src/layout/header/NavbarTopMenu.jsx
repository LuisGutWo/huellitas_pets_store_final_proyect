import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarTopMenu = () => {
  return (
    <section className="navbar-top-menu">
      <Container fluid>
          <article className="navbar-top-menu__left">
            <NavLink
              to="/contact"
              key="contact"
              className={({ isActive }) =>
                isActive ? "active-class-2" : "inactive-class-2"
              }
            >
              <b>Mapa</b>
            </NavLink>
            <NavLink
              to="/blog"
              key="blog"
              className={({ isActive }) =>
                isActive ? "active-class-2" : "inactive-class-2"
              }
            >
              <b>Blog</b>
            </NavLink>
            <NavLink
              to="/products"
              key="products"
              className={({ isActive }) =>
                isActive ? "active-class-2" : "inactive-class-2"
              }
            >
              <b>Servicios</b>
            </NavLink>
          </article>
          <article className="navbar-top-menu__right">
            <p>Contáctenos: huellitas.chile@gmail.com</p>
            <p>|</p>
            <p>Llámenos: +569 20390272</p>
          </article>
      </Container>
    </section>
  );
};

export default NavbarTopMenu;
