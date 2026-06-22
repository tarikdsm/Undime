// data.js — carregamento do undime.json e helpers de renderização (browser, ES module)
export const UF_NOME = {
  AC:"Acre", AL:"Alagoas", AP:"Amapá", AM:"Amazonas", BA:"Bahia", CE:"Ceará",
  DF:"Distrito Federal", ES:"Espírito Santo", GO:"Goiás", MA:"Maranhão", MT:"Mato Grosso",
  MS:"Mato Grosso do Sul", MG:"Minas Gerais", PA:"Pará", PB:"Paraíba", PR:"Paraná",
  PE:"Pernambuco", PI:"Piauí", RJ:"Rio de Janeiro", RN:"Rio Grande do Norte",
  RS:"Rio Grande do Sul", RO:"Rondônia", RR:"Roraima", SC:"Santa Catarina",
  SP:"São Paulo", SE:"Sergipe", TO:"Tocantins",
};
export const CUTOFF = "2026-06-22";

let _cache = null;
export async function getData() {
  if (_cache) return _cache;
  const res = await fetch("assets/data/undime.json", { cache: "no-cache" });
  if (!res.ok) throw new Error("Falha ao carregar dados: " + res.status);
  _cache = await res.json();
  return _cache;
}

export const urlOf = (s) => (String(s || "").match(/^https?:\/\/[^\s]+/) || [""])[0];
export const isHttp = (u) => !!urlOf(u);

export function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Normaliza um Campo{} com defaults seguros.
export function campo(c) {
  const v = c && typeof c === "object" ? c : {};
  const valor = v.valor ?? "não localizado publicamente";
  const missing = String(valor).toLowerCase().includes("não localizado");
  return { valor, missing, fonte_url: v.fonte_url || "", data_coleta: v.data_coleta || "", confianca: v.confianca || "baixa" };
}

const CONF_LABEL = { alta: "alta", media: "média", baixa: "baixa" };
export function badge(conf) {
  const k = ["alta", "media", "baixa"].includes(conf) ? conf : "baixa";
  return `<span class="badge ${k}"><span class="dot" aria-hidden="true"></span>confiança ${CONF_LABEL[k]}</span>`;
}

// Linha de dado. opts: {data:true} usa fonte mono no valor.
export function row(label, rawCampo, opts = {}) {
  const c = campo(rawCampo);
  const valHTML = c.missing
    ? `<span class="v-missing">${esc(c.valor)}</span>`
    : esc(c.valor);
  const src = isHttp(c.fonte_url)
    ? `<a class="src-link" href="${esc(urlOf(c.fonte_url))}" target="_blank" rel="noopener noreferrer" title="Abre a fonte em nova aba"><span class="visually-hidden">fonte (abre em nova aba)</span></a>`
    : (c.fonte_url ? `<span class="collected" title="fonte (registro local)">fonte: ${esc(c.fonte_url)}</span>` : "");
  const when = c.data_coleta ? `<time class="collected" datetime="${esc(c.data_coleta)}" title="coletado em">${esc(c.data_coleta)}</time>` : "";
  return `<div class="data-row"><div class="label">${esc(label)}</div>` +
    `<div class="value${opts.data ? " is-data" : ""}">${valHTML} ${badge(c.confianca)} ${src} ${when}</div></div>`;
}

// Agrega eventos (nacional + estados) com data_inicio >= CUTOFF, ordenados asc.
export function proximosEventos(data) {
  const out = [];
  const push = (u, uf) => (u.eventos || []).forEach((e) => out.push({ uf, e }));
  push(data.nacional, "BR");
  (data.estados || []).forEach((s) => push(s, s.uf));
  const key = (it) => (String(campo(it.e.data_inicio).valor).match(/\d{4}-\d{2}(-\d{2})?/) || ["9999-99"])[0];
  // trava anti-duplicata: mesmo dia + mesma cidade/UF (fórum listado em duas unidades)
  const dedupKey = (it) => key(it) + "|" + String(campo(it.e.local).valor).toLowerCase().replace(/[^a-z]/g, "").slice(0, 12);
  const seen = new Set();
  return out
    .filter((it) => key(it) >= CUTOFF.slice(0, key(it).length))
    .filter((it) => { const k = dedupKey(it); if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => key(a).localeCompare(key(b)));
}
