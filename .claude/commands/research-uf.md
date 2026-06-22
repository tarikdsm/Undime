---
description: Dispara o subagent state-researcher para pesquisar uma unidade da UNDIME (UF, BR ou microrregional).
argument-hint: <UF> (ex.: ES, BR, MT)
---

Use o subagent **state-researcher** para pesquisar a unidade da UNDIME: **$ARGUMENTS**.

Siga `docs/DATA_SCHEMA.md` e as regras do `CLAUDE.md` (zero alucinação, proveniência por campo, só fontes públicas/gratuitas, eventos a partir de 2026-06-22). Grave bruto em `data/raw/$ARGUMENTS/` e normalizado em `data/processed/$ARGUMENTS.json`. Ao fim, mostre um resumo de cobertura (campos preenchidos × lacunas).
