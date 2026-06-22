# AUDIT — Auditoria independente de integridade (Fase 3)

> Auditor independente e cético. Objetivo: **refutar**, não confirmar.
> Data da auditoria: **2026-06-22**. Escopo: integridade do dataset consolidado
> (`data/undime.json`), cópia do site, proveniência por campo, regra de eventos,
> CNPJs e itens de confiança baixa. **Nenhum JSON foi alterado** — só este arquivo.
> A auditoria de site (link-check, cross-browser, responsividade) é da **Fase 5**.

## Veredito

**ZERO PENDÊNCIAS BLOQUEANTES.**

- Merge fiel (27/27 unidades, sem perda/duplicata/DF), cópia do site idêntica ao master.
- Proveniência completa: **0 violações** em 501 campos com valor real.
- Eventos: **0 violações** da regra `>= 2026-06-22` (19 eventos).
- CNPJs: **5/5 válidos** no dígito verificador (BR, AC, MG, MT, PE).
- Spot-check de 8 unidades: todos os valores conferem com a fonte citada.

Há **ressalvas aceitáveis** (lacunas best-effort, divergências entre fontes,
4 itens de confiança baixa) listadas abaixo para validação manual.

---

## 1. Fidelidade do merge — OK

| Verificação | Resultado |
|---|---|
| `data/undime.json` estrutura `{meta, nacional, estados[]}` | OK |
| Nacional = BR | OK |
| `estados[]` = 26 UFs, **sem DF**, sem duplicatas | OK (nenhuma duplicata; DF ausente, tratado pela nacional conforme `meta.nota`) |
| Total de unidades | 27 (1 nacional + 26 UFs) |
| Cada `data/processed/<uf>.json` == bloco correspondente no master | **27/27 idênticos** (comparação JSON.stringify), 0 mismatches |
| `site/assets/data/undime.json` == `data/undime.json` | **Idêntico** (220.490 bytes, byte a byte) |

Método: comparação programática (Node) campo a campo via serialização canônica.

---

## 2. Integridade de proveniência — OK (0 violações)

Regra: todo campo `{valor,...}` com `valor` real (≠ `"não localizado publicamente"`,
≠ `"não se aplica"`, ≠ vazio) deve ter `fonte_url` não-vazio,
`data_coleta` em ISO `YYYY-MM-DD` e `confianca ∈ {alta, media, baixa}`.

| Métrica | Valor |
|---|---|
| Campos com valor real auditados | **501** |
| `fonte_url` ausente/vazio | **0** |
| `data_coleta` fora de ISO `YYYY-MM-DD` | **0** |
| `confianca` inválida | **0** |
| Distribuição de confiança | alta: **418** · media: **79** · baixa: **4** |

Walker recursivo percorreu toda a árvore (incluindo arrays `conselho_fiscal[]`,
`diretoria.outros[]` e `eventos[]`). Nenhuma violação.

---

## 3. Sem invenção / fonte coerente — OK (spot-check 8 unidades)

Conferência de campos de alto valor (presidente, telefone, e-mail, CNPJ) contra
o bruto correspondente em `data/raw/<uf>/` (grep no HTML/MD/notas):

| Unidade | Campo | Valor no dataset | Confere com bruto? |
|---|---|---|---|
| BR | presidente | Luiz Miguel Martins Garcia | OK (`live_noticia_diretoria`) |
| BR | CNPJ | 03.604.410/0001-30 | OK (`live_estatuto`) |
| MT | presidente | Simoni Pereira Borges | OK (`portal_municipios.html`) |
| MT | CNPJ | 37.499.944/0001-65 | OK (`portal_sobre.html`) |
| MT | e-mail | undimemt@gmail.com | OK (em `NOTES.txt`; ver ressalva R3) |
| PE | presidente | Andreika Asseker Amarante | OK (`portal_undimepe_…md`) |
| PE | CNPJ | 12.859.161/0001-14 | OK (`portal_undimepe_…md`) |
| PE | telefone | (81) 3251-6213 … | OK (`portal_undimepe_…md`) |
| MG | presidente | Jônatas Gonçalves Rego/Rêgo | OK (`portal_institucional_diretoria-executiva`) |
| MG | CNPJ | 23.840.622/0001-23 | OK (NOTAS; fonte_url = IPEA Mapa OSC, conf. media) |
| SP | presidente | Luiz Miguel Martins Garcia | OK (`diretoria_undime-sp.html`) |
| BA | presidente | Anderson Passos dos Santos | OK (`portal_diretoria__…html`) |
| BA | e-mail | undimedabahia@gmail.com | OK (`portal_contatos__…html`) |
| PB | presidente | Ana Paula Nunes da Silva | OK (`portal_undimepb_diretoria`) |
| PB | e-mail | contato@undimepb.org.br | OK (`portal_undimepb_home`) |
| PR | presidente | Adriana de Oliveira Palmieiri | **Confere com a fonte citada** (seccionais nacional), **mas diverge do portal estadual** — ver Divergência D1 |
| PR | e-mail | undimepr@undimepr.org.br | OK (`portal_dirigentes`) |

**Nenhum dado inventado encontrado.** Todos os valores spot-checados aparecem
literalmente na fonte citada (`fonte_url`). A única ocorrência de atenção (PR)
é uma divergência entre duas fontes oficiais, não invenção — ver D1.

---

## 4. Eventos (regra `data_inicio >= 2026-06-22`) — OK (0 violações)

19 eventos no dataset. Todos com `data_inicio >= 2026-06-22`.

| UF | data_inicio | Título (resumo) |
|---|---|---|
| BR | 2026-06-25 | Fórum Estadual Extraordinário Undime/MS 2026 |
| BR | 2026-07-01 | Fórum Estadual Extraordinário Undime/AC 2026 |
| BR | 2026-07-02 | Fórum Estadual Extraordinário Undime/PA 2026 |
| BR | 2026-08-11 | Fórum Estadual Extraordinário Undime/MA 2026 |
| BR | 2026-08 (mês; dia não informado) | Fórum Estadual Extraordinário Undime/PB 2026 |
| BR | 2026-11-05 | Fórum Estadual Extraordinário Undime/AP 2026 |
| AC | 2026-07-01 | Fórum Estadual Undime Acre 2026 |
| MA | 2026-08-11 | Fórum Estadual Extraordinário Undime Maranhão 2026 |
| MS | 2026-06-25 | Fórum Estadual Extraordinário Undime MS |
| PA | 2026-07-02 | Fórum Estadual Extraordinário Undime Pará 2026 |
| PB | agosto/2026 (dia não divulgado) | Fórum Estadual Undime Paraíba 2026 |
| PR | 2026-07-03 | I Simpósio da Undime Paraná |
| PR | 2026-08-28 | II Simpósio da Undime Paraná |
| PR | 2026-09-25 | III Simpósio da Undime Paraná |
| PR | 2026-11-11 | Fórum Extraordinário da Undime Paraná |
| SP | 2026-06-22 | Inscrições – Prova Nacional Docente 2026 |
| SP | 2026-06-22 | Webinário – Assistência Técnica (Escola em Tempo Integral) |
| SP | 2026-06-30 | Último Dia – Diagnóstico de Equidade – PNEERQ |
| SP | 2026-07-31 | Último Dia 1ª Etapa – Censo Escolar |

**Nota de qualidade (não-violação):** 2 eventos têm data parcial (apenas mês):
`BR/eventos[4]` (`2026-08…`) e `PB/eventos[0]` (`agosto/2026`). Ambos são de
agosto/2026, posteriores ao corte — **dentro da regra**. Sugestão: registrar
`data_fim`/`local` quando a fonte divulgar (já marcado em `lacunas` de PB).

---

## 5. CNPJs — OK (5/5 válidos)

Dígito verificador calculado (mod 11). Todos válidos:

| Unidade | CNPJ | DV | Fonte | Confiança |
|---|---|---|---|---|
| BR | 03.604.410/0001-30 | VÁLIDO | undime.org.br/noticia/estatuto | alta |
| AC | 00.670.658/0001-00 | VÁLIDO | cnpj.linkana.com (secundária) | media |
| MG | 23.840.622/0001-23 | VÁLIDO | mapaosc.ipea.gov.br (secundária) | media |
| MT | 37.499.944/0001-65 | VÁLIDO | undimemt.org.br | alta |
| PE | 12.859.161/0001-14 | VÁLIDO | undimepe.org.br | alta |

Demais 22 unidades: CNPJ `"não localizado publicamente"` (lacuna best-effort).

---

## 6. Cobertura por unidade

`filled` = campos com valor real; `gaps` = campos placeholder/nulos;
`lacunas` = itens auto-declarados; `eventos` = nº de eventos futuros.

| UF | filled | gaps | lacunas | eventos |
|---|---:|---:|---:|---:|
| BR | 67 | 11 | 8 | 6 |
| AC | 15 | 11 | 14 | 1 |
| AL | 11 | 11 | 13 | 0 |
| AM | 9 | 12 | 15 | 0 |
| AP | 8 | 13 | 16 | 0 |
| BA | 23 | 9 | 10 | 0 |
| CE | 11 | 12 | 13 | 0 |
| ES | 20 | 8 | 10 | 0 |
| GO | 12 | 10 | 12 | 0 |
| MA | 15 | 11 | 12 | 1 |
| MG | 31 | 5 | 6 | 0 |
| MS | 15 | 12 | 13 | 1 |
| MT | 22 | 7 | 8 | 0 |
| PA | 13 | 15 | 15 | 1 |
| PB | 25 | 10 | 10 | 1 |
| PE | 24 | 7 | 9 | 0 |
| PI | 13 | 10 | 10 | 0 |
| PR | 30 | 12 | 8 | 4 |
| RJ | 12 | 10 | 12 | 0 |
| RN | 12 | 11 | 12 | 0 |
| RO | 8 | 13 | 16 | 0 |
| RR | 9 | 12 | 14 | 0 |
| RS | 13 | 10 | 11 | 0 |
| SC | 16 | 7 | 8 | 0 |
| SE | 11 | 11 | 13 | 0 |
| SP | 43 | 10 | 7 | 4 |
| TO | 13 | 9 | 12 | 0 |

Unidades mais completas: SP, BR, MG, PR. Mais escassas: AP, RO, AM, RR
(seccionais sem portal próprio no ar — coleta limitada a páginas nacionais).

---

## 7. Divergências entre fontes

Divergências já documentadas e resolvidas em `docs/CONSOLIDACAO.md` (regra de
desempate consistente). Auditoria confirma que o **valor adotado bate com a
fonte citada** em todos os casos verificados. Destaques:

- **BR — sede (CEP/salas):** 70.325-900 (footer) vs 70.306-000 (seccionais).
  Não resolvida; ambos registrados literalmente no campo. OK.
- **BR/SP — município do presidente nacional:** Nova Odessa/SP (diretoria) vs
  Sud Mennucci/SP (portal SP). Documentado. OK.
- **AC / CE / SC / PB:** trocas de gestão; valor live oficial adotado. Verificado
  contra raw (Ericson/AC, Verázia Queiroz/CE confirmados no `live_seccionais`). OK.

### D1 — PR presidente: divergência NÃO documentada (ressalva)

- Dataset: **"Adriana de Oliveira Palmieiri"** — `fonte_url: undime.org.br/seccionais/`.
- Essa grafia **confere** com a fonte citada (seccionais nacional live + Wayback).
- **Porém** o **portal estadual** (`data/raw/PR/portal_dirigentes_20260622.html`)
  e a página de diretoria nacional registram **"Adriana de Oliveira CHAVES Palmieri"**
  (com "Chaves" e sem o "i" extra em "Palmie**ri**").
- Não é invenção (o valor existe na fonte citada), mas a regra de desempate #2 da
  CONSOLIDACAO ("preferir a fonte mais específica/local") sugeriria adotar a grafia
  completa do **portal estadual**. **Divergência não registrada em CONSOLIDACAO.**
- **Ação recomendada:** registrar a divergência em `docs/CONSOLIDACAO.md` e avaliar
  adotar "Adriana de Oliveira Chaves Palmieri" (portal estadual) ou anotar ambas as
  grafias no próprio campo, como já feito em casos análogos (RJ/RO).

---

## 8. Itens de confiança BAIXA (validação manual recomendada)

Apenas **4** campos com `confianca: baixa`:

1. **BR — `financeiro.prestacao_contas_url`** — existe seção de transparência no
   menu do site nacional, mas sem URL direta de prestação de contas confirmada.
   Validar manualmente o link.
2. **AM — `redes_sociais.x` (`@AmazonasUndime`)** — perfil inativo desde
   17/12/2020, ~9 seguidores; titularidade oficial **não confirmada**. Validar se
   é conta oficial antes de exibir no site.
3. **ES — `diretoria.outros[0]`** — composição detalhada da diretoria executiva
   2025-2027 não localizada (apenas presidente confirmado). Buscar fonte.
4. **PE — `financeiro.contribuicoes`** — anuidade 2026 mencionada em contexto de
   evento, sem tabela de valores publicada. Validar o valor.

Confiança **media** (79 campos): predominam CNPJs/fundação de fontes secundárias
(AC, MG), telefones/e-mails de páginas estaduais instáveis (HTTP 500) e
secretarias executivas só presentes em snapshots. Não bloqueiam, mas merecem
revalidação quando os portais voltarem a responder.

---

## 9. Pendências acionáveis para o orquestrador

### (a) Bloqueantes
**NENHUMA.** Sem proveniência ausente, sem dado inventado, sem evento fora da
regra, sem CNPJ inválido, sem perda no merge.

### (b) Ressalvas aceitáveis (não bloqueiam a Fase 3)
- **R1 (recomendado corrigir):** Divergência D1 (PR presidente) não está em
  `docs/CONSOLIDACAO.md`. Documentar e decidir grafia (portal estadual traz
  "Adriana de Oliveira Chaves Palmieri"). Sem nova coleta necessária — fonte já
  baixada em `data/raw/PR/portal_dirigentes_20260622.html`.
- **R2 (qualidade):** 2 eventos com data parcial (BR/eventos[4], PB/eventos[0]).
  Dentro da regra; completar `data_inicio`/`data_fim`/`local` quando publicado.
- **R3 (rastreabilidade):** MT e-mail/telefones têm `confianca: alta` e
  `fonte_url` da página `/contato/`, mas o HTML salvo em `data/raw/MT/` é de
  `/sobre/` e `/home/`; o valor consta apenas em `NOTES.txt`. Sugestão: salvar o
  HTML da página `/contato/` para fechar a rastreabilidade do snapshot.
- **R4 (best-effort, esperado):** lacunas amplas em financeiro, nº de associados,
  redes sociais (X/YouTube/LinkedIn) e CNPJ em 22 UFs — coerente com a política
  "sem fontes pagas" e portais estaduais instáveis. Aceitável.

---

## 10. Recomendação de testes de regressão (bugs/achados → teste)

Para travar a integridade em CI antes do deploy (Fase 6), adicionar um teste que rode:

1. `data/undime.json` == concatenação dos 27 `data/processed/*.json` (BR=nacional).
2. `site/assets/data/undime.json` idêntico ao master (impede cópia defasada).
3. Todo campo com valor real tem `fonte_url`, `data_coleta` ISO e `confianca` válida.
4. Todo evento tem `data_inicio` (parcial ou completa) `>= 2026-06-22`.
5. Todos os CNPJs presentes passam no dígito verificador.

(O harness desta auditoria já implementa 1-5 em Node e pode ser convertido em teste.)

---

# Fase 5 — Auditoria independente do site (2026-06-22)

## Link-check
- **Internos:** 213 referências (HTML/CSS/JS) verificadas no site gerado — **0 quebradas**.
- **Bug encontrado e CORRIGIDO:** alguns `fonte_url` e itens de `fontes_consultadas[]` não eram URLs http (caminhos locais `data/raw/...`, prosa, ou URL com texto anexado tipo `https://undime.org.br/ (Fóruns…)`). O site os renderizava como `href` quebrado.
  - Correção: renderização passa a linkar **apenas** URLs http, extraindo a URL limpa (`urlOf`); o restante vira texto de proveniência (sem link). Aplicado em `site/scripts/build.mjs`, `assets/js/data.js`, `assets/js/home.js`.
  - **Regressão:** `tests/site-links.mjs` (0 links internos quebrados; 0 href http malformado).
- **Externos (fontes):** 166 hrefs http únicos. Redes sociais (45) não são verificáveis por automação (bloqueio de bots — 403/999 esperado; perfis confirmados na Fase 2). Não-sociais (98) respondem 200/302. **Indisponíveis no momento da auditoria — disponibilidade da fonte, não bug do site:** `undime.org.br` e subdomínios `<uf>.undime.org.br` (al/ce/ma/pi/rj/rn) intermitentes; `undimers.org.br` 500; `undimepb.org.br` 406 (ModSecurity bloqueia curl, site OK via navegador); `unicef.org` 403; `cnpj.linkana.com`/`ferrazweb` bloqueio/erro; `github.com/tarikdsm/Undime` 404 (repositório será criado na Fase 6).

## Lighthouse (Chrome headless, categorias Performance + Acessibilidade)
| Página | Performance | Acessibilidade | Falhas a11y |
|--------|:-----------:|:--------------:|-------------|
| Home (`index.html`) | **98** | **100** | nenhuma |
| Estado (`estados/sc.html`) | **100** | **100** | nenhuma |

Ambas acima da meta (≥ 90).

## Responsividade (Playwright)
- **375 px (mobile):** coluna única, hero legível, mapa abaixo, lista de estados acessível. ✓
- **768 px (tablet):** coluna única com mapa ampliado. ✓
- **1280 px (desktop):** layout em duas colunas (mapa + busca/lista). ✓

## Cross-browser
- **Verificado:** Chromium (Playwright — render, mapa, busca, navegação, 0 erros de console) e Chrome (Lighthouse).
- **Firefox/Safari:** engines não disponíveis no ambiente de automação desta sessão. Mitigação: revisão de código para compatibilidade — apenas recursos padrão (CSS Grid, custom properties, `clamp`, `:focus-visible`, ES modules, `fetch`); adicionado `-webkit-backdrop-filter` + fallback `@supports` para Safari; sem APIs específicas de engine. Recomenda-se verificação manual final em Firefox/Safari antes de divulgação ampla.

## Itens de confiança baixa para validação manual do usuário (recap)
1. **BR** — `financeiro.prestacao_contas_url` (sem URL direta confirmada).
2. **AM** — X `@AmazonasUndime` (inativo desde 2020; titularidade não confirmada).
3. **ES** — composição detalhada da diretoria executiva 2025-2027 (não localizada).
4. **PE** — `financeiro.contribuicoes` (anuidade sem tabela publicada).

## Veredito da Fase 5
Site **aprovado**: navegação íntegra (0 links internos quebrados), acessibilidade 100, performance ≥ 98, responsivo. Pendências remanescentes são de **disponibilidade de fontes oficiais** (infra da UNDIME) e lacunas best-effort já documentadas — nenhuma é dado inventado.
