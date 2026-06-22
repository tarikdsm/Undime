# Notas de coleta — UNDIME-MG (2026-06-22)

## Fontes consultadas (com URL de origem)

### Portal estadual oficial (fonte primária — confianca alta)
- Home: https://undimemg.org.br/ -> `portal_home_20260622.html` (HTTP 200, 128.719 b)
- Diretoria Executiva: https://undimemg.org.br/institucional/diretoria-executiva/ -> `portal_institucional_diretoria-executiva_20260622.html`
- Secretaria/Equipe Executiva: https://undimemg.org.br/secretaria-executiva/ -> `portal_secretaria-executiva_20260622.html`
- Portal de Transparência: https://undimemg.org.br/portal-de-transparencia/ -> `portal_portal-de-transparencia_20260622.html`
- Filiados: https://undimemg.org.br/filiados/ -> `portal_filiados_20260622.html`
- Notícias: https://undimemg.org.br/noticias/ (via WebFetch + wp-json REST)

### Site nacional (fontes locais já baixadas — apoio)
- `../BR/live_noticia_seccionais_20260622.html` (bloco Minas Gerais)
- `../BR/seccionais_wayback_20260203.txt` (snapshot Wayback)
- `../BR/live_noticia_diretoria_20260622.html` (confirma Jônatas = Presidência Região Sudeste nacional, DME Mirabela/MG)

### Cadastrais (fontes secundárias — confianca media)
- IPEA Mapa das OSC (registro governamental): https://mapaosc.ipea.gov.br/detalhar/507375
  - CNPJ 23.840.622/0001-23; Razão social completa; Fundação 1987; endereço R. Alagoas, Funcionários, BH/MG.
- Econodata (dados Receita Federal): https://www.econodata.com.br/consulta-empresa/23840622000123-...
  - CNPJ 23.840.622/0001-23; "fundada em 16/11/1987"; "presente nos 853 municípios mineiros".

### X (Twitter)
- `grok_x_search_20260622.txt` — chamada `grok -p "..."` (1 tentativa, exit 0) retornou apenas a 1ª linha de raciocínio; sem listagem final de posts.
- Handle confirmado pelo HTML do portal: https://twitter.com/undimemg

## Achados-chave / DIVERGÊNCIAS

1. **Secretária/Diretora Executiva:** o portal (atual) indica **Suely Duque Rodarte – Diretora Executiva** (diretoria@undimemg.org.br).
   O site nacional e o snapshot Wayback listam "Denize Assunção" como secretária executiva — porém o portal mostra **Denize Assunção como Assessora Administrativa e Financeira** (administrativo@undimemg.org.br, (31) 98751-4760).
   -> Adotado o portal (mais atual e específico). Divergência registrada.

2. **Presidente:** Jônatas Gonçalves Rego (Mirabela) — confirmado no portal (Diretoria Executiva), no site nacional e no snapshot. Também é Presidência da Região Sudeste da Undime nacional. Convergência total.

3. **Biênio:** ATA "BIENIO-UNDIME-MG-2024X2027" (transparência) confirma gestão atual 2024-2027.

4. **Redes sociais (do HTML do portal, confianca alta):**
   - Instagram: https://www.instagram.com/undimemg/
   - Facebook: https://www.facebook.com/undimemg
   - X/Twitter: https://twitter.com/undimemg
   - YouTube: https://www.youtube.com/undimemg
   - LinkedIn: não localizado no portal.

5. **Financeiro:** Portal de Transparência publica Balanço 2023/2024 e DRE 2023/2024 (PDFs), além de Relatórios de Gestão 2021-2025 e Plano de Trabalho 2025-2027.
   - prestacao_contas_url -> https://undimemg.org.br/portal-de-transparencia/ (alta)
   - Balanço 2024: https://undimemg.org.br/wp-content/uploads/2026/06/BALANCO-2024.pdf
   - DRE 2024: https://undimemg.org.br/wp-content/uploads/2026/06/DRE-2024.pdf
   - Valores de receita NÃO extraíveis (PDFs gerados por JasperReports/imagem; sem OCR). -> receitas/contribuicoes = não localizado publicamente.

6. **Nº de municípios associados:** portal não informa total de filiados. Econodata afirma "presente nos 853 municípios mineiros" (853 = total de municípios de MG). Não há confirmação de que TODOS sejam associados -> registrado como não localizado publicamente (não inventar nº de associados/filiados).

7. **Eventos >= 2026-06-22:** NENHUM evento futuro com data agendada localizado (portal, notícias/wp-json, ENEC-PIEC). Item mais recente: 18/06/2026. -> eventos[] vazio.
