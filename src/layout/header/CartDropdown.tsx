import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useProductsContext } from "../../context/ProductsContext";
import { useUserContext } from "../../context/UserContext";
import { formatPrice } from "../../shared/utils/formatPrice";
import "./cartDropdown.scss";

interface CartDropdownProps {
  onNavigate?: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onNavigate }) => {
  const { totalItemProducts, totalCart } = useProductsContext();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const itemCount = totalItemProducts();
  const total = totalCart();

  const handleCartClick = () => {
    if (!user) {
      navigate("/loginPage?return=/cart");
    } else {
      navigate("/cart");
    }

    onNavigate?.();
  };

  return (
    <Dropdown className="cart-dropdown" align="end">
      <Dropdown.Toggle
        variant="unstyled"
        className="cart-dropdown__toggle"
        id="cart-dropdown"
        aria-label={`Carrito${itemCount > 0 ? ` (${itemCount} producto${itemCount !== 1 ? "s" : ""})` : ""}`}
      >
        <div className="cart-icon-wrapper">
          <ShoppingCartIcon />
          {itemCount > 0 && (
            <span className="cart-icon-wrapper__badge" aria-hidden="true">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </div>
        <span className="cart-dropdown__toggle-label">Carrito</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="cart-dropdown__menu">
        <Dropdown.Header className="cart-dropdown__header">
          {itemCount === 0 ? (
            <span>Tu carrito está vacío</span>
          ) : (
            <span>
              {itemCount} producto{itemCount !== 1 ? "s" : ""}
            </span>
          )}
        </Dropdown.Header>

        {itemCount > 0 && (
          <>
            <Dropdown.Divider />

            <div className="cart-dropdown__info">
              <span className="cart-dropdown__label">Subtotal:</span>
              <span className="cart-dropdown__amount">
                $ {formatPrice(total)}
              </span>
            </div>

            <Dropdown.Divider />

            <Dropdown.Item
              onClick={handleCartClick}
              className="cart-dropdown__action"
            >
              Ver carrito completo
            </Dropdown.Item>
          </>
        )}

        {itemCount === 0 && (
          <>
            <Dropdown.Divider />
            <Dropdown.Item
              as={Link}
              to="/products"
              className="cart-dropdown__action"
              onClick={onNavigate}
            >
              Explorar productos
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CartDropdown;
