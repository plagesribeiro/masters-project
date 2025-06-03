<script>
  import { Navbar, Footer, t } from '$lib';
</script>

<svelte:head>
  <title>Loja de Artefatos Personalizados - {$t('aboutExample')} | Pedro Ribeiro</title>
</svelte:head>

<Navbar currentPage="toy-examples" />

<!-- Hero Section -->
<div class="hero min-h-[40vh] bg-gradient-to-br from-primary/10 to-primary/5">
  <div class="hero-content text-center">
    <div class="max-w-4xl">
      <div class="flex justify-center mb-6">
        <div class="p-4 bg-primary/20 rounded-full">
          <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
          </svg>
        </div>
      </div>
      <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-primary">
        Loja de Artefatos Personalizados
      </h1>
      <p class="text-lg mb-8 text-base-content/80 max-w-3xl mx-auto">
        TOY Example 1: Demonstração de Abordagens Intermediárias
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/toy-examples/alternative-approaches" 
          class="btn btn-primary btn-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Experimentar Loja
        </a>
        <a 
          href="/toy-examples" 
          class="btn btn-outline btn-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          {$t('toyExamples')}
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Content Section -->
<section class="py-16 bg-base-100">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto space-y-12">
      
      <!-- Description -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4 text-primary">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Descrição do Cenário
          </h2>
          <p class="text-base-content/80 leading-relaxed mb-4">
            Esta loja virtual demonstra um cenário realista de aplicação onde o problema pode ser satisfatoriamente resolvido por meio de <strong>abordagens intermediárias</strong>, sem a necessidade de técnicas avançadas como Fine-Tuning ou RAG.
          </p>
          <p class="text-base-content/80 leading-relaxed mb-4">
            A loja comercializa artefatos personalizados como canecas, camisas, quadros e outros itens, em quantidade e diversidade limitadas. O catálogo contém aproximadamente 10 produtos personalizáveis, com características específicas de limite de caracteres, preço e disponibilidade de estoque.
          </p>
          <div class="bg-primary/10 p-4 rounded-lg">
            <h3 class="font-semibold text-primary mb-2">🎯 Objetivo do Exemplo</h3>
            <p class="text-sm text-base-content/70">
              Demonstrar que técnicas de adaptação leve são suficientes para cenários com dados limitados e requisitos funcionais bem definidos, validando a metodologia proposta no artigo.
            </p>
          </div>
        </div>
      </div>

      <!-- Implementation -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4 text-secondary">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
            Implementação Técnica
          </h2>
          <p class="text-base-content/80 leading-relaxed mb-6">
            O sistema implementa um chatbot vendedor inteligente capaz de realizar interações complexas usando apenas prompt engineering e ferramentas integradas, sem necessidade de fine-tuning ou bases de conhecimento externas.
          </p>
          
          <!-- Capabilities -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-primary">🛍️ Catálogo Inteligente</h3>
              <p class="text-sm text-base-content/70">Consulta produtos disponíveis via ferramenta "listar_produtos" com informações atualizadas de preços, estoque e limites de personalização.</p>
            </div>
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-primary">✅ Validação Dinâmica</h3>
              <p class="text-sm text-base-content/70">Valida limites de caracteres da personalização em tempo real usando "validar_personalizacao".</p>
            </div>
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-primary">📦 Gestão de Pedidos</h3>
              <p class="text-sm text-base-content/70">Processa pedidos completos com "confirmar_pedido", atualizando automaticamente o estoque.</p>
            </div>
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-primary">🤖 Agente Conversacional</h3>
              <p class="text-sm text-base-content/70">Entende demandas em linguagem natural e sugere produtos adequados às necessidades do cliente.</p>
            </div>
          </div>

          <!-- Technical Stack -->
          <div class="bg-secondary/10 p-4 rounded-lg">
            <h3 class="font-semibold text-secondary mb-3">🔧 Stack Tecnológico</h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-outline">LangChain</span>
              <span class="badge badge-outline">LangGraph</span>
              <span class="badge badge-outline">OpenAI GPT-4o</span>
              <span class="badge badge-outline">Tool Integration</span>
              <span class="badge badge-outline">Prompt Engineering</span>
              <span class="badge badge-outline">Memory Management</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Methodology Analysis -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4 text-accent">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            Análise pela Metodologia
          </h2>
          <p class="text-base-content/80 leading-relaxed mb-6">
            Aplicando o fluxograma de decisão proposto na pesquisa, este exemplo demonstra o caminho para abordagens intermediárias:
          </p>
          
          <div class="space-y-4">
            <!-- Question 1 -->
            <div class="collapse collapse-plus bg-base-300">
              <input type="checkbox" /> 
              <div class="collapse-title text-lg font-medium">
                📊 A quantidade de dados inviabiliza sua inserção direta no prompt?
              </div>
              <div class="collapse-content"> 
                <div class="alert alert-success">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <span><strong>Resposta: Não.</strong></span>
                    <div class="text-sm mt-2">O catálogo da loja contém apenas ~10 produtos com informações simples que podem ser referenciadas no contexto ou acessadas via ferramentas sem extrapolar os limites do modelo.</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Conclusion -->
            <div class="bg-gradient-to-r from-accent/10 to-primary/10 p-6 rounded-lg border border-accent/20">
              <h3 class="text-xl font-bold mb-4 text-accent">✅ Conclusão da Metodologia</h3>
              <div class="flex items-start gap-4">
                <div class="p-2 bg-accent/20 rounded-full flex-shrink-0">
                  <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">🎯 Abordagens Intermediárias</h4>
                  <p class="text-base-content/80 leading-relaxed mb-3">
                    Uma vez que a quantidade de dados é limitada e não requer mecanismos externos de recuperação nem reconfiguração do modelo, o problema pode ser solucionado com técnicas de adaptação leve.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="badge badge-accent">Prompt Engineering</span>
                    <span class="badge badge-accent">Tool Integration</span>
                    <span class="badge badge-accent">Agent Architecture</span>
                    <span class="badge badge-accent">Memory Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Demo Features -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4 text-info">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Funcionalidades da Demo
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold mb-3 text-primary">🛒 Experiência de Compra</h3>
              <ul class="space-y-2 text-sm text-base-content/80">
                <li>• Consulte o catálogo completo de produtos</li>
                <li>• Receba sugestões personalizadas</li>
                <li>• Valide personalizações em tempo real</li>
                <li>• Finalize pedidos completos</li>
                <li>• Acompanhe atualizações de estoque</li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold mb-3 text-secondary">📊 Visualização de Dados</h3>
              <ul class="space-y-2 text-sm text-base-content/80">
                <li>• Planilha de produtos em tempo real</li>
                <li>• Histórico de pedidos processados</li>
                <li>• Estatísticas de vendas e estoque</li>
                <li>• Validação de funcionamento correto</li>
                <li>• Transparência total do processo</li>
              </ul>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-info/10 rounded-lg">
            <p class="text-sm text-base-content/70">
              💡 <strong>Dica:</strong> Use o botão "Ver Planilhas" na interface da loja para acompanhar como as ferramentas estão atualizando os dados em tempo real!
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<Footer /> 