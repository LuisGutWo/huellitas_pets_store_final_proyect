# Auditoría y migración — Vite/React → Next.js

Registro de lo que se encontró en el proyecto original, qué se hizo con cada
hallazgo y qué queda pendiente. Rama: `feat/next-migration`.

---

## 1. Auditoría del proyecto original

### Lo que realmente había

El proyecto de partida era una SPA en Vite + React 19 + TypeScript, con
arquitectura *feature-first*, 122 archivos y ~22.500 líneas entre TSX y estilos.
Estaba mejor armado que el promedio de un proyecto final: rutas con `lazy` y
`Suspense`, contextos tipados, *skeletons*, `skip-link`, `aria-live` y foco
gestionado al cambiar de ruta.

### Hallazgos, por severidad

**Bloqueantes**

| # | Hallazgo | Evidencia |
|---|---|---|
| 1 | El catálogo se pedía a `import.meta.env.VITE_URL`, una URL externa. No existía `.env` en el repo ni estaba en `.gitignore`: **quien clonaba el proyecto veía `/products` vacío y roto**. | `MainProductsList.tsx:38`, `ProductsCardSection.tsx:29`, `ProductDetail.tsx:74` |
| 2 | `UserContext` bloqueaba **toda** la aplicación detrás de `onAuthStateChanged`. Sin credenciales de Firebase, Firebase lanza al inicializar y no se renderiza nada. Una variable de entorno ausente tumbaba el sitio completo. | `UserContext.tsx`, `services/firebase.ts` |
| 3 | Los filtros del catálogo leían `rating` y `stock`, campos que **no existen** en ninguno de los 57 productos. Dos de los cinco filtros no podían funcionar. | `MainProductsList.tsx:85-105` vs `products.json` |

**Importantes**

| # | Hallazgo |
|---|---|
| 4 | Cuatro sistemas de UI conviviendo: Bootstrap 5, React-Bootstrap, MUI (+ Emotion) y SCSS propio. Más Framer Motion, AOS, Animate.css y `custom-animate.css` para animación: **cuatro** soluciones para el mismo problema. |
| 5 | Leaflet, AOS, Animate.css y Font Awesome se cargaban por CDN desde `index.html` (unpkg, cdnjs, kit.fontawesome), bloqueando el render y dependiendo de terceros. |
| 6 | Doble sistema de diseño: `tokens/` (moderno, completo) y `styles.scss` (heredado), con un `// TODO: Migrar gradualmente` que nunca se completó. Ambos en uso simultáneo. |
| 7 | Todo el CSS era global: `index.scss` importaba 19 hojas de todas las *features*. Sin aislamiento, colisión de nombres garantizada al crecer. |
| 8 | `Product` estaba tipado como `{ id; [key: string]: unknown }`. El tipado real se hacía con `as any` — 25 ocurrencias en 6 archivos. TypeScript no protegía nada en la capa de datos. |
| 9 | `ProductsContext` reconstruía todas sus funciones en cada render (sin `useCallback`) y no memoizaba el `value`: cada cambio del carrito re-renderizaba todo consumidor. |
| 10 | `App.tsx` mostraba un *loader* con `setTimeout(1000)` fijo, retrasando la primera pantalla **un segundo entero** sin esperar nada real. |
| 11 | `OptimizedImage` reimplementaba a mano `IntersectionObserver`, detección de WebP y *placeholders* — unas 200 líneas que el navegador y el framework ya resuelven. |

**Menores**

12. `animate.min.css` (3.589 líneas) y `custom-animate.css` (1.164) versionados en `src/`, además del mismo Animate.css por CDN.
13. `jsconfig.json` y `tsconfig.json` coexistiendo con `jsx` en conflicto (`react` vs `react-jsx`).
14. Tres componentes seguían en `.jsx` sin tipar dentro de un proyecto TypeScript.
15. Dos componentes `SearchBar` distintos y sin relación, en carpetas distintas.
16. `console.log` de códigos de error de Firebase en producción.
17. `canonical` apuntando a `https://huellitas-pet-store.example/`, un dominio inventado.

### Sobre la premisa de las imágenes

La consigna decía *"en este proyecto consumía firebase [para las imágenes]"*.
**No era así.** Las 68 imágenes ya estaban en `public/assets/img/` y se servían
localmente. Firebase se usaba **solo para autenticación**. Lo que sí venía de
fuera era el **catálogo** (`VITE_URL`), y eso es lo que se internalizó.

Las 10 imágenes de marca que vivían en `src/assets/img/` (logos, héroes, fondos)
se movieron a `public/assets/img/`, de modo que **todo el material gráfico está
hoy bajo `/public`**, que era la intención real del pedido.

---

## 2. Qué se hizo

### Stack

| Antes | Ahora |
|---|---|
| Vite 7 + React Router 7 | Next.js 15 (App Router) |
| SCSS global (19 hojas) | CSS Modules por componente + tokens en `globals.css` |
| Framer Motion + AOS + Animate.css + SCSS | GSAP, único sistema de movimiento |
| Bootstrap + React-Bootstrap + MUI + Emotion | Ninguno. Componentes y SVG propios |
| Formik + Yup | Validación propia, tipada |
| Netlify | Vercel |

**22 dependencias eliminadas.** Se conservan: `next`, `react`, `react-dom`,
`gsap`, `firebase`, `@emailjs/browser`, `leaflet`, `react-leaflet`.

### Datos

`public/products.json` → `lib/data/products.ts`: módulo TypeScript generado, con
uniones literales reales para `Category`, `ProductType` y `Brand`, importado en
tiempo de compilación. Igual para los 8 artículos. `lib/catalog.ts` aísla las
consultas (`getProductBySlug`, `filterProducts`, `sortProducts`…), así que
cambiar a un CMS más adelante no toca ninguna vista.

Las URLs pasaron de `/products/P0048` a `/productos/prestige-adulto-mini`.

### Resolución de los hallazgos

| Hallazgo | Resolución |
|---|---|
| 1 | Catálogo en el repo. Cero *fetch*. Las 57 fichas se pre-renderizan en build. |
| 2 | `isAuthConfigured` detecta credenciales ausentes. Sin ellas, las pantallas de cuenta lo dicen y **el resto del sitio funciona**. Nada bloquea el render. |
| 3 | Filtros de `rating` y `stock` **eliminados**: no había datos y no se inventaron. Se reemplazan por marca, oferta y novedades, que sí existen. |
| 4, 5 | Un solo sistema. Cero CDN: las fuentes pasan por `next/font` (self-hosted) y los iconos son SVG propios de trazo consistente. |
| 6, 7 | Un único set de tokens en `app/globals.css`; todo lo demás en CSS Modules. |
| 8 | `Product` completamente tipado. **Cero `as any`** en el proyecto. |
| 9 | `StoreProvider` con `useCallback` y `useMemo`; además corrige un error real del original, que podía escribir el carrito de una sesión sobre el de otra al cambiar de cuenta. |
| 10 | *Loader* artificial eliminado. |
| 11 | `OptimizedImage` reemplazado por `next/image` (AVIF/WebP, `srcset`, lazy nativo). |
| 12–17 | Todo eliminado o corregido. `canonical` y metadatos apuntan al despliegue real. |

### Resultado de build

```text
71 páginas estáticas · 57 fichas de producto pre-renderizadas
103 kB de JS compartido · ~190 kB en la ruta más pesada
```

Verificado sobre el build de producción, no sobre intenciones:

- Contraste WCAG AA medido en el DOM renderizado (color computado contra el
  fondo realmente pintado) en 9 rutas × 3 anchos: **cero fallos**.
- Documento sin scroll horizontal en 390, 768 y 1440 px: **cero desbordes**.
- Detector de patrones de diseño: **cero hallazgos**.

Las dos primeras las corre `npm run verify:ui`, que quedó versionado en
`scripts/`. No es decorativo: encontró dos defectos que las capturas no
mostraban — un token que apuntaba a una variable borrada, que dejaba todo el
texto de cuerpo sobre la tinta en negro heredado, y un nombre de producto que
a 390px bajaba de 18.66px y con eso perdía el umbral de "texto grande" de
WCAG. Ninguno de los dos se ve en una captura.

Un tropiezo que conviene conocer: `next dev` y `next build` comparten el
directorio `.next`, y correr uno con el otro vivo deja el build a medias
(hojas de estilo referenciadas que no existen, errores de `/_document`). Por
eso `next.config.mjs` acepta `NEXT_DIST_DIR` para compilar a un directorio
aparte.

### Una corrección posterior, por si sirve de aviso

Se probó estrechar el contenedor en las rutas con más texto (nosotros, blog,
contacto) mediante un segundo token de ancho aplicado a la ruta completa.
Fue un error y se revirtió: esas páginas no son columnas de prosa. Contacto es
formulario más mapa y blog es una grilla de tarjetas, así que el resultado fue
un mapa de 336 px y tarjetas de 224 px en una pantalla de 1440.

La medida de línea ya estaba resuelta por los topes en `ch` sobre cada bloque
de texto. Estrechar el contenedor encima era redundante para la prosa y
destructivo para todo lo demás.

### El teléfono no se versiona

El número real del local vive en `NEXT_PUBLIC_CONTACT_PHONE`, no en el
repositorio, porque el repositorio es público. `lib/contact.ts` es la única
fuente de verdad: deriva de la variable el texto visible, el `href` de `tel:` y
los dígitos de `wa.me`, y expone `null` cuando no está configurada.

La degradación es la misma que la de Firebase y EmailJS: sin variable, las filas
de teléfono y WhatsApp no se renderizan, el botón flotante no aparece, el
mensaje de error del formulario deja de ofrecer un canal que no existe, y el
carrito cambia su acción de cierre de WhatsApp a correo, con el mismo detalle
del pedido. En ningún caso se muestra un número inventado.

### Accesibilidad

Se conservó lo que el original hacía bien y se agregó verificación: contraste
AA comprobado par por par sobre la paleta completa, foco visible, `aria-live` en
cada resultado de formulario, objetivos táctiles de 44 px, y `prefers-reduced-motion`
respetado en todo GSAP.

El campo vermellón (`#c8321e`) es de tono medio, así que el sistema define dos
roles de texto sobre él: `--text-on-ink` (blanco, 5.34:1, cuerpo) y
`--display-on-ink` (`#e8dcc4`, 3.93:1, **solo display**). El kraft no se usa como
texto ni como borde de control sobre la tinta porque solo alcanza 2.40:1.

---

## 3. Despliegue en Vercel

1. Importar el repositorio. Next.js se detecta solo; no hace falta configurar nada.
2. Variables de entorno: ver `.env.example`. **Todas son opcionales.** Sin ellas
   el catálogo, el carrito y los guardados funcionan igual.
3. `npm run build` local reproduce exactamente el build de Vercel.

---

## 4. Pendiente

- Dominio propio y nombre final del proyecto en Vercel (sin decidir).
- El blog se publica como índice de extractos: no existe cuerpo completo de los
  artículos y no se escribió uno falso.
- No hay pasarela de pago. El carrito termina en una coordinación por WhatsApp
  con el pedido armado, y el sitio lo dice de forma explícita.
