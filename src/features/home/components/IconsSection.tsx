import Icon1 from "../../../assets/img/1-Petstore-Despacho-48hrs.jpg";
import Icon2 from "../../../assets/img/2-petstore-wp.jpg";
import Icon3 from "../../../assets/img/3-Petstore-Sitio-100-seguro.jpg";
import Icon4 from "../../../assets/img/4-Petstore-devoluciones.jpg";
import Icon5 from "../../../assets/img/5-Petstore-depacho-chile.jpg";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const IconsSection: React.FC = () => {
  return (
    <div>
      <div className="icons-title">
        <h1 data-aos="fade-right">Comprando en Huellitas</h1>
      </div>
      <div>
        <section className="icons-container">
          <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            className="icons-item"
          >
            <img src={Icon1} alt="icono de despacho 24hrs" />
            <p>Despacho en 48hrs en region metropolitana</p>
          </div>
          <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            className="icons-item"
          >
            <img src={Icon2} alt="" />
            <p>Atención personalizada al +56 9 20390272</p>
          </div>
          <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            className="icons-item"
          >
            <img src={Icon3} alt="" />
            <p>Sitio 100% seguro</p>
          </div>
          <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            className="icons-item"
          >
            <img src={Icon4} alt="" />
            <p>Fácil cambios y devoluciones</p>
          </div>
          <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            className="icons-item"
          >
            <img src={Icon5} alt="" />
            <p>Despacho a todo Chile</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IconsSection;
