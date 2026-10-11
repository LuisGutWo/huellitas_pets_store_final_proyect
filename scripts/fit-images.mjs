#!/usr/bin/env node
/**
 * Ajusta las imágenes de origen al tamaño máximo al que se muestran.
 *
 * El sitio sirve las fotos de producto sin pasar por el optimizador de Vercel,
 * porque ese recurso se factura por transformación y sobre estas imágenes
 * apenas ahorra: medido sobre las 57, el optimizador baja de 841 KB a 658 KB,
 * y solo 7 de ellas ahorran más del 40%. Esas 7 son justamente las que tienen
 * la fuente más grande de lo que el layout muestra.
 *
 * Arreglarlas en origen captura casi todo ese ahorro de forma permanente y
 * sin gastar cuota. Lo que este script hace, una vez, es dejar cada imagen al
 * ancho máximo que el diseño le pide:
 *
 *   producto    800px   se sirven sin optimizador, así que el archivo de origen
 *                       es el que llega al navegador. 800px cubre la ficha de
 *                       catálogo (230px) hasta densidad triple y la ficha de
 *                       detalle (662px) en pantallas normales.
 *   editorial  1920px   héroes, fondos y blog: estas sí pasan por el
 *                       optimizador, que se encarga de bajarlas por viewport.
 *                       El tope solo evita desplegar un fondo de 7622px.
 *
 * Ejecutar con `npm run images:fit`. Es idempotente: una imagen que ya está
 * por debajo de su tope no se toca.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/assets/img";

// Las fotos referenciadas desde el catálogo son "producto"; el resto es
// material editorial y de marca, que sí se muestra grande.
const productImages = new Set(
  [
    ...readFileSync("lib/data/products.ts", "utf8").matchAll(
      /image: "\/assets\/img\/([^"]+)"/g
    ),
  ].map((m) => m[1])
);

const TOPE_PRODUCTO = 800;
const TOPE_EDITORIAL = 1920;

const kb = (n) => (n / 1024).toFixed(0).padStart(5) + " KB";

const files = readdirSync(DIR).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));

let tocadas = 0;
let antes = 0;
let despues = 0;

console.log(`\n  Ajustando ${files.length} imágenes en ${DIR}\n`);

for (const file of files) {
  const ruta = join(DIR, file);
  const original = statSync(ruta).size;
  const tope = productImages.has(file) ? TOPE_PRODUCTO : TOPE_EDITORIAL;

  const entrada = sharp(readFileSync(ruta));
  const { width, height, format } = await entrada.metadata();

  antes += original;

  if (!width || width <= tope) {
    despues += original;
    continue;
  }

  // Se reescribe en el mismo formato: el proyecto sirve WebP y no queremos
  // que un redimensionado cambie el tipo de archivo bajo los pies del código.
  const salida = await sharp(readFileSync(ruta))
    .resize({ width: tope, withoutEnlargement: true })
    .toFormat(format === "png" ? "png" : "webp", { quality: 82 })
    .toBuffer();

  // Si el redimensionado no mejora, se deja la original en paz.
  if (salida.length >= original) {
    despues += original;
    console.log(`    =  ${kb(original)}  ${file}  (${width}px, no mejora)`);
    continue;
  }

  writeFileSync(ruta, salida);
  despues += salida.length;
  tocadas += 1;
  console.log(
    `    ↓  ${kb(original)} → ${kb(salida.length)}  ${file}  (${width}px → ${tope}px)`
  );
}

console.log(`\n  ${tocadas} imágenes ajustadas`);
console.log(`  carpeta: ${kb(antes)} → ${kb(despues)}\n`);
