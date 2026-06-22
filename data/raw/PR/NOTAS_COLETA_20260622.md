# Notas de coleta — UNDIME Paraná (PR) — 2026-06-22

## Fontes consultadas
- data/raw/BR/live_noticia_seccionais_20260622.html (bloco Paraná) — oficial undime.org.br
- data/raw/BR/live_noticia_diretoria_20260622.html (Adriana Palmieri = Vice-Presidência Região Sul nacional)
- data/raw/BR/seccionais_wayback_20260203.txt (snapshot apoio)
- https://undimepr.org.br/ (portal estadual, HTTP 200) -> portal_home_20260622.html (188.560 bytes)
- https://undimepr.org.br/eventos -> portal_eventos_20260622.html (103.602 bytes)
- https://undimepr.org.br/dirigentes -> portal_dirigentes_20260622.html (1.834.759 bytes)
- https://undimepr.org.br/associados (via WebFetch)
- WebSearch: redes sociais

## Achados-chave

### Cadastrais / contato (portal + seccionais, ALTA)
- Nome oficial: "União dos Dirigentes Municipais de Educação do Paraná" (portal undimepr.org.br)
- Endereço: Edifício Executive Center Everest, Rua Comendador Araujo, 143, 13° andar - sala 134, Centro. CEP: 80420-900 - Curitiba/PR
- Telefone: (41) 3077-1962 (portal + seccionais)
- Celular: (45) 99974-3289 (seccionais)
- E-mail: undimepr@undimepr.org.br (portal + seccionais)
- Portal: https://undimepr.org.br/
- CNPJ: NAO localizado no portal nem nas fontes -> lacuna
- Fundacao: NAO localizado -> lacuna

### Diretoria (seccionais oficial undime.org.br, ALTA)
- Presidente: Adriana de Oliveira Palmieiri — DME de Maringá/PR
  (na diretoria nacional aparece como "Adriana Palmieri", Vice-Presidência Região Sul, DME Maringá/PR — confirma)
- Secretaria executiva: Débora Jurkévicz da Silva (seccionais + aparece no portal home HTML)
- Conselho fiscal: NAO localizado -> lacuna
- A pagina /dirigentes lista 399 dirigentes cadastrados (diretório de membros municipais),
  com cargos de suplentes/delegados/vice-secretarias, mas NAO lista presidente/sec exec
  de forma estruturada. Mantida atribuição via seccionais (ALTA).

### Números (portal /dirigentes, ALTA)
- "263 associados | 399 dirigentes cadastrados | 399 municípios"
  -> associados_num = 263 ; municipios_num = 399 (PR tem 399 municípios — bate)

### Financeiro
- Página /associados tem sistema "Anuidade 2026" (boleto por município) mas NAO divulga valores.
- Prestação de contas: NAO localizada -> lacuna

### Redes sociais
- Instagram: https://www.instagram.com/undimepr/ (ALTA — embeds de posts /undimepr no portal oficial + WebSearch)
- Facebook: https://www.facebook.com/undimeparana/ (MEDIA — WebSearch "Undime Paraná | Curitiba PR"; live truncada)
- X/Twitter: https://x.com/undimepr (MEDIA — WebSearch "Undime Paraná (@undimepr) / X"; live retornou HTTP 402)
- YouTube: portal usa lives em youtube.com/watch (ex.: O1KFHlklJnQ) mas canal oficial nao identificado por handle -> NAO localizado (lacuna)
- LinkedIn: NAO localizado -> lacuna

### Eventos (>= 2026-06-22) — portal /eventos (ALTA)
- I Simpósio da Undime Paraná — 2026-07-03 — Francisco Beltrão/PR (AMSOP, R. Peru, 1301)
  Inscrição: https://ferrazweb.erpscam.com.br/inscricao/index/481
- II Simpósio da Undime Paraná — 2026-08-28 — local a definir
- III Simpósio da Undime Paraná — 2026-09-25 — local a definir
- Fórum Extraordinário da Undime Paraná — 2026-11-11 a 2026-11-13 — Foz do Iguaçu/PR
- (Excluídos: eventos < 2026-06-22, ex. Fórum 20-22/05/2026 e Seminário 12-13/03/2026)

### X via grok
- `grok -p "..."` retornou apenas preâmbulo (não produziu resultado útil em modo headless single-turn).
  Conforme regra (uma tentativa), seguimos com handle confirmado por WebSearch (x.com/undimepr).

## Divergências
- Nenhuma divergência material entre seccionais e portal. Portal confirma endereço, telefone,
  e-mail e sec. executiva idênticos ao bloco de seccionais.
