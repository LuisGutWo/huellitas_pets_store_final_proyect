---
name: Política de imágenes
description: Cómo trabajar imágenes en Next.js sobre Vercel sin quemar el recurso de Image Optimization — cero consumo para lo estático, una transacción única para lo dinámico.
applies-to: Next.js (App Router) desplegado en Vercel
status: estándar de trabajo
---

# Política de imágenes

Documento complementario a [README.md](README.md), [DESIGN.md](DESIGN.md) y
[MIGRATION.md](MIGRATION.md). Define cómo se trabajan las imágenes en cualquier
proyecto del stack para no depender del optimizador de Vercel.

La regla de fondo es una sola:

> **Una imagen que ya conoces en tiempo de desarrollo no debe costar ni una
> transformación en producción.** Se optimiza una vez, en tu máquina, y se
> sirve tal cual.

---

## 1. Qué se está pagando

Vercel factura **transformaciones**, no imágenes ni bytes. Una transformación
es una combinación única de:

```
(imagen de origen, ancho, calidad, formato)
```

De ahí salen las tres trampas que vacían la cuota:

| Trampa | Qué pasa |
|---|---|
| **Anchos de más** | Los `deviceSizes` + `imageSizes` por defecto son 16 candidatos. Una foto de 640 px pedida a 1080, 1200, 1920, 2048 y 3840 devuelve **el mismo archivo cinco veces** y se cobra cinco veces. |
| **Formatos de más** | Pedir AVIF *y* WebP codifica cada ancho dos veces. El contador se duplica. |
| **Claves nuevas** | Cambiar `formats`, `quality` o los anchos no libera lo ya generado: crea un juego de claves nuevo. El contador sube aunque hayas "optimizado". |

El contador del panel es **acumulado del período y no baja**. Lo que se vigila
es el incremento diario, no el total.

---

## 2. Clasifica antes de configurar

Toda imagen de un proyecto cae en una de tres casillas. La casilla decide el
tratamiento; no hay una configuración única que sirva para todas.

| Casilla | Qué es | Tratamiento | Costo |
|---|---|---|---|
| **A — Estática** | Vive en el repo, la conoces en build: catálogo, logos, fondos, ilustraciones, fotos editoriales. | Optimizada en desarrollo + `unoptimized` o `<img>`. | **Cero** |
| **B — Dinámica** | La sube un usuario o llega de un CMS en runtime: avatares, adjuntos, fotos de producto cargadas por un admin. | Optimizar **al guardarla**, no al mostrarla. Ver regla 4 para las cuatro formas de hacerlo. | **Cero o una** operación por imagen, de por vida |
| **C — Remota ajena** | Imagen de un tercero que no controlas. | Evitarla. Si es obligatoria, `remotePatterns` estricto y anchos acotados. | Variable — la que más se descontrola |

**El error típico** es tratar la casilla A como si fuera B: dejar que el
optimizador redimensione en producción, cada vez, algo que no cambia nunca.

**Y lo más probable es que tu proyecto no tenga casilla B en absoluto.** Un
portafolio, una landing, un catálogo que se edita por código: todo eso es A de
punta a punta. Si es tu caso, la regla 4 no te aplica, no necesitas Vercel Blob
ni `putImage`, y el objetivo es sencillamente **cero transformaciones**. Pasa
directo al Perfil A.

---

## 3. Las nueve reglas

### Regla 1 — Controla los anchos permitidos

`deviceSizes` e `imageSizes` **no son una sugerencia: son el espacio completo de
transformaciones posibles.** Recórtalos a los anchos que tu layout realmente
pide, derivados de los `sizes` de cada componente y contando pantallas de
densidad doble.

```js
// next.config.mjs
images: {
  imageSizes: [256, 384],          // miniaturas y tarjetas
  deviceSizes: [640, 828, 1200, 1920],
}
```

Cómo derivarlos, sin estimar: toma cada `sizes` del proyecto, calcula el ancho
CSS máximo que produce y multiplícalo por 2. Ese es el ancho que necesitas; el
resto sobra.

> Un ancho que no está en estas listas devuelve **400**. Eso es deseable: cierra
> el endpoint a peticiones arbitrarias.

Esta regla fija el espacio de anchos posibles. **Cuántos de ellos pide cada
imagen lo decide la regla 9**, y las dos se necesitan: una config recortada
limita el daño de un `sizes` mal escrito, pero no lo arregla.

### Regla 2 — Maximiza el `minimumCacheTTL`

Si el contenido solo cambia al desplegar, no tiene sentido dejar caducar la
transformación y volver a pagarla.

```js
minimumCacheTTL: 60 * 60 * 24 * 31,   // 31 días
```

Usa el valor más alto que tu contenido tolere. Para assets inmutables en
`/public`, eso es el máximo. Si una imagen cambia bajo la misma ruta, invalida
explícitamente en vez de bajar el TTL global:

```bash
vercel cache invalidate --srcimg /assets/img/hero.webp
```

### Regla 3 — Usa `unoptimized` donde no agrega valor

**Mide antes de decidir.** El optimizador ahorra mucho en imágenes grandes y
casi nada en imágenes que ya vienen al tamaño en que se muestran.

Medición real de un catálogo de 78 imágenes:

| Grupo | Archivos | Ahorro del optimizador | % de la cuota que consumía |
|---|---|---|---|
| Fotos de producto (ya al tamaño correcto) | 57 | **22%** | **62%** |
| Héroes, fondos, editorial | 21 | 90%+ | 38% |

Las 57 fotos de producto costaban el 62% de la cuota para ahorrar 183 KB en
todo el catálogo. Se marcan `unoptimized` y se arregla el origen:

```tsx
<Image
  src={product.image}
  alt={product.name}
  width={420}
  height={420}
  unoptimized
/>
```

`unoptimized` conserva el lazy loading, el `width`/`height` y la reserva de
espacio. Lo único que se pierde es el redimensionado en servidor, que es
justamente lo que no hacía falta.

> **No apliques esto a ciegas.** Si una imagen es mucho más grande de lo que se
> muestra —un héroe de 1920 px en un teléfono de 390— el optimizador sí paga su
> costo. La regla es por grupo, no global.

### Regla 4 — Pre-optimiza al guardar, no en cada petición

**Esta regla solo aplica si el proyecto tiene imágenes de clase B.** Si todas
tus imágenes están en el repo —que es el caso de la mayoría de los
portafolios, landings y catálogos estáticos— sáltala entera: no hay nada que
pre-optimizar en runtime y el proyecto es un Perfil A.

El principio, cuando sí hay clase B, es independiente de la herramienta:

> La imagen dinámica se optimiza **una vez, al entrar al sistema**, no cada
> vez que alguien la mira. Una foto subida una vez y vista mil veces debe
> costar una operación, no mil.

Cómo implementarlo depende de dónde guardes. En orden de menor a mayor
compromiso:

#### Opción 1 — Redimensionar en el navegador antes de subir

Cero costo de servidor, cero transformaciones, funciona con cualquier
almacenamiento. El archivo llega al backend ya pequeño.

```ts
async function encoger(file: File, anchoMax = 1200): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const escala = Math.min(1, anchoMax / bitmap.width);

  const canvas = new OffscreenCanvas(
    Math.round(bitmap.width * escala),
    Math.round(bitmap.height * escala)
  );

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('sin contexto 2d');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return canvas.convertToBlob({ type: 'image/webp', quality: 0.8 });
}
```

Es la opción más barata y la que menos piezas agrega. Su límite: depende del
cliente, así que **valida en el servidor de todos modos** — nunca confíes en
que el archivo llegó del tamaño que pediste.

#### Opción 2 — `sharp` en tu propio route handler

Cero transformaciones de Vercel, y sirve con cualquier almacenamiento: Blob,
R2, S3, Supabase o el que sea. Es la opción por defecto si no quieres atarte a
Vercel Blob.

```ts
import sharp from 'sharp';

export async function POST(request: Request) {
  const entrada = Buffer.from(await request.arrayBuffer());

  const optimizada = await sharp(entrada)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  // guarda `optimizada` donde corresponda
}
```

Dos advertencias que importan:

- `sharp` llega como dependencia **transitiva** de Next. Si lo usas en tu
  código, **decláralo en `package.json`**: depender de una transitiva se rompe
  el día que Next cambie de motor de imágenes.
- Corre en el runtime Node, no en Edge, y suma peso al arranque en frío. Para
  subidas ocasionales es intrascendente; para un flujo de alto volumen,
  conviene medirlo.

#### Opción 3 — `putImage` de Vercel Blob

**Solo tiene sentido si ya estás usando Vercel Blob como almacenamiento.** No
adoptes Blob únicamente para esto: la Opción 2 consigue lo mismo sin sumar un
producto.

```ts
import { putImage } from '@vercel/blob';

const blob = await putImage('productos/sku-1024.webp', request.body, {
  access: 'public',
  optimizeImage: { width: 800, quality: 75, format: 'webp' },
  cacheControlMaxAge: 60 * 60 * 24 * 365,
});
```

Detalles que no son obvios:

- **Requiere credenciales OIDC** (`VERCEL_OIDC_TOKEN` + `BLOB_STORE_ID`). Los
  tokens de lectura-escritura **no** se aceptan.
- Se factura como **una** transformación más una subida a Blob. El ahorro
  frente a optimizar on-demand es la diferencia entre 1 y N.
- `width` es obligatorio (1–8192). `quality` por defecto 75. `format` opcional:
  si se omite, conserva el formato de origen.
- Si el resultado pesara **más** que el original, Vercel guarda el original.
- Acepta un `URL` y lo descarga del lado servidor — útil para migrar imágenes
  ya publicadas.

Para lotes o migraciones puntuales existe la CLI, sin escribir código:

```bash
vercel blob put-image ./origen/hero.png   --pathname images/hero.webp   --width 1600 --quality 75 --format webp --access public
```

#### Opción 4 — El transformador de tu proveedor de almacenamiento

Si ya usas Supabase Storage o Cloudinary, ambos transforman por su cuenta. No
sumes una segunda capa: usa la que ya pagas.

---

Sea cual sea la opción, el consumo después es el mismo: **las URLs resultantes
se muestran con `unoptimized`**, porque ya están optimizadas. Pasarlas otra vez
por `next/image` sería pagar dos veces por el mismo trabajo.

### Regla 5 — Nombres de archivo estables

El nombre forma parte de la clave de caché. Un nombre que cambia es una
transformación nueva.

```
✗  /api/imagen?id=42&v=1738271  →  clave distinta en cada despliegue
✗  /assets/hero-a3f9c2.webp     →  hash que cambia al recomprimir
✓  /assets/img/hero.webp        →  estable
✓  productos/sku-1024.webp      →  estable y descriptivo del tamaño
```

Si versionas una imagen, cambia el nombre **a propósito** (`hero-2026.webp`),
no por efecto colateral de la herramienta de build. Y si el contenido cambia
bajo el mismo nombre, invalida en vez de agregar un query param.

### Regla 6 — Restringe los `remotePatterns`

Un `remotePatterns` abierto convierte tu optimizador en un servicio gratuito
para cualquiera. Acota host, ruta y query:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'ce0rcu23vrrdzqap.public.blob.vercel-storage.com',
      pathname: '/productos/**',
      search: '',
    },
  ],
  localPatterns: [{ pathname: '/assets/img/**', search: '' }],
  qualities: [75],
}
```

`localPatterns` hace lo mismo para rutas propias, y `qualities` cierra el
último hueco: sin él, cualquiera puede pedir `?q=1`, `?q=2`, `?q=3`… y generar
transformaciones nuevas indefinidamente.

### Regla 7 — Limita los formatos de salida

Cada formato en `formats` codifica **cada ancho otra vez**.

```js
formats: ['image/webp'],   // no ['image/avif', 'image/webp']
```

AVIF pesa alrededor de un 35% menos que WebP, pero duplica el contador. Si las
fuentes ya son WebP, el ahorro no paga el costo. Pedir AVIF solo se justifica
cuando el proyecto sirve imágenes grandes a mucho tráfico y la cuota no es la
restricción.

### Regla 8 — `<img>` nativo para lo decorativo

`next/image` tiene un costo de ceremonia que no siempre se gana. Para un logo,
un ícono, un patrón de fondo o cualquier imagen de tamaño fijo y conocido, el
elemento nativo es más directo y no toca el optimizador jamás.

```tsx
<img
  src="/assets/img/logo.webp"
  alt="Huellitas Pet Store"
  width={160}
  height={64}
  loading="lazy"
  decoding="async"
/>
```

Declara siempre `width` y `height` para no provocar salto de layout, y
`loading="lazy"` salvo que esté sobre el pliegue.

**Usa `next/image` cuando** necesites `srcset` responsivo real sobre una imagen
que es genuinamente más grande que su caja. **Usa `<img>` cuando** la imagen ya
está al tamaño correcto.

### Regla 9 — El `sizes` del componente decide cuántas variantes se piden

La regla 1 acota el espacio de anchos posibles. Esta decide **cuántos de ellos
pide cada imagen**, y es la de mayor impacto medido, porque su comportamiento
es contraintuitivo y casi nadie lo revisa.

Next elige los anchos del `srcset` en `getWidths`, en
`next/dist/shared/lib/get-img-props.js`. Con `allSizes = imageSizes +
deviceSizes`, la lógica es:

| Forma del componente | Anchos que se piden | Con la config por defecto |
|---|---|---|
| `width={n}` numérico, **sin** `sizes` | `n` y `n×2`, subidos al escalón siguiente | **2** |
| `fill` sin `sizes` | todo `deviceSizes` | 8 |
| `sizes` con `vw` | `allSizes` ≥ `deviceSizes[0] × (vw menor / 100)` | 6 a 12 |
| `sizes` **solo en px** | **todo `allSizes`** | **16** |

Lo último es la trampa: **un `sizes` sin unidades `vw` no reduce nada, habilita
la escalera completa.** `sizes="140px"` sobre una caja de 140 px pide todos los
anchos configurados, hasta el mayor.

Medido en producción, agrupando por cuántos anchos distintos pide cada imagen:

```text
proyecto A (config por defecto)   43 de 48 imágenes × 16 anchos  ← sizes en px
proyecto B (config recortada)      7 de  9 imágenes ×  6 anchos  ← sizes en px
                                   1 de  9 imágenes ×  2 anchos  ← width sin sizes
```

La prescripción, en orden:

**1. Caja de tamaño conocido: `width`/`height` numéricos y nada de `sizes`.**
Es la forma más barata del componente —dos variantes, 1x y 2x— y la que más se
pasa por alto.

```tsx
// Avatar, miniatura, tarjeta de ancho fijo: 2 variantes.
<Image src={foto} alt="" width={140} height={140} />
```

**2. Caja fluida: `sizes` con `vw` reales.** Declara la fracción del viewport que
la imagen ocupa de verdad en cada corte. El filtro usa el `vw` **menor**, así que
un `vw` pequeño de más deja entrar anchos pequeños que nunca se usan.

```tsx
// 92vw en móvil, 30vw en escritorio → anchos ≥ 192px
<Image src={foto} alt="" fill sizes="(max-width: 62rem) 92vw, 30vw" />
```

**3. Nunca un `sizes` solo en píxeles.** Si el ancho es fijo y conocido, es el
caso 1: quita el `sizes`. Si es fluido, es el caso 2: escríbelo en `vw`.

**4. `fill` siempre con `sizes`.** Sin él Next asume `100vw` y pide todo
`deviceSizes`.

Para encontrarlos:

```bash
# sizes sin ninguna unidad vw: candidatos a la escalera completa
grep -rn 'sizes="[^"]*"' --include=*.tsx . | grep -v vw
```

Y para medir el resultado sobre el HTML servido, contando anchos distintos por
imagen:

```bash
curl -s https://tu-sitio.com/ \
  | grep -o '_next/image?[^"]*' | sort -u \
  | grep -o 'url=[^&]*' | uniq -c | sort -rn | head
```

Cada línea es una imagen y su número de variantes. Si ves 16, 10 u 8 donde la
caja es de tamaño fijo, esta regla es tu mayor ahorro disponible.

---

## 4. Perfiles de proyecto

### Perfil A — Sitio estático: cero consumo

Catálogos, portafolios, landings, documentación. Todas las imágenes viven en el
repo.

```js
// next.config.mjs
images: {
  formats: ['image/webp'],
  imageSizes: [256, 384],
  deviceSizes: [640, 828, 1200, 1920],
  minimumCacheTTL: 60 * 60 * 24 * 31,
  qualities: [75],
  localPatterns: [{ pathname: '/assets/img/**', search: '' }],
}
```

Y en el código, `unoptimized` o `<img>` para todo lo que ya esté al tamaño en
que se muestra. El objetivo declarado del perfil A es **cero transformaciones**;
si queda alguna, debe estar justificada por una medición, no por inercia.

### Perfil B — Sitio mixto: estáticas en cero, dinámicas optimizadas al guardar

Tiendas con panel de administración, perfiles de usuario, cualquier cosa donde
el contenido visual entre en runtime.

```
estáticas  →  /public  +  unoptimized         →  0 transformaciones
dinámicas  →  optimizadas AL GUARDAR          →  0 o 1 operación por imagen
           →  se consumen con unoptimized     →  0 adicionales al mostrarlas
```

El punto clave: **la imagen dinámica se optimiza al entrar al sistema, no al
salir.** Una foto subida una vez y vista mil veces cuesta una operación, no
mil. Con cuál de las cuatro vías de la regla 4 la optimices es secundario, y
depende de dónde guardes: `sharp` en tu route handler no consume nada de la
cuota de Vercel y funciona con cualquier almacenamiento; `putImage` solo vale
la pena si Blob ya es tu almacén.

Define los anchos de almacenamiento al diseñar, igual que definirías una
columna de base de datos:

```ts
const PRESETS = {
  miniatura: 256,
  tarjeta: 800,
  detalle: 1600,
} as const;
```

Si una imagen se muestra en tres tamaños, guarda tres blobs al subirla. Sigue
siendo barato: tres transformaciones una vez, contra tres por cada visitante.

---

## 5. Optimización desde el desarrollo

Esta es la mitad que las guías suelen omitir. Si el archivo que subes al repo
ya está bien, no hay nada que optimizar en producción.

**Antes de commitear una imagen:**

1. **Redimensiona al ancho máximo en que se muestra**, contando densidad doble.
   Una tarjeta de 230 px no necesita una fuente de 1600 px.
2. **Convierte a WebP** con calidad 75–82. Para fotografía es indistinguible y
   pesa la mitad que un JPEG equivalente.
3. **Nombre estable y descriptivo.** Sin hashes, sin espacios, sin acentos.
4. **Verifica que entró en el presupuesto.** Una foto de producto bajo 30 KB,
   un héroe bajo 120 KB. Si se pasa, es que la fuente sigue grande.

Automatízalo con un script versionado en el repo, no con un paso manual que se
olvida. Ejemplo funcionando en este proyecto:
[`scripts/fit-images.mjs`](scripts/fit-images.mjs), expuesto como
`npm run images:fit`. Recorre `/public`, recorta lo que exceda su tope según si
la imagen es de producto o editorial, y es idempotente: lo que ya está bien no
se toca.

```bash
npm run images:fit
```

---

## 6. Cómo verificar que funciona

Un estándar sin medición es una intención. Estas tres comprobaciones se corren
antes de desplegar.

**Cuántas transformaciones pide una visita.** Levanta el build de producción y
cuenta las peticiones a `/_next/image` por ruta:

```bash
npm run build && npm start &
# luego, en el navegador: DevTools → Network → filtrar "_next/image"
```

Si una página estática pide más de cero, hay una imagen mal clasificada.

**Cuál es el techo del proyecto.** El número de combinaciones distintas que el
sitio *puede* producir:

```
techo = Σ  por cada imagen: anchos distintos tras capar al ancho nativo
        ×  formatos declarados
```

Si ese número es mayor que tu cuota mensual, el problema es estructural y
ninguna caché lo va a salvar.

**Si el optimizador vale la pena.** Pide la variante y compárala con el
original. Si el ahorro es menor al 40%, esa imagen debería ir `unoptimized` y
arreglarse en origen:

```bash
curl -s -o /dev/null -w "%{size_download}\n" \
  -H "accept: image/webp" \
  "http://localhost:3000/_next/image?url=%2Fassets%2Fimg%2Ffoto.webp&w=640&q=75"
```

---

## 7. Lo que no resuelve el problema

Para evitar repetir el análisis cada vez que aparece la idea:

| Propuesta | Por qué no |
|---|---|
| Mover las imágenes a **R2 / S3 / Supabase Storage** | Son almacenamiento, no transformación. Si las sirves con `next/image` y `remotePatterns`, Vercel las sigue transformando: mismo costo y una pieza más que mantener. |
| Mover a **Cloudinary / imgix** | Sí reemplaza el optimizador, vía loader propio. Pero cambia una cuota por otra y suma un servicio. Se justifica con catálogos grandes y variables, no con decenas de archivos estáticos. |
| Subir el plan | Paga el síntoma. Si el techo estructural supera la cuota, la siguiente también se agota. |
| Bajar la calidad global | Ahorra bytes, no transformaciones. El contador cuenta combinaciones, no peso. |

Para un sitio con decenas de imágenes estáticas, **`/public` con las fuentes
bien preparadas es la opción correcta** y cuesta cero.

---

## 8. Prompt para adaptar estas normas a un proyecto

Pégalo en una sesión con el proyecto abierto. Está escrito para que el
asistente **mida antes de cambiar**, que es donde este tipo de trabajo se
suele equivocar.

```text
Audita y adapta este proyecto a la política de imágenes de IMAGES.md.
El objetivo es cero consumo del optimizador de Vercel en las imágenes
estáticas, y una sola transformación de por vida en las dinámicas.

Mide primero, no asumas. Antes de proponer cualquier cambio:

1. Inventaría /public: cantidad de archivos, formatos, peso y dimensiones
   reales en píxeles de cada imagen.
2. Lista cada uso de next/image y <img> en el proyecto, con su prop `sizes`
   y el ancho CSS máximo al que se renderiza. Deriva de ahí los anchos que
   el layout realmente necesita, contando densidad doble. Marca aparte los
   `sizes` que no llevan unidades vw y los `fill` sin `sizes`: esos piden
   muchos más anchos de los que parecen (ver regla 9).
3. Clasifica cada imagen en A (estática, en el repo), B (dinámica, entra en
   runtime) o C (remota de terceros).
4. Calcula el techo de transformaciones actual: por cada imagen, los anchos
   distintos tras capar al ancho nativo, por los formatos declarados.
   Reporta qué porcentaje de ese techo produce archivos idénticos entre sí.
5. Levanta el build de producción y mide, con el endpoint /_next/image,
   cuánto ahorra realmente el optimizador por GRUPO de imagen (producto,
   editorial, héroes, iconos). No reportes solo el agregado: el agregado
   queda dominado por las imágenes grandes y oculta que las pequeñas no
   ganan nada.

Con esos datos, aplica las nueve reglas de IMAGES.md:

  1. Recorta deviceSizes e imageSizes a los anchos derivados en el paso 2.
  2. Sube minimumCacheTTL al máximo que tolere el contenido.
  3. Marca unoptimized los grupos cuyo ahorro medido sea menor al 40%, y
     arregla sus fuentes en origen en vez de optimizarlas en producción.
  4. Si —y solo si— el proyecto tiene imágenes de clase B, propón el flujo
     de optimizar al guardar: anchos predefinidos, optimización al momento
     de subir, consumo posterior con unoptimized. Elige la vía según dónde
     guarde el proyecto hoy, sin forzar la adopción de Vercel Blob: sharp en
     un route handler consigue lo mismo con cualquier almacenamiento, y
     putImage solo conviene si Blob ya está en uso (además exige
     credenciales OIDC). Si el proyecto no tiene clase B, dilo y omite el
     punto en vez de inventar un caso de uso.
  5. Revisa que ningún src lleve query params dinámicos ni hashes
     inestables.
  6. Acota remotePatterns, localPatterns y qualities.
  7. Deja un solo formato de salida salvo que una medición justifique dos.
  8. Pasa a <img> nativo lo decorativo y lo de tamaño fijo.
  9. Revisa el `sizes` de cada <Image>. Un `sizes` sin unidades vw pide la
     escalera completa de anchos: si la caja es de tamaño fijo, quita el
     `sizes` y deja width/height numéricos (2 variantes); si es fluida,
     escríbelo en vw reales. Un `fill` sin `sizes` pide todo deviceSizes.
     Reporta cuántos anchos distintos pide cada imagen antes y después.

Entrega:
- Un script versionado, idempotente, que ajuste las fuentes al ancho en que
  se muestran, con su comando en package.json.
- next.config.mjs comentado explicando de dónde sale cada ancho.
- Una tabla antes/después con: techo de transformaciones, transformaciones
  por visita a la ruta más pesada, y peso transferido de esa ruta.
- Verificación de que no hay regresión visual ni de accesibilidad.

Reglas de trabajo:
- Si una medición contradice lo que esperabas, dilo y corrige el rumbo en
  vez de defender la hipótesis.
- No propongas mover las imágenes a un bucket externo como solución al
  consumo de transformaciones: no lo resuelve, y IMAGES.md explica por qué.
- No apagues el optimizador donde sí ahorra. La decisión es por grupo
  medido, no global.
```

---

## Resumen operativo

| | Estática | Dinámica | Remota ajena |
|---|---|---|---|
| Dónde vive | `/public` | Vercel Blob | Host de terceros |
| Cuándo se optimiza | En desarrollo, una vez | Al guardarla, una vez | Nunca si se puede evitar |
| Con qué | Script con `sharp` en el repo | Navegador, `sharp`, `putImage` o tu proveedor | — |
| Cómo se muestra | `unoptimized` o `<img>` | `unoptimized` | `next/image` acotado |
| Costo en producción | **0** | **0 o 1 por imagen** | Variable |

Si tu proyecto solo tiene la primera columna —y es lo más común— el objetivo
es cero, y las reglas 4 y 6 no te aplican.

De las nueve, las dos que más mueven la aguja son la **1** (recortar los anchos
configurados) y la **9** (que cada componente pida solo los que necesita). La
primera limita el techo; la segunda es la que normalmente está rota.
