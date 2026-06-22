// apply-agy.mjs — aplica os enriquecimentos do busca_AGY.md de forma ADITIVA e auditável.
// Regras: só preenche lacunas (não sobrescreve valor verificado); confianca conservadora (media)
// para itens do AGY não re-verificados; REJEITA mudanças de presidente do AGY (AC/RO/SC, ES portal,
// SP/RJ contatos) por contradizerem a fonte oficial viva. Rodar: node scripts/apply-agy.mjs
import fs from "node:fs";
import path from "node:path";
const ROOT = path.resolve(import.meta.dirname, "..");
const D = "2026-06-22";
const PROC = path.join(ROOT, "data/processed");

const isMissing = (c) => !c || c.valor == null || String(c.valor).toLowerCase().includes("não localizado");
const campo = (valor, fonte_url, confianca = "media") => ({ valor, fonte_url, data_coleta: D, confianca });
const log = [];

function setIfMissing(obj, key, valor, fonte, conf = "media") {
  if (!obj) return;
  if (isMissing(obj[key])) { obj[key] = campo(valor, fonte, conf); log.push(`  + ${key} = ${String(valor).slice(0, 40)}`); }
}
function setSocialIfMissing(u, net, url, conf = "media") {
  u.redes_sociais = u.redes_sociais || {};
  setIfMissing(u.redes_sociais, net, url, url, conf);
}
function mkEvent(titulo, di, df, local, fonte) {
  return {
    titulo: campo(titulo, fonte, "media"), data_inicio: campo(di, fonte, "media"),
    data_fim: campo(df || "não localizado publicamente", fonte, df ? "media" : "baixa"),
    local: campo(local, fonte, "media"),
    inscricao_url: campo("não localizado publicamente", fonte, "baixa"), fonte_url: fonte,
  };
}
const hasEvent = (u, t) => (u.eventos || []).some((e) => String(e.titulo?.valor || "").toLowerCase().includes(t.toLowerCase()));

// ---- Tabela de patches (UF -> {cnpj?, fundacao?, socials?}) ----
const CN = "Receita Federal (Cadastro Nacional da Pessoa Jurídica)";
const patches = {
  AC: { fundacao: ["21/06/1995", CN] , socials: { instagram: "https://www.instagram.com/undimeacre/" } },
  AL: { cnpj: ["69.982.361/0001-87", "https://www.undimeal.com.br/"], socials: { instagram: "https://www.instagram.com/undimeal" } },
  AM: { cnpj: ["02.516.184/0001-72", CN], fundacao: ["25/07/1997", CN] },
  BA: { cnpj: ["32.700.312/0001-02", "https://undimebahia.com.br/"] },
  CE: { cnpj: ["23.727.373/0001-64", "https://undime.org.br/noticia/seccionais"], socials: { instagram: "https://www.instagram.com/undime.ce/", facebook: "https://www.facebook.com/UndimeCE/" } },
  ES: { cnpj: ["36.044.196/0001-63", "https://www.undime-es.org.br/"] },
  GO: { cnpj: ["37.285.699/0001-93", "Serasa Experian"], socials: { youtube: "https://www.youtube.com/@undimegoias4738" } },
  MA: { cnpj: ["02.897.811/0001-62", "https://undime.org.br/seccionais/"], socials: { instagram: "https://www.instagram.com/undimemaranhao/", facebook: "https://pt-br.facebook.com/Undimema/" } },
  MS: { cnpj: ["33.793.092/0001-63", "Diário Oficial de MS"], socials: { instagram: "https://www.instagram.com/undimems/" } },
  PA: { cnpj: ["01.929.316/0001-25", CN], fundacao: ["01/11/1996", CN] },
  PB: { cnpj: ["00.947.659/0001-50", "https://www.undimepb.org.br/"] },
  PR: { cnpj: ["81.398.588/0001-85", "https://undimepr.org.br/"] },
  PI: { cnpj: ["02.271.910/0001-34", "Serasa Experian"], socials: { instagram: "https://www.instagram.com/undimepi/", facebook: "https://www.facebook.com/undimepi/" } },
  RJ: { cnpj: ["73.727.711/0001-36", "https://www.pncp.gov.br/"], socials: { facebook: "https://www.facebook.com/undimerj", youtube: "https://www.youtube.com/@UndimeRJ" } },
  RN: { cnpj: ["00.596.662/0001-76", "Diário Oficial de Jandaíra/RN"], socials: { youtube: "https://www.youtube.com/@UndimeRN" } },
  RS: { cnpj: ["05.387.322/0001-59", "Prefeitura de Caçapava do Sul/RS"], socials: { facebook: "https://pt-br.facebook.com/UndimeRS-325051804277760/", youtube: "https://www.youtube.com/@undimers" } },
  RO: { cnpj: ["15.893.134/0001-56", CN], fundacao: ["08/11/1990", CN] },
  RR: { cnpj: ["02.451.827/0001-47", CN], fundacao: ["03/04/1998", CN] },
  SC: { cnpj: ["79.363.123/0001-47", "https://undime-sc.org.br/"] },
  SP: { cnpj: ["59.480.558/0001-64", "https://undime-sp.org.br/"] },
  SE: { cnpj: ["03.433.577/0001-85", "Serasa Experian"], socials: { instagram: "https://www.instagram.com/undimesergipe/", facebook: "https://www.facebook.com/undimesergipe/" } },
  TO: { cnpj: ["02.963.631/0001-31", CN], fundacao: ["1995", CN] },
  PI2: {}, // placeholder
};

for (const file of fs.readdirSync(PROC)) {
  if (!file.endsWith(".json")) continue;
  const fp = path.join(PROC, file);
  const u = JSON.parse(fs.readFileSync(fp, "utf8"));
  const uf = u.uf;
  const before = JSON.stringify(u);
  log.push(`== ${uf} ==`);

  const p = patches[uf];
  if (p) {
    if (p.cnpj) setIfMissing(u, "cnpj", p.cnpj[0], p.cnpj[1], "media");
    if (p.fundacao) setIfMissing(u, "fundacao", p.fundacao[0], p.fundacao[1], "media");
    if (p.socials) for (const [net, url] of Object.entries(p.socials)) setSocialIfMissing(u, net, url, "media");
  }

  // Financeiro / específicos
  if (uf === "BR") {
    u.financeiro = u.financeiro || {};
    u.financeiro.prestacao_contas_url = campo(
      "Atas, Pareceres e Relatórios Financeiros (auditorias até o exercício 2024); balanço de gestão em vídeo em undime.org.br/balanco-de-gestao/",
      "https://undime.org.br/atas-e-pareceres", "alta");
    log.push("  ~ financeiro.prestacao_contas_url (atualizado p/ URL oficial)");
  }
  if (uf === "PE") {
    setIfMissing(u.financeiro, "contribuicoes",
      "Inscrição no Fórum estadual reflete a anuidade: R$ 450,00 (município adimplente) x R$ 1.500,00 (inadimplente)",
      "https://undimepe.org.br/institucional/inscricoes-abertas-para-o-forum-extraordinario-da-undime-pe-2026", "media");
  }
  if (uf === "SC") {
    setIfMissing(u.financeiro, "prestacao_contas_url",
      "Portal de Transparência (anuidades via Portaria 02/2026 e fluxos mensais)",
      "https://undime-sc.org.br/a-undime/transparencia/", "media");
    if (!hasEvent(u, "Primeira Infância")) {
      u.eventos = u.eventos || [];
      u.eventos.push(mkEvent("Seminário Nacional – Políticas Públicas para a Primeira Infância (apoio/divulgação Undime-SC)",
        "2026-06-22", "2026-06-23", "Brasília/DF — Auditório do Instituto Serzedello Corrêa (TCU)", "https://undime-sc.org.br/"));
      log.push("  + evento: Seminário Primeira Infância (22-23/06)");
    }
  }
  if (uf === "ES") {
    u.diretoria = u.diretoria || {}; u.diretoria.outros = u.diretoria.outros || [];
    if (!u.diretoria.outros.some((o) => String(o.valor || "").includes("Adenilde"))) {
      u.diretoria.outros.push(campo("Vice-presidente: Adenilde Stein Silva — DME de Marechal Floriano/ES (biênio 2025-2027)",
        "https://www.undime-es.org.br/", "media"));
      log.push("  + diretoria.outros: vice-presidente Adenilde Stein Silva");
    }
  }
  if (uf === "AM") {
    if (!hasEvent(u, "Videoconferência")) {
      u.eventos = u.eventos || [];
      u.eventos.push(mkEvent("Videoconferência formativa — o papel da educação empreendedora na gestão municipal",
        "2026-06-23", "2026-06-23", "Online", "https://undime.org.br/"));
      log.push("  + evento: Videoconferência formativa (23/06)");
    }
  }

  if (JSON.stringify(u) !== before) fs.writeFileSync(fp, JSON.stringify(u, null, 2) + "\n", "utf8");
}
console.log(log.join("\n"));
console.log("\napply-agy concluído.");
