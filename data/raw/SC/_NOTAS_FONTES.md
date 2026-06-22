# Notas de coleta — UNDIME Santa Catarina (SC)

data_coleta: 2026-06-22

## Arquivos brutos
- `portal_home_20260622.html` — origem: https://undime-sc.org.br/ (HTTP 200). Fonte primária: diretoria atual, contato, redes sociais, eventos no slider.
- `portal_agenda_20260622.html` — origem: https://undime-sc.org.br/eventos/agenda-undime/ . Agenda de eventos.
- `portal_associados_20260622.html` — origem: http://undime-sc.org.br/a-undime/associados/ . Nº de municípios (295, membros natos).
- `portal_37anos_20260622.html` — origem: https://undime-sc.org.br/noticias/undime-completa-37-anos-de-atuacao-em-santa-catarina/ . Fundação (19/out; 37 anos em 2024 -> 1987).

## Fontes cruzadas (BR)
- `../BR/seccionais_wayback_20260203.txt` — bloco SC com endereço/sede, tel, email, sec. executiva (snapshot 03/02/2026).
- `../BR/live_noticia_diretoria_20260622.html` — confirma Jucilene A. Fernandes como Presidência Região Sul NACIONAL (DME Balneário Rincão/SC).

## DIVERGÊNCIA IMPORTANTE (snapshot x portal ao vivo)
- Snapshot (BR seccionais, fev/2026) listava como Presidente da SECCIONAL SC: **Jucilene Antônio Fernandes** (DME Balneário Rincão).
- Portal AO VIVO (undime-sc.org.br, 22/06/2026) mostra como presidente da seccional SC: **Alex Tardetti** (DME São Lourenço do Oeste) e vice **Jorge Luiz Buerger** (DME Pomerode).
- Decisão: priorizar o PORTAL (fonte oficial direta e mais atual). Confirmado no HTML cru via posts do Instagram embarcados ("@alex_tardetti (DME de São Lourenço do Oeste)" e vice "@jorgeluizbuerger").
- Jucilene A. Fernandes permanece como Presidência da Região Sul na diretoria NACIONAL (cargo distinto da presidência da seccional estadual).
- E-mail: snapshot tinha undimesc@gmail.com; portal exibe assessoriaundimesc@gmail.com e undimesc@gmail.com. Ambos registrados.

## Eventos
- Eventos listados na agenda (Fórum Undime SC 2026 = 24-26/03/2026; Abertura Ano Letivo 06/02/2026) são TODOS anteriores a 2026-06-22 -> NÃO incluídos no JSON (regra de corte). eventos[] vazio.

## X (grok)
- grok.exe em modo headless single-turn (-p) retornou apenas a linha de abertura, sem os resultados da busca no X (saída truncada/sem captura da execução de ferramenta). 3 tentativas. Posts recentes -> não localizado publicamente.
- Handle X confirmado pelo portal: https://twitter.com/UndimeSC (alta).
