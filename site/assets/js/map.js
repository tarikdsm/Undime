// map.js — interações do mapa SVG (tooltip, teclado, navegação, realce)
import { UF_NOME, campo } from "./data.js";

const href = (uf) => `estados/${uf.toLowerCase()}.html`;

export function initMap(svg, byUF) {
  if (!svg) return { highlight() {} };
  const paths = [...svg.querySelectorAll("path[data-uf]")];
  const tip = document.createElement("div");
  tip.className = "map-tip";
  tip.setAttribute("role", "status");
  document.body.appendChild(tip);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function label(uf) {
    const nome = UF_NOME[uf] || uf;
    if (uf === "DF") return `${nome}: tratado pela UNDIME nacional (sem seccional própria).`;
    const u = byUF[uf];
    if (!u) return `${nome}: dados não localizados.`;
    const pres = campo(u.diretoria?.presidente?.nome).valor;
    const mun = campo(u.municipios_num).valor;
    const contato = campo(u.contato?.email).valor;
    return `${nome} — presidente: ${pres}. Contato: ${contato}. Municípios: ${mun}.`;
  }

  function showTip(uf, x, y) {
    const nome = UF_NOME[uf] || uf;
    if (uf === "DF") {
      tip.innerHTML = `<strong>${nome}</strong>Sem seccional própria — tratado pela UNDIME nacional.`;
    } else {
      const u = byUF[uf];
      const pres = u ? campo(u.diretoria?.presidente?.nome).valor : "não localizado publicamente";
      const mun = u ? campo(u.municipios_num).valor : "—";
      const contato = u ? campo(u.contato?.email).valor : "—";
      tip.innerHTML = `<strong>${nome}</strong>Presidente: ${pres}<br>Contato: ${contato}<br>Municípios: ${mun}`;
    }
    tip.style.left = Math.min(x + 14, window.innerWidth - 300) + "px";
    tip.style.top = (y + 14) + "px";
    tip.classList.add("show");
  }
  const hideTip = () => tip.classList.remove("show");

  function go(uf) {
    if (uf === "DF") { location.hash = "#nacional"; document.getElementById("nacional")?.focus?.(); return; }
    location.href = href(uf);
  }

  for (const p of paths) {
    const uf = p.getAttribute("data-uf");
    p.setAttribute("role", "button");
    p.setAttribute("tabindex", "0");
    p.setAttribute("aria-label", label(uf));
    p.addEventListener("mousemove", (e) => { if (!reduceMotion) showTip(uf, e.clientX, e.clientY); });
    p.addEventListener("mouseleave", hideTip);
    p.addEventListener("focus", () => {
      const r = p.getBoundingClientRect();
      showTip(uf, r.left + r.width / 2, r.top + r.height / 2);
    });
    p.addEventListener("blur", hideTip);
    p.addEventListener("click", () => go(uf));
    p.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(uf); }
      if (e.key === "Escape") hideTip();
    });
  }
  window.addEventListener("scroll", hideTip, { passive: true });

  return {
    highlight(term) {
      const t = (term || "").trim().toLowerCase();
      for (const p of paths) {
        const uf = p.getAttribute("data-uf");
        const nome = (UF_NOME[uf] || "").toLowerCase();
        const match = !t || uf.toLowerCase().includes(t) || nome.includes(t);
        p.classList.toggle("is-active", !!t && match);
        p.classList.toggle("is-dim", !!t && !match);
      }
    },
  };
}
