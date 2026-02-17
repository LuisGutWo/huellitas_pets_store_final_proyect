import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
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
  const [show, setShow] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleProductsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectProduct(e.target.value);
    if (e.target.value) setError(false);
  };

  const handleProductsClick = () => {
    if (selectProduct) {
      navigate(`/products/${selectProduct}`);
    } else {
      setError(true);
    }
  };

  function addButtonModalSearch() {
    handleProductsClick();
    handleShow(!show);
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
        id="product-search"
        value={selectProduct}
        aria-label="Buscar productos"
        title="Buscar productos"
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
      {!error ? (
        ""
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Selecciona un producto 😉</Modal.Body>
        </Modal>
      )}
    </Form>
  );
};

export default HeaderForm;
