import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const root = process.cwd();
const srcDir = join(root, "src");
const exts = new Set([".scss", ".css", ".ts", ".tsx", ".js", ".jsx"]);

const checks = [
  { name: "width: 100vw", regex: /\bwidth\s*:\s*100vw\b/i, risk: "alto" },
  { name: "left negativo", regex: /\bleft\s*:\s*-\d/i, risk: "medio" },
  { name: "right negativo", regex: /\bright\s*:\s*-\d/i, risk: "medio" },
  {
    name: "translateX extremo",
    regex: /translateX\(\s*-?(?:100%|\d{3,}px)\s*\)/i,
    risk: "medio",
  },
  {
    name: "min-width >= 320px",
    regex: /^\s*min-width\s*:\s*(?:3[2-9]\d|[4-9]\d\d|\d{4,})px\b/i,
    risk: "bajo",
  },
];

const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (exts.has(extname(fullPath))) {
      files.push(fullPath);
    }
  }
}

function getLineMatches(content, regex) {
  const lines = content.split(/\r?\n/);
  const matches = [];
  for (let i = 0; i < lines.length; i++) {
    if (regex.test(lines[i])) {
      matches.push({ line: i + 1, text: lines[i].trim() });
    }
  }
  return matches;
}

walk(srcDir);

const results = [];
for (const file of files) {
  const content = readFileSync(file, "utf8");
  for (const check of checks) {
    const matches = getLineMatches(content, check.regex);
    if (matches.length > 0) {
      results.push({
        file: relative(root, file).replace(/\\/g, "/"),
        check: check.name,
        risk: check.risk,
        matches,
      });
    }
  }
}

if (results.length === 0) {
  console.log("✅ No se detectaron patrones típicos de overflow horizontal.");
  process.exit(0);
}

console.log("⚠️ Posibles fuentes de scroll horizontal encontradas:\n");
for (const result of results) {
  console.log(`- ${result.file} | ${result.check} | riesgo: ${result.risk}`);
  for (const match of result.matches.slice(0, 3)) {
    console.log(`  L${match.line}: ${match.text}`);
  }
  if (result.matches.length > 3) {
    console.log(`  ... y ${result.matches.length - 3} coincidencia(s) más`);
  }
}

console.log("\nSugerencia: priorizar primero los casos de riesgo ALTO.");
process.exit(0);
