# UNDIME Goiás — notas de coleta (2026-06-22)

## Fontes consultadas
- `data/raw/BR/live_noticia_seccionais_20260622.html` (bloco Goiás) — alta. URL origem: https://undime.org.br/noticia/seccionais
- `data/raw/BR/seccionais_wayback_20260203.txt` (snapshot Wayback) — confirma mesmos dados.
- `data/raw/BR/live_noticia_diretoria_20260622.html` — confirma Anderlúcia de Castro Ferreira na diretoria NACIONAL como Secretaria de Comunicação (DME Anicuns/GO). URL: https://undime.org.br/noticia/diretoria
- Portal estadual https://go.undime.org.br/ — HTTP 200, mas APLICAÇÃO COM ERRO no momento da coleta: stack trace Zend/Doctrine, `SQLSTATE[HY000] [1040] Too many connections` (PDOException). Home e sub-páginas (/diretoria, /institucional/...) retornaram página de erro ou timeout. Raw salvo: `go_portal_home_20260622.html`. Portal está no ar mas sem conteúdo utilizável agora (intermitente, banco sobrecarregado).
- WebSearch (Google) — para diretoria, eventos 2026, redes.
- Instagram https://www.instagram.com/undimegoias/ — perfil oficial confirmado (público, ativo).
- Facebook https://www.facebook.com/undimegoias — página oficial confirmada (nome "Undime Goiás | Goiânia GO").
- grok (X) — `grok_x_undime_goias_20260622.txt`: "não localizado" perfil oficial no X.

## Dados confirmados (cadastrais/contato) — fonte: seccionais (alta)
- Nome: UNDIME Goiás (seccional estadual).
- Presidente: Anderlúcia de Castro Ferreira — DME de Anicuns/GO.
- Secretaria executiva: Denise Scalia de Souza.
- Sede: Av. Anhanguera, n. 5.110, Qd. 09, 4º andar, Edifício Moacir Teles - Setor Central, salas 409/411. CEP 74.043-010 - Goiânia/GO.
- Telefone: (62) 3954-6322 / (62) 3954-6263. Celular: (64) 99244-1945.
- E-mail: undimegoias@gmail.com.
- Portal: go.undime.org.br.

## Diretoria — cargo nacional
- Anderlúcia de Castro Ferreira também integra a diretoria NACIONAL 2025-2027 como Secretaria de Comunicação (confirmado em live_noticia_diretoria + busca undime.org.br notícia posse 20º Fórum Nacional, Salvador, jul/2025).

## Eventos
- Fórum Estadual Undime GO 2026: 23-24 de ABRIL de 2026, Goiânia (fonte: undime.org.br "Confira as datas dos Fóruns Estaduais 2026"). => ANTES de 2026-06-22 => NÃO incluir.
- XIII Fórum Estadual GO 2025: maio/2025, Luziânia (eleição diretoria 2025-2027). => passado.
- 11º Fórum Nacional Extraordinário: 24-27 maio 2026, Brasília. => passado (e é nacional).
- Nenhum evento GO-específico com data >= 2026-06-22 localizado. Eventos[] = vazio.

## Redes sociais
- Instagram: @undimegoias (https://www.instagram.com/undimegoias/) — oficial, público, ~4.563 seguidores, bio missão Undime. ALTA.
- Facebook: https://www.facebook.com/undimegoias — "Undime Goiás | Goiânia GO". MEDIA (existe e bate nome/local; sem selo verificação).
- X/Twitter: não localizado (grok). Buscador citou "UNDIME_GO" mas NÃO verificado e contradiz grok => não localizado.
- YouTube: não localizado.
- LinkedIn: não localizado.

## Números / financeiro
- associados_num / municipios_num: não localizados no portal (portal fora). GO tem 246 municípios (não confirmado pelo portal como nº de associados => não usar como associados).
- Financeiro / prestação de contas: não localizado publicamente.

## Divergências
- Buscador (síntese) citou telefones (62) 3524-5119 / 3264-7425 e handle X UNDIME_GO — NÃO confirmados, contradizem fonte oficial (seccionais). Descartados.
