# UNDIME Tocantins (TO) — notas de coleta

Data de coleta: 2026-06-22
Pesquisador: state-researcher (subagent)

## Fontes consultadas (com URL de origem)

### 1. Página viva de seccionais (oficial) — confianca ALTA
URL: https://undime.org.br/noticia/seccionais
Snapshot baixado: data/raw/BR/live_noticia_seccionais_20260622.html (bloco TO)
Bloco transcrito EXATAMENTE da página viva:

> Tocantins
> Presidente: Humberto de Campos Castilho
> Dirigente Municipal de Educação de Sucupira/ TO
> Secretaria executiva: Rute Soares Rodrigues
> Av. Teotônio Segurado 301 Norte, Conjunto 1, Lote 9
> CEP: 77.001-226 - Palmas/TO
> Fone/fixo (63) 3026-1480
> Celular Institucional: (63) 99938-8453
> Endereço eletrônico: undimeto@gmail.com

### 2. Eleição diretoria 2025/2027 (oficial nacional + secundária municipal) — confianca ALTA
URL oficial: https://undime.org.br/noticia/07-04-2025-22-41-undime-tocantins-elege-nova-diretoria-para-o-bienio-2025-2027-durante-forum-ordinario
URL municipal (Prefeitura de Sucupira): https://www.sucupira.to.gov.br/sucupira-e-destaque-com-secretario-de-educacao-eleito-presidente-da-undime-to-para-o-mandato-2025-2027/

Achados:
- Eleição em sexta-feira, 04/04/2025, durante o XIV Fórum Ordinário da Undime/TO.
- Chapa única "Municípios Unidos por uma Educação Melhor".
- Presidente eleito: Humberto de Campos Castilho — DME de Sucupira/TO (Secretário de Educação de Sucupira).
- Vice-presidente eleito: Wesley Portugal Lima — DME de Cristalândia/TO.
- Votação por consenso entre os 139 dirigentes municipais de educação do Estado (Tocantins tem 139 municípios).
- Conselho fiscal / demais cargos: NÃO detalhados nas fontes.

### 3. Atribuições nacionais do presidente — confianca ALTA
URL: https://to.undime.org.br/noticia/06-08-2025-20-06-presidente-da-undime-tocantins-assume-novas-atribuicoes-na-diretoria-nacional-durante-o-20o-forum-nacional-da-undime
Achado: No 20º Fórum Nacional (Salvador, jul/2025) Humberto passou a integrar a diretoria nacional
responsável por articulações com o MEC, o Congresso Nacional e outras entidades, além de acompanhar
financiamento da educação, regime de colaboração e novo PNE.
OBSERVAÇÃO: A fonte NÃO confirma que ele integra o "Conselho Fiscal" nacional. A nota da tarefa
mencionava Conselho Fiscal, mas isso não foi confirmado publicamente -> registrado como atribuição
de articulação, não Conselho Fiscal.

### 4. Fóruns Estaduais 2026 (oficial) — confianca ALTA
URL: https://undime.org.br/noticia/12-02-2026-22-25-confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026
Linha do Tocantins: "Tocantins - 15 a 17 de abril, Palmas"
=> Fórum Estadual TO 2026: 15 a 17 de abril de 2026, em Palmas.
=> DATA ANTERIOR a 2026-06-22 (corte de eventos). Logo, NÃO entra em eventos[]. eventos[] vazio.

### 5. Portal estadual próprio — confianca ALTA (existência)
URL: https://to.undime.org.br/
A seccional TO POSSUI portal próprio (contraria a nota da tarefa que dizia "TO não tem portal próprio").
Confirmado por múltiplas URLs ativas em to.undime.org.br (diretoria, noticias).
Obs: a página /diretoria/ do portal exibia diretorias antigas (até 2019-2021), sem a composição 2025/2027.

### 6. Redes sociais (web aberta) — confianca MEDIA
- Instagram: https://www.instagram.com/undimetocantins/ (handle @undimetocantins confirmado no cabeçalho da página; "UndimeTo · Palmas, TO")
- Facebook: https://www.facebook.com/undimeto/ ("Undime Tocantins | Palmas TO")
- YouTube: canal nacional Undime (https://www.youtube.com/channel/UC1ZOhrZjfG2ymzUcCGyA12g); canal específico TO não localizado.

### 7. X (Twitter)
Tentativa via `grok -p` (single-turn), repetida com --no-plan/--no-subagents/--output-format json:
o grok local entrou em modo agêntico e foi "Cancelled" sem retornar resultado de busca no X
(não possui ferramenta de busca em X exposta nesta execução). Perfil oficial no X NÃO localizado
por WebSearch tampouco. -> redes_sociais.x = "não localizado publicamente".

## Lacunas
- CNPJ; fundação; nº associados; nº municípios (associados); financeiro (receitas/contribuições/prestação de contas);
  conselho fiscal e demais cargos da diretoria; X (Twitter); LinkedIn.
- Nº de municípios do estado = 139 (universo estadual, não nº de associados) — registrado em municipios_num com ressalva.
