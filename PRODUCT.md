# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos audiencias reales, con pesos muy distintos:

1. **Audiencia primaria — reclutadores técnicos y leads de front-end** que abren el sitio desde un portafolio o un CV, en desktop, con menos de dos minutos de atención y varios candidatos en pestañas paralelas. Su trabajo es decidir si quien construyó esto sabe diseñar y programar a nivel profesional. No van a comprar nada. Juzgan por primer impacto, fluidez, detalle y coherencia.
2. **Audiencia secundaria — el comprador simulado**: una persona en Santiago de Chile buscando alimento, accesorios o cuidado para su perro o gato. Existe para que los flujos sean creíbles y estén completos (buscar, filtrar, comparar, agregar al carrito, guardar favoritos). Su recorrido es lo que la audiencia primaria evalúa.

Consecuencia de diseño: el sitio debe funcionar como una tienda impecable y a la vez leerse, en los primeros cinco segundos, como una demostración de oficio.

## Product Purpose

Huellitas Pet Store es un e-commerce de productos para mascotas construido como proyecto final de la carrera Front-End React en Academia Desafío Latam. Su propósito actual es servir de pieza de portafolio: demostrar arquitectura, criterio de diseño y calidad de implementación en un dominio de comercio electrónico completo.

Éxito = un reclutador recorre el catálogo, filtra, agrega al carrito y sale con la impresión de haber visto trabajo de nivel profesional, no un ejercicio de bootcamp.

## Positioning

No compite con tiendas reales; compite con otros portafolios. Lo que ninguno de esos puede copiar de forma honesta: un e-commerce completo de extremo a extremo —catálogo real de 57 productos con fotografía consistente, filtros compuestos, carrito y favoritos persistentes por usuario, autenticación real, formulario de contacto operativo y mapa de tienda física— y no tres pantallas maquetadas.

## Operating Context

- Navegación mayoritaria en desktop (evaluación de portafolio) con verificación obligatoria en móvil, porque la revisión móvil es exactamente el chequeo que un lead hace para descartar candidatos.
- El sitio se visita en frío, sin contexto previo y sin onboarding. Toda la explicación tiene que estar en la interfaz.
- Español de Chile. Precios en pesos chilenos (CLP), sin decimales.
- Despliegue actual en Netlify; destino Vercel.

## Capabilities and Constraints

Funcionalidad confirmada que la migración debe preservar:

- Catálogo de 57 productos con categoría (Gatitos/Perritos), tipo (Alimentos/Accesorios), marca, precio, precio original, promoción, temporada y destacado.
- Búsqueda por texto, filtros compuestos (categoría, rango de precio, rating, stock, descuento), chips de filtros activos y panel de filtros móvil.
- Detalle de producto.
- Carrito persistente y favoritos persistentes, ambos con alcance por usuario (`huellitas:user:<uid>:cart`) e invitado (`huellitas:guest:cart`) en localStorage.
- Autenticación con Firebase Auth: login, registro, recuperación de contraseña. **Decisión confirmada: se mantiene Firebase Auth en la migración.**
- Rutas `/cart` y `/favorites` protegidas tras sesión.
- Blog de 8 artículos de cuidado de mascotas.
- Formulario de contacto vía EmailJS.
- Mapa de tienda física vía Leaflet.
- Botón flotante de WhatsApp.

Restricciones técnicas confirmadas:

- **Stack destino: Next.js + TypeScript + CSS Modules + GSAP, desplegado en Vercel.**
- **Catálogo como módulo TypeScript tipado dentro del repo**, importado en build time. Sin fetch a URL externa.
- **Todas las imágenes viven en `/public`**, servidas localmente. Nada de almacenamiento remoto de imágenes.
- No hay pasarela de pago. El checkout termina en el carrito; no se debe afirmar que se procesan pagos reales.

Explícitamente indeciso: dominio propio y nombre de despliegue final en Vercel.

## Brand Commitments

- Nombre: **Huellitas Pet Store**.
- Logotipos existentes en dos versiones (negro y blanco), 500×500, en `src/assets/img/huellitas-logo-{black,white}-500x500.webp`. Son activos vinculantes: la identidad tipográfica y cromática nueva debe convivir con ellos.
- Voz en español de Chile, cercana y sin solemnidad, hablando de mascotas como miembros de la familia.
- Datos de tienda usados hoy en el sitio: San Pablo 3610, local 2, Quinta Normal — Santiago; teléfonos +569 36352145 y +569 98451212. Son datos de demo del proyecto académico, no de un negocio operativo; se conservan por consistencia y no se presentan como comercio activo.

## Evidence on Hand

- 57 productos reales con fotografía de producto en WebP, en `public/assets/img/`.
- 8 artículos de blog con texto, categoría, tiempo de lectura y fecha, en `public/blogInfo.json`.
- 10 imágenes editoriales/de marca en `src/assets/img/` (héroes, fondos, logos, medios de pago).
- Despliegue de referencia del estado actual: https://huellitaspetstorechile.netlify.app/

Ausencias que no se deben fabricar: no hay testimonios de clientes, ni reseñas, ni métricas de venta, ni stock real, ni ratings reales de producto, ni acuerdos con marcas. Los campos `rating` y `stock` que los filtros esperan **no existen** en los datos actuales. No hay pasarela de pago ni política de envíos verificable.

## Product Principles

1. **El catálogo es el producto.** Todo lo que no ayude a encontrar, entender o desear un producto es decoración que compite con él.
2. **Credibilidad sin mentir.** El sitio debe leerse como comercio operativo usando solo lo que existe; donde no hay evidencia (reseñas, stock, pagos), se diseña la ausencia en vez de inventarla.
3. **La primera pantalla carga el argumento.** La audiencia que decide se va antes del segundo scroll: el impacto y la prueba de oficio ocurren arriba.
4. **Una decisión por pantalla.** Buscar, filtrar, comparar y comprar son momentos distintos; ninguno debe pelear con otro por la atención.
5. **El movimiento explica, no adorna.** GSAP existe para dar continuidad espacial entre estados, no para animar todo lo que entra en viewport.

## Accessibility & Inclusion

Objetivo WCAG 2.1 AA. El proyecto ya invirtió en accesibilidad (skip link, `aria-live`, foco gestionado en cambio de ruta, etiquetas en iconos) y esa inversión es parte de lo que la audiencia primaria evalúa: la migración no puede retroceder. Requisitos firmes: navegación completa por teclado con foco visible, contraste AA en texto y controles, respeto a `prefers-reduced-motion` en toda animación GSAP, y objetivos táctiles de 44px en móvil.
