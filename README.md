# Estrutura do Projeto – Lar Certo

## Organização de pastas

```text
lar-certo/
│
├── index.html
│
├── pages/
│   ├── landing-lar-certo/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── landing-fourdevs/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── home/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── detalhes-imovel/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── perfil/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── filtros/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── filtros-mapa/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── login/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── cadastro/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── favoritos/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   └── fale-conosco/
│       ├── index.html
│       ├── style.css
│       └── script.js
│
├── components/
│   ├── header.html
│   ├── footer.html
│   ├── card-imovel.html
│   └── modal.html
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── shared/
│   ├── css/
│   │   ├── global.css
│   │   └── variables.css
│   │
│   ├── js/
│   │   ├── components.js
│   │   └── storage.js
│   │
│   └── data/
│       └── imoveis.js
│
└── README.md
```

## Para que serve cada pasta?

| Pasta/Arquivo | Função |
|---|---|
| `pages/` | Armazena todas as páginas do site, cada uma com seus próprios arquivos HTML, CSS e JavaScript. |
| `components/` | Contém elementos reutilizados em diferentes páginas, como cabeçalho, rodapé, cards de imóveis e modais. |
| `assets/` | Armazena os recursos visuais do projeto, como imagens, ícones e fontes. |
| `shared/css/` | Contém os estilos globais compartilhados entre as páginas. |
| `shared/js/` | Armazena funções JavaScript utilizadas em diferentes partes do projeto. |
| `shared/data/` | Guarda os dados dos imóveis utilizados nas páginas. |
| `index.html` | Arquivo inicial do projeto, utilizado como ponto de entrada para a navegação. |
| `README.md` | Documentação com informações sobre o projeto e sua estrutura. |

---

## Como usar os componentes globais

Os componentes ficam em `components/` (`components.css` e `components.js`). Veja todos funcionando em `components/preview.html`.

> Abra o projeto por um servidor local (ex.: Live Server do VS Code) para os caminhos e imagens carregarem corretamente.

### 1. Importar na página

No `<head>`, ajuste o caminho conforme a pasta da página:

```html
<!-- páginas dentro de pages/<nome>/ -->
<link rel="stylesheet" href="../../components/components.css">
<script src="../../components/components.js" defer></script>

<!-- index.html na raiz -->
<link rel="stylesheet" href="components/components.css">
<script src="components/components.js" defer></script>
```

### 2. Header e Footer

```html
<body>
  <div data-component="header" data-active="comprar"></div>

  <main> ...conteúdo... </main>

  <div data-component="footer"></div>
</body>
```

| Atributo | Valores | Para que serve |
|---|---|---|
| `data-active` | `comprar`, `alugar`, `sobre` | Destaca o item atual do menu |
| `data-overlay` | `"true"` | Coloca o menu por cima de uma imagem (ex.: hero da home) |

Exemplo com menu sobre o hero:

```html
<div data-component="header" data-overlay="true" data-active="comprar"></div>
```

### 3. Cards de imóveis

```html
<div id="lista-imoveis" class="lc-grid-cards"></div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    LarCerto.renderCards(
      [
        {
          id: 1,
          titulo: "Casa em condomínio",
          bairro: "Centro",
          cidade: "Florianópolis",
          uf: "SC",
          preco: 850000,
          area: 126,
          quartos: 3,
          banheiros: 2,
          vagas: 2,
          imagem: "../../assets/images/casa1.jpg", // relativo à página
          destaque: true,                          // mostra o selo "Destaque"
          finalidade: "comprar"                    // "alugar" mostra "/mês" no preço
        }
      ],
      document.getElementById("lista-imoveis")
    );
  });
</script>
```

O coração do card salva os favoritos no navegador e atualiza o contador do header automaticamente.

### 4. Cards de categoria (estilo de vida)

```js
var card = LarCerto.criarCategoria({
  icone: "mar",               // mar | natureza | urbana | office | familia
  titulo: "Perto do Mar",
  texto: "Viver com a brisa",
  href: "../filtros/index.html"
});
document.getElementById("categorias").appendChild(card);
```

### 5. Modal

```js
LarCerto.abrirModal({ titulo: "Agendar visita", conteudo: "Texto do modal" });
LarCerto.fecharModal(); // também fecha com ESC ou clicando fora
```

### 6. Botões, chips e selo (só HTML + classes)

```html
<button class="lc-btn lc-btn--primary">Buscar Imóveis</button>
<button class="lc-btn lc-btn--dark">Aplicar Filtros</button>
<button class="lc-btn lc-btn--whatsapp">Fale pelo WhatsApp</button>
<button class="lc-btn lc-btn--outline">Google</button>

<button class="lc-chip is-active">Todos (3)</button>
<button class="lc-chip">Casas (2)</button>

<span class="lc-badge">Destaque</span>
```

Outras classes úteis: `lc-btn--block` (largura total), `lc-btn--pill` (arredondado), `lc-container` (centraliza o conteúdo) e `lc-grid-cards` (grade responsiva de cards).

### 7. Login (simulado) e páginas protegidas

- A landing e as páginas de login/cadastro são públicas. As demais exigem usuário logado: coloque `data-requer-login` no `<body>`.
  ```html
  <body data-requer-login>
  ```
- No header, o visitante vê **Entrar**. Logado, vê o nome (ex.: "Maria") com um menu (Meu perfil, Favoritos, Sair).
- Enquanto não existe a tela de login, `SIMULAR_LOGIN = true` em `components/components.js` entra sozinho com o usuário "Maria Silva" ao abrir uma página protegida. Quando o login estiver pronto, troque para `false` e as páginas protegidas passam a redirecionar para `pages/login/index.html`.
- Para logar por código: `LarCerto.auth.entrar({ nome: "Ana Souza", email: "ana@email.com" })`. Para sair: `LarCerto.auth.sair()`.
