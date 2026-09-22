/**
 * ============================================================
 * pedidos.js — Lógica de Pedidos & Formulário Reativo
 * Le Jardin de Flore · v2.0
 * ============================================================
 */

const LeJardinPedidos = (() => {

  let produtosList = [];

  async function init() {
    await populateSelect();
    checkUrlParams();
    setupEventListeners();
  }

  // Popula o <select> com dados da API/Mock
  async function populateSelect() {
    const select = document.getElementById('produto-select');
    if (!select) return;

    try {
      produtosList = await LeJardinData.getProdutos('all');
      
      select.innerHTML = '<option value="">Selecione uma delícia do cardápio...</option>' + 
        produtosList.map(p => `
          <option value="${p.id}" data-price="${p.preco}">
            ${p.nome} — ${LeJardinData.formatarPreco(p.preco)}
          </option>
        `).join('');

    } catch (err) {
      console.error('Erro ao popular opções:', err);
    }
  }

  // Seleciona produto caso venha por query param (ex: ?produto=2)
  function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const prodId = urlParams.get('produto');
    const select = document.getElementById('produto-select');

    if (prodId && select) {
      select.value = prodId;
      updateOrderSummary();
    }
  }

  // Atualiza o resumo do pedido em tempo real
  function updateOrderSummary() {
    const select = document.getElementById('produto-select');
    const qtdInput = document.getElementById('quantidade') || { value: 1 };
    const summaryBox = document.getElementById('order-summary');
    if (!select || !summaryBox) return;

    const selectedId = parseInt(select.value, 10);
    const produto = produtosList.find(p => p.id === selectedId);
    const quantidade = parseInt(qtdInput.value, 10) || 1;

    if (produto) {
      const subtotal = produto.preco * quantidade;
      const taxaEntrega = 5.00;
      const total = subtotal + taxaEntrega;

      summaryBox.innerHTML = `
        <div class="summary-row">
          <span>Item:</span>
          <strong>${produto.nome} (x${quantidade})</strong>
        </div>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${LeJardinData.formatarPreco(subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>Taxa de Embalagem & Entrega:</span>
          <span>${LeJardinData.formatarPreco(taxaEntrega)}</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total Estimado:</span>
          <span>${LeJardinData.formatarPreco(total)}</span>
        </div>
      `;
      summaryBox.style.display = 'block';
    } else {
      summaryBox.innerHTML = '<p class="text-muted">Selecione um produto para visualizar o resumo.</p>';
    }
  }

  function setupEventListeners() {
    const select = document.getElementById('produto-select');
    const qtdInput = document.getElementById('quantidade');
    const form = document.getElementById('order-form');

    if (select) select.addEventListener('change', updateOrderSummary);
    if (qtdInput) qtdInput.addEventListener('input', updateOrderSummary);

    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }
  }

  // Simulação de envio para Back-end
  async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const submitBtn = form.querySelector('button[type="submit"]');
    const select = document.getElementById('produto-select');
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const qtd = parseInt(document.getElementById('quantidade')?.value || 1, 10);
    const obs = document.getElementById('observacoes')?.value.trim() || '';

    if (!select.value) {
      LeJardinAnimations.showToast('Por favor, selecione um produto.', 'info');
      return;
    }

    // Payload pronto para enviar ao Back-end via POST
    const payload = {
      cliente: { nome, email },
      produtoId: parseInt(select.value, 10),
      quantidade: qtd,
      observacoes: obs,
      dataPedido: new Date().toISOString()
    };

    // Estado visual de loading no botão
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando Pedido...';
    submitBtn.disabled = true;

    try {
      // Simula chamada de API (POST /api/pedidos)
      await new Promise(resolve => setTimeout(resolve, 900));

      console.log('📦 Pedido preparado para envio ao Back-end:', payload);
      LeJardinAnimations.showToast('Pedido realizado com sucesso! Em breve entraremos em contato.', 'success');
      
      form.reset();
      updateOrderSummary();

    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      LeJardinAnimations.showToast('Ocorreu um erro ao processar seu pedido. Tente novamente.', 'info');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  return { init };

})();
