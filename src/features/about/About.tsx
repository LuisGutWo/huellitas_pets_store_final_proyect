import { NavLink } from "react-router-dom";
import "animate.css";
import Breadcrumbs from "../../shared/components/Breadcrumbs";
import "./about.scss";

const About: React.FC = () => {
  return (
    <>
      <div className="container breadcrumbs-wrapper">
        <Breadcrumbs />
      </div>
      <div className="about-container">
        <figure>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/perrito_fondo_rosado.png?alt=media&token=c0cee521-7c9d-4511-a1f8-44edfd8f66b6"
            }
            alt=""
            className="about-img img-fluid"
          />
        </figure>
        <article className="card-overlay container">
            <div className="about-content">
            <h1 className="about-title">
              Tu tienda de confianza
              <br /> para el bienestar de
              <br /> tus mascotas
            </h1>
            <p className="about-subtitle">
              Desde hace más de 14 años, somos tu aliado en el cuidado y felicidad de tus compañeros peludos. 
              <br /> Contamos con productos premium y asesoría personalizada 
              <br /> para que tu mascota reciba lo mejor.
              <br /> Miles de clientes satisfechos confían en nosotros.
            </p>
            </div>
          <NavLink to={"/products"} className="category-buttons-hero mt-4">
            Volver a la tienda
          </NavLink>
        </article>
      </div>
    </>
  );
};

export default About;
