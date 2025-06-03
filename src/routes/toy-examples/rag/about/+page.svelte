<script>
  import { Navbar, Footer, t } from '$lib';
</script>

<svelte:head>
  <title>TechStore - Loja de Eletrônicos com RAG - {$t('aboutExample')} | Pedro Ribeiro</title>
</svelte:head>

<Navbar currentPage="toy-examples" />

<!-- Hero Section -->
<div class="hero min-h-[40vh] bg-gradient-to-br from-info/10 to-info/5">
  <div class="hero-content text-center">
    <div class="max-w-4xl">
      <div class="flex justify-center mb-6">
        <div class="p-4 bg-info/20 rounded-full">
          <svg class="w-12 h-12 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
      </div>
      <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-info">
        TechStore - Loja de Eletrônicos
      </h1>
      <p class="text-lg mb-8 text-base-content/80 max-w-3xl mx-auto">
        TOY Example 2: Demonstração de RAG com Catálogo Dinâmico e Busca Vetorial
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/toy-examples/rag" 
          class="btn btn-info btn-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Experimentar TechStore
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
          <h2 class="card-title text-2xl mb-4 text-info">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Descrição do Cenário
          </h2>
          <p class="text-base-content/80 leading-relaxed mb-4">
            A TechStore é uma <strong>loja virtual especializada em eletrônicos e componentes tecnológicos</strong> — notebooks, smartphones, placas de vídeo, periféricos, monitores e componentes — cujo catálogo é altamente dinâmico e extenso, refletindo alterações frequentes de disponibilidade, preço e especificações técnicas.
          </p>
          <p class="text-base-content/80 leading-relaxed mb-4">
            O assistente deve atuar como especialista em vendas, capaz de auxiliar clientes que buscam recomendações técnicas baseadas em preferências específicas como orçamento, tipo de uso (gaming, edição de vídeo, trabalho corporativo), compatibilidade entre dispositivos e preferências de marca.
          </p>
          <div class="bg-info/10 p-4 rounded-lg">
            <h3 class="font-semibold text-info mb-2">🎯 Objetivo do Exemplo</h3>
            <p class="text-sm text-base-content/70">
              Demonstrar que o RAG é essencial para cenários com dados extensos e dinâmicos, onde abordagens intermediárias são insuficientes devido ao volume e variabilidade das informações.
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
            Implementação Técnica RAG
          </h2>
          <p class="text-base-content/80 leading-relaxed mb-6">
            O sistema implementa um assistente de vendas especializado com capacidades de RAG completas, simulando busca vetorial/semântica em um catálogo extenso de produtos eletrônicos com especificações técnicas detalhadas.
          </p>
          
          <!-- Capabilities -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-info">🔍 Busca Vetorial RAG</h3>
              <p class="text-sm text-base-content/70">Ferramenta "busca_produtos_rag" simula busca semântica em catálogo com milhares de produtos baseada em linguagem natural.</p>
            </div>
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-info">⚖️ Comparação Técnica</h3>
              <p class="text-sm text-base-content/70">Ferramenta "comparar_produtos" analisa especificações detalhadas entre componentes eletrônicos.</p>
            </div>
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-info">🛒 Processamento de Vendas</h3>
              <p class="text-sm text-base-content/70">Ferramenta "confirmar_pedido" processa vendas complexas e atualiza estoque dinamicamente.</p>
            </div>
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-info">🧠 Entendimento Semântico</h3>
              <p class="text-sm text-base-content/70">Interpreta necessidades técnicas em linguagem natural como "notebook leve com bateria boa para edição de vídeo".</p>
            </div>
          </div>

          <!-- Technical Stack -->
          <div class="bg-secondary/10 p-4 rounded-lg">
            <h3 class="font-semibold text-secondary mb-3">🔧 Stack Tecnológico RAG</h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-outline">RAG Architecture</span>
              <span class="badge badge-outline">Vector Search Simulation</span>
              <span class="badge badge-outline">Semantic Similarity</span>
              <span class="badge badge-outline">Dynamic Catalog</span>
              <span class="badge badge-outline">LangChain Tools</span>
              <span class="badge badge-outline">GPT-4o + RAG</span>
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
            Aplicando o fluxograma de decisão proposto na pesquisa, este exemplo demonstra o caminho direcionado para RAG:
          </p>
          
          <div class="space-y-4">
            <!-- Question 1 -->
            <div class="collapse collapse-plus bg-base-300">
              <input type="checkbox" /> 
              <div class="collapse-title text-lg font-medium">
                📊 A quantidade de dados inviabiliza sua inserção direta no prompt?
              </div>
              <div class="collapse-content"> 
                <div class="alert alert-warning">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                  <div>
                    <span><strong>Resposta: Sim.</strong></span>
                    <div class="text-sm mt-2">O catálogo inclui milhares de produtos com especificações técnicas detalhadas, atualizadas constantemente. O volume e variabilidade inviabilizam inserção direta no contexto.</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Question 2 -->
            <div class="collapse collapse-plus bg-base-300">
              <input type="checkbox" /> 
              <div class="collapse-title text-lg font-medium">
                🎯 O objetivo é fornecer contexto ou ensinar novos comportamentos?
              </div>
              <div class="collapse-content"> 
                <div class="alert alert-info">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <span><strong>Resposta: Fornecer contexto.</strong></span>
                    <div class="text-sm mt-2">O chatbot mantém comportamento genérico adaptando-se ao conteúdo factual conforme contexto do cliente, sem necessidade de internalizar novos padrões.</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Question 3 -->
            <div class="collapse collapse-plus bg-base-300">
              <input type="checkbox" /> 
              <div class="collapse-title text-lg font-medium">
                ⚡ É viável implementar um mecanismo de RAG com os dados disponíveis?
              </div>
              <div class="collapse-content"> 
                <div class="alert alert-success">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <span><strong>Resposta: Sim.</strong></span>
                    <div class="text-sm mt-2">A loja dispõe de base estruturada em tempo real, com integração possível a sistemas de indexação vetorial (ex: FAISS) e mecanismos de consulta semântica.</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Question 5 -->
            <div class="collapse collapse-plus bg-base-300">
              <input type="checkbox" /> 
              <div class="collapse-title text-lg font-medium">
                ⏱️ A latência do mecanismo de RAG é aceitável para o contexto de uso?
              </div>
              <div class="collapse-content"> 
                <div class="alert alert-success">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <span><strong>Resposta: Sim.</strong></span>
                    <div class="text-sm mt-2">Sistema utilizado em contexto web onde latência de alguns segundos é tolerável. Pipeline de recuperação otimizado para consultas rápidas.</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Conclusion -->
            <div class="bg-gradient-to-r from-info/10 to-accent/10 p-6 rounded-lg border border-info/20">
              <h3 class="text-xl font-bold mb-4 text-info">✅ Conclusão da Metodologia</h3>
              <div class="flex items-start gap-4">
                <div class="p-2 bg-info/20 rounded-full flex-shrink-0">
                  <svg class="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">🎯 RAG (Retrieval-Augmented Generation)</h4>
                  <p class="text-base-content/80 leading-relaxed mb-3">
                    O volume extenso e dinâmico dos dados torna o RAG essencial. Permite separar conhecimento factual (armazenado externamente) da lógica de linguagem, maximizando atualidade e precisão sem comprometer flexibilidade.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="badge badge-info">Vector Search</span>
                    <span class="badge badge-info">Semantic Retrieval</span>
                    <span class="badge badge-info">Dynamic Indexing</span>
                    <span class="badge badge-info">Real-time Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RAG Features -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4 text-warning">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Funcionalidades RAG Demonstradas
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold mb-3 text-info">🔍 Busca Semântica</h3>
              <ul class="space-y-2 text-sm text-base-content/80">
                <li>• "Notebook leve com bateria boa para edição"</li>
                <li>• "Placa de vídeo para jogos 4K dentro de R$ 5000"</li>
                <li>• "Setup gaming completo marca ASUS"</li>
                <li>• Filtros por orçamento, categoria, marca</li>
                <li>• Ranking por relevância e disponibilidade</li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold mb-3 text-secondary">📊 Análise Comparativa</h3>
              <ul class="space-y-2 text-sm text-base-content/80">
                <li>• Comparação técnica entre componentes</li>
                <li>• Análise de compatibilidade</li>
                <li>• Recomendações de custo-benefício</li>
                <li>• Especificações detalhadas</li>
                <li>• Sugestões de upgrade</li>
              </ul>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-warning/10 rounded-lg">
            <p class="text-sm text-base-content/70">
              💡 <strong>Teste o RAG:</strong> Experimente consultas complexas como "Preciso de um notebook gamer com RTX e 16GB RAM para streaming" e veja como o sistema RAG encontra produtos relevantes no catálogo dinâmico!
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<Footer /> 