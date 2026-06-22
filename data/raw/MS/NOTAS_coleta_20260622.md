# Notas de coleta — UNDIME Mato Grosso do Sul (MS)
data_coleta: 2026-06-22

## Status dos portais testados
- https://ms.undime.org.br/         -> DNS NAO RESOLVE (host inexistente)
- https://www.undimems.org.br/      -> DNS NAO RESOLVE
- https://undimems.org.br/          -> DNS NAO RESOLVE
- https://assomasul.org.br/         -> HTTP 526 (erro SSL/Cloudflare) em https direto
- https://www.assomasul.org.br/     -> HTTP 200 (site WordPress da Assomasul; estrutura usada pela seccional)
- https://undimems.educacaoeventos.com.br/ -> HTTP 200 (PORTAL DE EVENTOS OFICIAL da Undime-MS)

## Fontes primarias usadas
- data/raw/BR/live_noticia_seccionais_20260622.html  (bloco MS) -> cadastrais/contato/diretoria (ALTA)
- data/raw/BR/seccionais_wayback_20260203.txt         -> confirma bloco MS identico (ALTA)
- data/raw/BR/live_noticia_diretoria_20260622.html    -> Silvia Patricia Freire = Vice-Presidencia Regiao Centro-Oeste (nacional 2025-2027), DME Itaquirai/MS
- data/raw/BR/live_foruns2026_20260622.html           -> "Mato Grosso do Sul - 25 e 26 de junho, Campo Grande" (lista nacional dos foruns 2026)
- https://undimems.educacaoeventos.com.br/            -> presidente, sec. executiva, contatos, email (ALTA)

## Dados confirmados (cruzados em >=2 fontes)
- Nome: UNDIME Mato Grosso do Sul / Uniao dos Dirigentes Municipais de Educacao de Mato Grosso do Sul
- Presidente: Silvia Patricia Freire — DME de Itaquirai/MS (mandato 2025-2027)
- Secretaria executiva: Marilda Fernandes de Oliveira Coelho
- Endereco sede: Avenida Eduardo Elias Zahran nº 3179 - Bairro Antonio Vendas - CEP 79.003-000 - Campo Grande/MS
- Telefone: (67) 3348-5022 (portal de eventos tambem cita 3348-5023)
- Celular: (67) 99906-4529
- E-mail: undime@assomasul.org.br
- Municipios no estado (universo atendido): 79 (17o Forum reuniu gestores "dos 79 municipios do estado")

## Diretoria nacional (contexto)
- Silvia Patricia Freire = Vice-Presidencia Regiao Centro-Oeste na Diretoria Executiva Nacional 2025-2027.

## Evento (>= 2026-06-22)
- "Forum Estadual Extraordinario da Undime/MS" — 25 e 26 de junho de 2026, Campo Grande
  fonte: live_foruns2026_20260622.html (lista nacional dos foruns 2026)
- DIVERGENCIA: portal de eventos undimems.educacaoeventos.com.br destaca BONITO como local
  (possivelmente outra edicao/ato; pode haver mudanca de local nao refletida na lista nacional).
  Inscricao aberta via undimems.educacaoeventos.com.br ("Inscreva-se").
  Registrado o local da fonte nacional oficial (Campo Grande) e anotada a divergencia.

## Redes sociais
- X (Twitter): @undimems CONFIRMADO OFICIAL via Playwright/Chrome.
  Bio: "UNDIME MS - Uniao dos Dirigentes Municipais de Educacao de Mato Grosso do Sul"
  Local: Campo Grande MS | Desde: January 2011 | 330 posts | 57 seguidores
  URL: https://x.com/undimems
  (Timeline nao renderizou posts publicamente sem login; posts recentes nao verificados.)
- Instagram @undimems -> "Profile nao esta disponivel" (NAO existe/indisponivel).
- Instagram/Facebook/YouTube/LinkedIn oficiais -> nao localizados publicamente.

## grok (X) — tentativa
Executado `grok -p/--single` (uma tentativa, isolado do projeto). A saida headless ficou truncada,
indicou o handle "@undimems" mas nao retornou URLs de posts verificadas. Verificacao final do
handle feita de forma independente via Playwright (acima).

## Lacunas
- CNPJ, fundacao da seccional, conselho fiscal/outros cargos da diretoria estadual
- numero de associados/filiados (numero especifico) — apenas universo de 79 municipios do estado
- financeiro (receitas/contribuicoes/prestacao de contas)
- Instagram/Facebook/YouTube/LinkedIn
- site/portal estadual proprio (inexistente; seccional usa estrutura Assomasul)
