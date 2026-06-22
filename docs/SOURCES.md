# SOURCES — Sementes de fonte por unidade (Fase 1)

> Reconhecimento concluído em **2026-06-22**. Proveniência por fonte registrada. Dados de pessoas/contatos aqui são **sementes** para a Fase 2 (coleta com proveniência por campo), não o dataset final.

## Metodologia e proveniência da Fase 1

- O site nacional **`undime.org.br` estava fora do ar** durante a recon (Apache **HTTP 503** "maintenance/capacity"; também timeouts). Confirmado por `curl` em 2026-06-22.
- Por isso, a **fonte mestra** foi obtida via **Internet Archive (Wayback Machine)**, que serve conteúdo idêntico ao oficial com data de captura rastreável:
  - **Seccionais (lista por UF):** original `https://undime.org.br/noticia/seccionais` — snapshot **2026-02-03** → `http://web.archive.org/web/20260203052559/https://undime.org.br/noticia/seccionais`
    Bruto: `data/raw/BR/seccionais_wayback_20260203.html` (+ `.txt` legível).
  - **Home (menu, contato, redes):** original `https://undime.org.br/` — snapshot **2026-05-10** → `http://web.archive.org/web/20260510022922/https://undime.org.br/`
    Bruto: `data/raw/BR/undime_home_wayback_20260510.html`.
- **Liveness dos portais estaduais** verificada por `curl` em 2026-06-22 (status na tabela).

## Universo confirmado

- **1 unidade nacional** (UF=`BR`, sede Brasília/DF).
- **26 seccionais estaduais.** O **Distrito Federal NÃO possui seccional própria** — aparece apenas no menu de navegação; não há bloco de DF no corpo da página de seccionais. Confirma o KICKOFF: **DF é tratado pela nacional**.
- **5 Presidências Regionais** (estrutura nacional, não são microrregionais):
  - Centro-Oeste: Eduardo Ferreira da Silva (Canarana/MT)
  - Nordeste: Petrúcio de Lima Ferreira (Goianinha/RN)
  - Norte: Luslarlene Umbelina Souza Fiamett (Santa Luzia D'Oeste/RO)
  - Sudeste: Jônatas Gonçalves Rêgo (Mirabela/MG)
  - Sul: Marcia Aparecida Baldini (Cascavel/PR)
- **Microrregionais:** nenhuma identificada na fonte oficial até aqui. Investigar por estado na Fase 2 (não forçar existência).

## Unidade Nacional (BR)

| Campo | Valor | Fonte |
|---|---|---|
| Secretaria executiva (endereço) | SCS - Qd.6 - Bloco A - Ed. Carioca - salas 611/613 - CEP 70.306-000 - Brasília/DF | seccionais snapshot 2026-02-03 |
| Telefone/Fax | (61) 3037-7888 | seccionais + home |
| Telefone (2º) | (61) 3575-7600 | home snapshot 2026-05-10 |
| CEP (home) | 70.325-900 | home snapshot 2026-05-10 |
| E-mail | undimenacional@undime.org.br · ouvidoria@undime.org.br | home snapshot 2026-05-10 |
| Instagram | https://www.instagram.com/undimenacional | home snapshot 2026-05-10 |
| Facebook | http://facebook.com/undime | home snapshot 2026-05-10 |
| X (Twitter) | http://twitter.com/undime | home snapshot 2026-05-10 |
| YouTube | http://youtube.com/undimenac | home snapshot 2026-05-10 |
| LinkedIn | não localizado publicamente (até aqui) | — |

> ⚠️ **Divergência nacional a resolver na Fase 2:** dois endereços/CEP distintos (sede 70.325-900 vs. secretaria executiva 70.306-000). Reconfirmar contra o site vivo.

## Tabela-alvo (26 UFs × fontes)

Status do portal: ✅ no ar (200) · ⚠️ erro · ❌ não resolve · — sem portal próprio (apenas e-mail).
Página de seccionais = mesma fonte mestra para todas: `undime.org.br/noticia/seccionais` (snapshot 2026-02-03).

| UF | Região | Portal próprio | Status (2026-06-22) | E-mail oficial (semente) |
|----|--------|----------------|---------------------|--------------------------|
| AC | Norte | — | — | undimeacre@gmail.com |
| AP | Norte | — | — | undimeap16@gmail.com |
| AM | Norte | — | — | undime.am@gmail.com |
| PA | Norte | — | — | undimepara@gmail.com |
| RO | Norte | — | — | undimerondonia@gmail.com |
| RR | Norte | — | — | undimerr@gmail.com |
| TO | Norte | — | — | undimeto@gmail.com |
| AL | Nordeste | — | — | undimealagoas@gmail.com |
| BA | Nordeste | undimebahia.com.br | ✅ 200 | undimedabahia@gmail.com |
| CE | Nordeste | — | — | undimece@gmail.com |
| MA | Nordeste | — | — | undimemaranhao@gmail.com |
| PB | Nordeste | — | — | undimeparaiba@gmail.com |
| PE | Nordeste | undimepe.org.br | ✅ 200 | undimepe@gmail.com |
| PI | Nordeste | — | — | undimepi@hotmail.com |
| RN | Nordeste | — | — | undime.rn@gmail.com |
| SE | Nordeste | undimesergipe.org | ❌ não resolve | undimesergipe@undimesergipe.org |
| GO | Centro-Oeste | go.undime.org.br | ✅ 200 | undimegoias@gmail.com |
| MT | Centro-Oeste | undimemt.org.br | ✅ 200 | undimemt@gmail.com |
| MS | Centro-Oeste | — | — | undime@assomasul.org.br |
| ES | Sudeste | — | — | undime.es@gmail.com |
| MG | Sudeste | undimemg.org.br | ✅ 200 | administrativo@undimemg.org.br · comunicacao@undimemg.org.br |
| RJ | Sudeste | — | — | undime.rj@gmail.com |
| SP | Sudeste | undime-sp.org.br | ✅ 200 | undimesp@undime-sp.org.br |
| PR | Sul | undimepr.org.br | ✅ 200 | undimepr@undimepr.org.br |
| RS | Sul | undimers.org.br | ⚠️ HTTP 500 | undime.rs@gmail.com · undime-rs@undimers.org.br |
| SC | Sul | undime-sc.org.br | ✅ 200 | undimesc@gmail.com |

### Sementes de diretoria (presidente) — snapshot 2026-02-03 · **RECONFIRMAR NA FASE 2**

> ⚠️ **Risco alto:** buscas indicam que a página viva `undime.org.br/presidentes-estaduais` pode listar **nomes diferentes** (provável troca de gestão/biênio). Tratar TODOS os nomes abaixo como semente a verificar contra a fonte viva.

AC: Alysson Bestene · AP: Samuel dos Santos Silva · AM: Marcus Lúcio de Sousa · PA: Sandra Helena Ataíde de Lima · RO: Luslarlene Umbelina Souza Fiamett · RR: Alsione Sulbaran · TO: Humberto de Campos Castilho · AL: Djalma Barros · BA: Anderson Passos dos Santos · CE: José Marques Aurélio de Souza · MA: Karla Janys Lima Nascimento · PB: Ana Paula Nunes da Silva · PE: Andreika Asseker Amarante · PI: Érica Graziela Benício de Melo · RN: Petrúcio de Lima Ferreira · SE: João Luiz Andrade Dória · GO: Anderlúcia de Castro Ferreira · MT: Simoni Borges · MS: Silvia Patrícia Freire · ES: Vanderson Valadares de Campos · MG: Jônatas Gonçalves Rêgo · RJ: Maria Virgínia Andrade Rocha · SP: Luiz Miguel Martins Garcia · PR: Adriana de Oliveira Palmieiri · RS: Ana Paula Bennemann · SC: Jucilene Antônio Fernandes

> Endereço da secretaria executiva, telefones e municípios de origem de cada presidente já constam no bruto `data/raw/BR/seccionais_wayback_20260203.txt` (serão normalizados por UF na Fase 2).

## Termos de busca (web/X) por unidade

- **Web (WebSearch/WebFetch):** `UNDIME <estado>`, `UNDIME <estado> presidente 2026`, `UNDIME <estado> fórum estadual 2026`, `UNDIME <estado> prestação de contas`, `dirigentes municipais educação <estado>`.
- **X (via `grok -p`):** `Pesquise no X o perfil e posts recentes da UNDIME <estado>: handle oficial, últimas publicações, eventos. Liste com URLs.`
- **Redes sociais:** começar pelo portal do estado (quando ✅) — costuma linkar Instagram/Facebook/YouTube; complementar com busca `UNDIME <estado> instagram`. Handles a localizar na Fase 2.

## Fontes nacionais adicionais já identificadas (para a Fase 2/nacional)

- Presidentes estaduais (página viva): `https://undime.org.br/presidentes-estaduais/` (redireciona p/ `/noticia/presidentes-estaduais`).
- Diretoria / Secretaria executiva / Conselho fiscal: `undime.org.br/diretoria/`, `/secretaria-executiva/`, `/conselho-fiscal/`, `/conselheiros`.
- Eventos 2026 (fóruns estaduais): `undime.org.br/noticia/12-02-2026-22-25-confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026` (replicado em `undimebahia.com.br`).
- Transparência: `undime.org.br/balanco-de-gestao/`, `/notas-tecnicas/`, seção "Atas, Pareceres e Relatórios Financeiros".

## Plano de lotes — Fase 2 (proposto)

Lotes por região (respeita limite de taxa e agrupa fontes parecidas). Sugestão: **6 lotes**.

| Lote | UFs | Nº | Observações |
|------|-----|----|-------------|
| 0 | BR (nacional) | 1 | Resolver divergências de endereço/CEP; baixar diretoria, conselho fiscal, eventos nacionais, presidentes regionais. Depende de `undime.org.br` voltar OU usar Wayback. |
| 1 | Norte: AC, AP, AM, PA, RO, RR, TO | 7 | Nenhum portal próprio → foco em seccionais + busca + X. |
| 2 | Nordeste-1: AL, BA, CE, MA, PB | 5 | BA com portal. |
| 3 | Nordeste-2: PE, PI, RN, SE | 4 | PE com portal; SE portal não resolve (tentar Wayback/redes). |
| 4 | Centro-Oeste + Sudeste: GO, MT, MS, ES, MG, RJ, SP | 7 | Vários portais (GO, MT, MG, SP). |
| 5 | Sul: PR, RS, SC | 3 | RS portal em erro 500 (retentar/Wayback). |

> **Dependência:** o lote 0 (nacional) e a reconfirmação de presidentes precisam de `undime.org.br` no ar. Se persistir o 503, usar Wayback como fonte e marcar `confianca: media` + nota de revalidação.

## Lacunas/risco já mapeados para a Fase 2

1. Nomes de presidentes (todos) — reconfirmar contra página viva.
2. Endereço/CEP da nacional — duas versões divergentes.
3. Portais SE (não resolve) e RS (500) — recuperar via Wayback/redes.
4. Redes sociais por estado — a localizar.
5. Dados financeiros/prestação de contas — historicamente escassos; provável `"não localizado publicamente"`.
6. Microrregionais — investigar existência por estado.
