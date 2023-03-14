import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Col, Container, Row } from "react-bootstrap";

const MainFooter = () => {
  return (
    <div className="main-footer">
      <div>
        <img src="src/assets/img/fondo_juguetes.jpg" alt="" className="footer-image img-fluid" />
      </div>

      <Container className="footer-container container p-3">
        <Row>
          <Col className="footer-content">
            <img
              src="src/assets/img/huellitas_logo_dark.png"
              width="172"
              height="70"
              className="d-inline-block align-top"
              alt=""
            />
            <p className="footer-text">
              Tienda especializada en la importación, distribución y venta de
              artículos <br /> para el cuidado de mascotas. <br /> Se realizan
              envíos a todo Chile.{" "}
            </p>
            <img
              src="src/assets/img/tarjetas_logo.png"
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
