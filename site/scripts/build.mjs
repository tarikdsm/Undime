// build.mjs — gera site/estados/<uf>.html a partir de data/undime.json + templates/estado.html
// Sem dependências externas (node:fs, node:path). Rodar: node site/scripts/build.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const SITE = path.join(ROOT, "site");
const CUTOFF = "2026-06-22";
const UF_NOME = {
  AC:"Acre",AL:"Alagoas",AP:"Amapá",AM:"Amazonas",BA:"Bahia",CE:"Ceará",ES:"Espírito Santo",
  GO:"Goiás",MA:"Maranhão",MT:"Mato Grosso",MS:"Mato Grosso do Sul",MG:"Minas Gerais",PA:"Pará",
  PB:"Paraíba",PR:"Paraná",PE:"Pernambuco",PI:"Piauí",RJ:"Rio de Janeiro",RN:"Rio Grande do Norte",
  RS:"Rio Grande do Sul",RO:"Rondônia",RR:"Roraima",SC:"Santa Catarina",SP:"São Paulo",SE:"Sergipe",TO:"Tocantins",
};

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const urlOf = (s) => (String(s || "").match(/^https?:\/\/[^\s]+/) || [""])[0]; // 1ª URL limpa (ignora texto anexado)
const isHttp = (u) => !!urlOf(u);
function campo(c) {
  const v = c && typeof c === "object" ? c : {};
  const valor = v.valor ?? "não localizado publicamente";
  const missing = String(valor).toLowerCase().includes("não localizado");
  return { valor, missing, fonte_url: v.fonte_url || "", data_coleta: v.data_coleta || "", confianca: v.confianca || "baixa" };
}
const CONF = { alta:"alta", media:"média", baixa:"baixa" };
const badge = (conf) => { const k = ["alta","media","baixa"].includes(conf) ? conf : "baixa"; return `<span class="badge ${k}"><span class="dot" aria-hidden="true"></span>confiança ${CONF[k]}</span>`; };

function row(label, raw, opts = {}) {
  const c = campo(raw);
  const val = c.missing ? `<span class="v-missing">${esc(c.valor)}</span>` : esc(c.valor);
  const src = isHttp(c.fonte_url)
    ? `<a class="src-link" href="${esc(urlOf(c.fonte_url))}" target="_blank" rel="noopener noreferrer"><span class="visually-hidden">fonte (abre em nova aba)</span></a>`
    : (c.fonte_url ? `<span class="collected" title="fonte (registro local)">fonte: ${esc(c.fonte_url)}</span>` : "");
  const when = c.data_coleta ? `<time class="collected" datetime="${esc(c.data_coleta)}" title="coletado em">${esc(c.data_coleta)}</time>` : "";
  return `<div class="data-row"><div class="label">${esc(label)}</div><div class="value${opts.data ? " is-data" : ""}">${val} ${badge(c.confianca)} ${src} ${when}</div></div>`;
}
function rowsList(label, arr) {
  if (!Array.isArray(arr) || !arr.length) return row(label, null);
  return arr.map((item, i) => row(i === 0 ? label : "", item)).join("");
}
function card(titulo, inner) { return `<section class="card stack"><h2>${esc(titulo)}</h2><div class="data-list">${inner}</div></section>`; }

function eventosHTML(u) {
  const meses = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  const key = (e) => (String(campo(e.data_inicio).valor).match(/\d{4}-\d{2}(-\d{2})?/) || ["9999-99"])[0];
  const evs = (u.eventos || []).filter((e) => key(e) >= CUTOFF.slice(0, key(e).length)).sort((a, b) => key(a).localeCompare(key(b)));
  if (!evs.length) return `<p class="empty-state">Nenhum evento futuro (a partir de 22/06/2026) localizado publicamente.</p>`;
  return evs.map((e) => {
    const t = campo(e.titulo), di = campo(e.data_inicio), loc = campo(e.local), insc = campo(e.inscricao_url);
    const m = String(di.valor).match(/(\d{4})-(\d{2})(?:-(\d{2}))?/);
    const when = m ? `<b>${m[3] || "•"}</b>${meses[+m[2]-1]}/${m[1]}` : `<b>•</b>${esc(di.valor)}`;
    const link = !insc.missing ? ` · <a href="${esc(insc.valor)}" target="_blank" rel="noopener noreferrer">inscrição ↗</a>` : "";
    const src = isHttp(e.fonte_url) ? `<a class="src-link" href="${esc(urlOf(e.fonte_url))}" target="_blank" rel="noopener noreferrer"><span class="visually-hidden">fonte</span></a>` : "";
    return `<article class="event"><div class="when" aria-hidden="true">${when}</div><div class="what"><h3>${esc(t.valor)} ${badge(di.confianca)}</h3><p class="muted">${esc(loc.valor)}${link} ${src}</p></div></article>`;
  }).join("");
}

function mainHTML(u) {
  const nome = campo(u.nome_oficial).valor;
  const r = u.redes_sociais || {}, c = u.contato || {}, d = u.diretoria || {}, f = u.financeiro || {};
  const fontes = (u.fontes_consultadas || []).map((x) => {
    const u0 = urlOf(x);
    if (!u0) return `<li class="muted" title="registro local de proveniência">${esc(x)}</li>`;
    const rest = String(x).slice(u0.length).trim();
    return `<li><a href="${esc(u0)}" target="_blank" rel="noopener noreferrer">${esc(u0)}</a>${rest ? ` <span class="muted">${esc(rest)}</span>` : ""}</li>`;
  }).join("") || "<li class='muted'>não localizado publicamente</li>";
  const lacunas = (u.lacunas || []).map((x) => `<li>${esc(x)}</li>`).join("") || "<li class='muted'>—</li>";
  return `
  <p class="crumb"><a href="../index.html">Brasil</a> › ${esc(u.uf)}</p>
  <div class="state-head">
    <span class="uf-badge">${esc(u.uf)}</span>
    <h1>${esc(nome)}</h1>
  </div>
  <div class="cols">
    ${card("Identificação", row("Nome oficial", u.nome_oficial) + row("CNPJ", u.cnpj, {data:true}) + row("Fundação", u.fundacao, {data:true}) + row("Sede", u.sede_endereco) + row("Municípios", u.municipios_num, {data:true}) + row("Associados", u.associados_num, {data:true}))}
    ${card("Contato", row("Telefone", c.telefone, {data:true}) + row("E-mail", c.email, {data:true}) + row("Site", c.site, {data:true}) + row("Portal estadual", c.portal_estadual, {data:true}))}
    ${card("Diretoria", row("Presidente", d.presidente?.nome) + row("Município de origem", d.presidente?.municipio_origem) + row("Secretaria executiva", d.secretaria_executiva) + rowsList("Conselho fiscal", d.conselho_fiscal) + rowsList("Outros cargos", d.outros))}
    ${card("Redes sociais", row("Instagram", r.instagram, {data:true}) + row("Facebook", r.facebook, {data:true}) + row("X (Twitter)", r.x, {data:true}) + row("YouTube", r.youtube, {data:true}) + row("LinkedIn", r.linkedin, {data:true}))}
    ${card("Financeiro", row("Receitas", f.receitas, {data:true}) + row("Contribuições", f.contribuicoes, {data:true}) + row("Prestação de contas", f.prestacao_contas_url, {data:true}))}
    <section class="card stack"><h2>Eventos</h2>${eventosHTML(u)}</section>
  </div>
  <section class="card stack">
    <h2>Fontes &amp; lacunas</h2>
    <h3>Fontes consultadas</h3><ul class="src-urls">${fontes}</ul>
    <h3>Lacunas</h3><ul class="chips">${lacunas}</ul>
  </section>`;
}

// ---- execução ----
const master = JSON.parse(fs.readFileSync(path.join(ROOT, "data/undime.json"), "utf8"));
fs.mkdirSync(path.join(SITE, "assets/data"), { recursive: true });
fs.copyFileSync(path.join(ROOT, "data/undime.json"), path.join(SITE, "assets/data/undime.json"));
const tpl = fs.readFileSync(path.join(SITE, "templates/estado.html"), "utf8");
fs.mkdirSync(path.join(SITE, "estados"), { recursive: true });

// index.html (injeta o SVG inline a partir de assets/img/brasil.svg)
const svgRaw = fs.readFileSync(path.join(SITE, "assets/img/brasil.svg"), "utf8")
  .replace('class="brasil-map"', 'id="mapa-svg" class="brasil-map"');
const idxTpl = fs.readFileSync(path.join(SITE, "templates/index.html"), "utf8");
fs.writeFileSync(path.join(SITE, "index.html"),
  idxTpl.replace("{{BRASIL_SVG}}", svgRaw).replaceAll("{{GERADO}}", esc(master.meta?.gerado_em || "")),
  "utf8");

let n = 0;
for (const u of master.estados) {
  const nome = campo(u.nome_oficial).valor;
  const desc = `UNDIME ${UF_NOME[u.uf] || u.uf}: presidente, contato, diretoria, redes e eventos — dados públicos com fonte e selo de confiança.`;
  const html = tpl
    .replaceAll("{{UF}}", esc(u.uf))
    .replaceAll("{{NOME}}", esc(nome))
    .replaceAll("{{TITLE}}", `${esc(nome)} (${esc(u.uf)}) · UNDIME Brasil`)
    .replaceAll("{{DESC}}", esc(desc))
    .replaceAll("{{GERADO}}", esc(master.meta?.gerado_em || ""))
    .replace("{{MAIN}}", mainHTML(u));
  fs.writeFileSync(path.join(SITE, "estados", `${u.uf.toLowerCase()}.html`), html, "utf8");
  n++;
}
console.log(`build: ${n} páginas de estado geradas; undime.json copiado para site/assets/data/.`);
