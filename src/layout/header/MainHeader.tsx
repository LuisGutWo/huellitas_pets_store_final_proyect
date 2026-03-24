import { useEffect, useState, Fragment } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Loading from "../../shared/components/Loading";

import "animate.css";

import { useUserContext } from "../../context/UserContext";
import LogoWhite from "../../assets/img/huellitas-logo-white-500x500.webp";
import NavbarButtons from "../header/NavbarButtons";
import NavbarTopMenu from "./NavbarTopMenu";
import UserDropdown from "./UserDropdown";
import CartDropdown from "./CartDropdown";
import SearchBar from "./SearchBar";

export default function MainHeader() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user } = useUserContext();
  const navigate = useNavigate();
  const handleCloseMenu = () => setIsMenuOpen(false);

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set CSS variable for scroll progress
  const scrollIndicatorRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollIndicatorRef.current) {
      scrollIndicatorRef.current.style.setProperty(
        "--scroll-width",
        `${scrollProgress}%`
      );
    }
  }, [scrollProgress]);

  if (loading) return <Loading />;

  return (
    <section
      className={`main-header ${isScrolled ? "main-header--scrolled" : ""}`}
      id="header"
    >
      {/* Scroll Progress Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="main-header__scroll-indicator"
        aria-hidden="true"
      />

      <Fragment>
        <NavbarTopMenu />

        <Navbar
          expand="lg"
          expanded={isMenuOpen}
          onToggle={(nextExpanded) => setIsMenuOpen(Boolean(nextExpanded))}
          className="main-navbar"
          variant="dark"
          sticky="top"
        >
          <Container fluid>
            {/* Logo */}
            <Link
              to="/"
              className="header-logo animate__animated animate__fadeIn"
              aria-label="Huellitas Pet Store - Ir a inicio"
              onClick={handleCloseMenu}
            >
              <img
                src={LogoWhite}
                className="img-fluid"
                alt="Huellitas Pet Store"
              />
            </Link>

            {/* Navbar Toggle */}
            <Navbar.Toggle
              aria-controls="offcanvasNavbar-expand-lg"
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMenuOpen}
            />

            {/* Offcanvas Menu */}
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="end"
              onHide={handleCloseMenu}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                  Menú
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1">
                  {/* Search Bar (Mobile) */}
                  <div className="header-search-wrapper-mobile">
                    <SearchBar onSearchComplete={handleCloseMenu} />
                  </div>

                  {/* Navigation Buttons */}
                  <NavbarButtons onNavigate={handleCloseMenu} />

                  {/* Vertical Divider */}
                  <div className="header-divider" />

                  {/* Icons Section */}
                  <div className="header-icons">
                    {/* Favorites (only logged in) */}
                    {user && (
                      <button
                        type="button"
                        className="header-icon header-icon--favorites"
                        onClick={() => {
                          navigate("/favorites");
                          handleCloseMenu();
                        }}
                        aria-label="Mis favoritos"
                      >
                        <span className="header-icon__symbol" aria-hidden="true">
                          ❤️
                        </span>
                        <span className="header-icon__label">Favoritos</span>
                      </button>
                    )}

                    {/* Cart */}
                    <CartDropdown onNavigate={handleCloseMenu} />

                    {/* User */}
                    <UserDropdown onNavigate={handleCloseMenu} />
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </Fragment>
    </section>
  );
}
