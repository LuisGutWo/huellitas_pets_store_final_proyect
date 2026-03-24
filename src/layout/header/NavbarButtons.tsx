import { NavLink } from "react-router-dom";
import "animate.css";

interface NavbarButtonsProps {
  onNavigate?: () => void;
}

const NavbarButtons: React.FC<NavbarButtonsProps> = ({ onNavigate }) => {
  return (
    <>
      <nav className="navbar-buttons" aria-label="Navegación principal">
        <NavLink
          to="/"
          key="home"
          onClick={onNavigate}
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          <b>HOME</b>
        </NavLink>
        <NavLink
          to="/about"
          key="about"
          onClick={onNavigate}
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          <b>ABOUT</b>
        </NavLink>
        <NavLink
          to="/products"
          key="products"
          onClick={onNavigate}
          className={({ isActive }) =>
            isActive ? "active-class" : "inactive-class"
          }
        >
          <b>TIENDA</b>
        </NavLink>

        <NavLink
          to="/contact"
          key="contact"
          onClick={onNavigate}
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
