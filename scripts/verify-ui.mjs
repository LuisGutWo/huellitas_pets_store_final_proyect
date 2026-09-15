#!/usr/bin/env node
/**
 * Verificación de UI sobre el DOM renderizado.
 *
 * Mide dos cosas que las capturas de pantalla no muestran y la revisión a ojo
 * deja pasar:
 *
 *   1. Contraste WCAG AA — color computado contra el fondo realmente pintado,
 *      recorriendo los ancestros hasta encontrar uno opaco. Esto detecta
 *      tokens rotos: una variable que apunta a otra que ya no existe deja el
 *      color en el heredado y la página sigue "viéndose bien" en miniatura.
 *   2. Desborde horizontal — si el documento scrollea de lado, nombra qué
 *      elemento lo causa. Una caja que se pasa pero queda recortada no cuenta:
 *      los sangrados a sangre se pasan a propósito.
 *
 * Uso:
 *   npm run build && npm start &
 *   node scripts/verify-ui.mjs                       # http://localhost:3000
 *   node scripts/verify-ui.mjs http://localhost:3001
 *
 * Sale con código 1 si encuentra algún fallo, así que sirve en CI.
 */

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const ROUTES = [
  "/",
  "/productos",
  "/productos/prestige-adulto-mini",
  "/carrito",
  "/favoritos",
  "/blog",
  "/nosotros",
  "/contacto",
  "/cuenta/ingresar",
];

const WIDTHS = [390, 768, 1440];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const findChrome = () => {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    console.error(
      "No se encontró Chrome ni Edge. Define CHROME_PATH apuntando al ejecutable."
    );
    process.exit(2);
  }
  return found;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ */
/* Script que corre dentro de la página                                */
/* ------------------------------------------------------------------ */

const AUDIT = String.raw`
(() => {
  // Chrome serializa color-mix() como color(srgb r g b) con canales en 0..1,
  // no en 0..255. Tratarlos como 0..255 da casi negro y llena el informe de
  // falsos positivos.
  const parse = (c) => {
    if (!c) return null;
    const s = c.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?/);
    if (s) return { r: +s[1] * 255, g: +s[2] * 255, b: +s[3] * 255, a: s[4] === undefined ? 1 : +s[4] };
    const m = c.match(/[\d.]+/g);
    if (!m || m.length < 3) return null;
    return { r: +m[0], g: +m[1], b: +m[2], a: m.length > 3 ? +m[3] : 1 };
  };

  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const L = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (f, b) => {
    const a = L(f), z = L(b);
    const [hi, lo] = a > z ? [a, z] : [z, a];
    return (hi + 0.05) / (lo + 0.05);
  };

  // El fondo real es el del primer ancestro opaco, no el declarado en el
  // propio elemento (que suele ser transparente).
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.85) return c;
      n = n.parentElement;
    }
    return parse(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
  };

  const rgb = (c) => "rgb(" + Math.round(c.r) + ", " + Math.round(c.g) + ", " + Math.round(c.b) + ")";

  const contrast = [];
  document.querySelectorAll("body *").forEach((el) => {
    // El skip link vive fuera de pantalla a propósito.
    if (el.closest(".skipLink, .visuallyHidden")) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity < 0.1) return;
    // Solo elementos con texto propio: si no, se cuenta el mismo texto por
    // cada ancestro que lo contiene.
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!own) return;
    const box = el.getBoundingClientRect();
    if (box.width < 2 || box.height < 2) return;

    const fg = parse(cs.color);
    if (!fg || fg.a < 0.9) return;
    const bg = bgOf(el);
    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    // WCAG: "texto grande" es >=24px, o >=18.66px en negrita.
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const min = large ? 3 : 4.5;
    const got = ratio(fg, bg);
    if (got < min - 0.01) {
      contrast.push({
        got: Math.round(got * 100) / 100,
        min,
        size: Math.round(size * 10) / 10,
        weight,
        fg: rgb(fg),
        bg: rgb(bg),
        text: el.textContent.trim().slice(0, 40),
      });
    }
  });

  // El defecto que importa es que la página scrollee de lado, no que una caja
  // se pase y quede recortada: un sangrado a sangre se pasa a propósito, y
  // 100vw incluye la barra de scroll, así que siempre se pasa por ese ancho.
  // Solo si el documento realmente scrollea vale la pena nombrar culpables.
  const vw = document.documentElement.clientWidth;
  const scrolls = document.documentElement.scrollWidth > vw + 1;
  const overflow = [];
  if (scrolls) {
    document.querySelectorAll("*").forEach((el) => {
      if (el.closest(".skipLink, .visuallyHidden")) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.right > vw + 1 || r.left < -1) {
        overflow.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className?.baseVal ?? el.className ?? "").slice(0, 40),
          left: Math.round(r.left),
          right: Math.round(r.right),
          text: (el.textContent || "").trim().slice(0, 30),
        });
      }
    });
  }

  return JSON.stringify({
    viewport: vw,
    scrollWidth: document.documentElement.scrollWidth,
    contrast: contrast.slice(0, 20),
    overflow: overflow.slice(0, 10),
  });
})()`;

/* ------------------------------------------------------------------ */
/* Cliente mínimo del protocolo de DevTools                            */
/* ------------------------------------------------------------------ */

class Devtools {
  #ws;
  #id = 0;
  #pending = new Map();

  static async connect(port) {
    const list = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
    const page = list.find((t) => t.type === "page");
    if (!page) throw new Error("Chrome no expuso ninguna pestaña");
    const dt = new Devtools();
    await dt.#open(page.webSocketDebuggerUrl);
    return dt;
  }

  #open(url) {
    this.#ws = new WebSocket(url);
    this.#ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      const waiter = this.#pending.get(msg.id);
      if (!waiter) return;
      this.#pending.delete(msg.id);
      msg.error ? waiter.reject(new Error(JSON.stringify(msg.error))) : waiter.resolve(msg.result);
    });
    return new Promise((resolve) => this.#ws.addEventListener("open", resolve));
  }

  send(method, params = {}) {
    const id = ++this.#id;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject });
      this.#ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.#ws.close();
  }
}

/* ------------------------------------------------------------------ */

const main = async () => {
  const chrome = findChrome();
  const profile = mkdtempSync(join(tmpdir(), "verify-ui-"));
  const port = 9333;

  const child = spawn(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--disable-extensions",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: "ignore", detached: false }
  );

  const cleanup = () => {
    try { child.kill(); } catch {}
    try { rmSync(profile, { recursive: true, force: true }); } catch {}
  };
  process.on("exit", cleanup);
  process.on("SIGINT", () => { cleanup(); process.exit(130); });

  // Espera a que el puerto de depuración responda.
  let dt = null;
  for (let attempt = 0; attempt < 30 && !dt; attempt += 1) {
    await sleep(400);
    try { dt = await Devtools.connect(port); } catch { /* sigue esperando */ }
  }
  if (!dt) {
    console.error("Chrome no respondió en el puerto de depuración.");
    cleanup();
    process.exit(2);
  }

  await dt.send("Page.enable");
  await dt.send("Network.enable");
  // Sin esto, un build nuevo se sirve con los chunks cacheados del anterior.
  await dt.send("Network.setCacheDisabled", { cacheDisabled: true });

  let failures = 0;
  console.log(`\nVerificando ${BASE}\n`);

  for (const width of WIDTHS) {
    console.log(`  ── ${width}px ${"─".repeat(46)}`);
    await dt.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: width < 700 ? 844 : 900,
      deviceScaleFactor: 1,
      mobile: width < 700,
    });

    for (const route of ROUTES) {
      await dt.send("Page.navigate", { url: BASE + route });
      await sleep(1400);

      // Asienta las entradas de GSAP: un elemento a medio animar se mide mal.
      await dt.send("Runtime.evaluate", {
        expression:
          "(()=>{const g=window.gsap;if(g&&g.globalTimeline)g.globalTimeline.progress(1);window.scrollTo(0,0);return 1})()",
      });
      await sleep(250);

      const res = await dt.send("Runtime.evaluate", {
        expression: AUDIT,
        returnByValue: true,
      });
      const out = JSON.parse(res.result.value);
      const problems = out.contrast.length + out.overflow.length;

      if (problems === 0) {
        console.log(`     ok   ${route}`);
        continue;
      }

      failures += problems;
      console.log(`     FALLA ${route}`);
      if (out.overflow.length > 0) {
        console.log(
          `        la página scrollea de lado: ${out.scrollWidth}px de ancho en un viewport de ${out.viewport}px`
        );
      }
      out.overflow.forEach((o) =>
        console.log(
          `        desborde  <${o.tag}${o.cls ? "." + o.cls : ""}> llega a ${o.right}px  "${o.text}"`
        )
      );
      out.contrast.forEach((c) =>
        console.log(
          `        contraste ${c.got}:1 (mín ${c.min})  ${c.size}px/${c.weight}  ${c.fg} sobre ${c.bg}  "${c.text}"`
        )
      );
    }
    console.log("");
  }

  dt.close();
  cleanup();

  if (failures > 0) {
    console.log(`${failures} fallo(s). Ver detalle arriba.\n`);
    process.exit(1);
  }
  console.log(`Sin fallos: contraste AA y cero desbordes en ${ROUTES.length} rutas × ${WIDTHS.length} anchos.\n`);
};

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
