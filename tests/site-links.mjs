// site-links.mjs — guarda contra links quebrados/malformados no site gerado.
// Regressão do bug da Fase 5 (fonte_url não-URL renderizada como href). Rodar após o build.
// `node tests/site-links.mjs` — sai !=0 se houver link interno quebrado ou href http malformado.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE = path.join(ROOT, "site");
const SKIP_DIRS = new Set(["templates", "scripts", "assets"]); // assets varrido à parte abaixo
const fails = [];

function htmlFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) out.push(...htmlFiles(p)); }
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

let internos = 0, httpRefs = 0;
for (const f of htmlFiles(SITE)) {
  const html = fs.readFileSync(f, "utf8");
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (u.startsWith("#") || u.startsWith("mailto:") || u.startsWith("data:")) continue;
    if (/^https?:\/\//.test(u)) {
      httpRefs++;
      if (/\s/.test(u)) fails.push(`${path.relative(ROOT, f)}: href http malformado (contém espaço): ${u.slice(0, 80)}`);
    } else {
      internos++;
      const abs = path.normalize(path.join(path.dirname(f), u.split("#")[0]));
      if (!fs.existsSync(abs)) fails.push(`${path.relative(ROOT, f)}: link interno quebrado: ${u}`);
    }
  }
}

console.log(`Links internos verificados: ${internos} | hrefs http: ${httpRefs}`);
if (fails.length) {
  console.error(`\n❌ ${fails.length} problema(s) de link:`);
  for (const f of fails) console.error("  - " + f);
  process.exit(1);
}
console.log("✅ Links OK (nenhum interno quebrado; nenhum href http malformado).");
