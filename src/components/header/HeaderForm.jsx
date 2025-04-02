import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const HeaderForm = ({ products }) => {
  const [show, setShow] = useState(false);
  const [selectProduct, setSelectProduct] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleProductsClick = () => {
    if (selectProduct) {
      navigate(`/products/${selectProduct}`);
    } else {
      setError(true);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProductsChange = (e) => {
    setSelectProduct(e.target.value);
    if (e.target.value) setError(false);
  };

  function addButtonModalSearch() {
    handleProductsClick(products);
    handleShow(!show);
  }

  return (
    <Form className="navbar-form">
      <Form.Select
        size="sm"
        className="navbar-select"
        onChange={handleProductsChange}
      >
        <option value={""}>Buscar productos...</option>
        {products.map((product) => (
          <option key={product.name} value={product.id}>
            {product.name}
          </option>
        ))}
      </Form.Select>
      <Button className="search-button" onClick={addButtonModalSearch}>
        <SearchIcon style={{ width: "17px" }} />
      </Button>
      {!error ? (
        ""
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Body>Selecciona algún producto 😉</Modal.Body>
          </Modal.Header>
        </Modal>
      )}
    </Form>
  );
};
HeaderForm.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HeaderForm;
