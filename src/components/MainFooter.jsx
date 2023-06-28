import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";

const MainFooter = () => {
  return (
    <footer>
      <Container className="footer-container">
        <Row>
          <Col className="footer-content">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/huellitas_logo_blanco.png?alt=media&token=1a021733-a8f1-4b0f-9f5b-d5ef83d24e22"
              }
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
              src={
                "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/tarjetas_logo.png?alt=media&token=6e33bc30-938c-4589-b0af-ea5750ffd5c7"
              }
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
    </footer>
  );
};

export default MainFooter;
