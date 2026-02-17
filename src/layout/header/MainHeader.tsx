import { useEffect, useState, Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import Loading from "../../shared/components/Loading";
import { getProducts, type Product } from "../../services/productsApi";
import "animate.css";

import { useUserContext } from "../../context/UserContext";
import { useProductsContext } from "../../context/ProductsContext";
import { logout } from "../../services/firebase";
import { formatPrice } from "../../shared/utils/formatPrice";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import LogoWhite from "../../assets/img/huellitas-logo-white-500x500.png";
import HeaderForm from "./HeaderForm";
import NavbarButtons from "../header/NavbarButtons";
import NavbarTopMenu from "./NavbarTopMenu";

interface MainHeaderProps {
  item: Record<string, unknown>;
}

export default function MainHeader({ item }: MainHeaderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<string>("");
  const { totalItemProducts, totalCart } = useProductsContext();
  const { user } = useUserContext();
  const [error, setError] = useState<boolean>(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true); // Start loading
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductsClick = () => {
    if (selectProduct) {
      navigate(`/products/${selectProduct}`);
    } else {
      setError(true);
    }
  };

  const handleUserLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  function addButtonModalCart() {
    if (products === null || products === undefined) {
      setError(true);
      return;
    }
    handleProductsClick(products);
    handleShowCart(!showCart);
  }
  function addButtonModalLogin() {
    if (products === null || products === undefined) {
      setError(true);
      return;
    }
    handleProductsClick(products);
    handleShowLogin(!showLogin);
  }

  if (loading) return <Loading />;

  return (
    <section className="main-header" id="header" key={item}>
      {["lg"].map((expand) => (
        <Fragment key={expand}>
          <NavbarTopMenu />
          <Navbar
            key={expand}
            expand={expand}
            className="main-navbar"
            variant="dark"
          >
            <Container fluid>
              <Link
                to={"/"}
                className="header-logo animate__animated animate__fadeIn"
              >
                <img src={LogoWhite} className="img-fluid" alt="" />
              </Link>
              {/* Toggler y Link del Navbar */}
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header
                  closeButton
                  style={{ alignContent: "center" }}
                >
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-${expand}`}
                    style={{ color: "white" }}
                  >
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-1">
                    <NavbarButtons />
                    <section className="container-icon">
                      {!user && (
                        <>
                          <NavLink
                            to="/loginPage"
                            className={({ isActive }) =>
                              isActive ? "active-class" : "inactive-class"
                            }
                            onClick={addButtonModalLogin}
                          >
                            <PermIdentityIcon
                              style={{
                                fontSize: "2rem",
                              }}
                            />
                          </NavLink>
                          <Modal show={showLogin} onHide={handleCloseLogin}>
                            <Modal.Header closeButton>
                              <Modal.Body>
                                Ingrese sus datos o Cree una cuenta nueva... 👀
                              </Modal.Body>
                            </Modal.Header>
                          </Modal>
                        </>
                      )}
                      {user ? (
                        <>
                          <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                              isActive ? "active-class" : "inactive-class"
                            }
                          >
                            <FavoriteIcon style={{ fontSize: "2rem" }} />
                          </NavLink>
                        </>
                      ) : null}

                      {!user ? (
                        <>
                          <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                              isActive ? "active-class" : "inactive-class"
                            }
                            onClick={addButtonModalCart}
                          >
                            <ShoppingCartIcon
                              style={{
                                fontSize: "2rem",
                              }}
                            />
                            {user && (
                              <div className="count-products">
                                <span id="contador-productos">
                                  {totalItemProducts(item)}
                                </span>
                              </div>
                            )}
                          </NavLink>
                          {!user && (
                            <Modal show={showCart} onHide={handleCloseCart}>
                              <Modal.Header closeButton>
                                <Modal.Body>
                                  Ingrese para acceder al carrito... 👀
                                </Modal.Body>
                              </Modal.Header>
                            </Modal>
                          )}
                        </>
                      ) : (
                        <NavLink
                          to="/cart"
                          className={({ isActive }) =>
                            isActive ? "active-class" : "inactive-class"
                          }
                          onClick={addButtonModalCart}
                        >
                          <ShoppingCartIcon
                            className="icon-cart"
                            style={{ width: "3rem", fontSize: "1.8rem" }}
                          />
                          {user && (
                            <div className="count-products">
                              <span id="contador-productos" key={item}>
                                {totalItemProducts(item)}
                              </span>
                            </div>
                          )}
                        </NavLink>
                      )}
                      <div className="navbar-total-price">
                        ${formatPrice(totalCart())}
                      </div>
                    </section>
                    {user && (
                      <div className="welcome-user-section">
                        <p className="m-0 text-light">Bienvenido 🖐🏼</p>
                        <small className="text-header-name">{user.email}</small>
                      </div>
                    )}
                    <HeaderForm products={products} key={products.id} />
                    {user && (
                      <>
                        <Button
                          onClick={handleUserLogout}
                          variant="outline-light"
                          className="logout-button"
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </Fragment>
      ))}
    </section>
  );
}
