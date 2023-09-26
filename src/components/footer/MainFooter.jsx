import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";

import LogoWhite from "../../assets/img/huellitas_logo_blanco.png";
import LogoCreditCards from "../../assets/img/tarjetas_logo.png";

const MainFooter = () => {
  return (
    <footer>
      <Container className="footer-container">
        <Row>
          <Col className="footer-content">
            <img
              src={LogoWhite}
              width="50%"
              height="50%"
              className="d-inline-block align-top"
              alt=""
            />
            <p className="footer-text">
              Tienda especializada en la importación, distribución y venta de
              artículos <br /> para el cuidado de mascotas. <br /> Se realizan
              envíos a todo Chile.{" "}
            </p>
            <img
              src={LogoCreditCards}
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
      <h5 className="fs-6 text-center bg-light m-0">copyright©2023 | LGWwebmedia </h5>
    </footer>
  );
};

export default MainFooter;
