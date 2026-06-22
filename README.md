# Undime — Site nacional das UNDIMEs

Site estático que mapeia a **UNDIME nacional** (Brasília/DF), as **26 seccionais estaduais** e eventuais **microrregionais**, com dados públicos rastreáveis (proveniência por campo) e um **mapa do Brasil em SVG** como porta de entrada.

> UNDIME = União Nacional dos Dirigentes Municipais de Educação.

## Princípios
- **Zero alucinação:** todo dado tem `fonte_url`, `data_coleta` e `confianca`. Dado ausente → `"não localizado publicamente"`.
- **Estático e acessível:** sem framework pesado; WCAG AA; cross-browser; Lighthouse ≥ 90.
- Ver [`CLAUDE.md`](./CLAUDE.md) / [`AGENTS.md`](./AGENTS.md) para as regras completas.

## Estrutura
```
docs/        PLAN, SPECIFICATION, SOURCES, DATA_SCHEMA, AUDIT
data/raw/    coleta bruta por UF
data/processed/  <uf>.json normalizado (esquema com proveniência)
data/undime.json dataset mestre consolidado
site/        fonte do GitHub Pages (index, estados/<uf>.html, assets/)
.claude/     subagents e slash commands
```

## Fases
0. Setup · 1. Reconhecimento · 2. Pesquisa por estado · 3. Consolidação · 4. Site · 5. Auditoria · 6. Deploy

## Stack de coleta (sem custos)
WebSearch/WebFetch · Playwright MCP · Chrome DevTools MCP · `grok` (X) · Context7 (docs).

## Deploy
GitHub Pages (a habilitar) → `https://tarikdsm.github.io/Undime`.
