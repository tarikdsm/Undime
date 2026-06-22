---
description: Dispara o subagent reviewer para auditar dados e/ou site e atualizar docs/AUDIT.md.
argument-hint: [escopo opcional, ex.: ES, dados, site]
---

Use o subagent **reviewer** (auditor independente e cético) para auditar: **${ARGUMENTS:-tudo (dados + site)}**.

Confira cada campo contra sua `fonte_url`, rode link-check e, se houver site, testes Playwright cross-browser + responsividade. Atualize `docs/AUDIT.md` com cobertura, lacunas, divergências e itens de confiança baixa para validação manual. Não conserte dados inventando — aponte e exija nova coleta com fonte.
