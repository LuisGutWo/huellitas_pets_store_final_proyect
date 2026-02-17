import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",  
    });
  };

  return (
    <>
      {isVisible && (
        <NavLink className="btn-arrow-up" onClick={scrollUp}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/up-arrow-png-27167.png?alt=media&token=f1247d29-f328-4511-8a3d-582e688c839e"
            alt=""
            className="back-to-top-arrow"
          />
        </NavLink>
      )}
    </>
  );
};

export default BackToTopButton;
