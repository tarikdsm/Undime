// home.js — monta a home a partir do undime.json
import { getData, UF_NOME, campo, row, esc, badge, isHttp, urlOf, proximosEventos } from "./data.js";
import { initMap } from "./map.js";
import { announce } from "./a11y.js";

const $ = (s, r = document) => r.querySelector(s);

function renderNacional(n) {
  const el = $("#nacional-dados");
  if (!el) return;
  const d = n.diretoria || {};
  el.innerHTML = [
    row("Nome oficial", n.nome_oficial),
    row("Presidente", d.presidente?.nome),
    row("CNPJ", n.cnpj, { data: true }),
    row("Fundação", n.fundacao, { data: true }),
    row("Sede", n.sede_endereco),
    row("Telefone", n.contato?.telefone, { data: true }),
    row("E-mail", n.contato?.email, { data: true }),
    row("Site", n.contato?.site, { data: true }),
    row("Municípios", n.municipios_num, { data: true }),
    row("Instagram", n.redes_sociais?.instagram, { data: true }),
    row("Facebook", n.redes_sociais?.facebook, { data: true }),
    row("YouTube", n.redes_sociais?.youtube, { data: true }),
  ].join("");
}

function fmtData(valor) {
  const m = String(valor).match(/(\d{4})-(\d{2})(?:-(\d{2}))?/);
  if (!m) return { dia: "", mes: esc(valor) };
  const meses = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  return { dia: m[3] || "", mes: meses[+m[2] - 1] + "/" + m[1] };
}

function renderEventos(data) {
  const el = $("#eventos-lista");
  if (!el) return;
  const evs = proximosEventos(data);
  if (!evs.length) { el.innerHTML = `<p class="empty-state">Nenhum evento futuro (a partir de 22/06/2026) localizado publicamente.</p>`; return; }
  el.innerHTML = evs.map(({ uf, e }) => {
    const t = campo(e.titulo), di = campo(e.data_inicio), loc = campo(e.local), insc = campo(e.inscricao_url);
    const f = fmtData(di.valor);
    const nome = uf === "BR" ? "Nacional" : (UF_NOME[uf] || uf);
    const link = isHttp(insc.valor) ? ` · <a href="${esc(urlOf(insc.valor))}" target="_blank" rel="noopener noreferrer">inscrição ↗</a>` : "";
    const src = isHttp(e.fonte_url) ? `<a class="src-link" href="${esc(urlOf(e.fonte_url))}" target="_blank" rel="noopener noreferrer"><span class="visually-hidden">fonte</span></a>` : "";
    return `<article class="event"><div class="when" aria-hidden="true"><b>${esc(f.dia || "•")}</b>${esc(f.mes)}</div>` +
      `<div class="what"><h3>${esc(t.valor)} ${badge(di.confianca)}</h3>` +
      `<p class="muted"><span class="uf-tag mono">${esc(nome)}</span> · ${esc(loc.valor)} · ${esc(f.dia ? f.dia + " " : "")}${esc(f.mes)}${link} ${src}</p></div></article>`;
  }).join("");
}

function renderListaUF(data, map) {
  const ul = $("#uf-list");
  const sel = $("#uf-select");
  if (!ul) return;
  const items = (data.estados || []).map((s) => ({ uf: s.uf, nome: UF_NOME[s.uf] || s.uf }));
  items.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  ul.innerHTML = items.map((i) =>
    `<li data-nome="${esc(i.nome.toLowerCase())}" data-uf="${i.uf.toLowerCase()}">` +
    `<a href="estados/${i.uf.toLowerCase()}.html"><span>${esc(i.nome)}</span><span class="uf-tag">${i.uf}</span></a></li>`
  ).join("");
  if (sel) {
    sel.innerHTML = `<option value="">Ir para o estado…</option>` +
      items.map((i) => `<option value="${i.uf.toLowerCase()}">${esc(i.nome)} (${i.uf})</option>`).join("");
    sel.addEventListener("change", () => { if (sel.value) location.href = `estados/${sel.value}.html`; });
  }
  const input = $("#uf-search");
  if (input) {
    input.addEventListener("input", () => {
      const t = input.value.trim().toLowerCase();
      let n = 0;
      ul.querySelectorAll("li").forEach((li) => {
        const hit = !t || li.dataset.nome.includes(t) || li.dataset.uf.includes(t);
        li.classList.toggle("hide", !hit);
        if (hit) n++;
      });
      map.highlight(t);
      announce(`${n} estado(s) correspondem a "${input.value}".`);
    });
  }
}

(async function init() {
  try {
    const data = await getData();
    const byUF = Object.fromEntries((data.estados || []).map((s) => [s.uf, s]));
    const map = initMap($("#mapa-svg"), byUF);
    renderNacional(data.nacional);
    renderEventos(data);
    renderListaUF(data, map);
    const g = $("#gerado-em");
    if (g) g.textContent = campo({ valor: data.meta?.gerado_em }).valor;
  } catch (err) {
    const e = $("#erro");
    if (e) e.textContent = "Não foi possível carregar os dados: " + err.message;
    console.error(err);
  }
})();
