import React from "react";
import Spinner from "react-bootstrap/Spinner";

const NotFound = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "8rem" }}
    >
      <Spinner animation="border" variant="info" />
      <h1>NotFound. Error 404</h1>
    </div>
  );
};

export default NotFound;
