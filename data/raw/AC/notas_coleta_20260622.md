# Notas de coleta — UNDIME Acre (AC)

data_coleta: 2026-06-22

## Fontes primárias usadas (live, baixadas hoje em data/raw/BR/, HTTP 200)
- Seccionais (live): https://undime.org.br/noticia/seccionais
  arquivo: data/raw/BR/live_noticia_seccionais_20260622.html (linha 74/95)
- Presidentes estaduais (live): https://undime.org.br/noticia/presidentes-estaduais
  arquivo: data/raw/BR/live_noticia_presidentes-estaduais_20260622.html
- Diretoria NACIONAL (live): https://undime.org.br/noticia/diretoria
  arquivo: data/raw/BR/live_noticia_diretoria_20260622.html
- Fóruns 2026 (live): data/raw/BR/live_foruns2026_20260622.html
  (origem: https://undime.org.br/noticia/12-02-2026-22-25-confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026)

## Dado bruto — bloco Acre na página SECCIONAIS (live, 2026-06-22)
"Acre
Presidente: Ericson Araújo da Costa
Dirigente Municipal de Educação de Porto Valter/ AC
Secretaria executiva
Ana Luce Galvão Moreira da Cruz
Centro de Línguas. Av. Getúlio Vargas, 3030 - Bosque
CEP: 69900-589 - Rio Branco/AC
Celular: (68) 99971-4714
Endereço eletrônico: undimeacre@gmail.com"

## DIVERGÊNCIA de presidente entre páginas oficiais vivas
- SECCIONAIS (live): Ericson Araújo da Costa — DME de Porto Valter/AC  <-- ADOTADO
- PRESIDENTES-ESTADUAIS (live): "Acre — Presidente: Márcio José Batista — Dirigente Municipal de Rio Branco"
- DIRETORIA NACIONAL (live): Márcio José Batista (Rio Branco/AC) aparece como cargo NACIONAL
  (Suplente do Secretário de Articulação Técnica) — NÃO é o presidente da seccional AC.
- WAYBACK 2026-02-03 (snapshot): Presidente: Alysson Bestene — DME de Rio Branco/AC
  arquivo: data/raw/BR/seccionais_wayback_20260203.txt

Decisão: adoto Ericson Araújo da Costa (página seccionais é a mais detalhada/contato-focada
e foi corroborada por busca secundária). Divergência registrada para auditoria.
A página presidentes-estaduais aparenta estar desatualizada.

## Corroboração secundária (confianca media)
- WebSearch "UNDIME Acre presidente 2026" -> "Ericson Araújo da Costa, DME de Porto Valter/AC"
- CNPJ: 00.670.658/0001-00 — "UNIAO DOS DIRIGENTES MUNICIPAIS DE EDUCACAO DO ACRE"
  fontes: https://cnpj.linkana.com/cnpj/UNIAO-DOS-DIRIGENTES-MUNICIPAIS-DE-EDUCACAO-DO-ACRE/00670658000100
          https://www.jusbrasil.com.br/nome/undime-acre/cnpj-DL2wd3X8jgh
  (páginas não abriram via WebFetch; CNPJ consistente em 2 resultados de busca -> media)

## Eventos >= 2026-06-22
- Fórum Estadual da Undime Acre — 1, 2 e 3 de julho de 2026, Rio Branco.
  Fonte (live): data/raw/BR/live_foruns2026_20260622.html
  texto: "Acre - 1, 2 e 3 de julho, Rio Branco"

## Redes sociais
- Instagram: https://www.instagram.com/undimeacre/ (confirmado em WebSearch; "Undime Acre · Rio Branco, AC") -> media
- Facebook/X/YouTube/LinkedIn: não localizados publicamente.

## X (grok)
- grok -p (single-turn) executado 2x. Retornou tool_output_error (WebFetch interno do grok falhou).
  Nenhum dado de X retornado. Handle no X: não localizado via grok.

## Portal estadual
- https://ac.undime.org.br/ existe (referenciado como bandeira/link no site nacional) MAS
  retornou HTTP 500 (fora do ar) em 2026-06-22. Registrado como URL, conteúdo indisponível.

## Não localizado publicamente
- fundacao, sede_endereco (sede própria; só endereço da secretaria executiva), associados_num,
  municipios_num, financeiro (receitas/contribuicoes/prestacao_contas), conselho_fiscal seccional,
  handle X, facebook, youtube, linkedin.
- Obs: Acre tem 22 municípios (dado IBGE), mas nº de ASSOCIADOS/municípios filiados à seccional
  não foi confirmado em fonte oficial -> não localizado.
