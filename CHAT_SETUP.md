# 🤖 Configuração do Chat com IA

Este guia explica como configurar a funcionalidade de chat com IA especializada usando a API da OpenAI.

## 📋 Pré-requisitos

1. **Conta OpenAI**: Você precisa de uma conta na [OpenAI Platform](https://platform.openai.com/)
2. **API Key**: Gere uma chave de API em [API Keys](https://platform.openai.com/api-keys)
3. **Créditos**: Certifique-se de ter créditos disponíveis na sua conta OpenAI

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte configuração:

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**⚠️ IMPORTANTE**: 
- Nunca commite o arquivo `.env` no Git
- Mantenha sua API key segura e privada
- O arquivo `.env` já está no `.gitignore`

### 2. Estrutura de Arquivos

A funcionalidade de chat inclui:

```
src/routes/
├── explore/
│   ├── +page.svelte          # Página principal do explore
│   └── chat/
│       └── +page.svelte      # Interface do chat
└── api/
    ├── chat/
    │   └── +server.js        # API endpoint para chat
    └── transcribe/
        └── +server.js        # API endpoint para transcrição
```

## 🚀 Funcionalidades

### Chat com IA Especializada
- **Modelo**: GPT-4o
- **Especialização**: Metodologias de treinamento de LLM
- **Contexto**: Mantém histórico das últimas 10 mensagens
- **Idioma**: Português brasileiro

### Speech-to-Text (STT)
- **Modelo**: Whisper-1 (OpenAI)
- **Idioma**: Português
- **Formato**: Áudio WAV
- **Auto-envio**: Transcrição é enviada automaticamente

## 🔒 Segurança

### Boas Práticas Implementadas:
1. **Variáveis de ambiente**: API keys nunca expostas no frontend
2. **Validação de entrada**: Sanitização de dados de entrada
3. **Rate limiting**: Controle natural via custos da API
4. **Error handling**: Tratamento seguro de erros
5. **HTTPS**: Comunicação criptografada com APIs

### Configuração de Produção:
```bash
# No seu provedor de hosting (Vercel, Netlify, etc.)
OPENAI_API_KEY=sk-your-production-api-key
```

## 💰 Custos Estimados

### GPT-4o (Chat):
- **Input**: ~$2.50 por 1M tokens
- **Output**: ~$10.00 por 1M tokens
- **Estimativa**: ~$0.01-0.05 por conversa típica

### Whisper-1 (Transcrição):
- **Preço**: $0.006 por minuto de áudio
- **Estimativa**: ~$0.01 por mensagem de voz

## 🛠️ Desenvolvimento Local

1. **Instalar dependências**:
```bash
npm install
```

2. **Configurar variáveis de ambiente**:
```bash
cp .env.example .env
# Edite o .env com sua API key
```

3. **Executar em desenvolvimento**:
```bash
npm run dev
```

4. **Testar funcionalidades**:
- Acesse `/explore`
- Clique em "Iniciar Chat"
- Teste mensagens de texto e áudio

## 🐛 Troubleshooting

### Erro: "OpenAI API key not configured"
- Verifique se o arquivo `.env` existe
- Confirme se a variável `OPENAI_API_KEY` está definida
- Reinicie o servidor de desenvolvimento

### Erro: "Falha na comunicação com a IA"
- Verifique sua conexão com a internet
- Confirme se você tem créditos na conta OpenAI
- Verifique se a API key é válida

### Erro: "Erro ao acessar o microfone"
- Permita acesso ao microfone no navegador
- Use HTTPS (necessário para APIs de mídia)
- Teste em navegadores modernos (Chrome, Firefox, Safari)

## 📱 Compatibilidade

### Navegadores Suportados:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### Funcionalidades por Dispositivo:
- **Desktop**: Chat + STT completos
- **Mobile**: Chat + STT (com permissões)
- **Tablet**: Chat + STT completos

## 🔄 Deploy

### Vercel:
```bash
vercel env add OPENAI_API_KEY
vercel deploy
```

### Netlify:
```bash
# No painel: Site settings > Environment variables
# Adicione: OPENAI_API_KEY = sua-chave-aqui
```

### Outros provedores:
Configure a variável de ambiente `OPENAI_API_KEY` no painel do seu provedor.

---

**💡 Dica**: Monitore o uso da API no [dashboard da OpenAI](https://platform.openai.com/usage) para controlar custos. 