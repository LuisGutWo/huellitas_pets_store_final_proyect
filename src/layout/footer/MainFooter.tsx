import { Col, Container, Row } from "react-bootstrap";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";

import LogoWhite from "../../assets/img/huellitas-logo-white-500x500.png";
import LogoCreditCards from "../../assets/img/tarjetas_logo.png";

const MainFooter: React.FC = () => {
  return (
    <footer>
      <Container className="footer-container">
        <Row>
          <Col className="footer-content">
            <img
              src={LogoWhite}
              width="35%"
              height="35%"
              className="d-inline-block align-top ms-5"
              alt="Huellitas logo blanco"
            />
            <p className="footer-text">
              Tienda especializada en la importación, distribución y venta de
              artículos <br /> para el cuidado de mascotas. <br /> Se realizan
              envíos a todo Chile.{" "}
            </p>
            <img
              src={LogoCreditCards}
              width="200"
              height="60"
              className="d-inline-block align-top"
              alt=""
            />
          </Col>
          <Col className="footer-content">
            <h4 className="mt-3">INFORMACIÓN</h4>
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
            <h4 className="mt-3">CONTACTO</h4>
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
      <h5 className="footer-copyright">
        Copyright© {new Date().getFullYear()} | LAG media | Todos los derechos
        reservados.
      </h5>
    </footer>
  );
};

export default MainFooter;
