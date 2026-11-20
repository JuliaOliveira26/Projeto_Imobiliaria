

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

  var LOGO =
    '<span class="lc-logo__mark-wrap"><svg class="lc-logo__mark" viewBox="0 0 28 36" fill="currentColor" aria-hidden="true">' +
    '<path d="M0 36V14l7-5v27H0Zm9 0V4l8-4v36H9Zm10 0V12l9 5v19h-9Z"/></svg></span>' +
    '<span class="lc-logo__text"><b>LAR</b>CERTO</span>';

  var CORACAO =
    '<path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.6 4.5 7 4.5c2 0 3.7 1.1 5 3 1.3-1.9 3-3 5-3 3.4 0 5.3 3.3 4.2 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z"/>';

  var ICONES = {
    mar: '<path d="M10 24a14 14 0 0 1 28 0"/><path d="M4 32c4-4 8 4 12 0s8 4 12 0 8 4 12 0M4 40c4-4 8 4 12 0s8 4 12 0 8 4 12 0"/>',
    natureza: '<circle cx="24" cy="17" r="11"/><path d="M24 28v16M18 44h12M24 36l-6-6M24 32l6-5"/>',
    urbana: '<path d="M6 44V14h14v30M20 44V6h22v38M4 44h40M11 21h4M11 28h4M11 35h4M27 14h4M27 22h4M27 30h4"/>',
    office: '<rect x="12" y="6" width="24" height="18" rx="2"/><path d="M6 32h36M10 32v12M38 32v12M18 24v8M30 24v8"/>',
    familia: '<circle cx="12" cy="9" r="4"/><circle cx="34" cy="13" r="3.5"/><path d="M6 44V22c0-4 3-7 6-7s6 3 6 7v22M28 44V26c0-3 3-5 6-5s6 2 6 5v18"/>',
    
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
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">' + CORACAO + "</svg>" +
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
      '<svg viewBox="0 0 24 24" stroke-linejoin="round">' + CORACAO + "</svg></button>" +
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
      '<svg class="lc-categoria__icone" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONES[cat.icone] || "") + "</svg>" +
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
