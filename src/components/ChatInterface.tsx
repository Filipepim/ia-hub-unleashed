import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

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
      console.log('Enviando mensagem para o webhook:', currentInput);
      
      // Construir URL com parâmetros de query para GET
      const webhookUrl = new URL('https://n8n.desafioalrescate.com/webhook/comunidade');
      webhookUrl.searchParams.append('message', currentInput);
      webhookUrl.searchParams.append('timestamp', new Date().toISOString());
      webhookUrl.searchParams.append('session_id', `session_${Date.now()}`);
      webhookUrl.searchParams.append('source', 'ia_hub_chat');
      
      const response = await fetch(webhookUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Processar resposta como texto puro (N8N configurado para Text)
      const responseText = await response.text();
      console.log('Resposta recebida:', responseText);
      
      // Usar diretamente o texto da resposta
      const botResponseText = responseText.trim() || "Obrigado pela sua pergunta! Estou processando sua solicitação.";

      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Fallback para uma resposta padrão em caso de erro
      const fallbackResponse: Message = {
        id: messages.length + 2,
        text: "Desculpe, estou com dificuldades técnicas no momento. Mas posso te ajudar com algumas sugestões: você gostaria de criar um agente para atendimento ao cliente, vendas ou suporte técnico? Conte-me mais sobre seu projeto!",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
      
      toast({
        title: "Aviso",
        description: "Estou com algumas dificuldades técnicas, mas continuo aqui para ajudar!",
        variant: "default",
      });
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
