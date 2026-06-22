# PLAN — Plano do projeto Undime

> Documento vivo. O subagent `planner` atualiza este arquivo a partir de `data/processed/`.

## Status das fases
- [x] **Fase 0** — Setup (ambiente ✓, estrutura ✓, MCPs ✓, subagents ✓, git ✓).
- [x] **Fase 1** — Reconhecimento e lista-alvo (ver `docs/SOURCES.md`). Universo confirmado; plano de lotes definido.
- [ ] **Fase 2** — Pesquisa paralela por estado (aguardando OK).
- [ ] **Fase 3** — Consolidação (planner → executor → reviewer).
- [ ] **Fase 4** — Construção do site.
- [ ] **Fase 5** — Auditoria independente.
- [ ] **Fase 6** — Commit e deploy.

## Universo confirmado (Fase 1)
- Nacional (UF = `BR`, sede Brasília/DF).
- **26 seccionais estaduais.** DF **sem seccional própria** (tratado pela nacional) — confirmado na fonte oficial.
- 5 Presidências Regionais (CO, NE, N, SE, S) — estrutura nacional.
- Microrregionais: nenhuma localizada ainda; investigar por estado na Fase 2 (não forçar).
- 8 portais estaduais no ar (BA, PE, GO, MT, MG, SP, PR, SC); RS em erro 500; SE não resolve; demais 16 sem portal próprio.

## Arquitetura do site (a detalhar na Fase 3/4)
- Estático, dados de `site/assets/data/undime.json`.
- Home: mapa SVG do Brasil + busca/filtro + eventos nacionais + dados da nacional.
- Páginas `estados/<uf>.html`: ficha completa com links de fonte e selo de confiança.
