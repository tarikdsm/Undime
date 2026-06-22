# Notas de coleta — UNDIME Rio de Janeiro (RJ)

data_coleta: 2026-06-22

## 1. Cadastrais / contato / diretoria — FONTE PRIMÁRIA (alta)
Origem: bloco "Rio de Janeiro" extraído de
`data/raw/BR/live_noticia_seccionais_20260622.html` (snapshot local da página
https://undime.org.br/institucional/seccionais — undime.org.br intermitente em 2026-06-22).

Trecho literal extraído (linha 74 do HTML):

```
<a href="https://rj.undime.org.br/" title="Undime Rio de Janeiro" target="blank"> Rio de Janeiro</a>
...
Rio de Janeiro
Presidente: Maria Virgínia Andrade Rocha
Dirigente Municipal de Educação de Nova Iguaçu/ RJ
Secretaria executiva
Marlise Alves
Avenida Rio Branco, 245 - 20º andar - Centro
CEP: 20.040-917 - Rio de Janeiro/ RJ
Telefone: (21) 9 9945-4684
Endereço eletrônico: undime.rj@gmail.com
```

Portal oficial linkado na página de seccionais: https://rj.undime.org.br/

## 2. Cruzamento com diretoria nacional (alta)
Origem: `data/raw/BR/live_noticia_diretoria_20260622.html` (linha 83):
```
Secretaria de Articulação — Maria Virgínia Andrade Rocha Feitosa
Dirigente Municipal de Educação de Nova Iguaçu/RJ
```
=> A presidente do RJ ocupa a Secretaria de Articulação da diretoria nacional.
Nome completo nacional: "Maria Virgínia Andrade Rocha Feitosa".
Nome na seccional: "Maria Virgínia Andrade Rocha". Mesma pessoa (DME Nova Iguaçu/RJ).

## 3. Status dos portais testados (2026-06-22)
- https://rj.undime.org.br/        -> curl: timeout (000); WebFetch: HTTP 500. Portal EXISTE mas instável/com erro de servidor.
- https://www.undimerj.org.br/      -> DNS não resolve (host inexistente).
- https://undimerj.org.br/          -> DNS não resolve (host inexistente).
Portal oficial = rj.undime.org.br (confirmado pelo link na página de seccionais e por resultados de busca).
Páginas internas vistas em busca (não acessadas por instabilidade): /eventos, /tv, /categoria/?lista=institucional22

## 4. Diretoria — mandato e fórum (media; fonte secundária oficial-derivada)
Origem: WebFetch https://convivaeducacao.org.br/fique_atento/5520
(espelho da notícia oficial "Undime Rio de Janeiro realiza Fórum Estadual e elege
diretoria para o biênio 2025-2027", undime.org.br noticia 18-06-2025, que retornou HTTP 500 hoje).
- Presidente eleito: Maria Virgínia Andrade Rocha (DME Nova Iguaçu)
- Vice-presidente: Osório Luis Figueiredo de Souza (DME Cachoeiras de Macacu)
- Mandato/biênio: 2025-2027
- Fórum Estadual: 16 e 17 de junho de 2025, na capital (RJ), 220 participantes
- Secretaria executiva / conselho fiscal: NÃO mencionados nesse texto
- Evento futuro citado: Fórum Nacional da Undime 27-30 de julho (de 2025) em Salvador/BA -> evento de 2025, NÃO entra (regra >= 2026-06-22).

## 5. Redes sociais (media — confirmado por busca web)
Origem: WebSearch "UNDIME Rio de Janeiro instagram oficial".
- Instagram: https://www.instagram.com/undimerj/  (@undimerj)
  Bio: "União dos Dirigentes Municipais de Educação do RJ"; ~3.295 seguidores, 669 posts. CONFIRMADO como conta oficial (handle coincide, bio coincide).
- Facebook: https://www.facebook.com/undimerj/  (Undime Rio de Janeiro) — CONFIRMADO (handle/nome coincidem).
- X (Twitter): não localizado em busca; tentativa via grok -p não retornou resultado utilizável (saída headless só preâmbulo). -> não localizado publicamente.
- YouTube / LinkedIn: não localizados publicamente.

## 6. Números / financeiro
- municípios_num: o estado do RJ tem 92 municípios; nº de ASSOCIADOS da Undime-RJ não localizado oficialmente. -> não localizado publicamente (não inventar).
- associados_num: não localizado publicamente.
- financeiro (receitas/contribuições/prestação de contas): não localizado publicamente.

## 7. Cadastrais ausentes
- CNPJ: não localizado publicamente.
- Fundação (ano): não localizado publicamente.

## Fontes consultadas
- data/raw/BR/live_noticia_seccionais_20260622.html (snapshot de undime.org.br/institucional/seccionais)
- data/raw/BR/live_noticia_diretoria_20260622.html (snapshot de undime.org.br/institucional/diretoria)
- https://rj.undime.org.br/ (portal oficial — instável: timeout/HTTP 500)
- https://convivaeducacao.org.br/fique_atento/5520
- https://undime.org.br/noticia/18-06-2025-05-42-undime-rio-de-janeiro-realiza-forum-estadual-e-elege-diretoria-para-o-bienio-2025-2027 (HTTP 500 hoje)
- https://www.instagram.com/undimerj/
- https://www.facebook.com/undimerj/
