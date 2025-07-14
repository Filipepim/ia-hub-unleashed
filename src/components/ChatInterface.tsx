import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou a IA da comunidade IA Hub. Como posso ajudar você a criar um agente de IA hoje?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      console.log('=== INICIANDO ENVIO PARA WEBHOOK ===');
      console.log('Mensagem do usuário:', currentInput);
      
      const baseUrl = 'https://n8n.desafioalrescate.com/webhook/comunidade';
      const params = new URLSearchParams({
        message: currentInput,
        timestamp: new Date().toISOString(),
        session_id: `session_${Date.now()}`,
        source: 'ia_hub_chat'
      });
      
      const fullUrl = `${baseUrl}?${params.toString()}`;
      console.log('🔗 URL completa sendo chamada:', fullUrl);
      
      let response;
      try {
        response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'IA-Hub-Chat/1.0',
          },
        });
      } catch (corsError) {
        console.log('⚠️ Erro de CORS detectado, tentando com proxy...');
        
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`;
        console.log('🔄 Tentando com proxy:', proxyUrl);
        
        response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
      }

      console.log('=== RESPOSTA DO WEBHOOK ===');
      console.log('📊 Status:', response.status);
      console.log('📋 Status Text:', response.statusText);
      console.log('🏷️ Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        console.error('❌ Erro na resposta do webhook:', response.status, response.statusText);
        
        try {
          const errorText = await response.text();
          console.error('📝 Detalhes do erro:', errorText);
          throw new Error(`Webhook retornou erro ${response.status}: ${errorText}`);
        } catch (readError) {
          throw new Error(`Webhook retornou erro: ${response.status} - ${response.statusText}`);
        }
      }

      // Ler a resposta bruta
      const responseText = await response.text();
      console.log('📝 Resposta bruta do webhook:', responseText);
      console.log('📏 Tamanho da resposta:', responseText.length);

      let botResponseText = '';

      // Verificar se a resposta está vazia
      if (!responseText || responseText.trim() === '') {
        console.log('⚠️ Resposta vazia do webhook');
        botResponseText = '🔧 Webhook está funcionando, mas retornou resposta vazia. Verifique a configuração do "Respond to Webhook" no N8N.';
      } else {
        // Tentar fazer parse do JSON
        try {
          const data = JSON.parse(responseText);
          console.log('✅ Dados JSON parseados:', data);
          
          // Processar diferentes formatos de resposta
          if (data && typeof data === 'object') {
            botResponseText = data.response || 
                             data.message || 
                             data.answer || 
                             data.reply || 
                             data.text || 
                             data.content ||
                             JSON.stringify(data);
          } else {
            botResponseText = String(data);
          }
          
        } catch (jsonError) {
          console.log('⚠️ Resposta não é JSON válido, usando como texto:', responseText);
          
          // Se não é JSON, usar a resposta como texto
          botResponseText = responseText;
        }
      }

      // Garantir que temos uma resposta válida
      if (!botResponseText || botResponseText.trim() === '') {
        botResponseText = '🤖 Recebi sua mensagem, mas não consegui gerar uma resposta. Verifique a configuração do webhook.';
      }

      console.log('🤖 Texto final da resposta do bot:', botResponseText);

      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      console.error('=== ERRO NO WEBHOOK ===');
      console.error('🔍 Tipo do erro:', error.constructor.name);
      console.error('📝 Mensagem do erro:', error.message);
      console.error('📊 Stack trace:', error.stack);
      
      let errorMessage = '';
      
      // Diferentes tipos de erro
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = '🌐 Erro de rede - webhook pode estar inacessível ou com problemas de conectividade.';
      } else if (error.message.includes('CORS')) {
        errorMessage = '🔒 Erro de CORS - configure os headers no N8N ou use um proxy.';
      } else if (error.message.includes('500')) {
        errorMessage = '⚙️ Erro interno do servidor (500) - verifique a configuração do workflow no N8N.';
      } else if (error.message.includes('404')) {
        errorMessage = '❓ Webhook não encontrado (404) - verifique a URL e se o workflow está ativo.';
      } else {
        errorMessage = `❌ Erro desconhecido: ${error.message}`;
      }
      
      const fallbackResponse: Message = {
        id: messages.length + 2,
        text: `${errorMessage}\n\n🔧 Verifique o console (F12) para mais detalhes técnicos.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
      
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
      {/* Header do Chat */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white bg-opacity-20 p-2 rounded-full">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">IA Assistant</h3>
            <p className="text-purple-100 text-sm">Sua ajuda para criar agentes de IA</p>
          </div>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-850">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className="bg-purple-600 p-2 rounded-full flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
            </div>

            {message.sender === 'user' && (
              <div className="bg-gray-600 p-2 rounded-full flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="bg-purple-600 p-2 rounded-full">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gray-700 px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input de Mensagem */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta sobre IA..."
            className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
