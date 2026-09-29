/**
 * ============================================================
 * navbar.js — Componente de Navegação & Menu Mobile
 * Le Jardin Fleuri · v2.0
 * ============================================================
 */

const LeJardinNavbar = (() => {

  function init() {
    setupScrollEffect();
    setupMobileMenu();
    highlightActiveLink();
  }

  // Altera estilo do cabeçalho ao rolar a página
  function setupScrollEffect() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Abre e fecha o menu mobile com transição suave
  function setupMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
      const isOpen = navLinks.classList.contains('nav-open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
        navLinks.classList.remove('nav-open');
      }
    });
  }

  // Identifica a página atual e adiciona a classe .active
  function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  return { init };

})();
