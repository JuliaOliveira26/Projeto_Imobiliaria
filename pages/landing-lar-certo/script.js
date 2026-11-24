var categorias = [
  { icone: "mar", titulo: "Perto do Mar", texto: "Viver com a brisa" },
  { icone: "natureza", titulo: "Mais contato com a natureza", texto: "" },
  { icone: "urbana", titulo: "Vida urbana", texto: "Praticidade diaria" },
  { icone: "office", titulo: "Home Office", texto: "Espaço para focar" },
  { icone: "familia", titulo: "Para família", texto: "Mais conforto" },
];

var destaques = [
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
    imagem: "../../assets/images/casa-1.jpg",
    finalidade: "comprar",
  },
  {
    id: 2,
    titulo: "Casa em condomínio",
    bairro: "Centro",
    cidade: "Joinville",
    uf: "SC",
    preco: 950000,
    area: 126,
    quartos: 4,
    banheiros: 3,
    vagas: 2,
    imagem: "../../assets/images/casa-2.jpg",
    destaque: true,
    finalidade: "comprar",
  },
  {
    id: 3,
    titulo: "Casa em condomínio",
    bairro: "Centro",
    cidade: "Curitiba",
    uf: "PR",
    preco: 750000,
    area: 126,
    quartos: 2,
    banheiros: 2,
    vagas: 1,
    imagem: "../../assets/images/casa-3.jpg",
    finalidade: "comprar",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  var listaCategorias = document.getElementById("categorias");
  categorias.forEach(function (cat) {
    cat.href = "../filtros/index.html?estilo=" + encodeURIComponent(cat.icone);
    listaCategorias.appendChild(LarCerto.criarCategoria(cat));
  });

  LarCerto.renderCards(destaques, document.getElementById("destaques"));

  document.getElementById("form-busca").addEventListener("submit", function (e) {
    e.preventDefault();
    var dados = new FormData(e.target);
    var params = new URLSearchParams();
    dados.forEach(function (valor, chave) {
      if (valor) params.set(chave, valor);
    });
    window.location.href = "../filtros/index.html?" + params.toString();
  });
});
