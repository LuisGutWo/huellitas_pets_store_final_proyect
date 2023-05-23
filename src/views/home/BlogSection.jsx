import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const BlogSection = () => {
  return (
    <>
      <section className="blog-title">
        <h4><strong>Blog</strong></h4>
      </section>

      <Carousel slide>
        <Carousel.Item interval={4000}>
          <CardGroup className="blog-cards-group">
            <Card className="blog-card">
              <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/imagen_blog_1.jpg?alt=media&token=3ad99489-dfaf-40fd-9c78-54e21da6aeaa"
              />
              <Card.Body className="blog-card-body">
                <Card.Title>Alimentos holísticos</Card.Title>
                <Card.Text>
                  Las primeras investigaciones que se adentraron en la
                  elaboración de alimentos de alta gama comenzaron en 1982, y en
                  la actualidad, el mercado de alimentos para mascotas
                  domesticas se ha...
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="blog-card">
              <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_2.jpg?alt=media&token=4615a7a9-1d88-4dbc-8d67-d510fd72026d"
              />
              <Card.Body className="blog-card-body">
                <Card.Title>Dia mundial de los animales</Card.Title>
                <Card.Text>
                  El 4 de Octubre se celebra el dia internacional de los
                  animales en conmemoración de San Francisco de Asís. Este santo
                  que nació en 1182 en Italia y dejo...
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <CardGroup className="blog-cards-group">
            <Card className="blog-card">
              <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_3.jpg?alt=media&token=bbd0b141-1e25-41cb-8986-7773edd16296"
              />
              <Card.Body className="blog-card-body">
                <Card.Title>¿Se aburren de su alimento?</Card.Title>
                <Card.Text>
                  ¿Se aburrirá nuestra mascota si lo alimentamos siempre con la
                  misma dieta? La respuesta es no. El aburrimiento hacia los
                  alimentos es una característica humana. Los perros y los...
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="blog-card">
              <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_4.jpg?alt=media&token=781a89bf-d66e-4d2d-a290-942017535a81"
              />
              <Card.Body className="blog-card-body">
                <Card.Title>Tu perro y las altas temperaturas</Card.Title>
                <Card.Text>
                  El verano es una gran época para disfrutar de sol, el calor y
                  refrescarse en las piletas y playas. Pero los perros, al igual
                  que las personas, pueden sufrir con las altas temperaturas
                  e...
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <CardGroup className="blog-cards-group">
            <Card className="blog-card">
              <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_5.jpg?alt=media&token=734a6599-210d-4bc2-b9b7-134cc8419d52"
              />
              <Card.Body className="blog-card-body">
                <Card.Title>
                  El universo para la moda de las mascotas
                </Card.Title>
                <Card.Text>
                  Hoy las mascotas son un miembro mas de las familias en el
                  mundo. Su fidelidad, sus expresiones de cariño y, por su
                  puesto, la compañía que ofrecen, son suficientes para...
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="blog-card">
              <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_6.jpg?alt=media&token=223f8d0f-b8d8-4468-a5a8-9428e218f5e5"
              />
              <Card.Body className="blog-card-body">
                <Card.Title>Las Mascotas y el Invierno</Card.Title>
                <Card.Text>
                  Durante el invierno es imprescindible que limites el tiempo
                  que pasa tu mascota al ire libre. La mayoría de las mascotas
                  que viven en el interior no están acostumbradas a las bajas...
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Carousel.Item>
        <Carousel.Item>
          <CardGroup className="blog-cards-group">
            <Card className="blog-card">
              <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_7.jpg?alt=media&token=edeb7b89-1800-4737-a072-497edbff73d2"
              />
              <Card.Body className="blog-card-body">
                <Card.Title>Cuidados básicos de tu mascota</Card.Title>
                <Card.Text>
                  ¡Hola Adoptantes novatos! Vamos a dar un repaso por los puntos
                  básicos a tener en cuenta para los cuidados de tu animal de
                  compañía. Si quieres ser muy responsable, sigues estos
                  consejos...
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="blog-card">
              <Card.Img
                variant="top"
                src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/img_blog_8.jpg?alt=media&token=e0d94e7a-53b6-455b-a477-7b0b192e5054"
              />
              <Card.Body className="blog-card-body">
                <Card.Title>El Vinculo afectivo con los animales</Card.Title>
                <Card.Text>
                  Convivir con perros y gatos ayuda a disminuir el estrés, la
                  tensión arterial y la frecuencia cardíaca. No sólo eso, los
                  estudios constatan que esa compañía mejora...
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default BlogSection;
