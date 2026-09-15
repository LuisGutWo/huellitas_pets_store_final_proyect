---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

## Scope

Home de Huellitas Pet Store en Next.js. Visitor mode: **Persuade**. La dirección elegida gobierna todo el sitio (catálogo, detalle, carrito, blog, contacto, auth); esta ficha es la autoridad visual para todas.

Audiencia: reclutador técnico decidiendo en <2 min (primaria) y comprador simulado de Santiago (secundaria). Acción: entrar al catálogo. Prueba: 57 productos reales con precio, marca, categoría y tipo. Restricciones: Next.js + TypeScript + CSS Modules + GSAP en Vercel; imágenes locales en `/public`; catálogo como módulo TS tipado; Firebase Auth se mantiene; sin pasarela de pago.

## Direction contract

**THESIS:** El saco de alimento es el objeto que todo dueño carga al hombro. La tienda toma su gramática —numeral monumental, tabla de atributos, tintas planas, costura— y rechaza la grilla de tarjetas redondeadas pastel sobre crema que envía la categoría.

**OWN-WORLD:** Tinta de saco drenada como suelo: vermellón #C8321E al 100%, ultramarina #1B3A8C como segunda tinta de datos, kraft #C9A97A solo donde la tinta no llega (paneles, márgenes), fibra #17140F para texto. Prohibido: degradado, glass, blur, sombra suave, radio > 2px. Archivo Black condensada para numerales y display; Chivo Mono para etiquetas y tablas. Costura de fuelle como única regla divisoria.

**STORY:** Entiende que es una tienda de alimento y accesorios en Santiago; cree que el catálogo es real porque el precio, la marca y los atributos se muestran como datos, no como adorno; entra al catálogo.

**FIRST VIEWPORT:** Vermellón a sangre. El precio en CLP del producto destacado a escala de página, en kraft sobre la tinta, tercio izquierdo desde el borde superior. El producto fotografiado recortado a sangre por la derecha, casi a tamaño real. Franja vertical de costura entre ambos. Abajo-izquierda, sobre panel kraft, la tabla de análisis en Chivo Mono con datos reales. Acción primaria VER CATÁLOGO: bloque rectangular de ultramarina, sin radio, dentro del panel kraft. Nav en versales Chivo Mono sobre la tinta.

**SIGNATURE INTERACTION:** El precio manda. Un control de rango recorre el catálogo y el numeral de cada producto se re-troquela con resorte amortiguado (GSAP), nunca saltando; la hilera se lee como especímenes en repisa, cada uno con su tabla de atributos reales al lado. Los datos no traen peso: inventarlo sería fabricar especificación, así que el numeral es el precio.

**FORM:** El Saco de 15 Kilos; candidato 1 de mi lista ordenada, presentado como IMPECCABLE'S PICK y elegido por el usuario sobre la asignación 5 (La Placa Esmaltada); seed key 477d5e5c.

**RAISES:** compacto autorado, no encogido (wildstyle) · los estados se imprimen en el documento, no flotan (phosphor) · la navegación deja rastro (plankton) · cada producto muestra su composición y su advertencia al lado (kiln).

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

Dominio y nombre del proyecto en Vercel.
