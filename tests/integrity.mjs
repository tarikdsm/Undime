// Teste de integridade do dataset Undime (Fase 3+).
// Roda sem dependências: `node tests/integrity.mjs`. Sai com código !=0 se falhar.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const UFS = ["AC","AL","AP","AM","BA","CE","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RO","RR","RS","SC","SP","SE","TO"];
const CUTOFF = "2026-06-22";
const fails = [];
const fail = (m) => fails.push(m);

const master = JSON.parse(fs.readFileSync(path.join(ROOT, "data/undime.json"), "utf8"));
const siteCopy = path.join(ROOT, "site/assets/data/undime.json");

// 1. Merge fiel: master == concatenação dos processados; site == master
if (master.estados.length !== 26) fail(`estados=${master.estados.length}, esperado 26`);
if (master.nacional.uf !== "BR") fail("nacional.uf != BR");
for (const uf of UFS) {
  const proc = JSON.parse(fs.readFileSync(path.join(ROOT, `data/processed/${uf}.json`), "utf8"));
  const inMaster = master.estados.find((e) => e.uf === uf);
  if (!inMaster) { fail(`UF ${uf} ausente no master`); continue; }
  if (JSON.stringify(proc) !== JSON.stringify(inMaster)) fail(`UF ${uf}: master diverge de data/processed/${uf}.json`);
}
if (fs.existsSync(siteCopy)) {
  if (Buffer.compare(fs.readFileSync(path.join(ROOT, "data/undime.json")), fs.readFileSync(siteCopy)) !== 0)
    fail("site/assets/data/undime.json difere de data/undime.json");
} else fail("site/assets/data/undime.json ausente");

// 2. Proveniência: todo campo com valor real tem fonte_url, data_coleta ISO e confianca válida
let campos = 0;
const isISO = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || "");
function walk(o, pathStr, ufLabel) {
  if (!o || typeof o !== "object") return;
  if ("valor" in o) {
    campos++;
    const v = String(o.valor);
    if (!v.toLowerCase().includes("não localizado")) {
      if (!o.fonte_url) fail(`${ufLabel} ${pathStr}: fonte_url vazio`);
      if (!isISO(o.data_coleta)) fail(`${ufLabel} ${pathStr}: data_coleta não-ISO`);
      if (!["alta", "media", "baixa"].includes(o.confianca)) fail(`${ufLabel} ${pathStr}: confianca inválida`);
    }
    return;
  }
  for (const k of Object.keys(o)) if (k !== "valor") walk(o[k], `${pathStr}.${k}`, ufLabel);
}
for (const u of [master.nacional, ...master.estados]) walk(u, "", u.uf);

// 3. Eventos: data_inicio >= CUTOFF
let eventos = 0;
for (const u of [master.nacional, ...master.estados]) {
  for (const e of u.eventos || []) {
    eventos++;
    const m = String(e.data_inicio?.valor || "").match(/(\d{4}-\d{2}-\d{2})/);
    if (m && m[1] < CUTOFF) fail(`${u.uf}: evento com data_inicio ${m[1]} < ${CUTOFF}`);
  }
}

// 4. CNPJ: dígito verificador
function cnpjOK(s) {
  const d = (s || "").replace(/\D/g, "");
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;
  const calc = (len) => {
    let sum = 0, pos = len - 7;
    for (let i = len; i >= 1; i--) { sum += +d[len - i] * pos--; if (pos < 2) pos = 9; }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === +d[12] && calc(13) === +d[13];
}
for (const u of [master.nacional, ...master.estados]) {
  const v = u.cnpj?.valor;
  if (v && !v.toLowerCase().includes("não localizado")) {
    const m = v.match(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/);
    if (!m || !cnpjOK(m[0])) fail(`${u.uf}: CNPJ inválido (${v})`);
  }
}

console.log(`Unidades: ${1 + master.estados.length} | campos com valor: ${campos} | eventos: ${eventos}`);
if (fails.length) {
  console.error(`\n❌ FALHAS DE INTEGRIDADE (${fails.length}):`);
  for (const f of fails) console.error("  - " + f);
  process.exit(1);
}
console.log("✅ Integridade OK (merge fiel, proveniência completa, eventos na regra, CNPJs válidos).");
