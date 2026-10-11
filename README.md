# Huellitas Pet Store

E-commerce de alimento, accesorios y salud para perros y gatos. Tienda de barrio
en Quinta Normal, Santiago, con despacho a todo Chile.

Proyecto de portafolio. El catálogo y los datos de local son material de
demostración: no se procesan pagos ni pedidos reales.

## Stack

Next.js 15 (App Router) · TypeScript · CSS Modules · GSAP · Firebase Auth ·
Leaflet · EmailJS. Desplegado en Vercel.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
```

No necesitas configurar nada para ver el sitio completo: el catálogo vive en el
repositorio y el carrito usa `localStorage`. Las variables de entorno habilitan
las cuentas, el formulario de contacto y el teléfono del local; copia
`.env.example` a `.env.local` si las quieres.

El teléfono no está versionado. Vive en `NEXT_PUBLIC_CONTACT_PHONE` y se
configura en el despliegue, porque el repositorio es público. Sin esa variable
el sitio no inventa un número: las filas de teléfono y WhatsApp no se muestran,
el botón flotante no aparece, y el carrito cierra el pedido por correo con el
mismo detalle. Toda la lógica está en [lib/contact.ts](lib/contact.ts).

```bash
npm run build      # build de producción (el mismo que corre Vercel)
npm start          # sirve el build
npm run typecheck  # tsc --noEmit
npm run lint
npm run verify:ui  # contraste y desborde, medidos en el navegador
```

`verify:ui` levanta Chrome sin interfaz contra un servidor ya corriendo y mide
sobre el DOM renderizado, en 9 rutas × 3 anchos (390, 768, 1440):

- **Contraste WCAG AA**, comparando el color computado contra el fondo que
  realmente se pinta. Esto pilla tokens rotos: una variable que apunta a otra
  que ya no existe deja el color en el heredado, y la página sigue viéndose
  bien en una captura.
- **Desborde horizontal**, nombrando qué elemento hace scrollear la página.

Sale con código 1 si encuentra algo, así que sirve en CI. Usa `CHROME_PATH` si
tu navegador no está en las rutas habituales.

```bash
npm run build && npm start &
npm run verify:ui
```

Si quieres compilar mientras `npm run dev` está corriendo, usa un directorio
aparte para no pisar el `.next` del servidor de desarrollo:

```bash
NEXT_DIST_DIR=.next-verify npm run build
NEXT_DIST_DIR=.next-verify npx next start -p 3001
```

## Estructura

```text
app/                      Rutas (App Router) y sus CSS Modules
  globals.css             Tokens del sistema y reglas de contraste
  productos/[slug]/       57 fichas pre-renderizadas
  cuenta/                 Ingresar, crear, recuperar, mi cuenta
components/
  chrome/                 Header, footer, registro impreso, acciones flotantes
  home/                   Secciones de la portada
  catalog/                Navegador de catálogo con filtros
  product/                Ficha y compra
  contact/                Formulario y mapa
  providers/              Auth y tienda (carrito + guardados)
  ui/                     Iconos SVG y numeral troquelado
lib/
  data/                   Catálogo y artículos, tipados, generados una vez
  catalog.ts              Consultas y filtros
  firebase.ts             Auth, con degradación explícita si falta configuración
public/assets/img/        Las 78 imágenes del proyecto
```

## Decisiones que conviene conocer

**El catálogo es código.** `lib/data/products.ts` es la fuente de verdad. Editar
un precio es editar ese archivo y desplegar. No hay *fetch* ni CMS, así que el
sitio no puede romperse por un servicio caído.

**Nada se inventa.** Los productos no tienen `rating` ni `stock` en los datos, así
que no existen esos filtros ni esas estrellas. No hay reseñas ni pasarela de pago,
y el sitio lo dice donde corresponde en vez de simularlo.

**Todo funciona sin cuenta.** El catálogo, el carrito y los guardados no requieren
sesión. Si las credenciales de Firebase no están configuradas, las pantallas de
cuenta lo informan y el resto sigue operando.

**El movimiento nunca esconde contenido.** Las entradas con GSAP animan solo
transformaciones: nada depende de la animación para ser legible, y
`prefers-reduced-motion` las desactiva por completo.

**Un solo ancho de contenedor, y la medida de línea aparte.** `--shell` (78rem)
gobierna todas las rutas. La legibilidad del texto no se resuelve estrechando el
contenedor —eso aplasta grillas, mapas y formularios— sino con topes en `ch`
sobre el bloque de texto: hay 22 en el proyecto, y son los que fijan la medida
de línea donde importa.

**Las fotos de producto no pasan por el optimizador.** Ya vienen al tamaño en
que se muestran, así que optimizarlas costaba el 62% de la cuota de
transformaciones de Vercel para ahorrar 183 KB en todo el catálogo. Se sirven
con `unoptimized` y sus fuentes se mantienen a 800 px con `npm run images:fit`.
Si agregas un producto con una foto más grande, corre ese script. El blog y los
héroes sí se optimizan: ahí el ahorro llega al 90%.

**El resto se optimiza con precisión, no por defecto.** `next.config.mjs`
limita el optimizador a los seis anchos que el layout realmente pide y a WebP,
porque Vercel cobra por transformación y los anchos por defecto generaban un
37% de variantes byte-idénticas. Si agregas un componente con un `sizes` que
pida un ancho intermedio nuevo, añádelo a `deviceSizes` o `imageSizes`; si no,
se servirá el siguiente escalón hacia arriba. El detalle y las mediciones están
en [MIGRATION.md](MIGRATION.md).

## Migración

El proyecto venía de Vite + React + Bootstrap/MUI. La auditoría del original, los
hallazgos y cómo se resolvió cada uno están en [MIGRATION.md](MIGRATION.md).

## Sistema de diseño

Documentado en [DESIGN.md](DESIGN.md).
