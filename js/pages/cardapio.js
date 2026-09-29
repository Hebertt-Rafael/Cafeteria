/**
 * ============================================================
 * cardapio.js — Lógica do Cardápio Interativo Dinâmico
 * Le Jardin Fleuri · v2.0
 * ============================================================
 */

const LeJardinCardapio = (() => {

  let currentCategory = 'all';

  async function init() {
    setupFilterButtons();
    await loadProducts(currentCategory);
  }

  // Gera botões de filtro dinamicamente com base nas categorias da API/Mock
  function setupFilterButtons() {
    const filtersContainer = document.getElementById('category-filters');
    if (!filtersContainer) return;

    filtersContainer.innerHTML = LeJardinData.categorias.map(cat => `
      <button class="filter-btn ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    // Adiciona evento de clique aos filtros
    filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const catId = e.currentTarget.getAttribute('data-category');
        if (catId === currentCategory) return;

        filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        currentCategory = catId;
        await loadProducts(currentCategory);
      });
    });
  }

  // Busca e renderiza os produtos com animação de fade
  async function loadProducts(categoriaId) {
    const grid = document.getElementById('menu-products-grid');
    if (!grid) return;

    // Estado de carregamento elegante
    grid.style.opacity = '0.3';
    grid.style.transition = 'opacity 0.25s ease';

    try {
      const produtos = await LeJardinData.getProdutos(categoriaId);

      const isSubfolder = window.location.pathname.includes('/template/') || window.location.pathname.includes('/pages/');
      const getProductImage = (img) => {
        if (!img) return isSubfolder ? '../img/Cardapio.png' : 'img/Cardapio.png';
        const cleanPath = img.replace(/^\.\.\//, '');
        return isSubfolder ? '../' + cleanPath : cleanPath;
      };

      grid.innerHTML = produtos.map(prod => {
        const badge = prod.tags.includes('bestseller') 
          ? `<span class="card-badge badge-bestseller">Mais Pedido</span>`
          : prod.tags.includes('new') 
            ? `<span class="card-badge badge-new">Novidade</span>` 
            : '';

        return `
          <article class="product-card reveal-on-scroll">
            <div class="card-img-wrapper">
              ${badge}
              <img src="${getProductImage(prod.imagem)}" alt="${prod.nome}" loading="lazy" onerror="this.onerror=null; this.src='${isSubfolder ? '../img/Cardapio.png' : 'img/Cardapio.png'}';">
            </div>
            <div class="card-body">
              <span class="card-category">${prod.categoria}</span>
              <h3 class="card-title">${prod.nome}</h3>
              <p class="card-desc">${prod.descricao}</p>
              <div class="card-footer">
                <span class="card-price">${LeJardinData.formatarPreco(prod.preco)}</span>
                <a href="pedidos.html?produto=${prod.id}" class="card-order-btn">Escolher</a>
              </div>
            </div>
          </article>
        `;
      }).join('');

      grid.style.opacity = '1';

      // Re-ativa animações nos novos cards
      LeJardinAnimations.initScrollReveal();
      LeJardinAnimations.initCardTilt();

    } catch (error) {
      console.error('Falha ao carregar cardápio:', error);
      grid.innerHTML = '<p class="error-msg">Não foi possível carregar os itens do cardápio.</p>';
      grid.style.opacity = '1';
    }
  }

  return { init };

})();
