import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";

// import { useProductsContext } from "../context/ProductsContext";

export default function MainProductCard({ item }) {
  // const { addProduct } = useProductsContext();

  return (
    <Card
      className=" product-card text-center m-1 col-12 col-md-6 col-xl-3 p-0 overflow-hidden"
      style={{ width: "14rem", height: "22rem" }}
      border="light"
    >
      <NavLink to={`/products/${item.id}`} className="m-2">
        <Card.Img variant="top" className="card-image img-fluid" src={item.img} />
      </NavLink>

      <Card.Body className="m-0 p-0">
        <Card.Title className="text-dark fs-6 mt-0 m-3">{item.name}</Card.Title>
        <Card.Text className="text-primary">
          {" "}
          <b>${item.price}</b>{" "}
        </Card.Text>

        {/* <div className="text-center" aria-hidden="true">
          <NavLink
            to="/cart"
            className="btn btn-sm btn-light m-2"
            onClick={() => addProduct(item)}
          >
            🛒
          </NavLink>
        </div> */}
      </Card.Body>
    </Card>
  );
}
