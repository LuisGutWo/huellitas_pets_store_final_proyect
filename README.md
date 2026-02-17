# 🐾 Huellitas Pets Store

![Huellitas Logo](src/assets/img/huellitas-logo-black-500x500.png)

## E-commerce moderno de accesorios y suplementos para mascotas

[🌐 Demo en vivo](https://huellitaspetstorechile.netlify.app/) • [Características](#-características) • [Instalación](#-instalación)

## 📋 Descripción

**Huellitas Pets Store** es una aplicación web de comercio electrónico Full-Stack desarrollada con React 19 y TypeScript, diseñada para ofrecer una experiencia de compra fluida y moderna en el sector de productos para mascotas. El proyecto implementa arquitectura feature-first, autenticación segura con Firebase, y optimizaciones de rendimiento avanzadas.

### Contexto del Proyecto

Proyecto final de la carrera Front-End React en Academia Desafío Latam, donde se aplicaron las mejores prácticas de desarrollo moderno, incluyendo:

- ✅ Arquitectura escalable basada en features
- ✅ Migración completa a TypeScript para type-safety
- ✅ Lazy loading y code-splitting por rutas
- ✅ Capa de servicios para lógica de negocio
- ✅ Context API para gestión de estado global
- ✅ Validación de formularios con Formik + Yup
- ✅ Autenticación y persistencia con Firebase
- ✅ API REST con Axios y tipado fuerte

---

## ✨ Características

### Funcionalidades Principales

- 🛒 **Carrito de compras persistente** - Gestión de productos con contador y totales en tiempo real
- ❤️ **Sistema de favoritos** - Guardado de productos preferidos por usuario
- 🔐 **Autenticación segura** - Login/Registro con Firebase Auth y validación robusta
- 🔍 **Búsqueda y filtrado avanzado** - Por categorías, tipos y texto libre
- 📱 **Diseño responsive** - Optimizado para mobile, tablet y desktop
- 🎨 **Animaciones fluidas** - Transiciones con Framer Motion y Animate.css
- 📧 **Formulario de contacto** - Envío de emails con EmailJS
- 🗺️ **Mapa interactivo** - Ubicación de tienda física con Leaflet
- ⚡ **Carga optimizada** - Lazy loading de componentes y rutas

### Experiencia de Usuario

- Navegación intuitiva con indicadores visuales de estado
- Feedback inmediato en todas las interacciones
- Loading states personalizados por ruta
- Manejo elegante de errores
- Soft prefetch de rutas frecuentes

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 (o **yarn**: >= 1.22.0)
- **Git**: Para clonar el repositorio

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/LuisGutWo/huellitas_pets_store_final_proyect.git
cd huellitas_pets_store_final_proyect
```

1. **Instalar dependencias**

```bash
npm install
```

1. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto:

```env
# Firebase Configuration
VITE_API_KEY=tu_api_key
VITE_AUTH_DOMAIN=tu_auth_domain
VITE_PROJECT_ID=tu_project_id
VITE_STORAGE_BUCKET=tu_storage_bucket
VITE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_APP_ID=tu_app_id

# API REST
VITE_URL=https://tu-api-url.com/products

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

1. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con HMR

# Producción
npm run build        # Compila para producción (dist/)
npm run preview      # Preview del build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint en todo el proyecto
npm run format       # Formatea código con Prettier

# Testing (si aplica)
npm run test         # Ejecuta tests unitarios
npm run test:coverage # Reporte de cobertura
```

---

## 🛠️ Tecnologías

### Core

| Tecnología       | Versión | Propósito                                 |
| ---------------- | ------- | ----------------------------------------- |
| **React**        | 19.2.4  | Biblioteca UI con hooks y context         |
| **TypeScript**   | 5.9.2   | Type-safety y mejor DX                    |
| **Vite**         | 7.3.1   | Build tool ultrarrápido con HMR           |
| **React Router** | 7.13.0  | Enrutamiento client-side con lazy loading |

### UI/UX

| Tecnología          | Propósito                                    |
| ------------------- | -------------------------------------------- |
| **React Bootstrap** | 5.3.8 - Componentes UI base                  |
| **Material UI**     | 7.3.8 - Componentes avanzados (icons, forms) |
| **Sass**            | 1.97.3 - Preprocessor CSS modular            |
| **Framer Motion**   | 12.7.2 - Animaciones declarativas            |
| **Animate.css**     | 4.1.1 - Animaciones predefinidas             |
| **React Leaflet**   | 4.2.5 - Mapas interactivos                   |

### Backend & Servicios

| Tecnología   | Propósito                             |
| ------------ | ------------------------------------- |
| **Firebase** | 12.9.0 - Autenticación y Storage      |
| **Axios**    | 1.9.0 - Cliente HTTP con interceptors |
| **EmailJS**  | 4.5.1 - Envío de emails sin backend   |

### Formularios & Validación

| Tecnología | Propósito                      |
| ---------- | ------------------------------ |
| **Formik** | 2.4.6 - Gestión de formularios |
| **Yup**    | 1.6.2 - Validación de schemas  |

### Calidad de Código

| Tecnología   | Propósito                           |
| ------------ | ----------------------------------- |
| **ESLint**   | 9.39.2 - Linter con reglas React/TS |
| **Prettier** | 3.6.2 - Formateo consistente        |

---

## 📁 Estructura del Proyecto

huellitas_pets_store/
├── src/
│ ├── app/ # Configuración principal
│ │ ├── App.tsx # Componente raíz con rutas lazy
│ │ └── main.tsx # Entry point
│ │
│ ├── features/ # Módulos por funcionalidad
│ │ ├── home/ # Landing page con secciones
│ │ │ ├── Home.tsx
│ │ │ └── components/ # Hero, Icons
│ │ ├── products/ # Catálogo y filtros
│ │ │ ├── MainProductsList.tsx
│ │ │ ├── ProductsCardSection.tsx
│ │ │ ├── DiscountsProducts.tsx
│ │ │ └── components/
│ │ ├── product-detail/ # Detalle de producto
│ │ ├── cart/ # Carrito de compras
│ │ ├── favorites/ # Lista de favoritos
│ │ ├── auth/ # Login y registro
│ │ ├── contact/ # Formulario de contacto
│ │ ├── about/ # Información de la empresa
│ │ └── blog/ # Blog section
│ │
│ ├── layout/ # Componentes de diseño
│ │ ├── header/ # Navbar, búsqueda, perfil
│ │ └── footer/ # Footer con info y links
│ │
│ ├── shared/ # Código compartido
│ │ ├── components/ # Loading, NotFound, Buttons
│ │ ├── utils/ # Helpers (formatPrice)
│ │ └── styles/ # SCSS globales
│ │
│ ├── context/ # Estado global
│ │ ├── ProductsContext.tsx # Cart & favorites state
│ │ └── UserContext.tsx # Auth state
│ │
│ ├── services/ # Lógica de negocio
│ │ ├── firebase.ts # Auth operations
│ │ ├── emailjs.ts # Email service
│ │ └── productsApi.ts # API REST client
│ │
│ ├── hooks/ # Custom hooks
│ │ └── useRedirectActiveUser.ts
│ │
│ └── assets/ # Recursos estáticos
│ └── img/
│
├── public/ # Archivos públicos
│ └── products.json # Mock data
│
├── .env # Variables de entorno (no commitear)
├── tsconfig.json # Configuración TypeScript
├── vite.config.js # Configuración Vite
├── eslint.config.js # Reglas de linting
└── package.json # Dependencias y scripts

---

## 🔧 Configuración del Proyecto

### TypeScript

El proyecto utiliza TypeScript en modo gradual (`strict: false`) para facilitar la migración desde JavaScript. Tipos principales:

```typescript
// Productos
type Product = {
  id: number | string;
  name?: string;
  price?: number;
  category?: string;
  // ... más campos dinámicos
};

// Carrito
type CartItem = {
  id: number | string;
  count: number;
  [key: string]: unknown;
};

// Context
interface ProductsContextValue {
  cart: CartItem[];
  favorites: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: CartItem) => void;
  // ... más métodos
}
```

### Firebase Setup

```typescript
// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // ...
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### Lazy Loading Strategy

```typescript
// Importación dinámica con prefetch
const Home = lazy(() => import("../features/home/Home"));

// Prefetch suave después de 1.2s
useEffect(() => {
  const timer = setTimeout(() => {
    import("../features/products/MainProductsList");
  }, 1200);
  return () => clearTimeout(timer);
}, []);
```

---

## 🎨 Guía de Estilo

### Convenciones de Código

- **Componentes**: PascalCase (`MainHeader.tsx`)
- **Utilidades**: camelCase (`formatPrice.ts`)
- **Estilos**: kebab-case (`main-header.scss`)
- **Constantes**: UPPER_SNAKE_CASE

### Estructura de Componentes

```typescript
// Imports
import { useState } from "react";
import type { Product } from "../../services/productsApi";

// Interfaces/Types
interface ProductCardProps {
  item: Product;
  onAddToCart?: (product: Product) => void;
}

// Component
const ProductCard: React.FC<ProductCardProps> = ({ item, onAddToCart }) => {
  // Hooks
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    // JSX
  );
};

// Export
export default ProductCard;
```

---

## 🤝 Contribuir al Proyecto

### Flujo de Contribución

1. **Fork** del repositorio
2. **Clonar** tu fork
3. **Crear rama** para tu feature: `git checkout -b feature/nueva-funcionalidad`
4. **Commit** con mensajes descriptivos: `git commit -m "feat: añadir filtro por precio"`
5. **Push** a tu fork: `git push origin feature/nueva-funcionalidad`
6. **Pull Request** a la rama `main` del proyecto original

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Formateo, estilos (no afecta funcionalidad)
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

### Antes de Enviar PR

```bash
# Verificar linting
npm run lint

# Formatear código
npm run format

# Compilar para verificar tipos
npm run build
```

---

## 📸 Screenshots

### Vista Principal

![Huellitas Screenshot](src/assets/img/new_huellitas_screenshot.png)

### Características Destacadas

- ✅ Diseño responsive mobile-first
- ✅ Carrito con contador en tiempo real
- ✅ Filtrado dinámico de productos
- ✅ Animaciones fluidas de navegación

---

## 🌐 Deploy

### Producción

- **URL**: [https://huellitaspetstorechile.netlify.app/](https://huellitaspetstorechile.netlify.app/)
- **Hosting**: Netlify
- **CD**: Deploy automático desde `main` branch

### Build para Producción

```bash
npm run build
# Output: dist/
```

---

## 📚 Recursos Adicionales

- 🎥 [Video del proyecto final](https://youtu.be/4n95frIfu44)
- 📖 [Documentación de React](https://react.dev/)
- 📖 [Documentación de TypeScript](https://www.typescriptlang.org/)
- 📖 [Vite Docs](https://vitejs.dev/)

---

## 📝 Licencia

Este proyecto fue desarrollado como trabajo final académico en Desafío Latam.

---

## 👨‍💻 Autor

### Luis Gutiérrez

- GitHub: [@LuisGutWo](https://github.com/LuisGutWo)
- Proyecto: [Huellitas Pets Store](https://github.com/LuisGutWo/huellitas_pets_store_final_proyect)

---

Desarrollado con ❤️ y ☕ por **LAG media**

© 2024-2026 Huellitas Pets Store - Todos los derechos reservados
