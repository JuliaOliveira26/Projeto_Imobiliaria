(() => {
  'use strict';

  /* =========================================================
     1. DADOS DOS FUNDADORES (Modal Desktop)
     ========================================================= */
  const FOUNDERS = {
    dalton: {
      name: 'Dalton de Souza',
      role: 'CTO & Fundador',
      photo: 'assets/fundador-dalton.png',
      bio: 'Dalton atua na conexão entre tecnologia, produto e experiência digital, com foco na criação de interfaces funcionais, intuitivas e visualmente consistentes. Como cofundador, participa da definição da identidade dos projetos, estruturação das páginas e construção da experiência visual das soluções desenvolvidas pela equipe. Seu trabalho combina UI/UX, visão de produto e tecnologia, buscando transformar ideias em experiências digitais claras, modernas e relevantes. Também contribui na prototipação e evolução das interfaces, garantindo maior coerência entre estética, usabilidade e propósito.'
    },
    julia: {
      name: 'Julia Alves',
      role: 'CTO & Fundadora',
      photo: 'assets/fundador-julia.png',
      bio: 'Julia atua na interseção entre tecnologia, produto e desenvolvimento de soluções digitais. Como cofundadora, participa da definição de como ideias se transformam em experiências funcionais, conectando visão de produto, estratégia e execução técnica. Seu interesse está em construir soluções simples, escaláveis e bem estruturadas, sempre buscando equilibrar desempenho, usabilidade e clareza. Ao longo dos projetos, também se envolve na organização de processos, validação de ideias e evolução das experiências digitais criadas pela equipe.'
    },
    priscila: {
      name: 'Priscila da Costa',
      role: 'CTO & Fundadora',
      photo: 'assets/fundador-priscila.png',
      bio: 'Priscila combina pensamento estratégico, tecnologia e experiência do usuário para transformar conceitos em produtos digitais mais claros, intuitivos e eficientes. Como cofundadora, contribui para decisões de produto, estruturação de projetos e definição de experiências que façam sentido para quem utiliza a solução. Seu foco está em aproximar tecnologia e design, buscando interfaces mais acessíveis, fluxos mais simples e produtos capazes de resolver problemas de forma prática. Também participa da evolução das ideias desde os primeiros esboços até versões mais consistentes e funcionais.'
    },
    evelyn: {
      name: 'Evelyn Da Silva',
      role: 'CTO & Fundadora',
      photo: 'assets/fundador-evelyn.png',
      bio: 'Evelyn explora novas possibilidades em software, automação e inteligência artificial para desenvolver soluções digitais mais inteligentes e adaptáveis. Como cofundadora, atua na experimentação de tecnologias, desenvolvimento de ideias e construção de experiências que conectam inovação a aplicações práticas. Seu interesse está em entender como diferentes ferramentas podem ser combinadas para otimizar processos, melhorar produtos e criar novas formas de interação. Dentro da equipe, contribui principalmente com uma visão voltada para inovação, tecnologia emergente e evolução contínua das soluções.'
    }
  };

  /* =========================================================
     2. MENU LATERAL MOBILE
     ========================================================= */
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.mobile-drawer__link');

  function openDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    drawerBackdrop.hidden = false;
    requestAnimationFrame(() => {
      drawerBackdrop.classList.add('is-open');
      mobileDrawer.classList.add('is-open');
    });
    mobileDrawer.setAttribute('aria-hidden', 'false');
    openMenuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    drawerBackdrop.classList.remove('is-open');
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    openMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!mobileDrawer.classList.contains('is-open')) {
        drawerBackdrop.hidden = true;
      }
    }, 240);
  }

  openMenuBtn?.addEventListener('click', openDrawer);
  closeMenuBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  /* =========================================================
     3. MODAL DOS FUNDADORES (DESKTOP)
     ========================================================= */
  const founderModal = document.getElementById('founderModal');
  const modalPhoto = document.getElementById('modalFounderPhoto');
  const modalName = document.getElementById('modalFounderName');
  const modalRole = document.getElementById('modalFounderRole');
  const modalBio = document.getElementById('modalFounderBio');
  const founderBadges = document.querySelectorAll('[data-founder]');
  const closeModalTriggers = document.querySelectorAll('[data-close-modal]');

  function openFounderModal(founderKey) {
    const data = FOUNDERS[founderKey];
    if (!data || !founderModal) return;

    modalPhoto.src = data.photo;
    modalPhoto.alt = data.name;
    modalName.textContent = data.name;
    modalRole.textContent = data.role;
    modalBio.textContent = data.bio;

    founderModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeFounderModal() {
    if (!founderModal) return;
    founderModal.hidden = true;
    document.body.style.overflow = '';
  }

  founderBadges.forEach((btn) => {
    btn.addEventListener('click', () => openFounderModal(btn.dataset.founder));
  });

  closeModalTriggers.forEach((el) => {
    el.addEventListener('click', closeFounderModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (founderModal && !founderModal.hidden) closeFounderModal();
      if (mobileDrawer?.classList.contains('is-open')) closeDrawer();
    }
  });

  /* =========================================================
     4. ACORDEÃO DA SEÇÃO OBJETIVO
     ========================================================= */
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');

    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      accordionItems.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.accordion__trigger')?.setAttribute('aria-expanded', 'false');
        const otherPanel = other.querySelector('.accordion__panel');
        if (otherPanel) otherPanel.hidden = true;
      });

      if (!isOpen && panel) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });

  /* =========================================================
     5. FORMULÁRIO DE CONTATO (VALIDAÇÃO & FEEDBACK)
     ========================================================= */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach((field) => {
      const value = field.value.trim();
      const emailInvalid =
        field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!value || emailInvalid) {
        field.classList.add('is-invalid');
        isValid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });

    if (!isValid) {
      formStatus.textContent = 'Preencha corretamente os campos obrigatórios.';
      formStatus.className = 'contact-form__status is-error';
      return;
    }

    const primeiroNome = document.getElementById('primeiroNome')?.value.trim() || '';
    formStatus.textContent = `Obrigado, ${primeiroNome}! Mensagem enviada com sucesso.`;
    formStatus.className = 'contact-form__status is-success';
    contactForm.reset();
  });

  contactForm?.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => field.classList.remove('is-invalid'));
  });

  /* =========================================================
     6. BOTÃO VOLTAR AO TOPO + LINK ATIVO NA NAV
     ========================================================= */
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.hero__nav-link');
  const sections = Array.from(document.querySelectorAll('header[id], section[id]'));

  function handleScroll() {
    if (backToTopBtn) {
      backToTopBtn.hidden = window.scrollY < 450;
    }

    const scrollPos = window.scrollY + 180;
    let currentId = 'inicio';

    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    }

    navLinks.forEach((link) => {
      const target = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('is-active', target === currentId);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
