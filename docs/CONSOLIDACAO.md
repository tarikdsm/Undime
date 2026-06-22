# CONSOLIDACAO — Divergências entre fontes (Fase 3)

> Documento de apoio ao `reviewer` e à `docs/AUDIT.md`.
> **Não altera os JSONs** — apenas registra as divergências já encontradas pelos
> `state-researcher` (em `data/raw/*/NOTAS*`, `*/NOTES*`, `*/FONTES*`) e o valor
> adotado no dataset mestre `data/undime.json`, com a justificativa.

## Regra de desempate aplicada (consistente em todas as unidades)
1. **Fonte oficial direta** (portal estadual próprio no ar; página viva de `undime.org.br`) tem precedência.
2. Entre páginas oficiais vivas, prefere-se a **mais específica/atual** (ex.: `noticia/diretoria` e `noticia/seccionais` sobre `noticia/presidentes-estaduais`, que está datada de 2011 e desatualizada).
3. Página oficial viva > snapshot Wayback (mais antigo).
4. **Resumo de buscador (WebSearch snippet) nunca prevalece** sobre fonte oficial — vários estados tiveram snippets contaminados (RR, RN, GO, RS) e foram descartados.
5. Em divergência **não resolvível** (ex.: CEP/salas da sede nacional), registra-se **ambos** os valores literalmente, sem inventar o "correto".
6. **Cargo nacional ≠ cargo na seccional**: vários presidentes estaduais também ocupam cargos na diretoria nacional 2025-2027; o cruzamento confirma identidade, mas o papel nacional não foi confundido com a presidência estadual.

---

## Divergências por unidade

### BR (Nacional)
- **Endereço/CEP/salas da sede** — *não resolvida, ambos registrados.*
  - Footer da home viva: SCS Q.6, Bl. A, nº 240, Ed. Carioca, salas 601/607/608/610–615, CEP **70.325-900**.
  - Página `noticia/seccionais` ("Secretaria Executiva Nacional"): Ed. Carioca, salas **611/613**, CEP **70.306-000**.
  - LinkedIn cita híbrido (salas 611/615, CEP 70.325-900).
  - **Adotado:** valor do footer da home como principal, com a divergência citada literalmente no próprio campo `sede_endereco`. Marcado em `lacunas`.
- **Município de origem do presidente nacional (Luiz Miguel Martins Garcia)** — diretoria viva: **Nova Odessa/SP**; snapshot seccionais (fev/2026): Sud Mennucci/SP. **Adotado:** Nova Odessa/SP (página diretoria, mais recente). Ver também SP, onde o portal estadual diz "Sud Mennucci" — divergência cruzada anotada.
- **Presidência Regional Sul (cargo nacional)** — diretoria viva 2025-2027: **Jucilene Antônio Fernandes** (Balneário Rincão/SC); snapshot seccionais (fev/2026): Marcia Aparecida Baldini (Cascavel/PR). **Adotado:** Jucilene (diretoria viva).
- Página `noticia/presidentes-estaduais` está datada de **18/05/2011** — marcada como NÃO usar para dados atuais.

### AC (Acre) — troca de gestão
- **Presidente** — três valores distintos:
  - `noticia/seccionais` (live): **Ericson Araújo da Costa** (DME Porto Valter/AC) ← **ADOTADO**.
  - `noticia/presidentes-estaduais` (live, desatualizada 2011): Márcio José Batista (Rio Branco).
  - Snapshot Wayback (fev/2026): Alysson Bestene (Rio Branco).
  - **Justificativa:** página seccionais é a mais detalhada/atual; Márcio José Batista aparece na diretoria nacional em outro cargo (não é presidente AC).
- CNPJ 00.670.658/0001-00 — fonte secundária (linkana/jusbrasil), **confiança media** (2 resultados consistentes; páginas não abriram).

### AL (Alagoas)
- Presidente "Djalma Barros" (seccionais) = "Djalma Barros Siqueira Neto" (diretoria nacional). Mesma pessoa (DME Feliz Deserto/AL) — refinamento de grafia, não conflito.
- Subdomínio `al.undime.org.br` não resolve (HTTP 000); portal real é `www.undimeal.com.br`. Adotado o portal real.

### AM (Amazonas)
- Perfil X `@AmazonasUndime` — inativo desde 17/12/2020, ~9 seguidores, titularidade oficial **não confirmada**. Registrado com **confiança baixa** e ressalva explícita.

### AP (Amapá)
- Grafia do município do presidente: fonte grafa "Tatarugalzinho"; forma correta é **Tartarugalzinho/AP** — registrado com a ressalva no próprio campo.
- CEP da sede grafado "68.9012-59" na fonte oficial (aparenta malformado) — mantido literal, com ressalva.

### BA (Bahia)
- **Instagram** — dois handles no portal: `undime_bahia_oficial` (corpo de /contatos/) e `undime.ba` (footer). **Adotado:** `undime_bahia_oficial` como primário (aparece no bloco de contato).
- **Telefone** — seccionais nacional: (71) 99318-9868; portal /contatos/: (71) 3362-0678 (sec. executiva). **Ambos registrados**, fixo do portal como principal.

### CE (Ceará) — troca de gestão
- **Presidente** — divergência forte:
  - `noticia/seccionais` (live): **Verázia Jardim de Queiroz** (DME Quixadá/CE) ← **ADOTADO** (confiança alta).
  - Snapshot Wayback (fev/2026) e nota da tarefa: José Marques Aurélio de Souza (DME Jucás/CE).
  - **Justificativa:** José Marques migrou para a **diretoria nacional** (Secretaria de Comunicação / Conselho Fiscal nacional suplente); a presidência estadual passou a Verázia. Dado live é o mais recente.
- Portal `ce.undime.org.br` existe (link na barra do nacional) mas retornou HTTP 500 — registrado como portal com **confiança media**.

### MA (Maranhão)
- Sem divergência: seccionais live e snapshot idênticos. Presidente Karla Janys Lima Nascimento confirmado.
- Portal `ma.undime.org.br` instável (HTTP 500) — registrado com confiança media.

### MG (Minas Gerais)
- **Secretária/Diretora Executiva** — portal atual: **Suely Duque Rodarte** (Diretora Executiva); nacional/Wayback: "Denize Assunção". O portal mostra Denize como **Assessora Administrativa e Financeira** (papel distinto). **Adotado:** portal (mais atual e específico).
- CNPJ 23.840.622/0001-23 e fundação 1987 (16/11/1987) — fontes secundárias (IPEA Mapa das OSC, Econodata), **confiança media**.
- "Presente nos 853 municípios mineiros" (Econodata) = total de MG, **não** nº de associados → `municipios_num`/`associados_num` permanecem "não localizado publicamente".

### MS (Mato Grosso do Sul) — divergência de local de fórum
- **Local do Fórum Estadual Extraordinário 2026** — lista nacional dos fóruns: **Campo Grande**; portal de eventos `undimems.educacaoeventos.com.br` destaca **Bonito**. **Adotado:** Campo Grande (fonte nacional oficial); divergência anotada (pode ser outra edição/ato ou mudança de local).
- Sem portal próprio no ar (`ms.undime.org.br`/`undimems.org.br` não resolvem); seccional usa estrutura da Assomasul. X `@undimems` confirmado oficial via Playwright.

### MT (Mato Grosso)
- **CEP da sede** — /sobre/ e /seccionais: **78.050-902**; /contato: 78.049-938. **Adotado:** 78.050-902 (páginas institucionais), divergência menor anotada.
- WhatsApp no template da página diretoria (`+5565924766239`) diverge dos demais telefones — **descartado** (provável typo de template).
- Página `/diretoria/` (path antigo) é template não preenchido com dados do presidente NACIONAL — **descartada**; diretoria real em `/institucional/4/diretoria/`.
- "Simoni Borges" (seccionais) → "Simoni Pereira Borges" (portal) — refinamento, não conflito.

### PA (Pará)
- Sem divergência interna. Atenção: `@undimepr` no X = UNDIME **Paraná**, não Pará — não usar. PA sem portal próprio.

### PB (Paraíba) — rótulo equivocado na fonte oficial
- **Presidente** — `noticia/presidentes-estaduais` rotula PB como **Flávio Romero Guimarães**; mas ele é **Secretário de Finanças NACIONAL** (DME Campina Grande). Seccionais + Wayback + portal `undimepb.org.br` + IG + notícia = **Ana Paula Nunes da Silva** (Princesa Isabel) ← **ADOTADO**.
- **Papel nacional de Ana Paula** — snippet dizia "Titular do Conselho Fiscal nacional"; a página viva de diretoria **não** a inclui no Conselho Fiscal → papel nacional "não localizado publicamente".
- **Instagram** — portal cita `@undime.pb`; busca acha `@undimeparaiba` ativo. **Adotado:** `@undime.pb` (link oficial do portal); `@undimeparaiba` registrado como alternativo.
- **E-mail** — `undimeparaiba@gmail.com` (nacional) e `contato@undimepb.org.br` (portal) — ambos válidos.

### PE (Pernambuco)
- CNPJ 12.859.161/0001-14 (portal). CEP da sede: portal 52011-010; snapshot 52.011.110 — divergência menor; portal adotado.
- Vice-presidente "José Fernando de Melo (DME de Belém de Limoeiro)" — município grafado de forma incomum; registrado **literal** do portal.
- Secretária Executiva: portal não lista; snapshot aponta Maria do Socorro de Araújo Gomes — **confiança media**.

### PI (Piauí)
- Sem divergência: live e Wayback idênticos. Portal `pi.undime.org.br` HTTP 500.

### RJ (Rio de Janeiro)
- Nome do presidente: seccionais "Maria Virgínia Andrade Rocha"; diretoria nacional "Maria Virgínia Andrade Rocha **Feitosa**". Mesma pessoa (DME Nova Iguaçu) — refinamento de grafia.
- Portal `rj.undime.org.br` existe mas instável (timeout / HTTP 500). Domínios `undimerj.org.br` não resolvem.

### RN (Rio Grande do Norte)
- Snippet de buscador sugeriu telefone "(84) 3013-1767" e fórum "15 a 17 de abril" — **não confirmados**, descartados. Mantidos os dados da seccionais oficial.
- `municipios_num` = 167 confirmado pela **bio do Instagram oficial** (@undime.rn): "nos 167 municípios Potiguares" — confiança alta para o universo (não para nº de filiados pagantes).
- Portal `rn.undime.org.br` (subdomínio nacional) intermitente (erro Doctrine).

### RR (Roraima)
- Snippet de buscador citou "Presidente Sueli Terezinha Magalhães (Mucajaí)" e e-mail `undime.rr@undime.org.br` — **contradiz** a página oficial viva. **Adotado:** Alsione Sulbaran (Pacaraima) / `undimerr@gmail.com` (oficial, alta). Snippet descartado.

### RO (Rondônia) — divergência de endereço
- **Endereço da sede** — live (2026-06-22): **Rua Paulo Leal, 357, Centro, CEP 76.801-094**; Wayback (fev/2026): Rua Elias Gorayeb, 1514, CEP 76.804-144. **Adotado:** endereço live (mais recente, oficial direto).
- Grafia do nome da presidente: "Luslarlene Umbelina Souza Fiamett" (seccionais) vs "...Umbelina **de** Souza..." (diretoria) — adotada a forma de seccionais; ambas oficiais.

### RS (Rio Grande do Sul)
- Snippet de buscador citou "presidente Maristela Ferrari Ruy Guasselli" — provável contaminação de outro órgão. **Adotado:** Ana Paula Bennemann (DME São Francisco de Paula) por portal + seccionais. Snippet descartado.
- Portal `undimers.org.br` renderiza mas retorna HTTP 500 ao final (PHP fatal após render).

### SC (Santa Catarina) — troca de gestão
- **Presidente da seccional** — snapshot (fev/2026): Jucilene Antônio Fernandes (Balneário Rincão); portal ao vivo `undime-sc.org.br` (22/06/2026): **Alex Tardetti** (DME São Lourenço do Oeste), vice Jorge Luiz Buerger (Pomerode) ← **ADOTADO** (portal oficial, mais atual; confirmado por IG embarcado).
- **Jucilene permanece** como Presidência da Região Sul na diretoria **NACIONAL** (cargo distinto) — daí a aparência de conflito com o dataset nacional. Anotado.
- E-mail: snapshot `undimesc@gmail.com`; portal `assessoriaundimesc@gmail.com` e `undimesc@gmail.com` — ambos registrados.

### SE (Sergipe) — divergência geográfica no endereço
- **Endereço** — fonte oficial lista "Av. José da Cunha, 193, Frei Paulo" com "CEP 49.514.000 – **Aracaju**/SE". Frei Paulo e Aracaju são municípios distintos; o CEP 49.514-000 corresponde a **Frei Paulo**. **Mantido literal** da fonte oficial; divergência geográfica sinalizada (não inventar correção).
- Sem portal próprio no ar; domínio `undimesergipe.org` (usado no e-mail) não resolve.

### SP (São Paulo) — divergência cruzada com a nacional
- **Município de origem do presidente (Luiz Miguel Martins Garcia)** — portal estadual `/diretoria/`: **Sud Mennucci**; snapshot nacional seccionais: **Nova Odessa**. **Adotado no JSON nacional:** Nova Odessa (diretoria viva nacional); portal SP diz Sud Mennucci. Divergência cruzada explícita — recomenda-se ao reviewer confirmar a grafia definitiva.
- Secretária executiva Lélia Hartmann Torres — só na seccionais nacional, **confiança media**.

### TO (Tocantins)
- Nota da tarefa dizia "TO não tem portal próprio" e "Conselho Fiscal nacional"; ambos **corrigidos**: portal `to.undime.org.br` existe; Humberto integra a diretoria nacional em **articulação** (MEC/Congresso), **não** confirmado como Conselho Fiscal.
- Município universo: 139 municípios do estado (não nº de associados).

---

## Padrões recorrentes (para o reviewer)
- **X (Twitter):** o `grok.exe` headless single-turn não retornou posts em nenhuma execução (X exige login; ferramenta interna falhou). Handles confirmados por footer oficial onde existiam (nacional `@undime`, MS `@undimems`, SC `UndimeSC`); demais "não localizado publicamente".
- **Eventos ≥ 2026-06-22:** a maioria dos fóruns estaduais 2026 ocorreu **antes** do corte → `eventos: []` em muitos estados. Futuros confirmados: AC, AP, MA, PA, MS (nacional), PB (mês), e a série de Simpósios/Fórum do PR; SP com eventos administrativos da agenda.
- **CNPJ / fundação / financeiro / nº de associados:** "não localizado publicamente" na maioria das seccionais; exceções com CNPJ: MG, MT, PE (e BR nacional).
- **Municípios:** nº citado é frequentemente o **total do estado** (IBGE), não o de filiados — não confundir; registrado com ressalva onde aplicável.

## Atualização pós-auditoria (reviewer, 2026-06-22)

- **PR — grafia do presidente:** adotada a forma do portal estadual `undimepr.org.br` — **Adriana de Oliveira Chaves Palmieri** (a página de seccionais da nacional grafava "Adriana de Oliveira Palmieiri", com typo). `fonte_url` do campo atualizada para o portal. Demais campos do PR inalterados.

---

## Merge dos achados do Antigravity (busca_AGY.md) — 2026-06-22

Análise crítica e aplicação **aditiva** dos dados do agente AGY (a regra zero-alucinação vale para fontes de terceiros).

### Rejeitado (contradiz a fonte oficial VIVA — re-verificado por nós em 2026-06-22)
- **AC — presidente:** AGY propôs "Alysson Bestene"; a página viva `undime.org.br/noticia/seccionais` mostra **Ericson Araújo da Costa**. Mantido Ericson.
- **RO — presidente:** AGY propôs "Andreza Justina Dias (Ouro Preto do Oeste)"; a fonte viva mostra **Luslarlene Umbelina Souza Fiamett (Santa Luzia D'Oeste)** e o nome do AGY não aparece. Mantido Luslarlene.
- **SC — presidente:** AGY propôs "Jucilene Fernandes" (presidente); o **portal `undime-sc.org.br` confirma Alex Tardetti como presidente** (Jucilene é a Presidência Regional Sul nacional, que consta na página nacional). Mantido Alex Tardetti.
- **ES — portal** (`undime-es.sisp.com.br`) e **SP/RJ — contatos/sede** alternativos do AGY: não sobrescritos (mantidos os valores verificados na Fase 2). RJ/SP receberam apenas o CNPJ e redes faltantes.

### Aceito (aditivo — só preencheu lacunas; confiança `media`, AGY não re-verificado campo a campo por nós)
- **CNPJ** para ~20 seccionais (todos aprovados no dígito verificador, módulo 11) — fontes: portais estaduais, Receita Federal, Serasa, Diários Oficiais.
- **Fundação** (AC, AM, PA, RO, RR, TO).
- **Redes sociais** faltantes (ex.: GO/RN/RS YouTube; MS Instagram; RJ Facebook/YouTube).
- **Itens de confiança baixa resolvidos:** BR `prestacao_contas_url` → `undime.org.br/atas-e-pareceres` (alta, URL viva); PE `contribuicoes` (R$ 450 adimplente × R$ 1.500 inadimplente); ES vice-presidente **Adenilde Stein Silva**; SC transparência.
- **Novos eventos ≥ 22/06:** AM videoconferência (23/06); SC Seminário Primeira Infância (22-23/06).

### Confirmados (sem mudança no dado, ressalva esclarecida)
- **AM** X `@AmazonasUndime` inativo desde 2020 (mantido, já marcado). **SP** presidente origem **Nova Odessa/SP** (atual) vs. Sud Mennucci (histórico). **PR** grafia "Adriana de Oliveira Chaves Palmieri" (já aplicada na Fase 5). **MS** fórum: divergência mar/jun mantida (nossa coleta achou inscrição para 25-26/06).
