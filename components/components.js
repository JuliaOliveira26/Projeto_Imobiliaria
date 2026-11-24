

(function () {
  var RAIZ = new URL("../", document.currentScript.src).href;

  function url(caminho) {
    return RAIZ + caminho;
  }

  function esc(valor) {
    var d = document.createElement("div");
    d.textContent = valor == null ? "" : valor;
    return d.innerHTML;
  }

  function icone(nome, classe) {
    return '<img class="' + (classe || "lc-icone") + '" src="' + url("assets/icons/" + nome + ".svg") + '" alt="">';
  }

  var LOGO = '<img class="lc-logo__img" src="' + url("assets/icons/LOGO.svg") + '" alt="Lar Certo">';

  var ICONES = {
    mar: "iconoir--sea-and-sun",
    natureza: "material-symbols--nature-outline",
    urbana: "uix--urban-rural",
    office: "iconmind--home-office-outline-thin",
    familia: "guidance--changin-room-family",
  };

  function listaFavoritos() {
    try {
      return JSON.parse(localStorage.getItem("larcerto:favoritos")) || [];
    } catch (e) {
      return [];
    }
  }

  function alternarFavorito(id) {
    id = String(id);
    var lista = listaFavoritos();
    var i = lista.indexOf(id);
    if (i === -1) lista.push(id);
    else lista.splice(i, 1);
    try {
      localStorage.setItem("larcerto:favoritos", JSON.stringify(lista));
    } catch (e) {}
    atualizarContador();
    return i === -1;
  }

  function atualizarContador() {
    var total = listaFavoritos().length;
    document.querySelectorAll("[data-favoritos-count]").forEach(function (el) {
      el.textContent = total;
      el.hidden = total === 0;
    });
  }

  var LINKS = [
    ["comprar", "Comprar", "pages/filtros/index.html?finalidade=comprar"],
    ["alugar", "Alugar", "pages/filtros/index.html?finalidade=alugar"],
    ["imoveis", "Imóveis", "pages/filtros/index.html"],
    ["sobre", "Sobre Nós", "pages/fale-conosco/index.html"],
  ];

  function htmlHeader(opcoes) {
    var links = LINKS.map(function (l) {
      var atual = opcoes.active === l[0] ? ' aria-current="page"' : "";
      return '<a class="lc-nav__link" href="' + url(l[2]) + '"' + atual + ">" + l[1] + "</a>";
    }).join("");

    return (
      '<header class="lc-header"' +
      (opcoes.overlay === "true" ? ' data-overlay="true"' : "") + ">" +
      '<div class="lc-header__inner">' +
      '<a class="lc-logo" href="' + url("pages/home/index.html") + '" aria-label="Lar Certo">' + LOGO + "</a>" +
      '<nav class="lc-nav" id="lc-nav">' + links + "</nav>" +
      '<div class="lc-header__actions">' +
      '<a class="lc-icon-btn" href="' + url("pages/favoritos/index.html") + '" aria-label="Favoritos">' +
      icone("basil--heart-outline") +
      '<span class="lc-count" data-favoritos-count hidden>0</span></a>' +
      '<a class="lc-account" href="' + url("pages/login/index.html") + '">Entrar</a>' +
      "</div>" +
      '<button class="lc-burger" type="button" aria-expanded="false" aria-controls="lc-nav" aria-label="Abrir menu">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
      "</button>" +
      "</div></header>"
    );
  }

  function ativarMenu(header) {
    var botao = header.querySelector(".lc-burger");
    var nav = header.querySelector(".lc-nav");
    botao.addEventListener("click", function () {
      var aberto = nav.classList.toggle("is-open");
      botao.setAttribute("aria-expanded", aberto);
    });
  }

  function htmlFooter() {
    return (
      '<footer class="lc-footer"><div class="lc-container">' +
      '<div class="lc-footer__top">' +
      '<a class="lc-logo lc-logo--sm" href="' + url("pages/home/index.html") + '" aria-label="Lar Certo">' + LOGO + "</a>" +
      '<ul class="lc-footer__nav">' +
      LINKS.map(function (l) {
        return '<li><a href="' + url(l[2]) + '">' + l[1] + "</a></li>";
      }).join("") +
      "</ul></div>" +
      '<div class="lc-footer__bottom">' +
      "<span>2026 © Lar Certo Imóveis. Todos os direitos reservados</span>" +
      '<span class="lc-footer__dot">●</span><a href="#">Política de Privacidade</a>' +
      "</div></div></footer>"
    );
  }


  function plural(n, um, varios) {
    return n + " " + (Number(n) === 1 ? um : varios);
  }

  function criarCard(imovel) {
    var preco = (Number(imovel.preco) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    var local = [imovel.cidade, imovel.uf].filter(Boolean).join(" - ");
    var link = url("pages/detalhes-imovel/index.html?id=" + encodeURIComponent(imovel.id));
    var id = String(imovel.id);

    var el = document.createElement("article");
    el.className = "lc-card";
    el.innerHTML =
      '<div class="lc-card__media">' +
      (imovel.imagem ? '<img src="' + esc(imovel.imagem) + '" alt="' + esc(imovel.titulo) + '" loading="lazy">' : "") +
      (imovel.destaque ? '<span class="lc-badge">Destaque</span>' : "") +
      "</div>" +
      '<button class="lc-card__fav" type="button" aria-label="Favoritar imóvel">' +
      icone("basil--heart-outline", "lc-fav-vazio") + icone("andrsrxn--heart-filled", "lc-fav-cheio") + "</button>" +
      '<div class="lc-card__body">' +
      '<h3 class="lc-card__title"><a href="' + link + '">' + esc(imovel.titulo) + "</a></h3>" +
      '<p class="lc-card__local">' + esc(imovel.bairro) + '<span class="lc-sep"></span>' + esc(local) + "</p>" +
      '<p class="lc-card__preco">' + preco + (imovel.finalidade === "alugar" ? " <small>/mês</small>" : "") + "</p>" +
      '<ul class="lc-card__specs">' +
      "<li>" + esc(imovel.area || 0) + "m²</li>" +
      "<li>" + plural(imovel.quartos || 0, "quarto", "quartos") + "</li>" +
      "<li>" + plural(imovel.banheiros || 0, "banheiro", "banheiros") + "</li>" +
      "<li>" + plural(imovel.vagas || 0, "vaga", "vagas") + "</li>" +
      "</ul></div>";

    var botao = el.querySelector(".lc-card__fav");
    function marcar() {
      botao.setAttribute("aria-pressed", listaFavoritos().indexOf(id) !== -1);
    }
    marcar();
    botao.addEventListener("click", function () {
      alternarFavorito(id);
      marcar();
    });
    return el;
  }

  function renderCards(imoveis, container) {
    container.replaceChildren.apply(container, imoveis.map(criarCard));
  }

  function criarCategoria(cat) {
    var el = document.createElement("a");
    el.className = "lc-categoria";
    el.href = cat.href || "#";
    el.innerHTML =
      icone(ICONES[cat.icone] || cat.icone, "lc-categoria__icone") +
      '<h3 class="lc-categoria__titulo">' + esc(cat.titulo) + "</h3>" +
      '<p class="lc-categoria__texto">' + esc(cat.texto) + "</p>";
    return el;
  }

  var modalEl = null;

  function abrirModal(opcoes) {
    fecharModal();
    modalEl = document.createElement("div");
    modalEl.className = "lc-modal";
    modalEl.setAttribute("role", "dialog");
    modalEl.setAttribute("aria-modal", "true");
    modalEl.innerHTML =
      '<div class="lc-modal__overlay" data-fechar></div>' +
      '<div class="lc-modal__box">' +
      '<button class="lc-icon-btn lc-modal__close" type="button" data-fechar aria-label="Fechar">✕</button>' +
      '<h2 class="lc-modal__titulo">' + esc(opcoes.titulo) + "</h2>" +
      '<div class="lc-modal__corpo">' + esc(opcoes.conteudo) + "</div></div>";
    modalEl.addEventListener("click", function (e) {
      if (e.target.closest("[data-fechar]")) fecharModal();
    });
    document.body.appendChild(modalEl);
    document.body.classList.add("lc-modal-open");
  }

  function fecharModal() {
    if (!modalEl) return;
    modalEl.remove();
    modalEl = null;
    document.body.classList.remove("lc-modal-open");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") fecharModal();
  });

  function montarComponentes() {
    document.querySelectorAll("[data-component]").forEach(function (host) {
      var nome = host.dataset.component;
      var html = nome === "header" ? htmlHeader(host.dataset) : nome === "footer" ? htmlFooter() : "";
      if (!html) return;

      var tpl = document.createElement("template");
      tpl.innerHTML = html;
      var raiz = tpl.content.firstElementChild;
      if (nome === "header") ativarMenu(raiz);
      host.replaceWith(raiz);
    });
    atualizarContador();
  }

  window.LarCerto = {
    renderCards: renderCards,
    criarCard: criarCard,
    criarCategoria: criarCategoria,
    abrirModal: abrirModal,
    fecharModal: fecharModal,
    favoritos: { lista: listaFavoritos, alternar: alternarFavorito },
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montarComponentes);
  else montarComponentes();
})();
