# Prompt de Inicialização — Projeto "Undime" (site nacional das UNDIMEs)

> Cole este conteúdo no Claude Code (CLI, PowerShell/Windows) já dentro do diretório do projeto.
> Ele assume Claude Code v2.1.x, Git/`gh` autenticados e modo de permissões liberado.
> O agente **deve parar ao fim de cada FASE** e pedir minha revisão antes de seguir.

---

## 0. PAPEL E DIRETRIZES PERMANENTES (valem em toda a execução)

Você é o orquestrador deste projeto. Antes de qualquer decisão de design, **me entreviste** com perguntas objetivas — não presuma. Trabalhe em modo *plan-first*: pesquise e planeje antes de codar.

Regras inegociáveis:
- **Zero alucinação de dados.** Todo dado coletado carrega proveniência: `{valor, fonte_url, data_coleta, confianca: alta|media|baixa}`. Se um dado não for encontrado publicamente, registre literalmente `"não localizado publicamente"` — **nunca invente** nome, número, telefone, valor financeiro ou data.
- **Zero alucinação de API/lib.** Antes de usar qualquer biblioteca, flag de CLI ou comando de MCP, consulte o **Context7 MCP** e/ou rode `--help`. Não assuma sintaxe.
- **Mudanças cirúrgicas.** Edits mínimos e localizados. Arquivos com no máximo ~300 linhas; quebre em módulos.
- **Bug vira teste.** Todo bug corrigido ganha um teste de regressão.
- **Evidência, não afirmação.** Ao concluir cada fase, mostre prova (saída de comando, screenshot do Playwright, trecho de JSON, link do commit) — não diga apenas "feito".
- **TypeScript estrito** onde houver JS/TS. Acessibilidade (WCAG AA) e compatibilidade cross-browser são requisitos, não extras.

Antes de começar, faça um bloco de **perguntas de entrevista** cobrindo pelo menos: (a) idioma do site (PT-BR? bilíngue?); (b) profundidade aceitável quando um dado não existir; (c) quais chaves de API eu já tenho (Firecrawl, xAI/Grok, Bright Data, Apify); (d) se autorizo gastos em tiers pagos de scraping; (e) domínio/URL final do GitHub Pages; (f) tom visual desejado (institucional? editorial-tech?). **Espere minhas respostas antes da Fase 0.**

---

## CONTEXTO DO DOMÍNIO (ponto de partida da pesquisa, a confirmar)

- UNDIME = União Nacional dos Dirigentes Municipais de Educação. Há a **nacional** (sede em Brasília/DF) e **26 seccionais estaduais**; o **DF** é tratado pela nacional. Universo de municípios no Brasil ≈ 5.570.
- "UNDIME municipal" **não** é entidade separada — o associado é o próprio dirigente municipal. Abaixo do estado podem existir **microrregionais**. Investigue e documente onde existirem; não force a existência delas.
- Sementes de fonte oficial: `undime.org.br` (institucional, `/seccionais/`, notícias/eventos) e portais estaduais próprios quando houver (ex.: `go.undime.org.br`, `undimemt.org.br`). Confirme a lista real na Fase 1.

---

## ESQUEMA DE DADOS (padronize todos os registros assim)

Para cada unidade (nacional + cada UF + microrregionais encontradas), produza um objeto com **proveniência por campo**:

```
{
  "uf": "ES",                      // "BR" para a nacional
  "nivel": "estadual",             // "nacional" | "estadual" | "microrregional"
  "nome_oficial": {valor, fonte_url, data_coleta, confianca},
  "cnpj": {...},                   // se houver
  "fundacao": {...},
  "sede_endereco": {...},
  "contato": { "telefone": {...}, "email": {...}, "site": {...}, "portal_estadual": {...} },
  "diretoria": {
     "presidente": { "nome": {...}, "municipio_origem": {...} },
     "secretaria_executiva": {...},
     "conselho_fiscal": [ ... ],
     "outros": [ ... ]
  },
  "redes_sociais": { "instagram": {...}, "facebook": {...}, "x": {...}, "youtube": {...}, "linkedin": {...} },
  "associados_num": {...},
  "municipios_num": {...},
  "financeiro": { "receitas": {...}, "contribuicoes": {...}, "prestacao_contas_url": {...} },  // muitas vezes "não localizado publicamente"
  "eventos": [
     { "titulo": {...}, "data_inicio": {...}, "data_fim": {...}, "local": {...}, "inscricao_url": {...}, "fonte_url": "" }
     // apenas eventos a partir de 2026-06-22
  ],
  "fontes_consultadas": [ "url1", "url2", ... ],
  "lacunas": [ "financeiro", "associados_num" ]   // campos não localizados
}
```

---

## 1. FASE 0 — SETUP DO PROJETO E FERRAMENTAS  *(pare e mostre evidência ao fim)*

1. Verifique ambiente: `git --version`, `gh auth status`, `node --version`, `npm --version`. Reporte versões.
2. Crie a estrutura:
   ```
   ./
   ├─ CLAUDE.md                 # constituição do projeto (diretrizes da seção 0)
   ├─ AGENTS.md                 # mesmas regras, p/ compatibilidade Codex/Grok/Gemini
   ├─ .claude/agents/           # subagents (definir na seção 1.4)
   ├─ .claude/commands/         # slash commands úteis (/research-uf, /audit, /deploy)
   ├─ docs/  (PLAN.md, SPECIFICATION.md, SOURCES.md, DATA_SCHEMA.md, AUDIT.md)
   ├─ data/raw/<uf>/            # dados brutos por fonte
   ├─ data/processed/<uf>.json  # normalizado por unidade (esquema acima)
   ├─ data/undime.json          # dataset mestre consolidado
   ├─ site/                     # o site (fonte do GitHub Pages)
   │   ├─ index.html  estados/<uf>.html  assets/{css,js,img}  assets/data/undime.json
   └─ README.md
   ```
3. **MCPs** (confirme a sintaxe atual com `claude mcp --help`; não assuma): configure
   - **Firecrawl** (camada principal de dados web — search/scrape/extract/research). Requer `FIRECRAWL_API_KEY`.
   - **Context7** (docs — obrigatório p/ zero alucinação de API).
   - **Playwright** e **Chrome DevTools** (automação + testes cross-browser do site).
   - *Opcionais, só se eu autorizar e fornecer chave:* Bright Data / Apify (sites protegidos e redes sociais).
   Se faltar uma chave, **pare e me peça** — não prossiga com a fonte indisponível.
4. **CLIs externas** (orquestração via Bash, modo headless). Verifique disponibilidade e me reporte o que está instalado:
   - **Grok p/ X**: `grok-cli` (open-source). Instale se eu autorizar: `npm install -g @vibe-kit/grok-cli`. Uso headless: `grok --prompt "<consulta>"` com `GROK_API_KEY` no ambiente. Teste com uma consulta trivial e mostre a saída. (Confirme se minha assinatura cobre a API ou se preciso de chave do console.x.ai.)
   - **Gemini CLI** (síntese de grande contexto) e **Codex CLI** (revisor independente): cheque com `gemini --version` / `codex --version`. Se ausentes, apenas registre — são opcionais.
5. **Subagents** (`.claude/agents/`), criados como markdown com frontmatter:
   - `state-researcher` — pesquisa UMA unidade em todas as fontes e grava `data/raw/<uf>/` + `data/processed/<uf>.json` (esquema acima). Tools: web/search, Firecrawl, Bash (p/ grok-cli), Read/Write.
   - `planner` — lê todo `data/processed/`, escreve/atualiza `docs/PLAN.md` e a arquitetura do site.
   - `executor` — implementa o que o planner definiu (dados → `undime.json`, depois o site).
   - `reviewer` — auditor **fresco**: tenta refutar dados e código, confere cada campo contra `fonte_url`, roda link-check e testes Playwright, escreve `docs/AUDIT.md`.
6. Inicialize git, crie o repositório remoto **`Undime`** (`gh repo create Undime --private --source . --remote origin` — confirme visibilidade comigo) e faça o primeiro commit do esqueleto. **Não habilite o Pages ainda.**

---

## 2. FASE 1 — RECONHECIMENTO E LISTA-ALVO  *(pare e mostre evidência)*

- Mapeie o universo real: confirme nacional + as 26 UFs + DF + eventuais microrregionais. Para cada unidade, monte em `docs/SOURCES.md` as **sementes de fonte**: site/portal oficial, página na `undime.org.br/seccionais`, perfis de redes sociais (links públicos), e termos de busca para web/X.
- Entregue uma **tabela-alvo** (unidades × fontes localizadas) e um plano de lotes para a Fase 2 (ex.: 5–6 estados por lote, para respeitar limites de taxa). Aguarde meu OK.

---

## 3. FASE 2 — PESQUISA PARALELA POR ESTADO  *(pare ao fim de cada lote)*

Para cada UF, dispare um `state-researcher` (em lotes paralelos). Cada um deve:
1. Coletar de **fonte oficial** (site nacional + portal estadual) → preencher cadastrais, contato, diretoria, eventos.
2. **Web aberta** (Firecrawl search/scrape) para notícias, números de municípios/associados, prestação de contas.
3. **X**: chamar `grok --prompt "Pesquise no X perfis e posts recentes da UNDIME <estado>: handle oficial, últimas publicações, eventos. Liste com URLs."` e registrar links + achados.
4. **Meta/LinkedIn/YouTube**: localizar e registrar os **links oficiais públicos**; extrair só conteúdo público acessível (best-effort via Firecrawl/Playwright). Não burlar login nem ToS.
5. Gravar bruto em `data/raw/<uf>/` e normalizado em `data/processed/<uf>.json` com proveniência. Listar `lacunas`.
Mostre, por lote, um resumo de cobertura (campos preenchidos × lacunas) por estado.

---

## 4. FASE 3 — LOOP DE CONSOLIDAÇÃO (planner → executor → reviewer)

Itere até o `reviewer` aprovar:
1. `planner`: consolida `data/processed/*` em `data/undime.json`, resolve conflitos entre fontes (preferir oficial; registrar divergências), define a especificação do site em `docs/SPECIFICATION.md`.
2. `executor`: gera o `undime.json` final e o copia para `site/assets/data/`.
3. `reviewer`: confere **cada campo** contra `fonte_url`, sinaliza qualquer dado sem proveniência, e devolve correções. Repita até zero pendências de integridade.

---

## 5. FASE 4 — CONSTRUÇÃO DO SITE  *(pare e mostre screenshots)*

Requisitos:
- **Estático**, responsivo (mobile/tablet/desktop), cross-browser (Chrome, Edge, Firefox, Safari). Sem dependência de framework pesado salvo necessidade justificada.
- **Mapa do Brasil em SVG inline**, cada estado um `<path id="ES">` etc. **Hover** → tooltip com infos básicas (presidente, contato, nº de municípios). **Clique** → `estados/<uf>.html` com a ficha completa. Fallback acessível: lista/`<select>` de estados navegável por teclado e leitor de tela.
- Página de estado: todos os campos do esquema, com **links de fonte** visíveis e selo de confiança; seção de **eventos a partir de 22/06/2026** ordenados por data.
- Home: mapa + busca/filtro por estado, destaque de próximos eventos nacionais, dados da UNDIME nacional.
- Carregar dados de `assets/data/undime.json` (sem hardcode). Performance: lazy onde fizer sentido; Lighthouse ≥ 90 em Performance e Acessibilidade.

---

## 6. FASE 5 — AUDITORIA INDEPENDENTE  *(pare e mostre `docs/AUDIT.md`)*

- `reviewer` (e, se disponível, uma **segunda opinião via Codex/Gemini CLI** por Bash) audita: (a) cada afirmação do site rastreável a uma fonte; (b) nenhum dado inventado; (c) links válidos (link-check); (d) render cross-browser via Playwright nos quatro navegadores; (e) responsividade em 3 breakpoints.
- `docs/AUDIT.md` deve listar: cobertura por estado, lista de lacunas assumidas, divergências entre fontes, e qualquer item de confiança baixa que eu deva validar manualmente.

---

## 7. FASE 6 — COMMIT E DEPLOY  *(pare e me dê a URL ao vivo)*

- Commits lógicos e descritivos ao longo de tudo (não um commit gigante no fim).
- Configure o deploy do `site/` para o **GitHub Pages** via GitHub Actions (publicando a pasta `site/`). Confirme a sintaxe atual da action antes de escrever o workflow.
- `git push` para o remoto `Undime`, rode o deploy, **verifique a página no ar** (Playwright abrindo a URL pública) e me devolva o link + screenshot.

---

**Comece pelo bloco de perguntas de entrevista da seção 0 e aguarde minhas respostas.**
