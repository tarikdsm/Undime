# SPECIFICATION — Especificação do site

> Preenchido na **Fase 3** pelo `planner` e usado pelo `executor` na Fase 4.

## Escopo
Site estático, responsivo, cross-browser (Chrome, Edge, Firefox, Safari), PT-BR.

## Páginas
- **Home (`index.html`):** mapa do Brasil em SVG inline + busca/filtro por estado + próximos eventos nacionais + dados da UNDIME nacional.
- **Estado (`estados/<uf>.html`):** todos os campos do esquema, com links de fonte visíveis, selo de confiança e eventos (a partir de 2026-06-22) ordenados por data.

## Mapa SVG
- Cada estado um `<path id="ES">` etc.
- Hover → tooltip (presidente, contato, nº de municípios).
- Clique → `estados/<uf>.html`.
- Fallback acessível: lista/`<select>` navegável por teclado e leitor de tela.

## Dados
- Carregados de `assets/data/undime.json` (sem hardcode).

## Qualidade
- WCAG AA. Lighthouse ≥ 90 (Performance e Acessibilidade). Lazy-load onde fizer sentido.

*(Detalhamento de layout/componentes/tokens visuais "editorial-tech" a definir na Fase 3.)*
