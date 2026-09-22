/**
 * ============================================================
 * home.js — Lógica da Página Inicial (Home)
 * Le Jardin de Flore · v2.0
 * ============================================================
 */

const LeJardinHome = (() => {

  async function init() {
    initHeroAnimations();
    await renderFeaturedProducts();
  }

  function initHeroAnimations() {
    // Efeito de digitação no título da Hero
    const typingTarget = document.querySelector('.hero-title .typing-target');
    if (typingTarget) {
      LeJardinAnimations.initTyping(
        typingTarget,
        ['Cafés Especiais', 'Pâtisserie Fina', 'Luz de Outono', 'Tradição Parisiense'],
        90
      );
    }

    // Inicializa carrossel da hero
    LeJardinCarousel.init('.hero');
  }

  // Renderiza produtos em destaque diretamente da camada de dados
  async function renderFeaturedProducts() {
    const container = document.getElementById('featured-products-grid');
    if (!container) return;

    try {
      // Busca produtos (simula consumo de endpoint /api/products/featured)
      const allProducts = await LeJardinData.getProdutos('all');
      const featured = allProducts.slice(0, 4); // Seleciona os 4 principais

      const isSubfolder = window.location.pathname.includes('/pages/');
      const basePath = isSubfolder ? '' : 'pages/';
      const imgPrefix = isSubfolder ? '../img/' : 'img/';

      container.innerHTML = featured.map(prod => {
        const badge = prod.tags.includes('bestseller') 
          ? `<span class="card-badge badge-bestseller">Mais Pedido</span>`
          : prod.tags.includes('new') 
            ? `<span class="card-badge badge-new">Novidade</span>` 
            : '';

        return `
          <article class="product-card reveal-on-scroll">
            <div class="card-img-wrapper">
              ${badge}
              <img src="${imgPrefix}Cardapio.png" alt="${prod.nome}" loading="lazy">
            </div>
            <div class="card-body">
              <span class="card-category">${prod.categoria}</span>
              <h3 class="card-title">${prod.nome}</h3>
              <p class="card-desc">${prod.descricao}</p>
              <div class="card-footer">
                <span class="card-price">${LeJardinData.formatarPreco(prod.preco)}</span>
                <a href="${basePath}pedidos.html?produto=${prod.id}" class="card-order-btn">Pedir Agora</a>
              </div>
            </div>
          </article>
        `;
      }).join('');

      // Ativa efeito de tilt e scroll reveal nos novos elementos
      LeJardinAnimations.initScrollReveal();
      LeJardinAnimations.initCardTilt();

    } catch (err) {
      console.error('Erro ao carregar destaques:', err);
      container.innerHTML = '<p class="error-msg">Não foi possível carregar os produtos no momento.</p>';
    }
  }

  return { init };

})();
