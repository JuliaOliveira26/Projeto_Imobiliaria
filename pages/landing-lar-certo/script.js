var categorias = [
  { icone: "mar", titulo: "Perto do Mar", texto: "Viver com a brisa" },
  { icone: "natureza", titulo: "Mais contato com a natureza", texto: "" },
  { icone: "urbana", titulo: "Vida urbana", texto: "Praticidade diaria" },
  { icone: "office", titulo: "Home Office", texto: "Espaço para focar" },
  { icone: "familia", titulo: "Para família", texto: "Mais conforto" },
];

document.addEventListener("DOMContentLoaded", function () {
  var listaCategorias = document.getElementById("categorias");
  categorias.forEach(function (cat) {
    cat.href = "../filtros/index.html?estilo=" + encodeURIComponent(cat.icone);
    listaCategorias.appendChild(LarCerto.criarCategoria(cat));
  });

  LarCerto.renderCards(IMOVEIS.filter(function (i) { return i.vitrine; }), document.getElementById("destaques"));

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
