import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarTopMenu: React.FC = () => {
  return (
    <nav className="navbar-top-menu" aria-label="Enlaces superiores">
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
          <div className="navbar-top-menu__right" aria-label="Contacto">
            <a
              href="mailto:huellitas.chile@gmail.com"
              aria-label="Enviar correo a Huellitas"
            >
              Contáctenos: huellitas.chile@gmail.com
            </a>
            <span className="navbar-top-menu__separator" aria-hidden="true">
              |
            </span>
            <a
              href="tel:+56920390272"
              aria-label="Llamar a Huellitas"
            >
              Llámenos: +569 20390272
            </a>
          </div>
      </Container>
    </nav>
  );
};

export default NavbarTopMenu;
