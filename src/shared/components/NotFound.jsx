import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <section className="page-404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four-zero-four-bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="constant-box-404">
                  <h3 className="h2">Parece que te perdiste</h3>

                  <p>Esta pagina no esta Disponible!</p>

                  <NavLink to={"/"} href="" className="link-404">
                    Volver al Home
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
