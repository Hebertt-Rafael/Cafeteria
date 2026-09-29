/**
 * ============================================================
 * main.js — Entry Point Global do Front-end
 * Le Jardin Fleuri · v2.0
 * ============================================================
 * Carregado em todas as páginas para:
 * 1. Inicializar Navbar e Menu Mobile
 * 2. Inicializar sistema de Animações (ScrollReveal, Counters)
 * 3. Identificar a página atual e carregar o módulo correto
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Componentes Globais
  if (typeof LeJardinNavbar !== 'undefined') {
    LeJardinNavbar.init();
  }

  // 2. Animações Globais
  if (typeof LeJardinAnimations !== 'undefined') {
    LeJardinAnimations.initScrollReveal();
    LeJardinAnimations.initCounters();
  }

  // 3. Roteamento e Inicialização por Página
  const page = document.body.getAttribute('data-page');

  switch (page) {
    case 'home':
      if (typeof LeJardinHome !== 'undefined') LeJardinHome.init();
      break;

    case 'cardapio':
      if (typeof LeJardinCardapio !== 'undefined') LeJardinCardapio.init();
      break;

    case 'pedidos':
      if (typeof LeJardinPedidos !== 'undefined') LeJardinPedidos.init();
      break;

    case 'sobre':
    case 'contato':
      // Páginas com foco em conteúdo estático e animações de scroll/counters
      break;

    default:
      // Fallback por URL
      const path = window.location.pathname;
      if (path.endsWith('index.html') || path.endsWith('/')) {
        if (typeof LeJardinHome !== 'undefined') LeJardinHome.init();
      } else if (path.includes('cardapio.html') || path.includes('produtos.html')) {
        if (typeof LeJardinCardapio !== 'undefined') LeJardinCardapio.init();
      } else if (path.includes('pedidos.html')) {
        if (typeof LeJardinPedidos !== 'undefined') LeJardinPedidos.init();
      }
      break;
  }
});
