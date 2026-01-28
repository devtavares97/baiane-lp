/**
 * ARQUIVO DE CONTEÚDO (COPYWRITING)
 * ---------------------------------
 * Baianê Agência - Landing Page V1.0
 * Design System: Bahia Noir (Dark Mode)
 * 
 * Este arquivo contém todos os textos e estrutura de dados estáticos da aplicação.
 * Referências:
 * - Escopo Técnico: ../../../scope.md
 * - Design System: ../../../design_system.md
 */

import { 
  BarChart3, 
  Fingerprint, 
  LineChart, 
  Megaphone, 
  MousePointerClick, 
  Target, 
  TrendingUp, 
  Users,
  type LucideIcon
} from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface CTAButton {
  label: string;
  href?: string;
}

export interface MethodCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface SocialProofStat {
  number: string;
  label: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  company: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  alt: string;
  caption?: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

// ============================================================================
// CONTENT DATA
// ============================================================================

export const content = {
  // SEO & Meta Tags
  seo: {
    title: "Baianê Agência | Estratégia, Cultura e Performance",
    description: "Não vendemos posts. Construímos posicionamento. Agência de marketing em Salvador focada em ROI, Branding e Identidade Cultural.",
    keywords: "agência de marketing salvador, gestão de tráfego, branding estratégico, marketing b2b, consultoria de crescimento",
  },

  // Barra de Navegação
  navbar: {
    logo: "Baianê",
    links: [
      { label: "O Método", href: "#metodo" },
      { label: "Soluções", href: "#servicos" },
      { label: "Para quem é", href: "#filtro" },
    ] as NavLink[],
    cta: "Agendar Diagnóstico",
  },

  // Seção Hero (Topo)
  hero: {
    badge: "Estratégia antes da estética",
    headline: "Não vendemos posts. Construímos o posicionamento que faz seu negócio escalar.",
    subheadline: "Unimos a identidade cultural da Bahia com a precisão dos dados. Criatividade com raiz e performance estratégica para marcas que buscam relevância, não apenas likes.",
    ctaPrimary: "Quero um Diagnóstico Estratégico",
    ctaSecondary: "Ver nossos cases",
    imageAlt: "Arte digital abstrata misturando texturas urbanas de Salvador com gráficos de crescimento.",
  },

  // Seção da Dor (Problema)
  pain: {
    headline: "O 'marketing bonitinho' está queimando o seu caixa?",
    description: [
      "Você contrata uma agência, eles postam todo dia, o feed fica lindo... mas o telefone não toca.",
      "O problema não é a ferramenta, é a falta de rota. Sem um plano de aquisição e construção de autoridade, seu investimento em tráfego pago vira doação para as plataformas.",
      "Pare de gastar com vaidade. Comece a investir em performance.",
    ],
  },

  // Seção do Método (Mecanismo Único)
  method: {
    headline: "A estética atrai. O método vende.",
    subheadline: "Nosso framework proprietário para transformar cultura em resultado.",
    cards: [
      {
        icon: Fingerprint,
        title: "Imersão & Identidade",
        description: "Mergulhamos no seu negócio para extrair sua verdade. Não criamos personagens, amplificamos sua autoridade real e cultural.",
      },
      {
        icon: Megaphone,
        title: "Narrativa Estratégica",
        description: "Transformamos seguidores em comunidade e leads frios em clientes prontos para compra através de conteúdo intencional.",
      },
      {
        icon: TrendingUp,
        title: "Performance & Dados",
        description: "Onde a arte encontra a matemática. Gestão de tráfego, otimização de conversão (CRO) e análise de KPIs de negócio.",
      },
    ] as MethodCard[],
  },

  // Seção de Serviços (Soluções)
  services: {
    headline: "Como levamos sua empresa para o próximo nível",
    items: [
      {
        title: "Branding & Posicionamento",
        description: "Definição de voz, arquétipo e identidade visual para marcas que querem liderar o mercado.",
      },
      {
        title: "Gestão de Tráfego (Ads)",
        description: "Campanhas focadas em Custo de Aquisição (CAC) e retorno financeiro mensurável.",
      },
      {
        title: "Social Media Estratégico",
        description: "Gestão de redes sociais focada em educação, autoridade e retenção de audiência.",
      },
      {
        title: "Consultoria de Growth",
        description: "O 'cérebro' alugado para o seu departamento de marketing. Análise de funil e vendas.",
      },
    ] as ServiceItem[],
  },

  // Prova Social
  socialProof: {
    stats: [
      { number: "5M+", label: "Alcance Gerado" },
      { number: "30+", label: "Clientes Ativos" },
      { number: "3x", label: "ROI Médio" },
    ] as SocialProofStat[],
    trustedByTitle: "Empresas que confiam na visão Baianê",
    testimonialsTitle: "O que dizem sobre a Baianê",
    testimonials: [
      {
        text: "A Baianê não fez mágica, fez estratégia. Em 6 meses, dobramos o faturamento com menos anúncios e mais autoridade.",
        author: "Carlos Mendes",
        role: "CEO",
        company: "Tech Solutions BA",
      },
      {
        text: "Contratei porque estava queimando dinheiro em tráfego. Hoje o custo por lead caiu 60% e a qualificação subiu absurdamente.",
        author: "Ana Paula Silva",
        role: "Diretora de Marketing",
        company: "Consultoria Empresarial",
      },
      {
        text: "Finalmente encontrei uma agência que entende de posicionamento. Não é sobre posts bonitos, é sobre construir relevância.",
        author: "Rafael Costa",
        role: "Fundador",
        company: "Startup EdTech",
      },
      {
        text: "O briefing inicial foi um soco no estômago (no bom sentido). Eles identificaram tudo que estava errado e criaram um plano cirúrgico.",
        author: "Mariana Santos",
        role: "Head de Growth",
        company: "SaaS B2B",
      },
      {
        text: "Minha marca era invisível no mercado. A Baianê construiu uma identidade tão forte que agora os concorrentes nos copiam.",
        author: "João Pereira",
        role: "Sócio-Diretor",
        company: "Agência de Arquitetura",
      },
      {
        text: "ROI de 5x no primeiro trimestre. Simples assim. Parei de gastar com vaidade e comecei a investir em performance.",
        author: "Fernanda Lima",
        role: "Gerente Comercial",
        company: "E-commerce Premium",
      },
    ] as Testimonial[],
  },

  // Gallery (Imagens estáticas - 10 imagens em grid 5x2)
  galleryImages: [
    {
      id: "1",
      imageUrl: "/images/gallery/image-1.jpg",
      alt: "Baianê - Imagem 1",
      caption: "Cultura e identidade",
    },
    {
      id: "2",
      imageUrl: "/images/gallery/image-2.jpg",
      alt: "Baianê - Imagem 2",
      caption: "Salvador, Bahia",
    },
    {
      id: "3",
      imageUrl: "/images/gallery/image-3.jpg",
      alt: "Baianê - Imagem 3",
      caption: "Branding estratégico",
    },
    {
      id: "4",
      imageUrl: "/images/gallery/image-4.jpg",
      alt: "Baianê - Imagem 4",
      caption: "Performance criativa",
    },
    {
      id: "5",
      imageUrl: "/images/gallery/image-5.jpg",
      alt: "Baianê - Imagem 5",
      caption: "Estratégia visual",
    },
    {
      id: "6",
      imageUrl: "/images/gallery/image-6.jpg",
      alt: "Baianê - Imagem 6",
      caption: "Time em ação",
    },
    {
      id: "7",
      imageUrl: "/images/gallery/image-7.jpg",
      alt: "Baianê - Imagem 7",
      caption: "Criatividade baiana",
    },
    {
      id: "8",
      imageUrl: "/images/gallery/image-8.jpg",
      alt: "Baianê - Imagem 8",
      caption: "Cases de sucesso",
    },
    {
      id: "9",
      imageUrl: "/images/gallery/image-9.jpg",
      alt: "Baianê - Imagem 9",
      caption: "Marketing autêntico",
    },
    {
      id: "10",
      imageUrl: "/images/gallery/image-10.jpg",
      alt: "Baianê - Imagem 10",
      caption: "Resultados reais",
    },
  ] as GalleryImage[],

  // Seção Filtro (Para quem é / Não é)
  filter: {
    headline: "Para quem é a Baianê?",
    isFor: [
      "Busca construção de marca a longo prazo.",
      "Entende marketing como investimento, não gasto.",
      "Fatura acima de R$ 50k/mês e quer escalar.",
      "Quer fugir do óbvio e ter identidade própria.",
    ],
    isNotFor: [
      "Quer 'viralizar' com dancinha amanhã.",
      "Acha que marketing é 'fazer post bonitinho'.",
      "Quer contratar 'sobrinho' para pagar barato.",
      "Busca milagres sem investir verba de mídia.",
    ],
  },

  // Rodapé e Formulário Final
  footer: {
    headline: "Sua marca merece sair do improviso.",
    subheadline: "Da Bahia para o mundo. Vamos construir o próximo case de sucesso do seu setor?",
    form: {
      namePlaceholder: "Seu nome completo",
      emailPlaceholder: "Seu melhor e-mail corporativo",
      companyPlaceholder: "Site ou Instagram da empresa",
      challengeLabel: "Qual seu maior desafio hoje?",
      challengeOptions: [
        "Vendo pouco, preciso aumentar receita",
        "Minha marca não tem autoridade",
        "Tráfego pago está muito caro",
        "Tenho seguidores mas não tenho clientes",
      ],
      submitButton: "Solicitar Proposta Comercial",
    },
    links: {
      social: [
        { label: "Instagram", url: "https://www.instagram.com/baianeag/" },
      ] as SocialLink[],
      legal: "© 2026 Baianê Agência. Todos os direitos reservados.",
      location: "Salvador, Bahia • Brasil",
      email: "Baianeagencia@gmail.com",
      whatsapp: "71991918696",
    },
  },
} as const;

// ============================================================================
// HELPER EXPORTS
// ============================================================================

export type Content = typeof content;
