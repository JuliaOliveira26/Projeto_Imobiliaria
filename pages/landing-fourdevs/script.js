(() => {
  'use strict';

  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const founderModal = document.getElementById('founderModal');
  const modalPhoto = document.getElementById('modalFounderPhoto');
  const modalName = document.getElementById('modalFounderName');
  const modalRole = document.getElementById('modalFounderRole');
  const modalBio = document.getElementById('modalFounderBio');
  const modalCloseBtn = founderModal?.querySelector('.founder-modal__close');
  const accordionItems = document.querySelectorAll('.accordion__item');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.hero__nav-link');
  const sections = Array.from(document.querySelectorAll('header[id], section[id]'));

  let lastTrigger = null;

  function setDrawer(open) {
    if (!mobileDrawer || !drawerBackdrop) return;
    if (open) {
      lastTrigger = document.activeElement;
      drawerBackdrop.hidden = false;
      requestAnimationFrame(() => {
        drawerBackdrop.classList.add('is-open');
        mobileDrawer.classList.add('is-open');
      });
      closeMenuBtn?.focus({ preventScroll: true });
    } else {
      drawerBackdrop.classList.remove('is-open');
      mobileDrawer.classList.remove('is-open');
      setTimeout(() => {
        if (!mobileDrawer.classList.contains('is-open')) drawerBackdrop.hidden = true;
      }, 240);
      lastTrigger?.focus?.({ preventScroll: true });
    }
    mobileDrawer.setAttribute('aria-hidden', String(!open));
    openMenuBtn?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  openMenuBtn?.addEventListener('click', () => setDrawer(true));
  closeMenuBtn?.addEventListener('click', () => setDrawer(false));
  drawerBackdrop?.addEventListener('click', () => setDrawer(false));
  document.querySelectorAll('.mobile-drawer__link').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  // Lê os dados diretamente dos cards mobile para evitar duplicação de conteúdo
  function openFounderModal(key) {
    const card = document.querySelector(`.founder-card[data-founder="${key}"]`);
    if (!card || !founderModal) return;

    const photo = card.querySelector('.founder-card__photo');
    modalPhoto.src = photo.getAttribute('src');
    modalPhoto.alt = photo.alt;
    modalName.textContent = card.querySelector('.founder-card__name').textContent;
    modalRole.textContent = card.querySelector('.founder-card__role').textContent;
    modalBio.textContent = card.querySelector('.founder-card__bio').textContent.trim();

    lastTrigger = document.activeElement;
    founderModal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus({ preventScroll: true });
  }

  function closeFounderModal() {
    if (!founderModal || founderModal.hidden) return;
    founderModal.hidden = true;
    document.body.style.overflow = '';
    lastTrigger?.focus?.({ preventScroll: true });
  }

  document.querySelectorAll('[data-founder].founder-badge').forEach((btn) => {
    btn.addEventListener('click', () => openFounderModal(btn.dataset.founder));
  });
  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeFounderModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeFounderModal();
    if (mobileDrawer?.classList.contains('is-open')) setDrawer(false);
  });

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');

    trigger?.addEventListener('click', () => {
      const shouldOpen = !item.classList.contains('is-open');
      accordionItems.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.accordion__trigger')?.setAttribute('aria-expanded', 'false');
        const otherPanel = other.querySelector('.accordion__panel');
        if (otherPanel) otherPanel.hidden = true;
      });
      if (shouldOpen && panel) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    contactForm.querySelectorAll('[required]').forEach((field) => {
      const value = field.value.trim();
      const emailInvalid = field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const hasError = !value || emailInvalid;
      field.classList.toggle('is-invalid', hasError);
      if (hasError) isValid = false;
    });

    if (!isValid) {
      formStatus.textContent = 'Preencha corretamente os campos obrigatórios.';
      formStatus.className = 'contact-form__status is-error';
      return;
    }

    const primeiroNome = document.getElementById('primeiroNome')?.value.trim() || '';
    formStatus.textContent = `Obrigado, ${primeiroNome}! Formulário validado com sucesso (demonstração local, sem envio real).`;
    formStatus.className = 'contact-form__status is-success';
    contactForm.reset();
  });

  contactForm?.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => field.classList.remove('is-invalid'));
  });

  function handleScroll() {
    if (backToTopBtn) backToTopBtn.hidden = window.scrollY < 450;
    const scrollPos = window.scrollY + 180;
    let currentId = 'inicio';
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) currentId = section.id;
    }
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
