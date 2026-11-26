var ListagemImoveis = (function () {
  function iniciar() {
    var layout = document.getElementById("listagem");
    var campoBusca = document.getElementById("campo-busca");
    var btnFiltros = document.getElementById("btn-filtros");
    var linkAlternar = document.getElementById("link-alternar");
    var contagem = document.getElementById("contagem");
    var vazio = document.getElementById("vazio");
    var lista = document.getElementById("lista-imoveis");

    var estado = FiltrosImoveis.lerUrl(window.location.search);

    var painel = FiltrosImoveis.criarPainel(document.getElementById("painel-filtros"), IMOVEIS, estado, aplicar);

    function desenhar() {
      var resultado = FiltrosImoveis.filtrar(IMOVEIS, estado);
      var total = resultado.length;

      contagem.textContent = total + (total === 1 ? " imóvel encontrado" : " imóveis encontrados");
      vazio.hidden = total > 0;
      LarCerto.renderCards(resultado, lista);

      campoBusca.value = estado.busca;

      var query = FiltrosImoveis.paraUrl(estado);
      window.history.replaceState(null, "", "?" + query);
      linkAlternar.href = linkAlternar.dataset.destino + "?" + query;
    }

    function aplicar(novoEstado) {
      estado = novoEstado;
      desenhar();
    }

    document.getElementById("form-busca").addEventListener("submit", function (e) {
      e.preventDefault();
      var novo = painel.ler();
      novo.busca = campoBusca.value.trim();
      painel.preencher(novo);
      aplicar(novo);
    });

    function alternarPainel(abrir) {
      layout.classList.toggle("sem-painel", !abrir);
      btnFiltros.setAttribute("aria-expanded", abrir);
    }
    btnFiltros.addEventListener("click", function () {
      alternarPainel(layout.classList.contains("sem-painel"));
    });

    var abertoPorPadrao = layout.dataset.painel !== "fechado" && window.innerWidth > 900;
    alternarPainel(abertoPorPadrao);

    desenhar();
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
