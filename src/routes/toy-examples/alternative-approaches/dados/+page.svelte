<script>
  import { onMount } from 'svelte';
  import { Navbar, Footer } from '$lib';
  
  /** @typedef {{ id: number, nome: string, preco: number, limite_chars: number, estoque: number }} Produto */
  /** @typedef {{ id: number, cliente: string, telefone: string, produto: string, quantidade: number, personalizacao: string, valor_total: number, data: string, status: string }} Pedido */
  /** @typedef {{ total_produtos: number, total_pedidos: number, estoque_total: number }} Resumo */
  /** @typedef {{ produtos: Produto[], pedidos: Pedido[], resumo: Resumo }} DadosLoja */
  
  /** @type {DadosLoja} */
  let dados = $state({ produtos: [], pedidos: [], resumo: { total_produtos: 0, total_pedidos: 0, estoque_total: 0 } });
  let loading = $state(true);
  let error = $state('');
  
  onMount(async () => {
    await carregarDados();
  });
  
  async function carregarDados() {
    loading = true;
    error = '';
    try {
      const response = await fetch('/api/toy-examples/alternative-approaches');
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
</script>

<svelte:head>
  <title>Planilhas da Loja - Artefatos Personalizados | Pedro Ribeiro</title>
</svelte:head>

<Navbar currentPage="toy-examples" />

<!-- Hero Section -->
<div class="hero min-h-[40vh] bg-gradient-to-br from-primary/10 to-secondary/10">
  <div class="hero-content text-center">
    <div class="max-w-4xl">
      <div class="flex justify-center mb-6">
        <div class="p-4 bg-primary/20 rounded-full">
          <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
      </div>
      <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-primary">
        📊 Planilhas da Loja
      </h1>
      <p class="text-lg mb-8 text-base-content/80 max-w-3xl mx-auto">
        Visualização em tempo real dos dados da loja de artefatos personalizados - produtos, pedidos e estatísticas
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onclick={carregarDados}
          class="btn btn-primary btn-lg"
          disabled={loading}
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          {loading ? 'Atualizando...' : 'Atualizar Dados'}
        </button>
        <a 
          href="/toy-examples/alternative-approaches" 
          class="btn btn-outline btn-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Voltar à Loja
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
          <p class="mt-4 text-base-content/60">Carregando dados...</p>
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="stat bg-base-200 rounded-xl shadow-lg">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="stat-title">Total de Produtos</div>
            <div class="stat-value text-primary">{dados.resumo?.total_produtos || 0}</div>
            <div class="stat-desc">Catálogo da loja</div>
          </div>
          
          <div class="stat bg-base-200 rounded-xl shadow-lg">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
            </div>
            <div class="stat-title">Pedidos Realizados</div>
            <div class="stat-value text-secondary">{dados.resumo?.total_pedidos || 0}</div>
            <div class="stat-desc">Processados pelo sistema</div>
          </div>
          
          <div class="stat bg-base-200 rounded-xl shadow-lg">
            <div class="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
            <div class="stat-title">Estoque Total</div>
            <div class="stat-value text-accent">{dados.resumo?.estoque_total || 0}</div>
            <div class="stat-desc">Itens disponíveis</div>
          </div>
        </div>

        <!-- Planilha de Produtos -->
        <div class="card bg-base-200 shadow-xl mb-8">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4 text-primary">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              🛍️ Catálogo de Produtos
            </h2>
            
            {#if dados.produtos && dados.produtos.length > 0}
              <div class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Produto</th>
                      <th>Preço</th>
                      <th>Limite Chars</th>
                      <th>Estoque</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each dados.produtos as produto, index}
                      <tr>
                        <td class="font-mono">#{produto.id}</td>
                        <td class="font-semibold">{produto.nome}</td>
                        <td class="text-success font-semibold">R$ {produto.preco.toFixed(2)}</td>
                        <td class="text-center">{produto.limite_chars}</td>
                        <td class="text-center">
                          <span class="font-semibold {produto.estoque < 5 ? 'text-warning' : produto.estoque < 10 ? 'text-info' : 'text-success'}">
                            {produto.estoque}
                          </span>
                        </td>
                        <td>
                          {#if produto.estoque === 0}
                            <span class="badge badge-error">Esgotado</span>
                          {:else if produto.estoque < 5}
                            <span class="badge badge-warning">Baixo</span>
                          {:else if produto.estoque < 10}
                            <span class="badge badge-info">Médio</span>
                          {:else}
                            <span class="badge badge-success">Disponível</span>
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

        <!-- Planilha de Pedidos -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4 text-secondary">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              📦 Histórico de Pedidos
            </h2>
            
            {#if dados.pedidos && dados.pedidos.length > 0}
              <div class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Telefone</th>
                      <th>Produto</th>
                      <th>Qtd</th>
                      <th>Personalização</th>
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
                        <td class="font-mono text-sm">{pedido.telefone}</td>
                        <td>{pedido.produto}</td>
                        <td class="text-center">{pedido.quantidade}</td>
                        <td class="max-w-48">
                          <div class="tooltip" data-tip="{pedido.personalizacao}">
                            <span class="truncate block">{pedido.personalizacao}</span>
                          </div>
                        </td>
                        <td class="text-success font-semibold">R$ {pedido.valor_total.toFixed(2)}</td>
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
                          <span class="badge badge-success">{pedido.status}</span>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
              
              <div class="mt-6 p-4 bg-success/10 rounded-lg">
                <h3 class="font-semibold text-success mb-2">📈 Estatísticas de Vendas</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Total de Vendas:</strong> 
                    R$ {dados.pedidos.reduce((sum, p) => sum + p.valor_total, 0).toFixed(2)}
                  </div>
                  <div>
                    <strong>Ticket Médio:</strong> 
                    R$ {dados.pedidos.length > 0 ? (dados.pedidos.reduce((sum, p) => sum + p.valor_total, 0) / dados.pedidos.length).toFixed(2) : '0.00'}
                  </div>
                  <div>
                    <strong>Itens Vendidos:</strong> 
                    {dados.pedidos.reduce((sum, p) => sum + p.quantidade, 0)} unidades
                  </div>
                </div>
              </div>
            {:else}
              <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Nenhum pedido realizado ainda. Visite a loja e faça seu primeiro pedido!</span>
              </div>
            {/if}
          </div>
        </div>

        <!-- Information Footer -->
        <div class="mt-12 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 class="text-lg font-bold mb-4 text-primary">💡 Sobre os Dados</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-base-content/80">
            <div>
              <p class="mb-2">
                <strong>Atualização:</strong> Os dados são atualizados em tempo real conforme as interações com o chatbot vendedor.
              </p>
              <p class="mb-2">
                <strong>Persistência:</strong> Esta é uma demonstração - os dados não são permanentemente armazenados.
              </p>
            </div>
            <div>
              <p class="mb-2">
                <strong>Ferramentas:</strong> O agente usa 4 ferramentas principais: listar_produtos, validar_personalizacao, confirmar_pedido e consultar_pedidos.
              </p>
              <p class="mb-2">
                <strong>Implementação:</strong> Demonstra abordagens intermediárias sem fine-tuning ou RAG externo.
              </p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<Footer /> 