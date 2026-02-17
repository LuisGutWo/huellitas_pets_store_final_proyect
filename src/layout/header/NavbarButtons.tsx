import { NavLink } from "react-router-dom";
import "animate.css";

const NavbarButtons: React.FC = () => {
  return (
    <>
      <nav className="navbar-buttons" aria-label="Navegacion principal">
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
          <b>TIENDA</b>
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
      </nav>
    </>
  );
};

export default NavbarButtons;
