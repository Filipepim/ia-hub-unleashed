
import { useState } from 'react';
import { Search, Clock, Star, BookOpen, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';

const Guias = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const featuredPost = {
    title: "Seu Guia Ninja para Dominar a Inteligência Artificial",
    description: "Tudo o que você precisa saber para começar sua jornada na IA. Este guia abrangente cobre desde conceitos básicos até as primeiras aplicações práticas, com dicas ninja e exemplos práticos.",
    readTime: "15 min",
    category: "Essencial",
    isNew: true,
    link: "/guias/ia-iniciantes"
  };

  const guides = [
    {
      title: "O que torna um atendimento Humano?",
      description: "Pesquisa feita no calcenter da FIEC com conversas REAIS. Pesquisa realizada no dia 14/07/2025",
      readTime: "45 min",
      category: "Avançado",
      tags: ["humanização", "whatsapp", "agentes", "atendimento"],
      link: "/guias/humanizacao-agentes",
      isNew: true
    },
    {
      title: "Guia de Prompts para Lovable: 70 Exemplos",
      description: "Coleção completa de prompts de alta qualidade para desenvolvimento de software, organizados em 8 categorias práticas.",
      readTime: "45 min",
      category: "Técnicas",
      tags: ["prompts", "lovable", "desenvolvimento"],
      link: "/guias/prompts",
      isNew: false
    },
    {
      title: "Como Criar Prompts Eficazes: Desvendando os Segredos da IA!",
      description: "Aprenda a fórmula mágica P.R.O.M.P.T., técnicas avançadas como Few-Shot Learning e os segredos dos mestres para criar prompts perfeitos.",
      readTime: "25 min",
      category: "Técnicas",
      tags: ["prompts", "técnicas", "fundamentos", "ia"],
      link: "/guias/prompts-eficazes",
      isNew: true
    },
    {
      title: "Como Criar Prompts Eficazes",
      description: "Aprenda as técnicas fundamentais para obter os melhores resultados de qualquer IA generativa.",
      readTime: "8 min",
      category: "Técnicas",
      tags: ["prompts", "técnicas", "básico"]
    },
    {
      title: "Automação Inteligente com IA",
      description: "Descubra como automatizar tarefas repetitivas usando ferramentas de inteligência artificial.",
      readTime: "12 min",
      category: "Automação",
      tags: ["automação", "produtividade", "ferramentas"]
    },
    {
      title: "Ética e Responsabilidade na IA",
      description: "Entenda os aspectos éticos essenciais no desenvolvimento e uso de sistemas de IA.",
      readTime: "10 min",
      category: "Ética",
      tags: ["ética", "responsabilidade", "conceitos"]
    },
    {
      title: "Machine Learning na Prática",
      description: "Primeiros passos para implementar modelos de aprendizado de máquina em projetos reais.",
      readTime: "18 min",
      category: "ML",
      tags: ["machine learning", "prática", "avançado"]
    },
    {
      title: "Processamento de Linguagem Natural",
      description: "Como as IAs entendem e processam texto humano - conceitos e aplicações.",
      readTime: "14 min",
      category: "NLP",
      tags: ["nlp", "texto", "linguagem"]
    },
    {
      title: "Visão Computacional Simplificada",
      description: "Introdução ao mundo da análise de imagens e reconhecimento visual por IA.",
      readTime: "16 min",
      category: "Visão",
      tags: ["visão", "imagens", "reconhecimento"]
    }
  ];

  const recentGuides = [
    {
      title: "O que torna um atendimento Humano? O Blueprint Secreto da Conexão Digital",
      description: "Descubra os segredos para humanizar agentes de WhatsApp e criar conexões digitais verdadeiramente humanas.",
      readTime: "45 min",
      category: "Avançado",
      link: "/guias/humanizacao-agentes",
      isNew: true
    },
    {
      title: "Guia de Prompts para Lovable: 70 Exemplos",
      description: "Coleção completa de prompts de alta qualidade para desenvolvimento de software, organizados em 8 categorias práticas.",
      readTime: "45 min",
      category: "Técnicas",
      link: "/guias/prompts"
    },
    {
      title: "Automação com IA: Primeiros Passos",
      description: "Descubra como automatizar tarefas simples usando ferramentas de IA.",
      readTime: "8 min",
      category: "Intermediário",
      link: "/guias"
    },
    {
      title: "Ética na IA: Guia Prático",
      description: "Entenda os aspectos éticos essenciais no uso de inteligência artificial.",
      readTime: "6 min",
      category: "Conceitual",
      link: "/guias"
    }
  ];

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = ["Todos", "Técnicas", "Automação", "Ética", "ML", "NLP", "Visão", "Avançado"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categoryFilteredGuides = selectedCategory === "Todos" 
    ? filteredGuides 
    : filteredGuides.filter(guide => guide.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <BookOpen className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Guias de IA</h1>
          </div>
          <p className="text-xl text-gray-300">
            Aprenda IA do básico ao avançado com nossos guias práticos e detalhados.
          </p>
        </div>

        {/* Post Fixo para Iniciantes */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 border border-purple-500">
            <div className="flex items-center mb-4">
              <Star className="h-6 w-6 text-yellow-400 mr-2" />
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                ESSENCIAL
              </span>
              {featuredPost.isNew && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                  NOVO
                </span>
              )}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {featuredPost.title}
            </h2>
            
            <p className="text-purple-100 mb-6 text-lg leading-relaxed">
              {featuredPost.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-purple-200">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{featuredPost.readTime} de leitura</span>
              </div>
              
              <Link 
                to={featuredPost.link}
                className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                Começar a Ler
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar guias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtros por Categoria */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Guias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryFilteredGuides.map((guide, index) => (
            <article
              key={index}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 group hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-600 text-purple-100 px-3 py-1 rounded-full text-sm font-medium">
                  {guide.category}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {guide.readTime}
                  </div>
                  {guide.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      NOVO
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                {guide.title}
              </h3>
              
              <p className="text-gray-400 mb-4 leading-relaxed">
                {guide.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {guide.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <Link 
                to={guide.link || "/guias"}
                className="w-full bg-transparent border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                Ler Guia
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        {categoryFilteredGuides.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Nenhum guia encontrado</h3>
            <p className="text-gray-500">Tente ajustar sua pesquisa ou categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guias;
