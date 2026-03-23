import { useEffect, useState } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import "./BackToTopButton.scss";

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
        <button className="btn-arrow-up" onClick={scrollUp} title="Back to top">
          <KeyboardArrowUpRoundedIcon className="back-to-top-arrow" aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
