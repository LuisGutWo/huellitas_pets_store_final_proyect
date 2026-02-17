import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./Breadcrumbs.scss";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Mapeo de rutas a etiquetas legibles
const routeLabels: Record<string, string> = {
  "/": "Inicio",
  "/products": "Productos",
  "/cart": "Carrito",
  "/contact": "Contacto",
  "/about": "Acerca de",
  "/blog": "Blog",
  "/favorites": "Favoritos",
  "/loginPage": "Iniciar Sesión",
  "/create": "Crear Cuenta",
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  const location = useLocation();

  // Generar breadcrumbs automáticamente si no se proporcionan
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items && items.length > 0) {
      return items;
    }

    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: "Inicio",
        path: "/",
        icon: <HomeIcon fontSize="small" />,
      },
    ];

    // Construir breadcrumbs basados en la ruta
    let currentPath = "";
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      
      // No agregar el ID del producto como breadcrumb separado
      const isProductId = pathnames[index - 1] === "products" && name.startsWith("P");
      
      if (!isProductId) {
        const label = routeLabels[currentPath] || name.charAt(0).toUpperCase() + name.slice(1);
        breadcrumbs.push({
          label,
          path: index === pathnames.length - 1 ? undefined : currentPath,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // No mostrar breadcrumbs en la página de inicio
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Navegación de migas de pan">
      <ol className="breadcrumbs__list" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const itemPosition = index + 1;

          return (
            <li
              key={item.path || item.label}
              className={`breadcrumbs__item ${isLast ? "breadcrumbs__item--active" : ""}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <>
                  <span
                    className="breadcrumbs__link breadcrumbs__link--current"
                    aria-current="page"
                    itemProp="name"
                  >
                    {item.icon && <span className="breadcrumbs__icon">{item.icon}</span>}
                    {item.label}
                  </span>
                  <meta itemProp="position" content={String(itemPosition)} />
                </>
              ) : (
                <>
                  <Link
                    to={item.path!}
                    className="breadcrumbs__link"
                    itemProp="item"
                  >
                    <span itemProp="name">
                      {item.icon && <span className="breadcrumbs__icon">{item.icon}</span>}
                      {item.label}
                    </span>
                  </Link>
                  <meta itemProp="position" content={String(itemPosition)} />
                  <NavigateNextIcon className="breadcrumbs__separator" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
