/**
 * ============================================================
 * produtos.js — Camada de Dados (Mock / Data Layer)
 * Le Jardin de Flore · v2.0
 * ============================================================
 *
 * Simula o retorno de uma API REST de produtos.
 * Para conectar ao Back-end real, substitua os métodos abaixo:
 *
 *   LeJardinData.getProdutos()    → fetch('/api/products').then(r => r.json())
 *   LeJardinData.getProdutoPorId() → fetch('/api/products/' + id).then(r => r.json())
 *
 * A interface pública (nomes dos métodos e estrutura dos objetos)
 * permanece idêntica — sem alterar nenhum outro arquivo JS.
 * ============================================================
 */

const LeJardinData = (() => {

  // ─── Categorias ────────────────────────────────────────────────
  const categorias = [
    { id: 'all',      label: 'Todos'            },
    { id: 'cafes',    label: 'Cafés'            },
    { id: 'chas',     label: 'Chás & Infusões'  },
    { id: 'doces',    label: 'Doces & Pâtisserie'},
    { id: 'salgados', label: 'Salgados'          },
  ];

  // ─── Catálogo de Produtos ──────────────────────────────────────
  // Estrutura compatível com o schema de um endpoint REST:
  // { id, nome, categoria, preco, descricao, imagem, tags, disponivel }
  const produtos = [
    {
      id: 1,
      nome: 'Café Expresso',
      categoria: 'cafes',
      preco: 6.00,
      descricao: 'Extrato puro de grão arábica selecionado, com crema densa e aroma inconfundível do torrado lento.',
      imagem: '../img/Cardapio.png',
      tags: ['bestseller'],
      disponivel: true,
    },
    {
      id: 2,
      nome: 'Cappuccino Clássico',
      categoria: 'cafes',
      preco: 9.50,
      descricao: 'Equilíbrio perfeito entre espresso, leite vaporizado e uma camada generosa de espuma sedosa.',
      imagem: '../img/Cardapio.png',
      tags: ['bestseller'],
      disponivel: true,
    },
    {
      id: 3,
      nome: 'Café au Lait',
      categoria: 'cafes',
      preco: 8.00,
      descricao: 'Café de coagem lenta com leite integral morno — a escolha favorita das manhãs parisienses.',
      imagem: '../img/Cardapio.png',
      tags: [],
      disponivel: true,
    },
    {
      id: 4,
      nome: 'Latte Caramel',
      categoria: 'cafes',
      preco: 11.00,
      descricao: 'Espresso duplo com leite cremoso, calda de caramelo artesanal e um toque final de flor de sal.',
      imagem: '../img/Cardapio.png',
      tags: ['new'],
      disponivel: true,
    },
    {
      id: 5,
      nome: 'Chocolat Chaud',
      categoria: 'cafes',
      preco: 12.00,
      descricao: 'Chocolate belga 70% derretido com leite integral e especiarias. Chantilly artesanal por cima.',
      imagem: '../img/Cardapio.png',
      tags: ['bestseller'],
      disponivel: true,
    },
    {
      id: 6,
      nome: 'Chá Earl Grey',
      categoria: 'chas',
      preco: 7.00,
      descricao: 'Chá preto perfumado com bergamota importada. Servido com açúcar demerara e leite à parte.',
      imagem: '../img/Cardapio.png',
      tags: [],
      disponivel: true,
    },
    {
      id: 7,
      nome: 'Infusão de Lavanda',
      categoria: 'chas',
      preco: 8.50,
      descricao: 'Flores de lavanda francesa, camomila e mel de laranjeira. Relaxante, delicado e perfumado.',
      imagem: '../img/Cardapio.png',
      tags: ['new'],
      disponivel: true,
    },
    {
      id: 8,
      nome: 'Chá Gelado de Pêssego',
      categoria: 'chas',
      preco: 9.00,
      descricao: 'Chá verde com pêssego natural, hortelã fresca e gelo artesanal. Refrescante e leve.',
      imagem: '../img/Cardapio.png',
      tags: [],
      disponivel: true,
    },
    {
      id: 9,
      nome: 'Croissant Amanteigado',
      categoria: 'doces',
      preco: 7.50,
      descricao: 'Folhado com manteiga francesa AOP, crocante por fora e macio por dentro. Assado diariamente.',
      imagem: '../img/Cardapio.png',
      tags: ['bestseller'],
      disponivel: true,
    },
    {
      id: 10,
      nome: 'Macaron Assortidos',
      categoria: 'doces',
      preco: 5.50,
      descricao: 'Delicados biscoitos de amêndoa com ganache cremoso. Sabores: framboesa, pistache e baunilha.',
      imagem: '../img/Cardapio.png',
      tags: ['bestseller'],
      disponivel: true,
    },
    {
      id: 11,
      nome: 'Tarte Tatin',
      categoria: 'doces',
      preco: 13.00,
      descricao: 'Torta francesa invertida de maçã caramelizada com massa folhada. Servida morna com crème fraîche.',
      imagem: '../img/Cardapio.png',
      tags: ['new'],
      disponivel: true,
    },
    {
      id: 12,
      nome: 'Pain au Chocolat',
      categoria: 'salgados',
      preco: 8.00,
      descricao: 'Croissant recheado com barra de chocolate amargo belga. Imperdível acompanhado de um espresso.',
      imagem: '../img/Cardapio.png',
      tags: [],
      disponivel: true,
    },
  ];

  // ─── Métodos Públicos ──────────────────────────────────────────

  /**
   * Retorna todos os produtos ou filtra por categoria.
   * Simula a latência de rede (400ms) para habilitar skeleton loaders.
   *
   * Substituição futura (Back-end real):
   *   const url = categoriaId === 'all'
   *     ? '/api/products'
   *     : `/api/products?category=${categoriaId}`;
   *   return fetch(url).then(r => r.json());
   *
   * @param {string} categoriaId - 'all' ou 'cafes' | 'chas' | 'doces' | 'salgados'
   * @returns {Promise<Array>}
   */
  async function getProdutos(categoriaId = 'all') {
    await _delay(400);
    if (categoriaId === 'all') return [...produtos];
    return produtos.filter(p => p.categoria === categoriaId);
  }

  /**
   * Busca um único produto pelo ID.
   *
   * Substituição futura:
   *   return fetch(`/api/products/${id}`).then(r => r.json());
   *
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  async function getProdutoPorId(id) {
    await _delay(150);
    return produtos.find(p => p.id === id) || null;
  }

  /**
   * Formata um número como moeda brasileira (R$).
   * @param {number} valor
   * @returns {string} ex: "R$\u00a09,50"
   */
  function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /** Simula latência de rede. Remover após conectar ao Back-end. */
  function _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ─── API Pública ───────────────────────────────────────────────
  return {
    categorias,
    getProdutos,
    getProdutoPorId,
    formatarPreco,
  };

})();
