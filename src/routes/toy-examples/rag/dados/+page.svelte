<script>
  import { onMount } from 'svelte';
  import { Navbar, Footer } from '$lib';
  
  /** @typedef {{ id: number, nome: string, preco: number, categoria: string, marca: string, estoque: number, uso_recomendado: string }} Produto */
  /** @typedef {{ id: number, cliente: string, email: string, produtos: any[], endereco: string, valor_total: number, data: string, status: string }} Pedido */
  /** @typedef {{ total_produtos: number, total_pedidos: number, categorias: string[], marcas: string[], valor_total_estoque: number }} Resumo */
  /** @typedef {{ produtos: Produto[], pedidos: Pedido[], resumo: Resumo }} DadosTechStore */
  
  /** @type {DadosTechStore} */
  let dados = $state({ produtos: [], pedidos: [], resumo: { total_produtos: 0, total_pedidos: 0, categorias: [], marcas: [], valor_total_estoque: 0 } });
  let loading = $state(true);
  let error = $state('');
  
  onMount(async () => {
    await carregarDados();
  });
  
  async function carregarDados() {
    loading = true;
    error = '';
    try {
      const response = await fetch('/api/toy-examples/rag');
      if (response.ok) {
        dados = await response.json();
      } else {
        error = 'Erro ao carregar dados';
      }
    } catch (err) {
      error = 'Erro de conexão';
      console.error('Erro:', err);
    } finally {
      loading = false;
    }
  }

  /**
   * @param {string} categoria
   * @returns {string}
   */
  function getStatusColor(categoria) {
    /** @type {Record<string, string>} */
    const colors = {
      'notebook': 'badge-info',
      'smartphone': 'badge-success',
      'gpu': 'badge-error',
      'mouse': 'badge-warning',
      'teclado': 'badge-secondary',
      'fone': 'badge-accent',
      'monitor': 'badge-primary',
      'processador': 'badge-neutral',
      'memoria': 'badge-ghost'
    };
    return colors[categoria] || 'badge-ghost';
  }
</script>

<svelte:head>
  <title>Banco de Dados - TechStore RAG | Pedro Ribeiro</title>
</svelte:head>

<Navbar currentPage="toy-examples" />

<!-- Hero Section -->
<div class="hero min-h-[40vh] bg-gradient-to-br from-info/10 to-secondary/10">
  <div class="hero-content text-center">
    <div class="max-w-4xl">
      <div class="flex justify-center mb-6">
        <div class="p-4 bg-info/20 rounded-full">
          <svg class="w-12 h-12 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
          </svg>
        </div>
      </div>
      <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-info">
        🏪 TechStore - Banco de Dados
      </h1>
      <p class="text-lg mb-8 text-base-content/80 max-w-3xl mx-auto">
        Catálogo dinâmico de eletrônicos com busca vetorial RAG - produtos, pedidos e estatísticas em tempo real
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onclick={carregarDados}
          class="btn btn-info btn-lg"
          disabled={loading}
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          {loading ? 'Sincronizando...' : 'Sincronizar Catálogo'}
        </button>
        <a 
          href="/toy-examples/rag" 
          class="btn btn-outline btn-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Voltar à TechStore
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Content Section -->
<section class="py-16 bg-base-100">
  <div class="container mx-auto px-4">
    <div class="max-w-7xl mx-auto">
      
      {#if loading}
        <div class="text-center py-12">
          <span class="loading loading-ring loading-lg"></span>
          <p class="mt-4 text-base-content/60">Carregando catálogo eletrônicos...</p>
        </div>
      
      {:else if error}
        <div class="alert alert-error max-w-2xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      
      {:else}
        <!-- Resumo Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div class="stat bg-base-200 rounded-xl shadow-lg">
            <div class="stat-figure text-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="stat-title">Produtos no Catálogo</div>
            <div class="stat-value text-info">{dados.resumo?.total_produtos || 0}</div>
            <div class="stat-desc">Catálogo dinâmico</div>
          </div>
          
          <div class="stat bg-base-200 rounded-xl shadow-lg">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="stat-title">Categorias</div>
            <div class="stat-value text-secondary">{dados.resumo?.categorias?.length || 0}</div>
            <div class="stat-desc">{dados.resumo?.categorias?.join(', ') || 'N/A'}</div>
          </div>

          <div class="stat bg-base-200 rounded-xl shadow-lg">
            <div class="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="stat-title">Valor do Estoque</div>
            <div class="stat-value text-accent">R$ {(dados.resumo?.valor_total_estoque || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
            <div class="stat-desc">Total em produtos</div>
          </div>
          
          <div class="stat bg-base-200 rounded-xl shadow-lg">
            <div class="stat-figure text-success">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
            <div class="stat-title">Pedidos Processados</div>
            <div class="stat-value text-success">{dados.resumo?.total_pedidos || 0}</div>
            <div class="stat-desc">Via RAG</div>
          </div>
        </div>

        <!-- Catálogo de Produtos -->
        <div class="card bg-base-200 shadow-xl mb-8">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4 text-info">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              🖥️ Catálogo de Eletrônicos
            </h2>
            
            {#if dados.produtos && dados.produtos.length > 0}
              <div class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Produto</th>
                      <th>Categoria</th>
                      <th>Marca</th>
                      <th>Preço</th>
                      <th>Estoque</th>
                      <th>Uso Recomendado</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each dados.produtos as produto, index}
                      <tr>
                        <td class="font-mono">#{produto.id}</td>
                        <td class="font-semibold max-w-48">
                          <div class="tooltip" data-tip="{produto.nome}">
                            <span class="truncate block">{produto.nome}</span>
                          </div>
                        </td>
                        <td>
                          <span class="badge {getStatusColor(produto.categoria)} badge-sm">
                            {produto.categoria}
                          </span>
                        </td>
                        <td class="font-medium">{produto.marca}</td>
                        <td class="text-success font-semibold">R$ {produto.preco?.toFixed(2) || '0.00'}</td>
                        <td class="text-center">
                          <span class="font-semibold {produto.estoque < 5 ? 'text-warning' : produto.estoque < 10 ? 'text-info' : 'text-success'}">
                            {produto.estoque}
                          </span>
                        </td>
                        <td class="max-w-32">
                          <div class="tooltip" data-tip="{produto.uso_recomendado}">
                            <span class="text-xs truncate block">{produto.uso_recomendado}</span>
                          </div>
                        </td>
                        <td>
                          {#if produto.estoque === 0}
                            <span class="badge badge-error badge-sm">Esgotado</span>
                          {:else if produto.estoque < 5}
                            <span class="badge badge-warning badge-sm">Baixo</span>
                          {:else if produto.estoque < 10}
                            <span class="badge badge-info badge-sm">Médio</span>
                          {:else}
                            <span class="badge badge-success badge-sm">Disponível</span>
                          {/if}
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            {:else}
              <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Nenhum produto encontrado no catálogo.</span>
              </div>
            {/if}
          </div>
        </div>

        <!-- Histórico de Pedidos -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4 text-secondary">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              📦 Pedidos Processados via RAG
            </h2>
            
            {#if dados.pedidos && dados.pedidos.length > 0}
              <div class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Email</th>
                      <th>Produtos</th>
                      <th>Valor Total</th>
                      <th>Data</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each dados.pedidos as pedido}
                      <tr>
                        <td class="font-mono">#{pedido.id}</td>
                        <td class="font-semibold">{pedido.cliente}</td>
                        <td class="font-mono text-sm">{pedido.email}</td>
                        <td class="max-w-48">
                          <div class="text-xs">
                            {pedido.produtos?.map(p => `${p.quantidade}x ${p.produto}`).join(', ') || 'N/A'}
                          </div>
                        </td>
                        <td class="text-success font-semibold">R$ {pedido.valor_total?.toFixed(2) || '0.00'}</td>
                        <td class="text-sm">
                          {new Date(pedido.data).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td>
                          <span class="badge badge-success badge-sm">{pedido.status}</span>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
              
              <div class="mt-6 p-4 bg-success/10 rounded-lg">
                <h3 class="font-semibold text-success mb-2">📊 Estatísticas RAG</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Receita Total:</strong> 
                    R$ {dados.pedidos.reduce((sum, p) => sum + (p.valor_total || 0), 0).toFixed(2)}
                  </div>
                  <div>
                    <strong>Ticket Médio:</strong> 
                    R$ {dados.pedidos.length > 0 ? (dados.pedidos.reduce((sum, p) => sum + (p.valor_total || 0), 0) / dados.pedidos.length).toFixed(2) : '0.00'}
                  </div>
                  <div>
                    <strong>Pedidos Via RAG:</strong> 
                    {dados.pedidos.length} processados
                  </div>
                </div>
              </div>
            {:else}
              <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Nenhum pedido processado ainda. Visite a TechStore e faça uma busca com RAG!</span>
              </div>
            {/if}
          </div>
        </div>

        <!-- Information Footer -->
        <div class="mt-12 p-6 bg-info/10 rounded-lg border border-info/20">
          <h3 class="text-lg font-bold mb-4 text-info">💡 Sobre o Sistema RAG</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-base-content/80">
            <div>
              <p class="mb-2">
                <strong>Busca Vetorial:</strong> Sistema RAG com similaridade semântica para encontrar produtos relevantes.
              </p>
              <p class="mb-2">
                <strong>Catálogo Dinâmico:</strong> {dados.produtos?.length || 0} produtos com especificações técnicas detalhadas.
              </p>
            </div>
            <div>
              <p class="mb-2">
                <strong>Ferramentas RAG:</strong> busca_produtos_rag, comparar_produtos, confirmar_pedido.
              </p>
              <p class="mb-2">
                <strong>Implementação:</strong> Demonstra RAG completo conforme metodologia do artigo.
              </p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<Footer /> 