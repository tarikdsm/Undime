# DATA_SCHEMA — Esquema de dados (proveniência por campo)

Cada unidade (nacional + cada UF + microrregionais encontradas) é um objeto JSON.
Todo campo de dado carrega proveniência:

```jsonc
// Tipo "Campo" reutilizável
{
  "valor": "...",                  // ou null
  "fonte_url": "https://...",      // origem do dado
  "data_coleta": "2026-06-22",     // ISO 8601
  "confianca": "alta"              // "alta" | "media" | "baixa"
}
```

Dado não encontrado publicamente → `valor: "não localizado publicamente"` e o campo entra em `lacunas[]`.
**Nunca inventar** nome, número, telefone, valor financeiro ou data.

## Objeto da unidade

```jsonc
{
  "uf": "ES",                      // "BR" para a nacional
  "nivel": "estadual",             // "nacional" | "estadual" | "microrregional"
  "nome_oficial": { "valor": "", "fonte_url": "", "data_coleta": "", "confianca": "" },
  "cnpj": { /* Campo */ },
  "fundacao": { /* Campo */ },
  "sede_endereco": { /* Campo */ },
  "contato": {
    "telefone": { /* Campo */ },
    "email": { /* Campo */ },
    "site": { /* Campo */ },
    "portal_estadual": { /* Campo */ }
  },
  "diretoria": {
    "presidente": {
      "nome": { /* Campo */ },
      "municipio_origem": { /* Campo */ }
    },
    "secretaria_executiva": { /* Campo */ },
    "conselho_fiscal": [ /* Campo[] */ ],
    "outros": [ /* Campo[] */ ]
  },
  "redes_sociais": {
    "instagram": { /* Campo */ },
    "facebook": { /* Campo */ },
    "x": { /* Campo */ },
    "youtube": { /* Campo */ },
    "linkedin": { /* Campo */ }
  },
  "associados_num": { /* Campo */ },
  "municipios_num": { /* Campo */ },
  "financeiro": {
    "receitas": { /* Campo */ },
    "contribuicoes": { /* Campo */ },
    "prestacao_contas_url": { /* Campo */ }   // frequentemente "não localizado publicamente"
  },
  "eventos": [
    {
      "titulo": { /* Campo */ },
      "data_inicio": { /* Campo */ },
      "data_fim": { /* Campo */ },
      "local": { /* Campo */ },
      "inscricao_url": { /* Campo */ },
      "fonte_url": ""
    }
    // apenas eventos a partir de 2026-06-22
  ],
  "fontes_consultadas": [ "url1", "url2" ],
  "lacunas": [ "financeiro", "associados_num" ]
}
```

## Regras
- `data_coleta` em ISO 8601 (`YYYY-MM-DD`).
- `confianca`: **alta** = fonte oficial direta; **media** = fonte secundária/indireta; **baixa** = inferência ou fonte fraca (sinalizar para validação manual).
- Em conflito entre fontes: preferir a **oficial**; registrar divergências em `docs/AUDIT.md`.
- Eventos: somente a partir de **2026-06-22**, ordenados por `data_inicio`.
