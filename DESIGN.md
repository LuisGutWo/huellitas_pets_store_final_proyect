---
name: Huellitas Pet Store
description: Un e-commerce de mascotas impreso como un saco de alimento de 15 kilos — tintas planas, numeral monumental, ficha de atributos y costura de fuelle.
colors:
  ink: "#c8321e"
  ink-deep: "#7a1e12"
  ink-blue: "#1b3a8c"
  ink-blue-deep: "#12276b"
  kraft: "#c9a97a"
  kraft-dim: "#b8945f"
  stock: "#e8dcc4"
  stock-light: "#f5efe3"
  fiber: "#17140f"
  fiber-soft: "#4a3f30"
  text-on-ink: "#ffffff"
  display-on-ink: "#e8dcc4"
typography:
  numeral:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(4rem, 2rem + 13vw, 11rem)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 62"
    fontFeature: "'tnum' 1"
  numeral-lg:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 1.8rem + 10vw, 8.5rem)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 62"
    fontFeature: "'tnum' 1"
  numeral-md:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3vw, 3.9rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 66"
    fontFeature: "'tnum' 1"
  numeral-sm:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 2.5vw, 3rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 64"
    fontFeature: "'tnum' 1"
  display:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.8rem + 3.4vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 66"
  headline:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 1.5rem + 1.8vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 75"
  title:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 1.25rem + 0.9vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 75"
  subtitle:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.05rem + 0.4vw, 1.4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(0.95rem, 0.92rem + 0.15vw, 1.05rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label-lg:
    fontFamily: "Chivo Mono, ui-monospace, Courier New, monospace"
    fontSize: "0.8rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.16em"
  label-md:
    fontFamily: "Chivo Mono, ui-monospace, Courier New, monospace"
    fontSize: "0.74rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
  label-sm:
    fontFamily: "Chivo Mono, ui-monospace, Courier New, monospace"
    fontSize: "0.68rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
    fontFeature: "'tnum' 1"
  label-xs:
    fontFamily: "Chivo Mono, ui-monospace, Courier New, monospace"
    fontSize: "0.62rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.22em"
rounded:
  none: "0"
  die: "2px"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-5: "1.5rem"
  s-6: "2rem"
  s-7: "3rem"
  s-8: "4.5rem"
  s-9: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.ink-blue}"
    textColor: "{colors.stock}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-blue-deep}"
    textColor: "{colors.stock}"
  button-quiet:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.stock}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0 1rem"
    height: "44px"
  button-quiet-hover:
    backgroundColor: "{colors.fiber}"
    textColor: "{colors.stock}"
  card-specimen:
    backgroundColor: "{colors.kraft}"
    textColor: "{colors.fiber}"
    rounded: "{rounded.none}"
    padding: "1rem"
  panel-order-slip:
    backgroundColor: "{colors.kraft}"
    textColor: "{colors.fiber}"
    rounded: "{rounded.none}"
    padding: "1rem"
  input-field:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.fiber}"
    rounded: "{rounded.none}"
    padding: "0.75rem"
    height: "48px"
  chip-filter:
    backgroundColor: "{colors.kraft}"
    textColor: "{colors.fiber}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: "0 0.75rem"
    height: "34px"
  chip-filter-hover:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.fiber}"
  nav-link:
    textColor: "{colors.kraft}"
    typography: "{typography.label-md}"
    padding: "0.5rem 0"
  nav-link-active:
    textColor: "{colors.stock}"
    typography: "{typography.label-md}"
    padding: "0.5rem 0"
  count-badge:
    backgroundColor: "{colors.ink-blue}"
    textColor: "{colors.stock}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: "0 5px"
    height: "22px"
---

# Design System: Huellitas Pet Store

## Overview

**Creative North Star: "El Saco de 15 Kilos"**

El sistema toma su gramática del objeto que todo dueño de mascota carga al hombro: el saco de alimento impreso. Tintas planas que nunca se mezclan, un numeral monumental troquelado en el frente, una tabla de análisis en monoespaciada al costado, y una costura de fuelle como única regla divisoria. No hay degradados, no hay vidrio, no hay desenfoque, no hay sombras suaves. Lo que en otras tiendas de la categoría es una grilla de tarjetas redondeadas pastel sobre crema, aquí es un pliego impreso a cuatro pasadas.

La densidad es alta y deliberada: el catálogo es el producto, y cada espécimen viaja con su ficha de datos reales —marca, categoría, tipo, precio, precio original— porque los datos son la prueba de que la tienda existe. Donde no hay evidencia (reseñas, ratings, stock, pagos) el sistema no fabrica un adorno para taparlo: simplemente no existe el componente. No hay estrellas, no hay barras de "quedan 3 unidades", no hay logotipos de tarjetas de crédito. El numeral monumental es el precio, y solo el precio, porque el precio es el único dato a escala de página que el proyecto puede sostener con verdad.

El campo de tinta vermellón es el suelo del sitio: cubre el documento a sangre y todo lo demás se imprime encima o se recorta contra él. Kraft y stock son papel, no tinta: aparecen como planchas donde el texto de lectura tiene que vivir. La ultramarina es la segunda pasada, reservada a la acción y al dato.

**Key Characteristics:**
- Tintas planas sin mezcla; el campo vermellón a sangre como suelo del documento.
- Numeral Archivo condensado a escala de monumento; el precio como objeto, no como etiqueta.
- Chivo Mono en versales espaciadas para toda etiqueta, ficha y dato, con numerales tabulares.
- Radio máximo 2px, borde de 2px sólido fibra, cero sombras.
- La costura de fuelle como única regla divisoria del sistema.
- Ausencias diseñadas: sin reseñas, sin ratings, sin stock, sin pasarela de pago.

## Colors

Cinco tintas planas y dos pasadas de papel; ninguna se degrada hacia otra y ninguna se usa a opacidad parcial salvo en los punteados de ficha.

### Primary
- **Vermellón de Saco** (`ink`): el campo de tinta que cubre el documento entero. Es el fondo del `body` y el `themeColor` del navegador. Es de tono medio, y eso define la regla de contraste más importante del sistema.
- **Vermellón Profundo** (`ink-deep`): segunda pasada del mismo pigmento. Cabecera fija, cabecera de ruta, cajón de filtros móvil, pista del scrollbar, botones de menor jerarquía y color de error de formulario. Es donde el texto claro respira sin pelear.

### Secondary
- **Ultramarina de Dato** (`ink-blue`): la segunda tinta. Marca acción y dato: botón de agregar al carrito, aplicar filtros, contadores del header, pulgar del control de rango, checkbox marcado, cursor de texto, selección de texto y anillo de foco. Su presencia es escasa y siempre significa "esto hace algo" o "esto es un número".
- **Ultramarina Asentada** (`ink-blue-deep`): el hover de todo lo ultramarina, y el pulgar del scrollbar en hover.

### Neutral
- **Kraft** (`kraft`): el papel del saco. Plancha de las fichas de producto, del panel de filtros, del panel de autenticación y de los chips. También es color de texto sobre fibra (franja de origen, lote de imprenta, navegación en reposo sobre la cabecera profunda).
- **Kraft Apagado** (`kraft-dim`): variante de refuerzo del mismo papel para separaciones y estados sobre kraft.
- **Stock** (`stock`): la pasada clara del papel. Texto sobre superficies oscuras (ultramarina, fibra, vermellón profundo) y fondo de todo campo de formulario.
- **Stock Claro** (`stock-light`): la cama fotográfica. Ver la Regla de la Cama Fotográfica.
- **Fibra** (`fiber`): la tinta de texto sobre papel y el borde de 2px de todo lo enmarcado. También plancha de las franjas de sello y del lote de imprenta.
- **Fibra Suave** (`fiber-soft`): texto secundario, etiquetas de ficha y placeholders sobre papel.

### Named Rules

**La Regla de los Dos Roles.** El campo de tinta vermellón es de tono medio y carga exactamente dos roles de texto, ni uno más: blanco de papel (`text-on-ink`, 5.34:1) para todo lo que se lee a tamaño de lectura, y stock (`display-on-ink`, 3.93:1) **solo** a escala display. Kraft nunca es texto sobre la tinta y nunca es borde de un control sobre la tinta: llega a 2.40:1. La regla está escrita como comentario en la cabeza de `globals.css` y todo componente la obedece.

**La Regla del Blanco que no es Material.** El blanco de papel es un rol de *texto*, no una superficie. Ninguna plancha, panel ni tarjeta del sistema lo usa como fondo. El sitio no tiene una sola superficie blanca.

**La Regla de la Cama Fotográfica.** La fotografía de producto se imprime sobre stock claro con `mix-blend-mode: multiply`, de modo que el fondo blanco del recorte se disuelve en la plancha en vez de introducir un material blanco nuevo. La cama es la pasada más clara del mismo papel, no una tinta nueva: sobre ella el empaque claro se desplaza un 4% en vez de un 9%. Es el compromiso que ships; lo correcto sería un canal alfa por recorte.

**La Regla de la Segunda Tinta.** La ultramarina no decora. Si algo es ultramarina, o es una acción que el usuario puede ejecutar, o es un número. Nunca es fondo de sección ni acento estético.

**La Regla de las Superficies Prestadas.** Las superficies que normalmente pinta un tercero también son del sistema y se reclaman con sus tintas: selección de texto y cursor en ultramarina, anillo de foco en ultramarina (vermellón profundo sobre plancha kraft), barra de desplazamiento con pista en vermellón profundo y pulgar en ultramarina, y el mapa de Leaflet con sus controles de zoom, su globo y su atribución retematizados —el enlace de atribución pasa del azul por defecto de Leaflet (3.64:1 sobre stock) a ultramarina (7.62:1). Ningún componente de terceros conserva su paleta de fábrica.

## Typography

**Display Font:** Archivo (variable, con el eje `wdth` solicitado), autoalojada vía `next/font`
**Body Font:** Archivo (mismo recurso variable)
**Label / Mono Font:** Chivo Mono (400 / 700), autoalojada vía `next/font`

**Character:** Archivo condensada a pesos 800–900 imprime como troquel: ancho comprimido por el eje de variación, no por escalado, con interletraje negativo y caja alta. Chivo Mono es la voz del dato: versales, espaciado abierto y numerales tabulares, la letra de la ficha técnica al costado del espécimen. No hay familia de display del sistema como respaldo; ambas viajan desde el proyecto.

### Hierarchy

El sistema tiene **dos rampas paralelas que nunca se prestan pasos**. Archivo lleva lectura y display; Chivo Mono lleva etiquetas y datos. Todo tamaño por debajo del cuerpo (`--step-0`) pertenece a la rampa de etiqueta y a ninguna otra.

**Rampa de numeral troquelado** (Archivo 900, condensada, tabular) — cuatro pasos, no uno:
- **Numeral** (hasta 11rem, interlínea 0.8): la cifra del 404.
- **Numeral LG** (hasta 8.5rem): el precio del héroe, el objeto de la primera pantalla.
- **Numeral MD** (hasta 3.9rem): total del carrito, cifras de la tienda, precio en la ficha de producto.
- **Numeral SM** (hasta 3rem): el conteo del mecanismo de filtros y la lectura del presupuesto.

**Rampa de lectura y display** (Archivo):
- **Display** (800, `wdth` 66, hasta 4.6rem): título de página en la cabecera de ruta.
- **Headline** (800, `wdth` 75, hasta 3rem): títulos de sección en home y catálogo.
- **Title** (800, `wdth` 75, hasta 2rem): títulos de panel, estado vacío, cabecera del cajón móvil.
- **Subtitle** (800, hasta 1.4rem): subtítulos dentro de plancha.
- **Body** (400, 0.95–1.05rem, interlínea 1.55): texto corrido, acotado entre 46ch y 62ch.
- **Body SM** (400, 0.92rem): texto secundario dentro de planchas — descripciones de tarjeta y copy de apoyo.

**Rampa de etiqueta** (Chivo Mono, versales) — todo lo que va por debajo del tamaño de lectura:
- **Label LG** (0.8rem): botones, estados impresos, fichas de datos.
- **Label MD** (0.74rem): navegación, chips, tallies, mensajes de error.
- **Label SM** (0.68rem): migas, filas de la tira de atributos, metadatos de artículo.
- **Label XS** (0.62rem): leyendas de campo, banderas de producto, pie de imprenta, micro-etiqueta del lockup.

### Named Rules

**La Regla de las Dos Rampas.** Las dos familias no se prestan pasos: Archivo vive en la rampa de lectura/display y en la de numeral; Chivo Mono vive en la rampa de etiqueta. Todo tamaño por debajo de `--step-0` sale de la rampa de etiqueta (`--label-xs` a `--label-lg`) y de ningún otro lugar.

**La Regla del Cero Literal.** Ningún `font-size` literal en el proyecto. Todo tamaño sale de un token de la escala. La única excepción admitida es una proporción relativa a su propio numeral (el signo de peso del héroe, `0.34em`), que no es un peldaño sino una fracción del glifo que acompaña.

**La Regla del Ancho Autorado.** Lo condensado viene del eje `wdth` de Archivo (62–78 según el rol), nunca de `transform: scaleX` ni de una fuente estrecha distinta. El ancho es una decisión tipográfica, no una deformación.

**La Regla del Numeral Tabular.** Todo precio, contador, total y celda de tabla lleva `tabular-nums` y `"tnum" 1` (clase `.tabular` o atributo `data-numeral`). Las cifras no bailan al cambiar de valor.

**La Regla de la Caja Alta de Imprenta.** Todo encabezado `h1`–`h4` se imprime en versales con `text-wrap: balance`. Toda etiqueta monoespaciada se imprime en versales con `letter-spacing` ≥ 0.10em. Entre ambas no hay una tercera voz tipográfica.

## Layout

El documento se compone sobre dos anchos de contenedor. El **ancho de trabajo** (`--shell`, **78rem**) gobierna el catálogo, la portada, la ficha de producto, el carrito, guardados, cuenta y todo el chrome del sitio (cabecera, pie, pie de imprenta, cabecera de ruta). El **ancho de lectura** (`--shell-read`, **50rem**) es la medida de las rutas de texto. La canaleta es fluida (`--gutter`, `clamp(1rem, 4vw, 3rem)`). Lo que queda entre el borde del contenedor y el borde de la pantalla se deriva del contenedor mismo (`--bleed` = `calc(max(0px, (100vw - --shell) / 2) + --gutter)`): un porcentaje dentro de un grid resolvería contra la pista y no contra el contenedor, y eso desborda el documento. Todo elemento que sale a sangre usa `--bleed`, así que el sangrado derecho del héroe sigue automáticamente el ancho que esté en alcance.

El ritmo de espaciado son nueve pasos duros, como troquel: 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4.5 / 7rem. Padding interno de panel y ficha en el paso 4 (1rem) o 6 (2rem); separación entre secciones en los pasos 8 y 9.

Puntos de quiebre reales del build, en orden de uso: **62rem** —el corte principal: la barra lateral de filtros se convierte en cajón, la navegación se convierte en menú, las etiquetas de acción de la cabecera se ocultan—, **48rem** (el pie de imprenta envuelve), **34rem** (el catálogo cae a dos columnas y la ficha suelta su tercer atributo), más ajustes locales en 44rem, 40rem, 30rem y 24rem. El emparejamiento `max-width: 62rem` / `min-width: 62.0625rem` evita que el cajón y la barra lateral coexistan.

Densidad: el catálogo es una grilla `auto-fill` con mínimo de 13.5rem y separación de 1rem; los departamentos van a tres columnas fijas. Todo objetivo táctil tiene 44px o más de altura, y la acción principal de una ficha tiene 48px.

**La Regla del Documento Cerrado.** Nada desborda horizontalmente. En 390 / 768 / 1440 el `scrollWidth` es exactamente el ancho de la ventana en todas las rutas.

**La Regla de la Ruta de Lectura.** Una ruta se declara de lectura envolviendo su página completa —cabecera de ruta incluida— en `<div className="reading">`, y esa clase reasigna el token localmente (`.reading { --shell: var(--shell-read); }`). Todo contenedor dentro hereda la medida estrecha, de modo que el título de la página se angosta junto con la columna que lleva debajo en vez de quedar más ancho que ella. Hoy la usan `/nosotros`, `/blog` y `/contacto`. Es el único mecanismo admitido para estrechar: no se ponen `max-width` por página. El chrome del sitio vive en `app/layout.tsx`, fuera de esos envoltorios, así que conserva el ancho de trabajo.

Evidencia del cambio: con el ancho de trabajo en 78rem, a 1440 el catálogo vuelve a su grilla de tres columnas de especímenes al costado del panel de filtros; bajo 50rem había colapsado a una sola columna.

## Elevation & Depth

**Este sistema no tiene sombras.** Ni ambientales, ni de estado, ni de foco. La profundidad se construye por capas de material: una plancha de papel (kraft o stock) puesta sobre el campo de tinta, delimitada por un borde sólido de 2px en fibra. Lo que está "encima" es lo que tiene borde y color de papel; lo que está "debajo" es la tinta. El único gesto de elevación del sistema es un `translateY(-4px)` en el hover de las tarjetas de departamento y `translateY(-2px)` en el botón flotante de WhatsApp: el papel se despega del pliego, no proyecta sombra.

Las superficies realmente flotantes (cajón de filtros móvil, dock de acciones) se resuelven con plancha opaca y `z-index`, sin `backdrop-filter` y sin velo.

### Named Rules

**La Regla del Estado Impreso.** Los estados se imprimen en el documento, no flotan sobre él. Un filtro activo invierte su plancha a fibra; un favorito guardado tiñe su celda de kraft; un contador es un bloque de segunda tinta, no un globo. No hay tooltips flotantes ni insignias con radio.

**La Regla de la Costura Única.** La única regla divisoria del sistema es la costura de fuelle (`.seam` / `.seamVertical`): un punteado de 2px en fibra, 10px de trazo y 10px de aire, dentro de un canal de 6px. Donde haga falta un separador más leve dentro de una plancha, se usa `1px dashed` de fibra al 40%. No existe una tercera divisoria.

## Shapes

La forma del sistema es el rectángulo troquelado. El radio está capado en **2px** (`--radius`) y en la práctica casi todo se dibuja con esquina viva (0). El borde canónico es `2px solid` fibra (`--rule`); el borde interior leve es 1px de fibra al 35–40% (`--rule-thin`), siempre punteado cuando separa filas de una ficha.

Las banderas de producto (descuento, nuevo), el lote de imprenta, los contadores y las etiquetas de registro son bloques rectangulares de tinta con 2–3px de padding vertical: no son píldoras. Los checkbox son cuadrados de 16px con borde de 2px, rellenos por `box-shadow: inset`, sin marca de verificación. El pulgar del control de rango es un rectángulo de 20×30 con radio explícito 0.

La barra de registro del pie de imprenta es la firma geométrica del sistema: cuatro pasadas de tinta de 18px cada una (stock, ultramarina, fibra, kraft) en una barra de 72×10.

## Components

### Buttons
- **Shape:** esquina viva (0), sin borde, salvo cuando el botón vive sobre la tinta y necesita contorno de 2px en stock.
- **Primary:** bloque de ultramarina con texto stock, Chivo Mono 700 en versales con `letter-spacing` 0.14em, altura mínima 48px (54–56px en formularios y en aplicar-filtros). Es "Agregar", "Ver catálogo", "Entrar", "Aplicar".
- **Hover / Focus:** el fondo asienta a ultramarina profunda en 160ms `ease-out`. Foco: contorno de 3px en ultramarina con 3px de separación; sobre plancha kraft el contorno cambia a vermellón profundo.
- **Quiet / Secondary:** plancha de vermellón profundo con texto stock (limpiar filtros), hover a fibra. Sobre la tinta, la variante fantasma es solo contorno de 2px en stock con texto blanco de papel (botón de filtros móvil, selector de orden).
- **Icon-only:** caja cuadrada de 44px con borde de 2px en kraft o fibra, sin fondo.

### Chips
- **Style:** plancha kraft con texto fibra, Chivo Mono 0.7rem, altura 34px, esquina viva, con el icono de quitar al costado.
- **State:** solo existen como filtros activos; el hover aclara la plancha a stock. No hay chip no seleccionado: si el filtro no está puesto, el chip no está impreso.

### Cards / Containers
- **Corner Style:** esquina viva (0).
- **Background:** kraft para la ficha de producto y el panel de filtros; stock para las tarjetas de departamento.
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Border:** 2px sólido fibra; el marco de la foto se separa del cuerpo con ese mismo trazo.
- **Internal Padding:** 1rem (0.75rem bajo 34rem); 2rem en los paneles de autenticación.

### Order-Slip Panel (firma)
La plancha kraft de filtros se lee como una ficha de pedido, de arriba abajo: **Buscar** → **Quitar los N filtros** (solo impreso cuando hay filtros activos) → **Para** → **Pasillo** → **Precio hasta** → **Solo mostrar** → **Marcas**. Cada campo se separa del anterior con el punteado de 1px, y la leyenda va en Chivo Mono versales 0.62rem con `letter-spacing` 0.24em.

**La Regla de la Lista Larga al Final.** Toda lista larga y acotada va al final de su panel y lleva su propio desplazamiento (las 33 marcas: `max-height: 16rem`, barra delgada con pista en stock y pulgar en ultramarina). Una lista larga arriba empuja fuera de la altura visible del panel pegajoso los controles cortos y de mayor uso; al final no desplaza nada.

### Inputs / Fields
- **Style:** campo de stock dentro de un marco de 2px fibra, sin radio, altura mínima 44–48px, etiqueta en Chivo Mono versales 0.64rem sobre fibra suave. El cursor de texto es ultramarina.
- **Focus:** el marco completo recibe `outline: 3px` vía `:focus-within` (ultramarina sobre panel oscuro, vermellón profundo sobre kraft); el input interno suprime su propio contorno.
- **Error:** el marco pasa a vermellón profundo y el fondo se tiñe con 12% de tinta sobre stock; el mensaje va en Chivo Mono sobre vermellón profundo, con el icono de alerta del set.

### Navigation
- Chivo Mono 0.74rem en versales con `letter-spacing` 0.16em sobre la cabecera de vermellón profundo. En reposo el enlace es kraft; en hover sube a stock con subrayado de 2px al 45%; activo es stock con subrayado sólido de 2px. Bajo 62rem la navegación se convierte en un cajón de plancha fibra con filas de 56px separadas por una línea de kraft al 30%.
- Sobre la barra corre una franja de sello en fibra con texto kraft (dirección y teléfono de la tienda), que suelta su segundo dato bajo 30rem.

### Icon Set
Set autorado de **20 iconos** SVG en caja de 24, un solo trazo de 2px, esquinas rectas, sin relleno salvo el corazón guardado.

**La Regla del Trazo Único.** Todo icono del producto sale de este set. Si un icono no existe en él, se dibuja dentro del set con el mismo trazo; no se importa de otra fuente, y el sistema no usa emoji ni glifos unicode como iconos.

### Specimen Card (firma)
La ficha de producto es un espécimen en repisa: foto sobre la cama fotográfica con multiplicación, banderas de tinta apiladas arriba a la izquierda, botón de guardar de 44px encajado arriba a la derecha con bordes de fuelle, nombre en Archivo condensado, y debajo la **tira de atributos**: una lista de definición en Chivo Mono con separación punteada, etiqueta en versales a la izquierda y valor en negrita a la derecha. El precio cierra la ficha en Archivo 900 a 1.85rem. La ficha va al lado del espécimen, siempre visible, nunca escondida tras un hover.

### Stamped Numeral (firma)
Cuando un numeral cambia de valor no salta: recorre el trayecto con GSAP (`power3.out`, 0.62s) mientras la plancha asienta con un rebote corto (`back.out(2.4)`, `scaleY` 0.955 → 1, origen en la base), como un troquel que golpea el papel. Con `prefers-reduced-motion` se imprime el valor final sin recorrido.

### Press Foot (firma)
El cierre de imprenta: marcas de registro, la barra de cuatro pasadas de tinta, el lockup del proyecto en Chivo Mono 0.64rem con `letter-spacing` 0.22em, y el sello de lote en plancha fibra sobre kraft empujado al extremo. Bajo 48rem el lockup baja a su propia línea.

### Motion
Las entradas GSAP animan **solo transformaciones** (`yPercent`, `xPercent`, `y`, `scaleY`) y opacidad en el raíl de costura. Nada del contenido depende de la animación para ser legible: si GSAP no corre, la página está completa. `prefers-reduced-motion` desactiva todo, tanto por la regla global de `globals.css` como por una salida temprana en cada componente animado. Las transiciones de estado van entre 140ms y 320ms, con `ease-out` para color y `cubic-bezier(0.22, 1, 0.36, 1)` para transformación.

## Do's and Don'ts

### Do:
- **Do** respetar la Regla de los Dos Roles: sobre el campo de tinta, texto de lectura en blanco de papel y display en stock; cualquier otro color de texto sobre la tinta es un error de contraste.
- **Do** poner todo texto de párrafo sobre una plancha de papel (kraft o stock) o sobre vermellón profundo, nunca sobre el vermellón medio.
- **Do** usar la ultramarina únicamente para acción y para dato.
- **Do** imprimir toda etiqueta, ficha y dato en Chivo Mono, versales, con `letter-spacing` ≥ 0.10em y numerales tabulares.
- **Do** derivar el sangrado de `--bleed`, nunca de un porcentaje dentro de un grid.
- **Do** dibujar bordes con el trazo canónico de 2px en fibra y separar filas internas con el punteado de 1px.
- **Do** animar solo transformaciones con GSAP, como entrada opcional, y desactivar todo bajo `prefers-reduced-motion`.
- **Do** diseñar las ausencias que el producto no puede sostener: sin reseñas, sin ratings, sin stock, sin pasarela de pago. Donde no hay dato, no se imprime componente.
- **Do** tomar todo tamaño de texto de un token de la escala; por debajo del cuerpo, siempre de la rampa de etiqueta.
- **Do** mantener todo objetivo interactivo en 44px o más.

### Don't:
- **Don't** usar degradados, vidrio, desenfoque, `backdrop-filter` ni sombras suaves: no existen en este sistema.
- **Don't** superar 2px de radio en ningún elemento.
- **Don't** usar kraft como texto o como borde de control sobre el campo de tinta: no alcanza 3:1.
- **Don't** introducir una superficie blanca; el blanco de papel es un rol de texto.
- **Don't** inventar una divisoria nueva: la costura de fuelle es la única regla del sistema.
- **Don't** fabricar estrellas, reseñas, contadores de stock ni insignias de medios de pago; el producto no tiene esos datos.
- **Don't** condensar tipografía con `scaleX` ni caer a una fuente de display del sistema: Archivo y Chivo Mono viajan autoalojadas.
- **Don't** usar emoji ni glifos unicode como iconos; el set autorado de 20 es el vocabulario completo.
- **Don't** escribir un `font-size` literal ni improvisar un `clamp()` en un componente: la escala ya tiene el peldaño.
- **Don't** cruzar las rampas: Chivo Mono no usa pasos de Archivo ni al revés.
- **Don't** hacer que un estado flote: los estados se imprimen en el documento.

---

## Verificación del build publicado

- `detect.mjs --json app components` → `[]`, cero hallazgos. La escala de etiqueta nació de este detector: antes del refactor reportaba 76 hallazgos de `design-system-font-size` (26 literales distintos más siete `clamp()` improvisados en componente). Hoy no queda un solo `font-size` literal en el proyecto.
- Barrido WCAG AA a nivel DOM en nueve rutas, sobre colores computados contra los fondos realmente pintados → cero fallas.
- Desbordamiento horizontal en 390 / 768 / 1440 → `scrollWidth` igual al viewport en todas las rutas.
- `next build` → 71 páginas estáticas, 57 páginas de producto prerenderizadas, 103 kB de JS compartido.
