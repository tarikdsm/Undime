# PLAN — Plano do projeto Undime

> Documento vivo. O subagent `planner` atualiza este arquivo a partir de `data/processed/`.

## Status das fases
- [x] **Fase 0** — Setup (ambiente ✓, estrutura ✓, MCPs ✓, subagents ✓, git ✓).
- [x] **Fase 1** — Reconhecimento e lista-alvo (ver `docs/SOURCES.md`). Universo confirmado; plano de lotes definido.
- [x] **Fase 2** — Pesquisa paralela por estado (27 unidades em `data/processed/`).
- [~] **Fase 3** — Consolidação **em andamento** (planner → executor → reviewer).
      Dataset mestre consolidado em `data/undime.json` (1 nacional + 26 estados).
      `docs/SPECIFICATION.md` (site editorial-tech) e `docs/CONSOLIDACAO.md`
      (divergências por unidade) escritos. Aguardando passagem do `reviewer`.
- [ ] **Fase 4** — Construção do site (spec pronta em `docs/SPECIFICATION.md`).
- [ ] **Fase 5** — Auditoria independente.
- [ ] **Fase 6** — Commit e deploy.

## Universo confirmado (Fase 1 → reconfirmado na Fase 3)
- Nacional (UF = `BR`, sede Brasília/DF). Total de unidades no dataset: **27** (1 nacional + 26 estados).
- **26 seccionais estaduais.** DF **sem seccional própria** (tratado pela nacional) — confirmado na fonte oficial.
- 5 Presidências Regionais (CO, NE, N, SE, S) — estrutura nacional (em `nacional.diretoria.outros`).
- Microrregionais: nenhuma seccional microrregional autônoma localizada na Fase 2 (RS lista representação por
  associações microrregionais no conselho, mas não como unidades próprias) — não forçado.
- **Portais estaduais próprios no ar (Fase 3):** AL (`undimeal.com.br`), BA, MG, MT, PE, PR, SC (`undime-sc.org.br`),
  SP (`undime-sp.org.br`), ES (`undime-es.org.br`), PB (`undimepb.org.br`). MS usa portal de eventos +
  estrutura Assomasul. Instáveis/HTTP 500: AC, CE, GO, MA, PI, RJ, RN, RS, ES (`es.undime.org.br`). Sem portal:
  AM, AP, PA, RO, RR, SE, TO. (Detalhe e divergências em `docs/CONSOLIDACAO.md`.)

## Arquitetura do site (a detalhar na Fase 3/4)
- Estático, dados de `site/assets/data/undime.json`.
- Home: mapa SVG do Brasil + busca/filtro + eventos nacionais + dados da nacional.
- Páginas `estados/<uf>.html`: ficha completa com links de fonte e selo de confiança.
