# Notas de coleta — UNDIME Sergipe (SE)

data_coleta: 2026-06-22

## Status dos portais testados (sondagem 2026-06-22)
- `https://undimesergipe.org/` → **NÃO resolve** (curl: Could not resolve host). DNS inexistente.
- `https://www.undimesergipe.org/` → **NÃO resolve** (Could not resolve host).
- `https://se.undime.org.br/` → **timeout** (HTTPS e HTTP; sem resposta; cert WRONG_PRINCIPAL no handshake). Não respondeu.
- `https://undime.org.br/seccionais/` → HTTP 302 mas **timeout** ao seguir (portal nacional intermitente hoje).

Conclusão: nenhum portal estadual próprio da SE está no ar. O e-mail oficial usa o domínio
`@undimesergipe.org`, mas o domínio não resolve publicamente. Site/portal estadual:
"não localizado publicamente".

## Fonte primária usada
- `data/raw/BR/live_noticia_seccionais_20260622.html` — bloco "Sergipe" (snapshot da página
  nacional de seccionais coletada hoje). Confiança ALTA (oficial undime.org.br).
- `data/raw/BR/seccionais_wayback_20260203.txt` — snapshot Wayback 2026-02-03. **Confirma os
  mesmos dados** (presidente, sec. executiva, endereço, celular, e-mail). Sem divergências.
- `data/raw/BR/live_noticia_diretoria_20260622.html` — diretoria nacional 2025-2027:
  "Suplência da Secretaria de Finanças — João Luiz Andrade Dória — DME de Estância/SE".
  Cruza/confirma o nome do presidente estadual de SE.

## Bloco Sergipe (texto extraído da seccionais live, idêntico ao wayback)
> Sergipe
> Presidente: João Luiz Andrade Dória — Dirigente Municipal de Educação de Estância/ SE
> Secretaria executiva: José Arinaldo Neto
> Av. José da Cunha, 193 - 1 Andar, Frei Paulo
> CEP: 49.514.000 – Aracaju/SE   [obs: CEP "Frei Paulo" mas cidade grafada "Aracaju" na fonte — divergência geográfica registrada]
> Celular: (79) 9 9940-9549
> Endereço eletrônico: undimesergipe@undimesergipe.org

NOTA divergência endereço: a fonte oficial lista "Av. José da Cunha, 193 - 1 Andar, Frei Paulo"
e "CEP: 49.514.000 – Aracaju/SE". Frei Paulo e Aracaju são municípios distintos em SE. O CEP
49.514-000 corresponde a Frei Paulo/SE (não Aracaju). Mantido o endereço EXATAMENTE como na
fonte oficial; divergência sinalizada para auditoria.

## X (Twitter) — via grok -p
Tentativa única (task): `grok -p "Pesquise no X o perfil oficial e posts recentes da UNDIME Sergipe..."`.
Resultado: o modo headless single-turn retornou apenas linha de preâmbulo ("Vou pesquisar...")
sem conteúdo de resultado utilizável (2 execuções). Sem handle/posts do X confirmados.
→ X: "não localizado publicamente".

## Redes sociais (busca aberta best-effort)
- Instagram: **@undimesergipe** — URL https://www.instagram.com/undimesergipe/ resolve (perfil
  existe; bio/seguidores não carregaram via WebFetch). Posts referenciando "Undime Sergipe":
  - https://www.instagram.com/p/DHYVkKyOAgh/ (18º Fórum Ordinário dos DME)
  - https://www.instagram.com/p/DICeCakx4pI/ (encerramento de fórum, "sexta-feira, 4")
  - https://www.instagram.com/p/DNyG7TO3NTb/ (Coordenador Institucional Arinaldo Neto)
  Confiança: media (URL oficial resolve, mas bio não verificada diretamente).
- Facebook: página "Undime Sergipe | Aracaju SE" — https://www.facebook.com/undimesergipe/
  (título confirmado via WebFetch). Confiança: media.
- YouTube / LinkedIn / X: não localizados publicamente.

## Eventos (≥ 2026-06-22)
Fóruns 2026 localizados, TODOS anteriores ao corte (2026-06-22), portanto NÃO incluídos:
- 5º Fórum Extraordinário DME (Undime/SE) — 26 e 27 de março de 2026, Aracaju/SE.
  Fonte: https://undime.org.br/noticia/31-03-2026-23-14-undime-sergipe-leva-as-tecnologias-educacionais-ao-5o-forum-extraordinario-dos-dirigentes-municipais-de-educacao
- 18º Fórum Ordinário DME (Undime/SE) — 3 e 4 de abril de 2026.
  Fonte: https://convivaeducacao.org.br/fique_atento/5377 ; https://www.instagram.com/p/DHYVkKyOAgh/
- 14º Fórum Extraordinário + 4º Encontro Interestadual Undime AL e SE — 28 a 30 de abril de 2026,
  Maceió/AL (participação de ~75 dirigentes de SE).
  Fonte: https://undime.org.br/noticia/23-04-2026-00-11-undime-alagoas-realiza-14-forum-extraordinario-e-4-encontro-interestadual-das-seccionais-al-e-se
Nenhum evento de SE com data >= 2026-06-22 localizado → eventos: [].
Página rn.undime.org.br com "datas dos fóruns 2026" retornou HTTP 500 (não acessível).

## Números
- Sergipe possui 75 municípios (IBGE). Fonte: https://www.ibge.gov.br/cidades-e-estados/se.html
  Notícia AL/SE menciona "75 Dirigentes de Sergipe" participando do encontro interestadual,
  consistente com os 75 municípios do estado.
- associados_num específico da UNDIME/SE: não declarado oficialmente → não localizado.
- municipios_num: usado o total estadual (75), confiança media (IBGE; é o universo do estado,
  não necessariamente o nº de filiados à seccional).

## Financeiro
Receitas, contribuições e prestação de contas: não localizados publicamente (sem portal estadual
no ar; sem documentos públicos encontrados).
