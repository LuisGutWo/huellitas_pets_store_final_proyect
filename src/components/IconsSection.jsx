import React from "react";
import { motion } from "framer-motion";

const IconsSection = () => {
  return (
    <div>
      <div className="icons-title">
        <h5>Comprando en Huellitas</h5>
      </div>
      <div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { delay: 0.7, duration: 0.7 },
          }}
          exit={{
            opacity: 0.7,
            transition: { duration: 0.5 },
          }}
          className="icons-container"
        >
          <div className="icons-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/1-Petstore-Despacho-48hrs.jpg?alt=media&token=c8e79003-ca67-41c6-94e7-7ed2fe8986ab"
              alt=""
            />
            <p>Despacho en 48hrs en region metropolitana</p>
          </div>
          <div className="icons-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/2-petstore-wp.jpg?alt=media&token=b3e9221a-2ed1-4a3b-82e5-6e2d4e3ead78"
              alt=""
            />
            <p>Atención personalizada al +56 9 20390272</p>
          </div>
          <div className="icons-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/3-Petstore-Sitio-100-seguro.jpg?alt=media&token=ea7989a6-e370-4f3e-8167-b2388b8a370f"
              alt=""
            />
            <p>Sitio 100% seguro</p>
          </div>
          <div className="icons-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/4-Petstore-devoluciones.jpg?alt=media&token=96577fc7-c109-420a-acb8-4bd520814939"
              alt=""
            />
            <p>Fácil cambios y devoluciones</p>
          </div>
          <div className="icons-item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/5-Petstore-depacho-chile.jpg?alt=media&token=8a4416d6-b754-4965-b7a7-62592052afb3"
              alt=""
            />
            <p>Despacho a todo Chile</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IconsSection;
