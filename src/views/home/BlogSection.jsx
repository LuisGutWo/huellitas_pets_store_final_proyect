import React from "react";
import Carousel from "react-bootstrap/Carousel";
import imagenes from "../../assets/imagenes";

const BlogSection = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <div>
            <div className="footer-hero">
              <img
                src={imagenes[3].img}
                alt=""
                className="footer-image img-fluid"
              />
              <img
                src={imagenes[11].img}
                alt=""
                className="footer-image-vet img-fluid"
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div>
            <div className="footer-hero">
              <img
                src={imagenes[2].img}
                alt=""
                className="footer-image img-fluid"
              />
              <img
                src={imagenes[11].img}
                alt=""
                className="footer-image-vet img-fluid"
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div>
            <div className="footer-hero">
              <img
                src={imagenes[4].img}
                alt=""
                className="footer-image img-fluid"
              />
              <img
                src={imagenes[11].img}
                alt=""
                className="footer-image-vet img-fluid"
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default BlogSection;
