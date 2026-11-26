var FiltrosImoveis = (function () {
  var TIPOS = [
    ["apartamento", "Apartamento"],
    ["casa", "Casa"],
    ["cobertura", "Cobertura"],
    ["terreno", "Terreno"],
    ["comercial", "Comercial"],
  ];

  var PRECO = {
    comprar: { min: 0, max: 2000000, passo: 50000 },
    alugar: { min: 0, max: 10000, passo: 100 },
  };

  function semAcento(texto) {
    return String(texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function dinheiro(valor) {
    return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  }

  function numero(valor) {
    var n = parseInt(valor, 10);
    return isNaN(n) || n < 0 ? 0 : n;
  }

  function estadoPadrao() {
    return { busca: "", finalidade: "comprar", tipos: [], precoMin: null, precoMax: null, quartos: 0, banheiros: 0, areaMin: 0, areaMax: 0 };
  }

  function lerUrl(queryString) {
    var p = new URLSearchParams(queryString);
    var e = estadoPadrao();
    e.busca = p.get("busca") || "";
    e.finalidade = p.get("finalidade") === "alugar" ? "alugar" : "comprar";
    e.tipos = (p.get("tipo") || "").split(",").filter(Boolean);
    e.precoMin = p.get("precoMin") ? numero(p.get("precoMin")) : null;
    e.precoMax = p.get("precoMax") ? numero(p.get("precoMax")) : null;
    e.quartos = numero(p.get("quartos"));
    e.banheiros = numero(p.get("banheiros"));
    e.areaMin = numero(p.get("areaMin"));
    e.areaMax = numero(p.get("areaMax"));
    return e;
  }

  function paraUrl(e) {
    var p = new URLSearchParams();
    if (e.busca) p.set("busca", e.busca);
    p.set("finalidade", e.finalidade);
    if (e.tipos.length) p.set("tipo", e.tipos.join(","));
    if (e.precoMin != null) p.set("precoMin", e.precoMin);
    if (e.precoMax != null) p.set("precoMax", e.precoMax);
    if (e.quartos) p.set("quartos", e.quartos);
    if (e.banheiros) p.set("banheiros", e.banheiros);
    if (e.areaMin) p.set("areaMin", e.areaMin);
    if (e.areaMax) p.set("areaMax", e.areaMax);
    return p.toString();
  }

  function filtrar(lista, e, ignorarTipos) {
    var termos = semAcento(e.busca).split(/[\s,]+/).filter(Boolean);

    return lista.filter(function (i) {
      if (e.finalidade && i.finalidade !== e.finalidade) return false;
      if (!ignorarTipos && e.tipos.length && e.tipos.indexOf(i.tipo) === -1) return false;
      if (e.precoMin != null && i.preco < e.precoMin) return false;
      if (e.precoMax != null && i.preco > e.precoMax) return false;
      if (e.quartos && i.quartos < e.quartos) return false;
      if (e.banheiros && i.banheiros < e.banheiros) return false;
      if (e.areaMin && i.area < e.areaMin) return false;
      if (e.areaMax && i.area > e.areaMax) return false;
      if (termos.length) {
        var texto = semAcento([i.titulo, i.tipo, i.bairro, i.cidade, i.uf].join(" "));
        return termos.every(function (t) {
          return texto.indexOf(t) !== -1;
        });
      }
      return true;
    });
  }

  function htmlPainel() {
    var tipos = TIPOS.map(function (t) {
      return (
        '<label class="painel__tipo"><input type="checkbox" value="' + t[0] + '">' +
        "<span>" + t[1] + ' <small data-contagem="' + t[0] + '"></small></span></label>'
      );
    }).join("");

    function stepper(campo) {
      return (
        '<div class="stepper" data-stepper="' + campo + '">' +
        '<button type="button" data-passo="-1" aria-label="Diminuir">−</button>' +
        '<output class="stepper__valor"></output>' +
        '<button type="button" data-passo="1" aria-label="Aumentar">+</button></div>'
      );
    }

    return (
      '<form class="painel" novalidate>' +
      '<div class="painel__topo"><h2>Filtros</h2><button type="button" class="painel__limpar" data-acao="limpar">Limpar filtros</button></div>' +
      '<label class="painel__rotulo" for="painel-busca">Localização</label>' +
      '<input class="painel__input" id="painel-busca" name="busca" type="text" placeholder="Cidade, estado ou região" autocomplete="off">' +
      '<p class="painel__rotulo">Finalidade</p>' +
      '<div class="segmentado" role="group" aria-label="Finalidade">' +
      '<button type="button" data-finalidade="comprar">Comprar</button>' +
      '<button type="button" data-finalidade="alugar">Alugar</button></div>' +
      '<p class="painel__rotulo">Tipo de Imóvel</p><div class="painel__tipos">' + tipos + "</div>" +
      '<p class="painel__rotulo">Faixa de preço</p>' +
      '<div class="faixa"><div class="faixa__valores"><span data-preco-min></span><span data-preco-max></span></div>' +
      '<div class="faixa__controle"><div class="faixa__trilho"><div class="faixa__preenchido"></div></div>' +
      '<input type="range" data-faixa="min" aria-label="Preço mínimo"><input type="range" data-faixa="max" aria-label="Preço máximo"></div></div>' +
      '<p class="painel__rotulo">Quartos</p>' + stepper("quartos") +
      '<p class="painel__rotulo">Banheiros</p>' + stepper("banheiros") +
      '<p class="painel__rotulo">Área</p>' +
      '<div class="painel__duas"><input class="painel__input" name="areaMin" type="number" min="0" placeholder="De (m²)" aria-label="Área mínima">' +
      '<input class="painel__input" name="areaMax" type="number" min="0" placeholder="Até (m²)" aria-label="Área máxima"></div>' +
      '<button type="submit" class="lc-btn lc-btn--dark lc-btn--block painel__aplicar">Aplicar Filtros</button></form>'
    );
  }

  function criarPainel(container, lista, estadoInicial, aoAplicar) {
    container.innerHTML = htmlPainel();
    var form = container.querySelector("form");
    var finalidade = estadoInicial.finalidade;
    var valores = { quartos: 0, banheiros: 0 };
    var faixaMin = form.querySelector('[data-faixa="min"]');
    var faixaMax = form.querySelector('[data-faixa="max"]');

    function configurarFaixa(precoMin, precoMax) {
      var cfg = PRECO[finalidade];
      [faixaMin, faixaMax].forEach(function (input) {
        input.min = cfg.min;
        input.max = cfg.max;
        input.step = cfg.passo;
      });
      faixaMin.value = precoMin == null ? cfg.min : precoMin;
      faixaMax.value = precoMax == null ? cfg.max : precoMax;
      atualizarFaixa();
    }

    function atualizarFaixa(origem) {
      var min = Number(faixaMin.value);
      var max = Number(faixaMax.value);
      if (min > max) {
        if (origem === faixaMin) faixaMin.value = min = max;
        else faixaMax.value = max = min;
      }
      var cfg = PRECO[finalidade];
      var total = cfg.max - cfg.min;
      var barra = form.querySelector(".faixa__preenchido");
      barra.style.left = ((min - cfg.min) / total) * 100 + "%";
      barra.style.right = 100 - ((max - cfg.min) / total) * 100 + "%";
      form.querySelector("[data-preco-min]").textContent = dinheiro(min);
      form.querySelector("[data-preco-max]").textContent = dinheiro(max) + (max >= cfg.max ? "+" : "");
    }

    function mostrarStepper(campo) {
      form.querySelector('[data-stepper="' + campo + '"] output').textContent = valores[campo] ? valores[campo] + "+" : "Qualquer";
    }

    function marcarFinalidade() {
      form.querySelectorAll("[data-finalidade]").forEach(function (b) {
        b.classList.toggle("is-ativo", b.dataset.finalidade === finalidade);
        b.setAttribute("aria-pressed", b.dataset.finalidade === finalidade);
      });
    }

    function contarTipos() {
      var base = filtrar(lista, { busca: form.elements.busca.value, finalidade: finalidade, tipos: [], precoMin: null, precoMax: null, quartos: 0, banheiros: 0, areaMin: 0, areaMax: 0 }, true);
      TIPOS.forEach(function (t) {
        var total = base.filter(function (i) {
          return i.tipo === t[0];
        }).length;
        form.querySelector('[data-contagem="' + t[0] + '"]').textContent = "(" + total + ")";
      });
    }

    function preencher(e) {
      finalidade = e.finalidade;
      form.elements.busca.value = e.busca;
      form.elements.areaMin.value = e.areaMin || "";
      form.elements.areaMax.value = e.areaMax || "";
      valores.quartos = e.quartos;
      valores.banheiros = e.banheiros;
      form.querySelectorAll(".painel__tipo input").forEach(function (c) {
        c.checked = e.tipos.indexOf(c.value) !== -1;
      });
      marcarFinalidade();
      configurarFaixa(e.precoMin, e.precoMax);
      mostrarStepper("quartos");
      mostrarStepper("banheiros");
      contarTipos();
    }

    function ler() {
      var cfg = PRECO[finalidade];
      var min = Number(faixaMin.value);
      var max = Number(faixaMax.value);
      return {
        busca: form.elements.busca.value.trim(),
        finalidade: finalidade,
        tipos: Array.prototype.map.call(form.querySelectorAll(".painel__tipo input:checked"), function (c) {
          return c.value;
        }),
        precoMin: min > cfg.min ? min : null,
        precoMax: max < cfg.max ? max : null,
        quartos: valores.quartos,
        banheiros: valores.banheiros,
        areaMin: numero(form.elements.areaMin.value),
        areaMax: numero(form.elements.areaMax.value),
      };
    }

    form.addEventListener("click", function (ev) {
      var botao = ev.target.closest("button");
      if (!botao) return;

      if (botao.dataset.finalidade) {
        finalidade = botao.dataset.finalidade;
        marcarFinalidade();
        configurarFaixa(null, null);
        contarTipos();
      } else if (botao.dataset.passo) {
        var campo = botao.closest("[data-stepper]").dataset.stepper;
        valores[campo] = Math.max(0, Math.min(10, valores[campo] + Number(botao.dataset.passo)));
        mostrarStepper(campo);
      } else if (botao.dataset.acao === "limpar") {
        var limpo = estadoPadrao();
        limpo.finalidade = finalidade;
        preencher(limpo);
        aoAplicar(ler());
      }
    });

    form.addEventListener("input", function (ev) {
      if (ev.target === faixaMin || ev.target === faixaMax) atualizarFaixa(ev.target);
      if (ev.target.name === "busca") contarTipos();
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      aoAplicar(ler());
    });

    preencher(estadoInicial);

    return { preencher: preencher, ler: ler };
  }

  return {
    estadoPadrao: estadoPadrao,
    lerUrl: lerUrl,
    paraUrl: paraUrl,
    filtrar: filtrar,
    criarPainel: criarPainel,
  };
})();
