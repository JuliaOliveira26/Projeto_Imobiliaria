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