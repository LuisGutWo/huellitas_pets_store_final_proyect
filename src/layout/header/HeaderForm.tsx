import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../services/productsApi";

interface HeaderFormProps {
  products: Product[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  handleShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  handleProductsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleProductsClick: () => void;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderForm: React.FC<HeaderFormProps> = ({ products }) => {
  const [selectProduct, setSelectProduct] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleProductsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectProduct(e.target.value);
    if (e.target.value) setError("");
  };

  const handleBlur = () => {
    setTouched(true);
    if (!selectProduct) {
      setError("Selecciona un producto");
    }
  };

  const handleProductsClick = () => {
    if (selectProduct) {
      navigate(`/products/${selectProduct}`);
    } else {
      setTouched(true);
      setError("Selecciona un producto");
    }
  };

  function addButtonModalSearch() {
    handleProductsClick();
  }
  return (
    <Form className="navbar-form">
      <Form.Label htmlFor="product-search" className="visually-hidden">
        Buscar productos
      </Form.Label>
      <Form.Select
        size="sm"
        className="navbar-select"
        onChange={handleProductsChange}
        onBlur={handleBlur}
        id="product-search"
        value={selectProduct}
        aria-label="Buscar productos"
        title="Buscar productos"
        isInvalid={Boolean(touched && error)}
      >
        <option value="">Buscar productos...</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </Form.Select>
      <Button
        className="search-button"
        onClick={addButtonModalSearch}
        aria-label="Buscar"
      >
        <SearchIcon style={{ width: "17px" }} />
      </Button>
      {touched && error && (
        <Form.Control.Feedback type="invalid" className="navbar-feedback">
          {error}
        </Form.Control.Feedback>
      )}
    </Form>
  );
};

export default HeaderForm;
