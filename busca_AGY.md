# busca_AGY.md — Consolidação e Relatório de Pesquisa Adicional (Antigravity)

Este arquivo consolida a análise dos controles de não-alucinação implementados no projeto, a confirmação de dados que estavam com confiança baixa ou divergentes, a identificação de novos eventos futuros (a partir do dia de hoje, **22/06/2026**) e os novos dados de contatos, CNPJs e redes sociais localizados para a UNDIME Nacional (BR) e suas 26 seccionais estaduais.

---

## 1. Análise dos Controles de Não-Alucinação e Auditoria do Claude

Verificamos minuciosamente como o Claude estruturou o projeto para evitar alucinações e auditar os dados coletados. Os principais pilares dessa governança de dados são:

### A. Proveniência por Campo (Data Schema)
Em vez de registrar os dados brutos ou soltos, cada campo de dados no projeto foi encapsulado em um objeto estruturado:
```json
{
  "valor": "Dado coletado ou 'não localizado publicamente'",
  "fonte_url": "URL exata da página oficial, snapshot do Wayback ou documento consultado",
  "data_coleta": "YYYY-MM-DD",
  "confianca": "alta | media | baixa"
}
```
* **Ausência de Dados:** Quando uma informação (como CNPJ, orçamento ou redes) não foi encontrada nas fontes públicas gratuitas, ela é registrada explicitamente como `"não localizado publicamente"` (nunca omitida, deixada vazia ou ficticiamente preenchida).
* **Ausência de Chaves:** Em caso de ferramentas indisponíveis, o projeto seguiu a diretriz de não-interrupção apenas para ferramentas específicas (como Firecrawl/Bright Data/Apify, que não possuíam chaves de API nesta máquina), realizando uma pesquisa manual e automatizada headless "best-effort".

### B. Matriz de Resolução de Divergências (`docs/CONSOLIDACAO.md`)
O Claude definiu uma hierarquia rígida e consistente para resolver divergências de dados entre as fontes oficiais nacional, estaduais e secundárias:
1. **Precedência de Fontes:** A fonte oficial direta local (ex: portal da seccional do estado) sempre prevalece sobre a informação do site nacional, que costuma estar mais desatualizada.
2. **Atualidade Dinâmica:** Em caso de conflito entre páginas vivas oficiais, adota-se a mais específica e recente (ex: a página específica de seccionais em detrimento de uma página estática de presidentes datada de 2011).
3. **Exclusão de Resumos:** Snippets de motores de busca (como o Google Search Cards) nunca prevalecem sobre fontes oficiais diretas, pois são frequentemente contaminados por outras entidades.
4. **Respeito às Grafias Divergentes:** Se a divergência for geográfica ou não-resolvível (como CEPs diferentes do footer e do cabeçalho da sede nacional), registram-se ambos no campo sem inventar uma versão "correta".

### C. Testes Programáticos de Integridade (CI/CD)
O projeto conta com scripts de automação que barram qualquer inserção que viole as regras de negócio:
* `tests/integrity.mjs`:
  1. Varre recursivamente todas as chaves do dataset consolidado. Se um campo possui um valor real (que não contenha "não localizado"), ele **obrigatoriamente** precisa ter `fonte_url` preenchido, `data_coleta` no formato ISO `YYYY-MM-DD` e a classificação de `confianca` válida.
  2. Executa a validação do dígito verificador de todos os CNPJs do dataset via algoritmo **módulo 11**, impedindo CNPJs inválidos.
  3. Compara se o master `data/undime.json` está idêntico à réplica de build do site e aos arquivos de processamento individuais.
  4. Garante que todos os eventos do dataset possuem `data_inicio` maior ou igual à data de corte (`2026-06-22`).
* `tests/site-links.mjs`:
  - Analisa todos os arquivos `.html` compilados e valida links internos e formatos de URLs externas, assegurando que URLs que contenham descrições em texto ou caminhos relativos de arquivos locais sejam interceptadas e corrigidas no build.

---

## 2. Confirmação de Itens de Confiança Baixa e Divergências

Através de novas buscas, conseguimos elucidar os itens de baixa confiança e divergências levantados na auditoria anterior:

1. **AM — Perfil de X (Twitter) `@AmazonasUndime` (Confiança Baixa):**
   * *Status:* **Confirmado.** A conta é de fato a única associada historicamente à seccional do Amazonas. No entanto, ela está inativa desde 17/12/2020 e tem apenas 9 seguidores. A seccional não utiliza mais essa rede e centraliza sua comunicação no portal nacional.
2. **ES — Composição da Diretoria Executiva 2025-2027 (Confiança Baixa):**
   * *Status:* **Resolvido.** A vice-presidente eleita para o biênio 2025-2027 é **Adenilde Stein Silva** (DME de Marechal Floriano/ES), atuando ao lado do presidente Vanderson Valadares de Campos (DME de Alegre/ES). A eleição ocorreu no XVI Fórum Estadual Ordinário em março de 2025.
3. **SP — Origem do Presidente Luiz Miguel Martins Garcia (Divergência):**
   * *Status:* **Confirmado.** O município de origem atual dele é **Nova Odessa/SP**, onde assumiu como Secretário Municipal de Educação em 13 de abril de 2026. A menção histórica a **Sud Mennucci/SP** deve-se ao fato de ele ter sido Dirigente Municipal de Educação nessa cidade por mais de uma década, que foi sua base política na Undime. Ambos os registros são verdadeiros no tempo, sendo Nova Odessa a atual.
4. **BR — URL Direta de Prestação de Contas (Confiança Baixa):**
   * *Status:* **Resolvido.** A URL oficial direta e ativa para consulta de prestação de contas, pareceres de auditoria e relatórios fiscais é **`https://undime.org.br/atas-e-pareceres`** (menu "Atas, Pareceres e Relatórios Financeiros"). Há arquivos de auditoria consolidados até o exercício financeiro de 2024. Adicionalmente, o balanço de gestão em formato de vídeo está em **`https://undime.org.br/balanco-de-gestao/`**.
5. **PR — Grafia do Nome da Presidente (Divergência):**
   * *Status:* **Confirmado.** O nome completo oficial é **Adriana de Oliveira Chaves Palmieri**. O registro "Adriana de Oliveira Palmieiri" contido no site nacional é de fato um erro de digitação (typo).
6. **PE — Valores das Contribuições/Anuidades (Confiança Baixa):**
   * *Status:* **Resolvido.** Não há uma tabela tarifária de anuidades exposta abertamente no site, mas a dinâmica das contribuições reflete-se diretamente nos eventos: para o Fórum da seccional, municípios adimplentes com a anuidade 2026 pagaram **R$ 450,00** por inscrição, enquanto municípios inadimplentes pagaram **R$ 1.500,00** (uma diferença penalizadora de R$ 1.050,00).
7. **MS — Localização do Fórum Estadual Extraordinário 2026 (Divergência):**
   * *Status:* **Resolvido.** O Fórum Estadual Extraordinário da seccional de MS ocorreu nos dias **23 e 24 de março de 2026** em **Campo Grande/MS**. O encontro em **Bonito/MS** no dia 22 de janeiro de 2026 foi um evento de Acolhida de Gestores Municipais (outro evento na agenda anual).

---

## 3. Próximos Eventos Mapeados (A partir de 22/06/2026)

Filtramos e levantamos de forma cronológica as atividades futuras mapeadas que ocorrerão a partir de hoje:

* **22 e 23 de Junho de 2026** — *Seminário Nacional – Políticas Públicas para a Primeira Infância* | Local: Auditório do Instituto Serzedello Corrêa do TCU, Brasília/DF | Divulgação/Apoio: Undime-SC | [Fonte](https://undime-sc.org.br/)
* **23 de Junho de 2026** — *Videoconferência Formativa (O papel da educação empreendedora na gestão municipal)* | Local: Plataforma Virtual / Online | Divulgação/Apoio: Undime Amazonas | [Fonte](https://undime.org.br/)
* **25 e 26 de Junho de 2026** — *Fórum Estadual Extraordinário da Undime/MS 2026* | Local: Campo Grande/MS | Fonte: Calendário Nacional da Undime (Nota: MS antecipou seu fórum estadual para março de 2026, mas este período é mantido na listagem nacional de datas prévias).
* **30 de Junho de 2026** — *Último Dia – Diagnóstico de Equidade – PNEERQ* | Local: Plataforma de Gestão SP | Divulgação: Undime-SP | [Fonte](https://undime-sp.org.br)
* **01 a 03 de Julho de 2026** — *Fórum Estadual Extraordinário da Undime Acre 2026* | Local: Rio Branco/AC | [Fonte](https://undime.org.br/noticia/12-02-2026-22-25-confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026)
* **02 e 03 de Julho de 2026** — *Fórum Estadual Extraordinário da Undime Pará 2026* | Local: Belém/PA | [Fonte](https://undime.org.br/noticia/12-02-2026-22-25-confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026)
* **03 de Julho de 2026** — *I Simpósio da Undime Paraná (Tema: Educação Contemporânea)* | Local: Francisco Beltrão/PR (Auditório da AMSOP) | [Fonte](https://undimepr.org.br/eventos/simposio-francisco-beltrao-2026)
* **31 de Julho de 2026** — *Encerramento da 1ª Etapa do Censo Escolar da Educação Básica 2026* | Local: Sistema Educacenso (Nacional) | Divulgação: Undime-SP | [Fonte](https://undime-sp.org.br)
* **11 e 12 de Agosto de 2026** — *Fórum Estadual Extraordinário da Undime Maranhão 2026* | Local: São Luís/MA | [Fonte](https://undime.org.br/noticia/12-02-2026-22-25-confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026)
* **Agosto de 2026 (dia a definir)** — *Fórum Estadual Extraordinário da Undime Paraíba 2026* | Local: a definir | [Fonte](https://undime.org.br/noticia/12-02-2026-22-25-confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026)
* **28 de Agosto de 2026** — *II Simpósio da Undime Paraná* | Local: a definir | [Fonte](https://undimepr.org.br/eventos)
* **25 de Setembro de 2026** — *III Simpósio da Undime Paraná* | Local: a definir | [Fonte](https://undimepr.org.br/eventos)
* **05 e 06 de Novembro de 2026** — *Fórum Estadual Extraordinário da Undime Amapá 2026* | Local: Macapá/AP | [Fonte](https://undime.org.br/noticia/12-02-2026-22-25-confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026)
* **11 a 13 de Novembro de 2026** — *Fórum Extraordinário da Undime Paraná* | Local: Foz do Iguaçu/PR | [Fonte](https://undimepr.org.br/eventos)

---

## 4. Novos Dados e Confirmações (Estado por Estado)

Abaixo estão listadas todas as 27 unidades do projeto, contendo os novos dados descobertos nas buscas paralelas (como CNPJs, contatos e redes sociais anteriormente marcados como lacunas).

### 1. UNDIME Nacional (BR)
* **CNPJ:** `03.604.410/0001-30` (Confiança: alta, [Fonte](https://undime.org.br/noticia/estatuto))
* **Gestão:** Presidente Luiz Miguel Martins Garcia (DME de Nova Odessa/SP); Secretário(a) Executivo(a): `"não localizado publicamente"` (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** SCS Quadra 06, Bloco A, nº 240, Edifício Carioca, Salas 601, 607, 608, 610 a 615, Asa Sul, Brasília/DF, CEP 70.325-900 (Confiança: alta, [Fonte](https://undime.org.br/))
* **Contatos:** (61) 3575-7600 / (61) 3037-7888 | undimenacional@undime.org.br / ouvidoria@undime.org.br | [site](https://undime.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimenacional`, Facebook `https://facebook.com/undime`, X `https://twitter.com/undime`, YouTube `https://youtube.com/undimenac`, LinkedIn `https://br.linkedin.com/company/undime-nacional` (Confiança: alta)
* **Dados Financeiros:** Prestação de contas via relatórios fiscais no link `https://undime.org.br/atas-e-pareceres` e balanço de gestão em `https://undime.org.br/balanco-de-gestao/` (Confiança: alta).
* **Próximos Eventos:** MS (25-26 Junho 2026), AC (1-3 Julho 2026), PA (2-3 Julho 2026), MA (11-12 Agosto 2026), PB (Agosto 2026), AP (5-6 Novembro 2026).

### 2. UNDIME Acre (AC)
* **CNPJ:** `00.670.658/0001-00` (Confiança: alta, [Fonte](https://cnpj.linkana.com/cnpj/UNIAO-DOS-DIRIGENTES-MUNICIPAIS-DE-EDUCACAO-DO-ACRE/00670658000100))
* **Fundação:** `21/06/1995` (Confiança: alta, Fonte: Receita Federal)
* **Gestão:** Presidente Alysson Bestene Lins (DME de Rio Branco/AC); Secretária Executiva: Ana Luce Galvão Moreira da Cruz (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** Centro de Línguas. Av. Getúlio Vargas, 3030 - Bosque, Rio Branco/AC, CEP: 69.900-589 (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Contatos:** (68) 99971-4714 | undimeacre@gmail.com | [portal](https://ac.undime.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimeacre/` (Confiança: alta). Demais: `"não localizado publicamente"`
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** Fórum Estadual Extraordinário da Undime Acre 2026 (01 a 03 de julho de 2026).

### 3. UNDIME Alagoas (AL)
* **CNPJ:** `69.982.361/0001-87` (Confiança: alta, [Fonte](https://www.undimeal.com.br/))
* **Gestão:** Presidente Djalma Barros (Feliz Deserto/AL); Secretário Executivo: José Neilton Nunes Alves (Confiança: alta, [Fonte](https://undime.org.br/seccionais/))
* **Sede:** Av. D. Antônio Brandão, 218 - Farol, CEP 57.021-190, Maceió/AL (Confiança: alta, [Fonte](https://undime.org.br/seccionais/))
* **Contatos:** (82) 3336-6637 / (82) 98802-1854 | undimealagoas@gmail.com | [portal](https://www.undimeal.com.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimeal` (Confiança: alta). Demais: `"não localizado publicamente"`
* **Dados Financeiros:** Seção de balanços do portal exibe zero registros em 22/06/2026.
* **Próximos Eventos:** `"não localizado publicamente"`

### 4. UNDIME Amapá (AP)
* **CNPJ:** `"não localizado publicamente"` (Confiança: baixa)
* **Gestão:** Presidente Samuel dos Santos Silva (DME de Tartarugalzinho/AP); Secretária Executiva: Silvia Helena Neves Barbosa (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** Av. FAB, 3070 - Santa Rita - Macapá/AP - CEP: 68.901-259 (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Contatos:** (96) 99163-9331 | undimeap16@gmail.com (Confiança: alta)
* **Redes Sociais:** `"não localizado publicamente"`
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** Fórum Estadual Extraordinário (5 e 6 de novembro de 2026).

### 5. UNDIME Amazonas (AM)
* **CNPJ:** `02.516.184/0001-72` (Confiança: alta, Fonte: Receita Federal)
* **Fundação:** `25/07/1997` (Confiança: alta, Fonte: Receita Federal)
* **Gestão:** Presidente Marcus Lúcio de Sousa (DME de Tefé/AM); Secretário Executivo: Bruno Sizino da Silva Bezerra (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** Av. Álvaro Maia, 2357, 10º andar, sala 1006 - Edifício Corporate Trade Center, Manaus/AM - CEP: 69.057-035 (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Contatos:** (92) 3232-1876 / (92) 98181-8471 | undime.am@gmail.com (Confiança: alta)
* **Redes Sociais:** X `https://x.com/AmazonasUndime` (inativo desde 2020). Demais: `"não localizado publicamente"`
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** Videoconferência formativa em 23 de junho de 2026.

### 6. UNDIME Bahia (BA)
* **CNPJ:** `32.700.312/0001-02` (Confiança: alta, [Fonte](https://undimebahia.com.br/))
* **Gestão:** Presidente Anderson Passos dos Santos (Aratuípe/BA); Secretária Executiva: Sônia Magaly Machado Santos (Confiança: alta, [Fonte](https://undime.org.br/seccionais/))
* **Sede:** Rua Professor Clóvis Veiga, nº 1, Costa Azul, CEP 41.760-140 - Salvador/BA (Confiança: alta, [Fonte](https://undime.org.br/seccionais/))
* **Contatos:** (71) 3362-0678 / (71) 99318-9868 | undimedabahia@gmail.com | [portal](https://undimebahia.com.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undime_bahia_oficial/`, Facebook `https://www.facebook.com/undimebahiaoficial`, YouTube `https://www.youtube.com/channel/UC4rUl0W3nGPraryaRfW0r-w` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 7. UNDIME Ceará (CE)
* **CNPJ:** `23.727.373/0001-64` (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Gestão:** Presidente Verázia Jardim de Queiroz (Quixadá/CE); Secretário Executivo: Hermano Heleno Soares Beviláqua (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** Rua Maria Tomásia, n° 230 - Bairro Aldeota, CEP: 60.150-170 - Fortaleza/CE (Confiança: alta)
* **Contatos:** (85) 3032-3239 / (85) 98175-3618 | undimece@gmail.com (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undime.ce/`, Facebook `https://www.facebook.com/UndimeCE/` (Confiança: média)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 8. UNDIME Espírito Santo (ES)
* **CNPJ:** `36.044.196/0001-63` (Confiança: alta, [Fonte](https://www.undime.org.br/))
* **Gestão:** Presidente Vanderson Valadares de Campos (Alegre/ES); Vice-Presidente: Adenilde Stein Silva (Marechal Floriano/ES) (Confiança: alta, [Fonte](https://www.undime.org.br/))
* **Sede:** Rua Misael Pedreira da Silva, 138, Edifício Fecomércio, Salas 614/615/616, Bairro Santa Lúcia, Vitória/ES, CEP: 29.056-230 (Confiança: alta, [Fonte](https://www.undime.org.br/))
* **Contatos:** (27) 3376-0675 | undime.es@gmail.com | [portal](http://undime-es.sisp.com.br) (Confiança: alta)
* **Redes Sociais:** `"não localizado publicamente"`
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 9. UNDIME Goiás (GO)
* **CNPJ:** `37.285.699/0001-93` (Confiança: média, Fonte: Serasa Experian)
* **Gestão:** Presidente Anderlúcia de Castro Ferreira (Anicuns/GO); Secretária Executiva: Denise Scalia de Souza (Confiança: alta, [Fonte](https://undime.org.br/seccionais/))
* **Sede:** Av. Anhanguera, n. 5.110, Qd. 09, Edifício Moacir Teles, Central, Goiânia/GO, CEP 74.043-010 (Confiança: alta)
* **Contatos:** (62) 3954-6322 / (62) 3954-6263 | undimegoias@gmail.com (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimegoias/`, Facebook `https://www.facebook.com/undimegoias`, YouTube `https://www.youtube.com/@undimegoias4738` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 10. UNDIME Maranhão (MA)
* **CNPJ:** `02.897.811/0001-62` (Confiança: alta, [Fonte](https://undime.org.br/seccionais/))
* **Gestão:** Presidente Karla Janys Lima Nascimento (Açailândia/MA); Secretária Executiva: Emília Georgia Santos Alves Lustosa (Confiança: alta, [Fonte](https://undime.org.br/seccionais/))
* **Sede:** Av. dos Holandeses, casa 6, Calhau, CEP 65.071-380, São Luís/MA (Confiança: alta)
* **Contatos:** (99) 98111-5737 | undimemaranhao@gmail.com (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimemaranhao/`, Facebook `https://pt-br.facebook.com/Undimema/` (Confiança: média)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** Fórum Estadual Extraordinário (11 e 12 de agosto de 2026).

### 11. UNDIME Mato Grosso (MT)
* **CNPJ:** `37.499.944/0001-65` (Confiança: alta, [Fonte](https://www.undimemt.org.br/))
* **Gestão:** Presidente Simoni Pereira Borges (Campo Verde/MT); Secretária Executiva: Vanilda Carvalho Mendes (Confiança: alta, [Fonte](https://www.undimemt.org.br/))
* **Sede:** Avenida Historiador Rubens de Mendonça, 3.920, Morada do Ouro, CEP 78.050-902 - Cuiabá/MT (Confiança: alta)
* **Contatos:** (65) 98476-6239 / (65) 98477-5659 | undimemt@gmail.com | [portal](https://www.undimemt.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimemt/`, YouTube `http://www.youtube.com/undimemt` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 12. UNDIME Mato Grosso do Sul (MS)
* **CNPJ:** `33.793.092/0001-63` (Confiança: média, Fonte: Diário Oficial de MS)
* **Gestão:** Presidente Silvia Patrícia Freire (Itaquiraí/MS); Secretária Executiva: Marilda Fernandes de Oliveira Coelho (Confiança: alta, [Fonte](https://undime.org.br/seccionais/))
* **Sede:** Avenida Eduardo Elias Zahran, nº 3179 - Antônio Vendas - Campo Grande/MS, CEP: 79.003-000 (Confiança: alta)
* **Contatos:** (67) 3348-5022 / (67) 99906-4529 | undime@assomasul.org.br (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimems/` (média), X `https://x.com/undimems` (alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 13. UNDIME Minas Gerais (MG)
* **CNPJ:** `23.840.622/0001-23` (Confiança: média, Fonte: IPEA Mapa das OSC)
* **Fundação:** `16/11/1987` (Confiança: média, Fonte: IPEA)
* **Gestão:** Presidente Jônatas Gonçalves Rego (Mirabela/MG); Secretária Executiva: Suely Duque Rodarte (Confiança: alta, [Fonte](https://undimemg.org.br/))
* **Sede:** Rua Alagoas, 730, Sala 18, Edifício Mongeral, Funcionários, Belo Horizonte/MG, CEP: 30.130-160 (Confiança: alta)
* **Contatos:** (31) 3342-1748 | comunicacao@undimemg.org.br / administrativo@undimemg.org.br | [portal](http://www.undimemg.org.br) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimeminasgerais/`, YouTube `https://www.youtube.com/@UndimeMGEDUC` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 14. UNDIME Pará (PA)
* **CNPJ:** `01.929.316/0001-25` (Confiança: alta, Fonte: Receita Federal)
* **Fundação:** `01/11/1996` (Confiança: alta, Fonte: Receita Federal)
* **Gestão:** Presidente Sandra Helena Ataíde de Lima (DME de Moju/PA); Secretária Executiva: Nair Cristine da Silva Mascarenhas (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** Rodovia Augusto Montenegro, km 10, s/n - Belém/PA - CEP: 66.820-000 (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Contatos:** (91) 9634-9790 | undimepara@gmail.com (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimepara/` (Confiança: alta). Demais: `"não localizado publicamente"`
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** Fórum Estadual Extraordinário da Undime Pará 2026 (02 e 03 de julho de 2026).

### 15. UNDIME Paraíba (PB)
* **CNPJ:** `00.947.659/0001-50` (Confiança: alta, [Fonte](https://www.undimepb.org.br/))
* **Gestão:** Presidente Ana Paula Nunes da Silva (Princesa Isabel/PB); Secretária Executiva: Uilma Mendes Medeiros (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** Av. Vice-Prefeito Antônio Carvalho de Souza, Nº 400, salas 205/507, Estação Velha, Campina Grande/PB, CEP 58410-050 (Confiança: alta)
* **Contatos:** (83) 3322-8235 / (83) 99952-8404 | contato@undimepb.org.br / undimeparaiba@gmail.com | [portal](https://www.undimepb.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undime.pb/`, Facebook `https://www.facebook.com/Undime-Para%C3%ADba-433716776698122`, X `https://twitter.com/undimepb`, YouTube `https://www.youtube.com/channel/UCU3ETLw8LzHPvaZJtCW8qQQ` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** Fórum Estadual da Undime Paraíba (Agosto/2026).

### 16. UNDIME Paraná (PR)
* **CNPJ:** `81.398.588/0001-85` (Confiança: alta, [Fonte](https://undimepr.org.br/))
* **Gestão:** Presidente Adriana de Oliveira Chaves Palmieri (Maringá/PR); Secretária Executiva: Débora Jurkevicz da Silva (Confiança: alta, [Fonte](https://undimepr.org.br/))
* **Sede:** Edifício Executive Center Everest, Rua Comendador Araujo, 143, 13º andar, sala 134, Centro - Curitiba/PR, CEP: 80.420-900 (Confiança: alta)
* **Contatos:** (41) 3077-1962 / (45) 99974-3289 | undimepr@undimepr.org.br | [portal](https://undimepr.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimepr/`, Facebook `https://www.facebook.com/undimeparana/`, X `https://x.com/undimepr`, YouTube `https://www.youtube.com/@UndimeParana` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** I Simpósio (03 de Julho de 2026), II Simpósio (28 de Agosto de 2026), III Simpósio (25 de Setembro de 2026), Fórum Extraordinário (11 a 13 de Novembro de 2026).

### 17. UNDIME Pernambuco (PE)
* **CNPJ:** `12.859.161/0001-14` (Confiança: alta, [Fonte](https://undimepe.org.br/))
* **Gestão:** Presidente Andreika Asseker Amarante (DME de Igarassu/PE); Secretária Executiva: Maria do Socorro de Araújo Gomes (Confiança: média, via portal nacional)
* **Sede:** Empresarial Kronos, Rua das Pernambucanas, 407 - Sala 806, Graças, Recife - PE, CEP 52011-010 (Confiança: alta)
* **Contatos:** (81) 3251-6213 / (81) 98639-2865 | undimepe@gmail.com | [portal](https://undimepe.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undime.pernambuco/`, Facebook `https://pt-br.facebook.com/undimepernambuco`, YouTube `https://www.youtube.com/@UndimePernambuco` (Confiança: alta)
* **Dados Financeiros:** Inscrições do Fórum: R$ 450,00 (adimplente) e R$ 1.500,00 (inadimplente), refletindo a taxa de anuidade na adimplência municipal (Confiança: alta, [Fonte](https://undimepe.org.br/institucional/inscricoes-abertas-para-o-forum-extraordinario-da-undime-pe-2026)).
* **Próximos Eventos:** `"não localizado publicamente"`

### 18. UNDIME Piauí (PI)
* **CNPJ:** `02.271.910/0001-34` (Confiança: média, Fonte: Serasa Experian)
* **Gestão:** Presidente Érica Graziela Benício de Melo (Domingos Mourão/PI); Secretária Executiva: Ana Patrícia Rodrigues de Barros (Confiança: alta)
* **Sede:** Avenida Pedro Freitas, 2000, s/n - sede da APPM, CEP 64.000-500 - Teresina/PI (Confiança: alta)
* **Contatos:** (86) 98125-4933 / (86) 99900-9566 | undimepi@hotmail.com (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimepi/`, Facebook `https://www.facebook.com/undimepi/`, YouTube `https://www.youtube.com/@UNDIMEPIAUÍ` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 19. UNDIME Rio de Janeiro (RJ)
* **CNPJ:** `73.727.711/0001-36` (Confiança: alta, [Fonte](https://www.pncp.gov.br/))
* **Gestão:** Presidente Maria Virgínia Andrade Rocha (Nova Iguaçu/RJ); Secretário(a) Executivo(a): `"não localizado publicamente"` (Confiança: alta)
* **Sede:** Avenida Rio Branco, 245, 20º andar – Centro – Rio de Janeiro/RJ – CEP: 20040-917 (Confiança: alta, [Fonte](https://undime.org.br/))
* **Contatos:** (21) 2544-2561 / (21) 2544-2348 | undime.rj@gmail.com / undime-rj@undime-rj.org.br | [portal](https://rj.undime.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimerj/`, Facebook `https://www.facebook.com/undimerj`, YouTube `https://www.youtube.com/@UndimeRJ` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 20. UNDIME Rio Grande do Norte (RN)
* **CNPJ:** `00.596.662/0001-76` (Confiança: média, Fonte: Diário Oficial de Jandaíra/RN)
* **Gestão:** Presidente Petrúcio de Lima Ferreira (Goianinha/RN); Secretária Executiva: Euba Nadja Pessoa Reis de Lima (Confiança: alta)
* **Sede:** Centro Administrativo - SEEC - Bloco 2, térreo, Lagoa Nova, CEP 59064-901 - Natal/RN (Confiança: alta)
* **Contatos:** (84) 99182-9468 / (84) 98896-6313 | undime.rn@gmail.com (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undime.rn/`, YouTube `https://www.youtube.com/@UndimeRN` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 21. UNDIME Rio Grande do Sul (RS)
* **CNPJ:** `05.387.322/0001-59` (Confiança: alta, Fonte: Prefeitura de Caçapava do Sul)
* **Gestão:** Presidente Ana Paula Ferreira Cruz Bennemann (São Francisco de Paula/RS); Secretário Executivo: Márcio Machado (Confiança: alta, [Fonte](https://undimers.org.br/))
* **Sede:** Rua Marcílio Dias, 574 - Bairro Menino Deus - Porto Alegre/RS, CEP: 90.130-000 (Confiança: alta)
* **Contatos:** (51) 3232-2093 / (51) 98059-3086 | undime.rs@gmail.com / undime-rs@undimers.org.br | [portal](https://undimers.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undime.rs/`, Facebook `https://pt-br.facebook.com/UndimeRS-325051804277760/`, YouTube `https://www.youtube.com/@undimers` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 22. UNDIME Rondônia (RO)
* **CNPJ:** `15.893.134/0001-56` (Confiança: alta, Fonte: Receita Federal)
* **Fundação:** `08/11/1990` (Confiança: alta, Fonte: Receita Federal)
* **Gestão:** Presidente Andreza Justina Dias (DME de Ouro Preto do Oeste/RO); Secretária Executiva: Terezinha Ferreira de Oliveira Lima (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** Rua Paulo Leal, 357 - Centro - Porto Velho/RO - CEP: 76.801-094 (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Contatos:** (69) 99946-1392 / (69) 98114-1421 | undimerondonia@gmail.com (Confiança: alta)
* **Redes Sociais:** `"não localizado publicamente"`
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 23. UNDIME Roraima (RR)
* **CNPJ:** `02.451.827/0001-47` (Confiança: alta, Fonte: Receita Federal)
* **Fundação:** `03/04/1998` (Confiança: alta, Fonte: Receita Federal)
* **Gestão:** Presidente Alsione Pereira de Alencar Sulbaran (DME de Pacaraima/RR); Secretária Executiva: Izabel Cristina D'ávila Sampaio (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** Avenida Venezuela, 2398 - Mercejana - Escola Estadual Ana Libória - Boa Vista/RR - CEP: 69.304-600 (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Contatos:** (95) 9173-9132 | undimerr@gmail.com (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undime.rr/` (Confiança: alta). Demais: `"não localizado publicamente"`
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 24. UNDIME Santa Catarina (SC)
* **CNPJ:** `79.363.123/0001-47` (Confiança: alta, [Fonte](https://undime-sc.org.br/))
* **Gestão:** Presidente Jucilene Antônio Fernandes (Balneário Rincão/SC); Vice-Presidente: Alex Cleidir Tardetti; Secretária Executiva: Luana Costa de Córdova (Confiança: alta, [Fonte](https://undime-sc.org.br/))
* **Sede:** Av. Mauro Ramos, 1450 - sala 1401 - 14º andar - Centro - Florianópolis/SC, CEP: 88020-302 (Confiança: alta)
* **Contatos:** (48) 3380-4882 / (48) 3380-4883 / (48) 98466-0923 | undimesc@gmail.com / assessoriaundimesc@gmail.com | [portal](https://undime-sc.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undime_santacatarina/`, Facebook `https://www.facebook.com/Undimesantacatarina`, X `https://twitter.com/UndimeSC`, YouTube `https://www.youtube.com/@UndimeSC` (Confiança: alta)
* **Dados Financeiros:** Anuidades via Portaria 02/2026 e fluxos mensais na Transparência em `https://undime-sc.org.br/a-undime/transparencia/` (Confiança: alta).
* **Próximos Eventos:** Seminário Nacional Primeira Infância em Brasília (divulgado localmente; 22 e 23 de Junho de 2026).

### 25. UNDIME São Paulo (SP)
* **CNPJ:** `59.480.558/0001-64` (Confiança: alta, [Fonte](https://undime-sp.org.br/))
* **Gestão:** Presidente Luiz Miguel Martins Garcia (Nova Odessa/SP); Coordenadora Institucional: Lélia Hartmann Torres (Confiança: alta, [Fonte](https://undime-sp.org.br/))
* **Sede:** Rua Barão de Itapetininga, 46, 13º andar, conjuntos 1311 e 1321 – República, São Paulo – SP, CEP 01042-001 (Confiança: alta)
* **Contatos:** (11) 3121-4329 | undimesp@undime-sp.org.br | WhatsApp institucional (Lélia): (11) 91950-0101 | [portal](https://undime-sp.org.br) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimesp/` (via Linktree `linktr.ee/undimesp`), Facebook `https://www.facebook.com/undimesp`, YouTube `https://www.youtube.com/@UndimeS%C3%A3oPaulo` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** Diagnóstico de Equidade PNEERQ (Até 30 de Junho de 2026), Encerramento Censo Escolar (Até 31 de Julho de 2026).

### 26. UNDIME Sergipe (SE)
* **CNPJ:** `03.433.577/0001-85` (Confiança: média, Fonte: Serasa Experian)
* **Gestão:** Presidente João Luiz Andrade Dória (Estância/SE); Secretário Executivo: José Arinaldo Neto (Confiança: alta, [Fonte](https://undime.org.br/noticia/seccionais))
* **Sede:** Av. José da Cunha, 193 - 1º Andar, Frei Paulo - CEP: 49.514-000 (Confiança: média, registrada sob Aracaju no nacional)
* **Contatos:** (79) 99940-9549 | undimesergipe@undimesergipe.org (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimesergipe/`, Facebook `https://www.facebook.com/undimesergipe/` (Confiança: alta). Demais: `"não localizado publicamente"`
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`

### 27. UNDIME Tocantins (TO)
* **CNPJ:** `02.963.631/0001-31` (Confiança: alta, Fonte: Receita Federal)
* **Fundação:** `1995` (Confiança: alta, Fonte: Receita Federal)
* **Gestão:** Presidente Humberto de Campos de Castilho (DME de Sucupira/TO); Secretária Executiva: Rute Soares Rodrigues (Confiança: alta, [Fonte](https://to.undime.org.br/))
* **Sede:** Avenida JK, Quadra 104 Norte, Lote 28A, Edifício V. Nobre Empresarial, Plano Diretor Norte, Palmas - TO, CEP 77.006-014 (Confiança: alta, [Fonte](https://to.undime.org.br/))
* **Contatos:** (63) 3026-1480 / (63) 99938-8453 | undimeto@gmail.com | [portal](https://to.undime.org.br/) (Confiança: alta)
* **Redes Sociais:** Instagram `https://www.instagram.com/undimetocantins/`, Facebook `https://www.facebook.com/undimeto/` (Confiança: alta)
* **Dados Financeiros:** `"não localizado publicamente"`
* **Próximos Eventos:** `"não localizado publicamente"`
