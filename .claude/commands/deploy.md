---
description: Prepara/realiza o deploy do site para o GitHub Pages (Fase 6). Requer OK explícito do usuário antes de habilitar o Pages.
---

Deploy do diretório `site/` para o **GitHub Pages** (Fase 6).

**Pré-condição:** só prossiga com OK explícito do usuário (ver `CLAUDE.md`). Não habilite o Pages sem confirmação.

Passos:
1. Confirme a sintaxe atual da action de Pages (Context7 e/ou docs oficiais) antes de escrever o workflow.
2. Configure o workflow do GitHub Actions publicando a pasta `site/`.
3. `git push` para o remoto `Undime`, rode o deploy e **verifique a página no ar** abrindo a URL pública via Playwright.
4. Devolva o link ao vivo + screenshot.
