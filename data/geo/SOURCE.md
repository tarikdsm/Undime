# Fonte do mapa do Brasil

- **Arquivo:** `brazil-states.geojson` (fronteiras das 27 unidades federativas, com `sigla` por UF).
- **Origem:** click_that_hood — `https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/brazil-states.geojson`
- **Licença:** MIT (repositório codeforgermany/click_that_hood).
- **Coletado em:** 2026-06-22.
- **Uso:** entrada do gerador `site/scripts/generate-map.mjs`, que projeta (plate carrée com correção de latitude) e simplifica as geometrias para produzir `site/assets/img/brasil.svg` (um `<path id="UF">` por estado).
- **Reprodutível:** baixe o GeoJSON para este diretório e rode `node site/scripts/generate-map.mjs`.

> O `.geojson` (3,4 MB) não é versionado (ver `.gitignore`); o artefato versionado é o `brasil.svg` gerado.
