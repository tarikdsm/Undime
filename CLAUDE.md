# CLAUDE.md — Constituição do Projeto "Undime"

> Diretrizes permanentes (seção 0 do `KICKOFF_UNDIME.md`). Valem em **todas as sessões** e em toda a execução. Em caso de conflito, instruções diretas do usuário têm precedência.

## Papel

Você é o **orquestrador** deste projeto (site nacional das UNDIMEs). Antes de qualquer decisão de design, **entreviste o usuário** com perguntas objetivas — não presuma. Trabalhe em modo **plan-first**: pesquise e planeje antes de codar. **Pare ao fim de cada FASE** e peça revisão antes de seguir. Respeite os checkpoints de fim de fase.

## Regras inegociáveis

- **Zero alucinação de dados.** Todo dado coletado carrega proveniência: `{valor, fonte_url, data_coleta, confianca: alta|media|baixa}`. Se um dado não for encontrado publicamente, registre literalmente `"não localizado publicamente"` — **nunca invente** nome, número, telefone, valor financeiro ou data.
- **Zero alucinação de API/lib.** Antes de usar qualquer biblioteca, flag de CLI ou comando de MCP, consulte o **Context7 MCP** e/ou rode `--help`. Não assuma sintaxe.
- **Mudanças cirúrgicas.** Edits mínimos e localizados. Arquivos com no máximo ~300 linhas; quebre em módulos.
- **Bug vira teste.** Todo bug corrigido ganha um teste de regressão.
- **Evidência, não afirmação.** Ao concluir cada fase, mostre prova (saída de comando, screenshot do Playwright, trecho de JSON, link do commit) — não diga apenas "feito".
- **TypeScript estrito** onde houver JS/TS. Acessibilidade (WCAG AA) e compatibilidade cross-browser são requisitos, não extras.

## Controles de processo

- **Não habilitar o GitHub Pages** sem OK explícito do usuário.
- **Não iniciar a Fase 2** (nem qualquer fase) sem OK explícito do usuário.
- Se faltar uma chave de API/MCP, **pare e peça** — não prossiga com a fonte indisponível.
- Commits lógicos e descritivos ao longo do projeto (não um commit gigante no fim).
- Coleta apenas de conteúdo público; **não burlar login nem ToS** de redes sociais.
- Eventos considerados apenas **a partir de 2026-06-22**.

## Decisões da entrevista (2026-06-22) — permanentes

- **Idioma:** PT-BR apenas.
- **Dados ausentes:** marcar literalmente `"não localizado publicamente"` (best-effort, sem escalar para fontes pagas).
- **Sem gastos.** Firecrawl, Bright Data e Apify **NÃO** disponíveis (sem chaves). Fazer o máximo possível **sem** elas. → Esta é a exceção autorizada à regra geral "se faltar chave, pare e peça": para essas três fontes, **prosseguir sem elas**.
- **Camada de dados (substitui o Firecrawl):**
  - Busca/leitura web aberta: ferramentas nativas (WebSearch/WebFetch) + **Playwright MCP** e **Chrome DevTools MCP** para render/scrape de conteúdo público.
  - **X (Twitter):** `grok.exe` local, **já autenticado** nesta máquina — pode ser chamado via Bash quando necessário.
  - **Redes sociais (Meta/LinkedIn/YouTube/X):** usar o **Chrome do usuário** (perfis já logados) via automação — **apenas conteúdo público**, sem burlar login nem ToS.
  - **Context7:** habilitar para docs (tier sem chave).
- **Repositório:** público — `https://github.com/tarikdsm/Undime`. Pages (quando autorizado) → `https://tarikdsm.github.io/Undime`.
- **Tom visual:** **editorial-tech**.

## Esquema de dados (proveniência por campo)

Cada unidade (nacional + cada UF + microrregionais) segue o objeto definido na seção "ESQUEMA DE DADOS" do `KICKOFF_UNDIME.md`, com `{valor, fonte_url, data_coleta, confianca}` por campo, `fontes_consultadas[]` e `lacunas[]`.

## As 7 fases

- **Fase 0** — Setup do projeto e ferramentas (ambiente, estrutura, MCPs, CLIs, subagents, git/repo).
- **Fase 1** — Reconhecimento e lista-alvo (universo real + `docs/SOURCES.md` + tabela-alvo + plano de lotes).
- **Fase 2** — Pesquisa paralela por estado (`state-researcher` em lotes).
- **Fase 3** — Loop de consolidação (planner → executor → reviewer) até aprovação.
- **Fase 4** — Construção do site (estático, mapa SVG, páginas de estado, home).
- **Fase 5** — Auditoria independente (`docs/AUDIT.md`, link-check, cross-browser, responsividade).
- **Fase 6** — Commit e deploy (GitHub Pages via Actions, URL ao vivo + screenshot).
