# SPECIFICATION — Site nacional das UNDIMEs

> Preenchido na **Fase 3** pelo `planner`. Usado pelo `executor` na **Fase 4**.
> Tom visual: **editorial-tech** (moderno, tipografia forte, ar de revista digital;
> NÃO institucional pesado). Site **estático** (HTML/CSS/JS vanilla + módulos ES),
> sem framework. PT-BR. Dados de `assets/data/undime.json` via `fetch` (sem hardcode).

---

## 1. Escopo e princípios
- Estático, responsivo, cross-browser (Chrome, Edge, Firefox, Safari).
- **Zero dado hardcoded** nas páginas: tudo vem de `undime.json` em runtime (ou injetado no build, ver §8).
- **Proveniência sempre visível:** todo campo exibe seu `fonte_url` (link) e `confianca` (selo).
- Lacunas exibidas literalmente como **"não localizado publicamente"** — nunca ocultar nem preencher.
- WCAG AA; Lighthouse ≥ 90 em Performance e Acessibilidade.

---

## 2. Arquitetura de arquivos (`site/`)

```
site/
├── index.html                 # Home: mapa + nacional + busca + eventos agregados
├── estados/
│   ├── ac.html                # 1 por UF (26 arquivos), gerados no build (§8)
│   ├── al.html
│   └── ... (26 no total)
├── assets/
│   ├── css/
│   │   ├── tokens.css         # custom properties (cores, tipografia, espaços)
│   │   ├── base.css           # reset + elementos base + utilitários
│   │   └── components.css     # card, badge, tooltip, header, footer, mapa
│   ├── js/
│   │   ├── data.js            # fetch + cache do undime.json; helpers de acesso a Campo{}
│   │   ├── home.js            # mapa (hover/clique), busca/filtro, eventos agregados
│   │   ├── estado.js          # render da ficha de estado (modo client-side, §8 alt.)
│   │   ├── map.js             # interações do SVG (tooltip, foco, teclado)
│   │   └── a11y.js            # utilitários de acessibilidade (foco, aria-live)
│   ├── img/
│   │   ├── brasil.svg         # mapa (também pode ser inline no index.html)
│   │   └── favicon / og-image
│   └── data/
│       └── undime.json        # cópia de data/undime.json (fonte única em runtime)
├── scripts/
│   └── build.mjs              # Node: lê undime.json + template → emite estados/*.html
└── templates/
    └── estado.html            # template HTML do estado (placeholders {{...}})
```

> O `build.mjs` também **copia** `data/undime.json` → `site/assets/data/undime.json`
> para manter uma fonte única versionada.

---

## 3. Home (`index.html`)

Ordem de seções:

1. **Header / nav** — wordmark "UNDIME · Brasil", link para a nacional, busca.
2. **Hero editorial** — título forte + subtítulo (missão, do campo institucional `municipios_num`/`nome_oficial` da nacional). Sem dados inventados.
3. **Mapa do Brasil (SVG inline)** — núcleo da home (ver §5).
4. **Busca / filtro por estado** — campo de texto + `<select>` (fallback acessível, ver §5).
5. **Bloco da UNDIME Nacional** — presidente, contato (tel/e-mail/site), redes sociais, CNPJ, fundação, sede; cada campo com link de fonte + selo de confiança.
6. **Próximos eventos (nacional + todos os estados)** — agrega todos os `eventos[]` de `nacional` e `estados[]`, **filtra `data_inicio ≥ 2026-06-22`**, ordena ascendente por `data_inicio`. Cada item: título, UF/local, datas, selo de confiança, link de inscrição (ou "não localizado publicamente"). Se vazio: estado vazio amistoso.
7. **Footer** — fonte dos dados, data de geração (`meta.gerado_em`), aviso de proveniência, link do repositório.

---

## 4. Página de estado (`estados/<uf>.html`)

Renderiza **todos** os campos do esquema (`docs/DATA_SCHEMA.md`). Layout em duas colunas em desktop, single-column no mobile.

Blocos (nesta ordem):
1. **Cabeçalho do estado** — nome oficial + UF + breadcrumb "Brasil › <UF>".
2. **Identificação** — `nome_oficial`, `cnpj`, `fundacao`, `sede_endereco`, `municipios_num`, `associados_num`.
3. **Contato** — `telefone`, `email`, `site`, `portal_estadual`.
4. **Diretoria** — `presidente.nome` + `presidente.municipio_origem`; `secretaria_executiva`; `conselho_fiscal[]`; `outros[]`.
5. **Redes sociais** — instagram, facebook, x, youtube, linkedin (links quando houver).
6. **Financeiro** — `receitas`, `contribuicoes`, `prestacao_contas_url`.
7. **Eventos** — só `data_inicio ≥ 2026-06-22`, ordenados; se vazio, mensagem clara.
8. **Fontes & lacunas** — `fontes_consultadas[]` (lista de links) e `lacunas[]` (lista).

Regras de exibição por campo:
- Cada `Campo{valor, fonte_url, data_coleta, confianca}` vira uma **linha de dado** com: rótulo, valor, **selo de confiança**, **ícone-link** para `fonte_url` (abre em nova aba, `rel="noopener"`), e `data_coleta` em `<time>` (tooltip "coletado em").
- Valor `"não localizado publicamente"` recebe estilo discreto (itálico, cor suave) + selo `baixa`. **Nunca** esconder.
- `fonte_url` vazio → não renderizar link (apenas o valor/lacuna).
- Campos de lista vazia (`conselho_fiscal: []`, `eventos: []`) → "não localizado publicamente".

---

## 5. Mapa SVG + fallback acessível

- **SVG inline** no `index.html`; cada UF é um `<path id="XX">` (sigla maiúscula, ex. `id="ES"`).
- Cada path: `role="button"`, `tabindex="0"`, `aria-label="<Nome do estado>: presidente <nome>, <n> municípios"`, `data-uf="XX"`.
- **Hover/focus → tooltip** posicionada perto do estado, com: presidente (`diretoria.presidente.nome`), contato curto (e-mail ou telefone), `municipios_num`. Tooltip é `role="status"`/`aria-hidden` (visual); a informação textual também está no `aria-label` para leitores de tela.
- **Clique/Enter/Espaço → navega** para `estados/<uf>.html` (lowercase).
- Teclado: `Tab` percorre os estados na ordem do DOM; `Enter`/`Espaço` ativam; `Esc` fecha tooltip.
- **Fallback acessível obrigatório** (sempre no DOM, não só "no-JS"):
  - Um `<select>` "Ir para o estado" + um `<ul>` de links `estados/<uf>.html`, totalmente navegáveis por teclado e leitor de tela.
  - A busca/filtro de texto filtra essa lista (e realça o path no mapa).
- DF: como **não tem seccional própria**, o path do DF aponta para a seção da nacional (ou recebe `aria-label` explicando que é tratado pela nacional) — não cria página `estados/df.html`.
- Estados sem dado de presidente: `aria-label`/tooltip exibem "não localizado publicamente".

---

## 6. Design system editorial-tech

### 6.1 Tokens (`assets/css/tokens.css`)
Definir como CSS custom properties em `:root` (valores de referência; o executor pode afinar mantendo contraste AA):

```css
:root {
  /* Cores — base clara editorial + acento tech */
  --color-bg:        #0E1116;   /* alternativa dark; ou #FFFFFF para light */
  --color-surface:   #FFFFFF;
  --color-ink:       #14181F;   /* texto principal */
  --color-ink-soft:  #5B6573;   /* texto secundário / lacunas */
  --color-line:      #E3E7ED;   /* divisórias */
  --color-accent:    #1F6FEB;   /* acento tech (links, foco) */
  --color-accent-2:  #0B7285;   /* acento secundário */

  /* Selo de confiança */
  --conf-alta:   #1B873F;       /* verde */
  --conf-media:  #B58100;       /* âmbar */
  --conf-baixa:  #B42318;       /* vermelho/rubro */

  /* Tipografia — par editorial (serif display) + tech (sans/mono) */
  --font-display: Georgia, "Times New Roman", serif;      /* títulos editoriais */
  --font-sans:    system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono:    ui-monospace, "Cascadia Code", Consolas, monospace; /* dados/CNPJ */
  --step-0: 1rem; --step-1: 1.25rem; --step-2: 1.6rem;
  --step-3: 2.1rem; --step-4: 2.8rem; --step-5: 3.6rem;  /* escala modular */

  /* Layout */
  --maxw: 72rem; --gap: 1.25rem; --radius: 10px;
  --focus-ring: 0 0 0 3px color-mix(in srgb, var(--color-accent) 45%, transparent);
}
```

> **Fontes:** preferir **fontes do sistema** (`system-ui`) + uma serif segura (Georgia) para
> não pesar no Lighthouse. Se usar webfonts variáveis (ex. Inter/Fraunhofer via `@font-face`),
> usar `font-display: swap` e subset; manter ≤ 1 webfont para Performance.

### 6.2 Tipografia / grid
- Display serif para títulos (hero, nome do estado); sans para corpo; **mono para dados** (CNPJ, telefone, CEP, datas) — reforça o ar "tech".
- Grid de conteúdo `max-width: var(--maxw)`, colunas fluidas (`grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))`).
- Ritmo vertical generoso; linhas de medida 60–75 caracteres.

### 6.3 Componentes
- **Card** — superfície com `--radius`, borda `--color-line`, usado para nacional, estados, eventos.
- **Linha de dado (data-row)** — `rótulo · valor (mono quando aplicável) · selo · link de fonte`.
- **Badge de confiança** — pílula pequena com ponto colorido + texto:
  - `alta`: ponto/borda `--conf-alta`, ícone ✓ (ou `aria-label="confiança alta"`).
  - `media`: `--conf-media`, ícone ◐.
  - `baixa`: `--conf-baixa`, ícone ⚠.
  - Sempre acompanhado de **texto** ("alta"/"média"/"baixa") — cor **não** é o único portador de significado (WCAG 1.4.1).
- **Tooltip do mapa** — surface flutuante, seta, sombra suave; segue mouse/foco.
- **Header/nav** — sticky discreto; wordmark + busca + link nacional.
- **Footer** — proveniência + `meta.gerado_em` + repositório.

---

## 7. Acessibilidade (WCAG AA) e performance

- Contraste de texto ≥ 4.5:1 (validar a paleta final; selos com texto, não só cor).
- **Foco visível** em todos os interativos (`:focus-visible` com `--focus-ring`).
- Navegação 100% por teclado (mapa via paths focáveis + fallback `<select>`/lista).
- ARIA no mapa: paths com `role="button"` + `aria-label` completo; tooltip não rouba foco.
- `aria-live="polite"` para resultados de busca/filtro.
- `lang="pt-BR"`, landmarks (`header`/`main`/`nav`/`footer`), headings hierárquicos.
- Links externos: `target="_blank" rel="noopener noreferrer"` + indicação textual de "abre em nova aba".
- Performance: CSS/JS minificáveis, sem framework, imagens SVG; `fetch` único do JSON com cache; `loading="lazy"` em imagens não-críticas; sem render-blocking desnecessário.
- `prefers-reduced-motion`: desabilitar transições do mapa/tooltip.
- `prefers-color-scheme`: opcional, suportar dark/light via tokens.

---

## 8. Geração das 26 páginas de estado — **decisão**

**Recomendação: build estático em Node (`scripts/build.mjs`) com 1 template + 26 HTMLs emitidos.**
(Em vez de página única client-side com `?uf=XX`.)

**Justificativa:**
1. **SEO e compartilhamento** — cada estado tem URL real (`/estados/sc.html`), título e meta/OG próprios, indexável. Querystring client-side prejudica indexação e prévia de link.
2. **Performance/Lighthouse** — HTML pré-renderizado pinta o conteúdo sem esperar `fetch`+JS; melhora LCP e a nota. A página única depende de JS para qualquer conteúdo (pior LCP e pior degradação sem JS).
3. **Acessibilidade e robustez** — conteúdo presente no HTML inicial funciona mesmo com JS falho; só os enriquecimentos (mapa interativo, busca) precisam de JS.
4. **GitHub Pages é hospedagem estática pura** (sem servidor/roteamento) — múltiplos arquivos `.html` é o padrão natural; não exige reescrita de rotas.

**Como o `build.mjs` funciona (alto nível):**
- Lê `data/undime.json`.
- Para cada `estado` em `estados[]`: aplica `templates/estado.html`, substituindo placeholders por HTML escapado (cada `Campo` vira uma data-row com valor + selo + link), e grava `site/estados/<uf-lowercase>.html`.
- Copia `data/undime.json` → `site/assets/data/undime.json` (a home ainda usa `fetch` para o mapa/busca/eventos agregados).
- `index.html` é mantido manualmente (estrutura fixa); o `build` apenas garante o JSON e pode injetar o bloco nacional/eventos pré-renderizado (opcional) para LCP.
- Build idempotente; rodável via `node site/scripts/build.mjs`; sem dependências externas (usar `node:fs`, `node:path`). **Confirmar a sintaxe de qualquer lib via Context7 antes de usar.**

> O `estado.js` (render client-side) permanece como **camada de progressive enhancement**
> (re-hidratar selos/tooltips), mas o conteúdo essencial já vem do build.

---

## 9. Entradas/saídas e contratos
- **Entrada de dados:** `data/undime.json` (estrutura `{meta, nacional, estados[]}`; ver `docs/DATA_SCHEMA.md`).
- **Acesso a campos:** helper único em `data.js` que recebe um `Campo` e retorna `{valor, fonte_url, data_coleta, confianca}` com defaults seguros (campo ausente → tratar como lacuna).
- **UF → arquivo:** `estados/${uf.toLowerCase()}.html`. DF não gera página.
- **Filtro de eventos:** `data_inicio >= "2026-06-22"`; ordenar por `data_inicio` asc; datas parciais (ex. "2026-08") tratadas como início do mês para ordenação, exibidas literalmente.

---

## 10. Pendências para o `executor` (Fase 4)
- Obter/derivar um `brasil.svg` com `id` por UF (sigla maiúscula). Verificar licença da fonte do mapa.
- Definir a versão final da paleta (light e/ou dark) garantindo contraste AA — validar com Lighthouse/axe.
- Implementar `build.mjs` (sem libs externas; confirmar APIs Node via Context7).
- Tratar campos cujo `valor` traz **ressalvas embutidas** (ex.: `sede_endereco` nacional com divergência de CEP no próprio texto): exibir o texto integral; opcionalmente realçar a parte "OBS.:" como nota.
- Estados sem página própria de portal no ar (ex.: AC/CE/PI/RJ com HTTP 500): exibir o link mesmo assim, com o aviso já presente no `valor`.
```
