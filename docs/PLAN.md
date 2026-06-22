# PLAN — Plano do projeto Undime

> Documento vivo. O subagent `planner` atualiza este arquivo a partir de `data/processed/`.

## Status das fases
- [x] **Fase 0** — Setup (em finalização: ambiente ✓, estrutura ✓, MCPs ✓, subagents, git).
- [ ] **Fase 1** — Reconhecimento e lista-alvo.
- [ ] **Fase 2** — Pesquisa paralela por estado.
- [ ] **Fase 3** — Consolidação (planner → executor → reviewer).
- [ ] **Fase 4** — Construção do site.
- [ ] **Fase 5** — Auditoria independente.
- [ ] **Fase 6** — Commit e deploy.

## Universo-alvo (a confirmar na Fase 1)
- Nacional (UF = `BR`, sede Brasília/DF).
- 26 seccionais estaduais (DF tratado pela nacional).
- Microrregionais: investigar e documentar onde existirem (não forçar).

## Arquitetura do site (a detalhar na Fase 3/4)
- Estático, dados de `site/assets/data/undime.json`.
- Home: mapa SVG do Brasil + busca/filtro + eventos nacionais + dados da nacional.
- Páginas `estados/<uf>.html`: ficha completa com links de fonte e selo de confiança.
