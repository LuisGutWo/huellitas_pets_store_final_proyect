import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const backToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",  
    });
  };

  return (
    <>
      {backToTopButton && (
        <NavLink className="btn-arrow-up" onClick={scrollUp}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/up-arrow-png-27167.png?alt=media&token=f1247d29-f328-4511-8a3d-582e688c839e"
            alt=""
            style={{ width: "3rem" }}
          />
        </NavLink>
      )}
    </>
  );
};

export default backToTopButton;
