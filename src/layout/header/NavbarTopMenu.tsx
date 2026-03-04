import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarTopMenu: React.FC = () => {
  return (
    <nav className="navbar-top-menu" aria-label="Navegación superior">
      <Container fluid>
        <div className="navbar-top-menu__left">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `navbar-top-menu__link ${isActive ? "navbar-top-menu__link--active" : ""}`
            }
            aria-label="Ir a Mapa"
          >
            Mapa
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `navbar-top-menu__link ${isActive ? "navbar-top-menu__link--active" : ""}`
            }
            aria-label="Ir a Blog"
          >
            Blog
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `navbar-top-menu__link ${isActive ? "navbar-top-menu__link--active" : ""}`
            }
            aria-label="Ir a Productos"
          >
            Productos
          </NavLink>
        </div>
        <div className="navbar-top-menu__right">
          <a
            href="mailto:huellitas.chile@gmail.com"
            className="navbar-top-menu__contact-link"
            aria-label="Enviar correo a Huellitas"
          >
            Contáctenos: huellitas.chile@gmail.com
          </a>
          <span className="navbar-top-menu__separator" aria-hidden="true">
            •
          </span>
          <a
            href="tel:+56920390272"
            className="navbar-top-menu__contact-link"
            aria-label="Llamar a Huellitas"
          >
            +569 20390272
          </a>
        </div>
      </Container>
    </nav>
  );
};

export default NavbarTopMenu;
