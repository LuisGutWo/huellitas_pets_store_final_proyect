import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import imagenes from "../assets/imagenes";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";

const MainFooter = () => {
  return (
    <div className="main-footer">
      <div className="footer-hero">
        <img src={imagenes[3].img} alt="" className="footer-image img-fluid" />

        <img
          src={imagenes[11].img}
          alt=""
          className="footer-image-vet img-fluid"
        />
      </div>

      <Container className="footer-container">
        <Row>
          <Col className="footer-content">
            <img
              src={imagenes[5].img}
              width="172"
              height="60"
              className="d-inline-block align-top"
              alt=""
            />
            <p className="footer-text">
              Tienda especializada en la importación, distribución y venta de
              artículos <br /> para el cuidado de mascotas. <br /> Se realizan
              envíos a todo Chile.{" "}
            </p>
            <img
              src={imagenes[9].img}
              width="150"
              height="45"
              className="d-inline-block align-top"
              alt=""
            />
          </Col>
          <Col className="footer-content">
            <h5 className="mt-3">INFORMACIÓN</h5>
            <p className="footer-text">
              Envíos y Entregas
              <br />
              Devolución y Cambios
              <br />
              Política de Garantía
              <br />
              Política de Privacidad{" "}
            </p>
          </Col>
          <Col className="footer-content">
            <h5 className="mt-3">CONTACTO</h5>
            <p className="footer-text">
              San Pablo 3610, local 2, Quinta Normal - Santiago
              <br />
              +569 36352145 | +569 98451212
              <br />
              ventas@huellitasps.cl
              <br />
            </p>
            {<FacebookRoundedIcon />} {<InstagramIcon />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainFooter;
