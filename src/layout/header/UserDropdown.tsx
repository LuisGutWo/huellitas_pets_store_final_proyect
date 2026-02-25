import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserContext } from "../../context/UserContext";
import { logout } from "../../services/firebase";
import "./userDropdown.scss";

const UserDropdown: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      setError("Error al cerrar sesión");
      console.error(err);
    }
  };

  if (!user) {
    return (
      <button
        className="user-button user-button--login"
        onClick={() => navigate("/loginPage")}
        aria-label="Iniciar sesión"
      >
        <PermIdentityIcon />
      </button>
    );
  }

  return (
    <Dropdown className="user-dropdown" align="end">
      <Dropdown.Toggle
        variant="unstyled"
        className="user-dropdown__toggle"
        id="user-dropdown"
        aria-label={`Perfil de ${user.email}`}
      >
        <PermIdentityIcon />
      </Dropdown.Toggle>

      <Dropdown.Menu className="user-dropdown__menu">
        <Dropdown.Header className="user-dropdown__header">
          <div className="user-dropdown__email">{user.email}</div>
        </Dropdown.Header>

        <Dropdown.Divider />

        <Dropdown.Item
          href="/favorites"
          className="user-dropdown__item"
        >
          ❤️ Mis Favoritos
        </Dropdown.Item>

        <Dropdown.Item
          href="/cart"
          className="user-dropdown__item"
        >
          🛒 Mi Carrito
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item
          onClick={handleLogout}
          className="user-dropdown__item user-dropdown__item--logout"
        >
          <LogoutIcon /> Cerrar sesión
        </Dropdown.Item>

        {error && (
          <Dropdown.Item disabled className="user-dropdown__error">
            {error}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
