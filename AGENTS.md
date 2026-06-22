# AGENTS.md — Regras do Projeto "Undime"

> Espelho das diretrizes para agentes Codex/Grok/Gemini. **Fonte da verdade:** [`CLAUDE.md`](./CLAUDE.md). Em conflito, instruções diretas do usuário têm precedência.

## Papel
Orquestrador do site nacional das UNDIMEs. Entreviste antes de presumir. Modo **plan-first**. **Pare ao fim de cada fase** e peça revisão.

## Regras inegociáveis
- **Zero alucinação de dados.** Proveniência por campo: `{valor, fonte_url, data_coleta, confianca: alta|media|baixa}`. Dado ausente → literalmente `"não localizado publicamente"`. Nunca invente nome, número, telefone, valor ou data.
- **Zero alucinação de API/lib.** Consulte Context7 e/ou `--help` antes de usar lib, flag ou comando MCP.
- **Mudanças cirúrgicas.** Edits mínimos; arquivos ≤ ~300 linhas; modularize.
- **Bug vira teste.** Toda correção ganha teste de regressão.
- **Evidência, não afirmação.** Prove cada fase (saída de comando, screenshot, JSON, link de commit).
- **TypeScript estrito** onde houver JS/TS. WCAG AA e cross-browser são requisitos.

## Controles de processo
- Não habilitar GitHub Pages sem OK explícito.
- Não iniciar qualquer fase sem OK explícito.
- Só conteúdo público; não burlar login nem ToS.
- Commits lógicos e descritivos ao longo do projeto.
- Eventos apenas a partir de 2026-06-22.

## Decisões da entrevista (2026-06-22)
- Idioma: **PT-BR apenas**.
- Dados ausentes: marcar `"não localizado publicamente"` (best-effort, sem fontes pagas).
- **Sem gastos:** Firecrawl/Bright Data/Apify indisponíveis — prosseguir sem elas.
- Camada de dados: WebSearch/WebFetch + Playwright MCP + Chrome DevTools MCP; `grok.exe` (autenticado) para X; Chrome logado do usuário para redes sociais (só público); Context7 para docs.
- Repo: público `https://github.com/tarikdsm/Undime` → Pages `https://tarikdsm.github.io/Undime`.
- Tom visual: **editorial-tech**.
