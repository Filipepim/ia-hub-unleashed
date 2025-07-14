
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const GuiaHumanizacaoAgentesMicromomentos = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Os Micromomentos Inesperados</h1>
          </div>
          <p className="text-xl text-gray-300">
            Onde a humanidade realmente floresce no atendimento
          </p>
        </div>

        {/* Conteúdo */}
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              A pesquisa aprofundada em conversas reais revela que os picos de humanização não estão apenas nas saudações personalizadas, mas em <strong className="text-purple-300">interações sutis</strong> que pouquíssimos param para analisar.
            </p>
          </div>

          {/* O "Erro" que Gera Confiança */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">🔧 O "Erro" que Gera Confiança: A Autocorreção no Atendimento</h2>
            
            <div className="bg-blue-900 border-l-4 border-blue-400 p-6 rounded-r-lg mb-6">
              <p className="text-blue-100 leading-relaxed mb-4">
                Imagine um atendente que digita <strong>"tudo cert!"</strong> e, imediatamente, corrige para <strong>"Certo*"</strong> em uma mensagem subsequente.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Um bot, idealmente, não cometeria esse erro. Mas essa autocorreção, esse pequeno "deslize" e o reconhecimento dele, reforça a <strong>autenticidade da interação</strong> e a presença de uma pessoa real do outro lado.
              </p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-green-300 mb-3">💡 Insight Prático:</h3>
              <p className="text-gray-300">
                Permitir (e até programar) pequenas "autocorreções" ou "reformulações" após o envio inicial de uma mensagem pode humanizar incrivelmente seu agente, simulando a revisão natural do texto que fazemos ao conversar.
              </p>
            </div>
          </div>

          {/* Silêncios Estratégicos */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">⏰ Silêncios Estratégicos: O Ritmo Humano na Conversa Assíncrona</h2>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Quantas vezes um atendente responde <strong className="text-yellow-300">"Um momento por gentileza!"</strong> ou <strong className="text-yellow-300">"Um momento"</strong> antes de enviar um bloco de informações?
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-gray-300">
                  <strong className="text-yellow-300">Problema:</strong> Agentes que respondem instantaneamente a tudo podem ser percebidos como robóticos.
                </p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-300">
                  <strong className="text-green-300">Solução:</strong> Insira "delay-simulados" e mensagens de "estou verificando" ou "um momento" antes de blocos de texto maiores.
                </p>
              </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-green-300 mb-3">🎯 Implementação:</h3>
              <p className="text-gray-300">
                Isso emula o tempo de processamento humano e gerencia a expectativa de resposta, tornando a interação mais natural e menos mecânica.
              </p>
            </div>
          </div>

          {/* Validação Silenciosa */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">✅ A Validação Silenciosa: Confirmando as Dificuldades Alheias</h2>
            
            <div className="bg-gray-700 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Exemplo Real:</h3>
              <div className="space-y-2">
                <p className="text-blue-300"><strong>Cliente:</strong> "É que dia de entrega eu dirigindo e complicado msm kkkk"</p>
                <p className="text-green-300"><strong>Agente:</strong> "Boa tarde, tudo bem! Entendo"</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              O <strong className="text-purple-300">"Entendo"</strong> aqui é um aceno, uma validação da situação do cliente, sem ignorar o tom informal. É a capacidade de reconhecer e responder a elementos não-formais da comunicação.
            </p>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-green-300 mb-3">🔑 Insight:</h3>
              <p className="text-gray-300">
                Programe seu agente para reconhecer e dar pequenas respostas de validação a comentários informais ou desabafos, mesmo que não exijam uma ação direta. Isso cria um <strong>eco de compreensão</strong>.
              </p>
            </div>
          </div>

          {/* Humor Inesperado */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">😄 O Humor Inesperado: Quebrando o Gelo com Leveza</h2>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              O reconhecimento e a resposta ao humor do cliente são pontos cruciais de humanidade. Um agente que consegue "responder" a um <strong className="text-yellow-300">"kkkk"</strong> com algo que não seja um silêncio ou uma resposta formal, aprofunda a conexão informal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-900 p-6 rounded-lg border border-red-600">
                <h3 className="text-lg font-bold text-red-300 mb-3">❌ Resposta Robótica</h3>
                <p className="text-red-100 text-sm">Ignorar completamente o humor ou responder de forma totalmente formal</p>
              </div>
              
              <div className="bg-green-900 p-6 rounded-lg border border-green-600">
                <h3 className="text-lg font-bold text-green-300 mb-3">✅ Resposta Humanizada</h3>
                <p className="text-green-100 text-sm">Reconhecer o tom com emoji sutil ou frase descontraída apropriada</p>
              </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-bold text-green-300 mb-3">🚀 Implementação:</h3>
              <p className="text-gray-300">
                Vá além da detecção de intenção. Analise o tom e a emoção da mensagem do cliente e tenha um pequeno repertório de respostas leves ou emojis para momentos em que o humor ou a informalidade são evidentes.
              </p>
            </div>
          </div>

          {/* Memória Afetiva */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">🧠 O Poder da "Memória Afetiva" do Agente: Indo Além do CRM</h2>
            
            <div className="bg-purple-900 border-l-4 border-purple-400 p-6 rounded-r-lg mb-6">
              <p className="text-purple-100 leading-relaxed">
                Sua automação já busca dados no CRM, certo? Mas e se ela pudesse usar esses dados para construir uma <strong>"memória afetiva"</strong> com o cliente?
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-blue-300 mb-3">🤝 Reconhecendo o Esforço do Cliente</h3>
                <p className="text-gray-300 mb-4">
                  Quando um cliente menciona que "não chegamos a fazer o teste" da tinta, a resposta valida a informação. Mas o que vem depois é crucial: a sugestão de agendar com o consultor específico mostra proatividade.
                </p>
                <div className="bg-gray-600 p-4 rounded text-sm text-gray-300">
                  <strong>Exemplo:</strong> "Entendi, como você mencionou X, acho que Y seria o mais adequado agora."
                </div>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-green-300 mb-3">🔄 Abertura para o "Não Protocolo"</h3>
                <p className="text-gray-300 mb-4">
                  A capacidade de dizer "Estava sem o whats app da empresa ontem, podemos marcar outro dia" cria um momento de conexão e empatia através da transparência.
                </p>
                <div className="bg-gray-600 p-4 rounded text-sm text-gray-300">
                  <strong>Implementação:</strong> Use linguagem transparente sobre problemas internos em vez de mascará-los.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700">
          <Link
            to="/guias/humanizacao-agentes/contraintuicao"
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior: A Contraintuição
          </Link>
          
          <Link
            to="/guias/humanizacao-agentes/dicas-ninjas"
            className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Próximo: Dicas Ninjas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuiaHumanizacaoAgentesMicromomentos;
