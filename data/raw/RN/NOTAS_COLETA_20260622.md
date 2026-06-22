# Notas de coleta — UNDIME Rio Grande do Norte (RN)

data_coleta: 2026-06-22
Coletor: state-researcher (subagent)

## Status dos portais testados (2026-06-22)

| URL | Status | Observação |
|-----|--------|------------|
| https://rn.undime.org.br/ | PARCIAL / intermitente | Carrega (Playwright, title "Undime/"), mas backend Plone/ZendFramework retorna erro Doctrine "EntityManager; no instance returned" no momento. É subdomínio do MESMO servidor nacional (path /www/wwwroot/undime.org.br/). Páginas internas (diretoria, notícia de fóruns) deram TIMEOUT. |
| https://www.undimern.org.br/ | NÃO RESOLVE | ERR_NAME_NOT_RESOLVED — domínio não existe / ECONNREFUSED via WebFetch. |
| https://undimern.org.br/ | NÃO RESOLVE | ERR_NAME_NOT_RESOLVED — domínio não existe. |
| https://undime.org.br/ (nacional) | INTERMITENTE | Timeouts repetidos hoje (confirmado pela tarefa). Usado snapshot local. |

Portal estadual oficial considerado: **https://rn.undime.org.br/** (subdomínio nacional).

## Fontes primárias usadas (local — undime.org.br intermitente)
- data/raw/BR/live_noticia_seccionais_20260622.html → bloco "Rio Grande do Norte" (cadastrais, contato, diretoria). Origem: https://undime.org.br/noticia/seccionais
- data/raw/BR/live_noticia_diretoria_20260622.html → Petrúcio de Lima Ferreira = "Presidência Região Nordeste" da diretoria executiva NACIONAL 2025-2027. Origem: https://undime.org.br/institucional/diretoria
- data/raw/BR/seccionais_wayback_20260203.txt → confirma os mesmos dados cadastrais (snapshot 2026-02-03).

### Bloco RN (transcrição literal da fonte seccionais):
"Rio Grande do Norte — Presidente: Petrúcio de Lima Ferreira — Dirigente Municipal de Educação de Goianinha/ RN — Secretaria executiva: Euba Nadja Pessoa Reis de Lima — Centro Administrativo - Secretaria de Estado da Educação e da Cultura - Bloco 2, térreo, Lagoa Nova — CEP: 59064-901 - Natal/ RN — Fone: (84) 99182-9468 — Celular: (84) 98896-6313 — Endereço eletrônico: undime.rn@gmail.com"

Fonte: https://undime.org.br/noticia/seccionais (capturado em live_noticia_seccionais_20260622.html, 2026-06-22)

## Diretoria — confirmação cruzada
- Petrúcio de Lima Ferreira: Presidente UNDIME-RN E Presidência da Região Nordeste (diretoria nacional 2025-2027). DME de Goianinha/RN. Eleito gestão 2025-2027 (chapa "Juntos Somos mais Fortes").
  - Fonte nacional diretoria: https://undime.org.br/institucional/diretoria
  - Fonte eleição: https://undime.org.br/noticia/22-02-2025-03-10-undime-rio-grande-do-norte-elege-nova-diretoria (não acessível hoje por timeout; título confirmado via WebSearch)
- Secretaria executiva: Euba Nadja Pessoa Reis de Lima (fonte seccionais).

## Municípios
- Instagram oficial @undime.rn (bio, 2026-06-22): "📚 Defendemos Educação Pública de Qualidade nos 167 municípios Potiguares."
  - 167 = total de municípios do RN. Registrado como municipios_num (alta, conta oficial). associados_num (nº de filiados pagantes) NÃO localizado.
  - Fonte: https://www.instagram.com/undime.rn/

## Redes sociais
- Instagram: https://www.instagram.com/undime.rn/ — CONFIRMADO oficial. Title: "Undime RN (@undime.rn)". Bio (og:description, 2026-06-22): "14K seguidores, seguindo 358, 2.421 posts". Bio: "📚 Defendemos Educação Pública de Qualidade nos 167 municípios Potiguares."
- Facebook: facebook.com/undime.rn → "Este conteúdo não está disponível no momento" (não confirmado). NÃO LOCALIZADO.
- X (Twitter): grok -p executado (single-turn). Sessão grok rodou mas só emitiu linha de status + erros internos de WebFetch; nenhum achado retornado. NÃO LOCALIZADO.
- YouTube / LinkedIn: não localizados publicamente (sem busca dedicada confirmando perfil oficial).

## Eventos (>= 2026-06-22)
- Fórum Estadual UNDIME-RN 2026: "Rio Grande do Norte – 18 a 20 de março, Natal".
  - Fonte oficial (seccional UNDIME Bahia republicou calendário nacional): https://undimebahia.com.br/2026/02/19/confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026/
  - Também listado em https://rn.undime.org.br/noticia/12-02-2026-22-25-confira-as-datas-dos-foruns-estaduais-das-seccionais-da-undime-em-2026 (timeout hoje).
  - DATA < 2026-06-22 → NÃO QUALIFICA. eventos: [].
- Nenhum evento RN com data >= 2026-06-22 localizado. lacuna registrada.

## Divergências
- WebSearch (resumo do buscador) sugeriu telefone "(84) 3013-1767" e datas de fórum "15 a 17 de abril" — NÃO confirmados em fonte oficial; descartados (regra: não confiar em resumo de buscador). Mantidos telefones da fonte seccionais oficial.
