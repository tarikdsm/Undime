# Notas de coleta — UNDIME Maranhão (MA)

data_coleta: 2026-06-22

## Fontes primárias (oficiais — undime.org.br)
- Bloco MA da página de seccionais (alta confiança), capturado em:
  `data/raw/BR/live_noticia_seccionais_20260622.html` (linha 74 e 88).
  Conteúdo literal do bloco MA:
  > Maranhão — Presidente: Karla Janys Lima Nascimento — Dirigente Municipal de Educação de Açailândia/ MA
  > Secretaria executiva: Emília Georgia Santos Alves Lustosa
  > Av dos Holandeses, casa 6, Calhau — CEP: 65.071-380 - São Luis/ MA
  > Fone: (99) 98111-5737
  > Endereço eletrônico: undimemaranhao@gmail.com
  (Não há linha "Portal:" no bloco MA.)
- Página de fóruns 2026 (alta): `data/raw/BR/live_foruns2026_20260622.html` (linha 83):
  > Maranhão - 11 e 12 de agosto, São Luís
- Diretoria executiva nacional 2025-2027: `data/raw/BR/live_noticia_diretoria_20260622.html`.
  MA aparece apenas como Suplência da Secretaria de Comunicação:
  Shirliane Monteiro de Lima Sampaio — DME de Igarapé Grande/MA (cargo NACIONAL, não da seccional MA).
  Não usado nos campos da seccional estadual MA.

## Sonda do portal estadual
- `https://ma.undime.org.br/` -> HTTP 500 (sem User-Agent) e HTTP 500 (com UA Mozilla, mas entrega 61.693 bytes de corpo — provável página de erro Plone / portal instável hoje).
- `https://ma.undime.org.br/noticia/` -> 000 (timeout).
- O portal EXISTE (aparece em resultados de busca: ma.undime.org.br/portal/secretaria/visualizar "Municípios adimplentes"; ma.undime.org.br/noticia/), mas hoje 2026-06-22 está instável/500.
  => Registrado como portal estadual oficial com confianca media (URL conhecida, conteúdo não renderizou hoje).
- `https://undime.org.br/` -> 000 (nacional fora do ar no momento da coleta).

## X / Twitter (grok)
- Tentativa única via `grok -p "..."`: o CLI ecoou a intenção de pesquisar mas NÃO retornou resultado utilizável (sem handle/posts) em modo single-turn. Segunda tentativa isolada idem.
- Resultado: handle no X "não localizado publicamente".

## Redes sociais (busca aberta best-effort)
- Instagram: @undimemaranhao -> https://www.instagram.com/undimemaranhao/ (resultado de busca; nome de perfil "Undime Maranhão" confirmado pelo título; bio não renderizou via fetch). Confianca media.
  - Post citado: https://www.instagram.com/p/DUirdGjDmSK/ ("1º Encontro Estadual UNDIME–MA 2026") — não confirmado data/conteúdo, não usado em eventos.
- Facebook: https://pt-br.facebook.com/Undimema/ (handle "Undimema", título "Undime Maranhão"). Conteúdo não renderizou via fetch (login wall). Confianca media.
- YouTube/LinkedIn: não localizados publicamente.

## Números / financeiro
- Maranhão (estado) tem 217 municípios (fato geográfico do IBGE; resumo de busca também cita "217 municípios"). NÃO confundido com nº de associados da seccional.
- nº de associados/municípios filiados à seccional: não localizado em fonte oficial direta hoje (portal MA fora do ar). -> não localizado publicamente.
- Financeiro / prestação de contas: não localizado publicamente.

## Divergências
- Nenhuma divergência entre as duas fontes oficiais (seccionais HTML linhas 74 e 88 são idênticas).
- Presidência: snapshot da tarefa = Karla Janys Lima Nascimento (Açailândia/MA) -> CONFIRMADO na fonte live de hoje.
- Sec. executiva: Emília Georgia Santos Alves Lustosa -> CONFIRMADO.
- e-mail undimemaranhao@gmail.com e tel (99) 98111-5737 -> CONFIRMADOS.
- Endereço: Av dos Holandeses, casa 6, Calhau, CEP 65.071-380, São Luís/MA -> obtido da fonte live (não estava no resumo da tarefa).
