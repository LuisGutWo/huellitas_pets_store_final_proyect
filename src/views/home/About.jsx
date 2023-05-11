import { NavLink } from "react-router-dom";
import { FakeLoading } from "../../utils/FakeLoading";
import { motion } from "framer-motion";

function About() {
  FakeLoading(2000);

  return (
    <>
      <motion.div
        initial={{
          opacity: 0.7,
        }}
        animate={{
          opacity: 1,
          transition: { delay: 0.5, duration: 0.5 },
        }}
        exit={{
          opacity: 0.7,
          transition: { duration: 0.5 },
        }}
        className="about-container text-dark"
      >
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
          <h1>
            En Huellitas lo mas
            <br /> importante son tus
            <br /> mascotas
          </h1>
          <h5 className="text-dark">
            Por mas de 14 años
            <br /> nos preocupamos cada <br /> dia en ser tu mejor aliado y
            amigo. <br />
            En brindarte todo lo que necesitas <br /> para tu mascota <br />{" "}
            Nuestros clientes nos avalan... <br />
          </h5>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/hero_gatito.png?alt=media&token=7e600421-8a55-408f-a58c-6aefb6b87414"
            }
            alt=""
            className="about-image"
          />
          <NavLink to={"/products"} className="about-button"> Ver mas</NavLink>
        </article>
      </motion.div>
    </>
  );
}

export default About;
