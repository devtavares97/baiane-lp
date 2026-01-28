import type { RevenueTier, MainPain, TeamStructure, ArchetypeResult } from '@/types/growth-scan';

/**
 * SCORING LOGIC
 * --------------
 * Calcula o score de maturidade e determina o arquétipo
 */

export function calculateMaturityScore(
  revenueTier: RevenueTier,
  mainPain: MainPain,
  teamStructure?: TeamStructure
): number {
  let score = 0;

  // Score base por faturamento (0-40 pontos)
  const revenueScores: Record<RevenueTier, number> = {
    'up_to_30k': 10,
    '30k_to_100k': 20,
    '100k_to_500k': 30,
    'above_500k': 40,
  };
  score += revenueScores[revenueTier];

  // Score por estrutura de time (0-30 pontos)
  if (teamStructure) {
    const teamScores: Record<TeamStructure, number> = {
      'solo': 5,
      'freelancer': 10,
      'agency': 20,
      'in_house': 30,
    };
    score += teamScores[teamStructure];
  }

  // Score por maturidade da dor (0-30 pontos)
  const painScores: Record<MainPain, number> = {
    'channel': 10, // Problema mais básico
    'conversion': 15,
    'sales_process': 20,
    'branding': 25, // Problema mais sofisticado
  };
  score += painScores[mainPain];

  return score;
}

export function determineArchetype(
  revenueTier: RevenueTier,
  mainPain: MainPain,
  score: number
): ArchetypeResult {
  // Faturamento inicial: Foco em diagnóstico
  if (revenueTier === 'up_to_30k') {
    return {
      title: 'Fase de Validação',
      subtitle: 'Seu momento é de construir tração',
      description: 'Você está no caminho certo, mas ainda é cedo para investimentos pesados em agência. Foque em tração orgânica e valide seu produto/serviço antes de escalar.',
      solution: 'Consultoria Estratégica: Diagnóstico + Primeiros Passos',
      ctaText: 'Conversar com Especialista',
      icon: '🌱',
    };
  }

  // Arquétipo: O Gigante Invisível
  if (mainPain === 'branding' && score >= 40) {
    return {
      title: 'O Gigante Invisível',
      subtitle: 'Produto excelente, embalagem amadora',
      description: 'Você tem um produto/serviço de alta qualidade, mas sua presença digital não reflete isso. Está deixando dinheiro na mesa por causa da percepção de valor.',
      solution: 'Rebranding Estratégico + Posicionamento High-Ticket',
      ctaText: 'Falar com Especialista',
      icon: '👁️',
    };
  }

  // Arquétipo: A Ferrari sem Gasolina
  if (mainPain === 'conversion' && score >= 40) {
    return {
      title: 'A Ferrari sem Gasolina',
      subtitle: 'Tráfego alto, conversão baixa',
      description: 'Sua máquina de vendas está descalibrada. Você investe em tráfego, mas o site, a oferta ou o público estão desalinhados. Está queimando caixa.',
      solution: 'Gestão de Tráfego & Otimização de Conversão',
      ctaText: 'Calibrar Minha Máquina',
      icon: '🏎️',
    };
  }

  // Arquétipo: O Dependente de Indicação
  if (mainPain === 'channel') {
    return {
      title: 'O Dependente de Indicação',
      subtitle: 'Sem previsibilidade de vendas',
      description: '100% das vendas vêm de indicação ou networking. Você não tem controle sobre quando o próximo cliente aparece. Isso é insustentável para crescer.',
      solution: 'Sistema de Geração de Leads Previsível',
      ctaText: 'Criar Previsibilidade',
      icon: '🎲',
    };
  }

  // Arquétipo: O Comercial Travado
  if (mainPain === 'sales_process') {
    return {
      title: 'O Comercial Travado',
      subtitle: 'Leads entram, vendas não saem',
      description: 'O problema não é marketing, é processo. Seu time comercial não tem metodologia, CRM ou argumentação calibrada. Os leads morrem no funil.',
      solution: 'Consultoria de Sales Enablement + CRM',
      ctaText: 'Destravar Vendas',
      icon: '🔒',
    };
  }

  // Fallback: Score médio-alto genérico
  return {
    title: 'Pronto para Escalar',
    subtitle: 'Você tem base, falta estratégia',
    description: 'Sua empresa tem faturamento e estrutura, mas está no piloto automático. Falta uma estratégia de crescimento estruturada e data-driven.',
    solution: 'Consultoria de Crescimento 360°',
    ctaText: 'Agendar Diagnóstico',
    icon: '🚀',
  };
}
