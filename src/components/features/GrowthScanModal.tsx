"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, CheckCircle, TrendingUp, Target, Zap, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGrowthScan } from "@/hooks/useGrowthScan";
import type { RevenueTier, MainPain, GrowthScanAnswers } from "@/types/growth-scan";
import { calculateMaturityScore, determineArchetype } from "@/lib/growth-scan/scoring";
import { saveGrowthScanLead } from "@/lib/growth-scan/database";

/**
 * GROWTH SCAN MODAL
 * -----------------
 * Modal full-screen para diagnóstico de maturidade digital
 * 
 * Fluxo:
 * 1. Intro
 * 2. Pergunta 1: Faturamento
 * 3. Pergunta 2: Dor Principal
 * 4. Loading (Fake)
 * 5. Gate (Captura de dados)
 * 6. Resultado (Arquétipo)
 */

type Step = 'intro' | 'revenue' | 'pain' | 'loading' | 'gate' | 'result';

export function GrowthScanModal() {
  const { isOpen, close } = useGrowthScan();
  const [step, setStep] = useState<Step>('intro');
  const [answers, setAnswers] = useState<GrowthScanAnswers>({});
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof determineArchetype> | null>(null);

  // Reset ao fechar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('intro');
        setAnswers({});
        setContactData({ name: '', email: '', whatsapp: '' });
        setResult(null);
      }, 300);
    }
  }, [isOpen]);

  // Navegação
  const goToStep = (nextStep: Step) => {
    setStep(nextStep);
  };

  // Ações
  const handleRevenueTierSelect = (tier: RevenueTier) => {
    setAnswers({ ...answers, revenueTier: tier });
    setTimeout(() => goToStep('pain'), 300);
  };

  const handlePainSelect = (pain: MainPain) => {
    setAnswers({ ...answers, mainPain: pain });
    setTimeout(() => goToStep('loading'), 300);
    
    // Simular processamento
    setTimeout(() => {
      goToStep('gate');
    }, 3500);
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answers.revenueTier || !answers.mainPain) return;
    
    setSubmitting(true);

    // Calcular score e arquétipo
    const score = calculateMaturityScore(answers.revenueTier, answers.mainPain);
    const archetype = determineArchetype(answers.revenueTier, answers.mainPain, score);

    // Salvar no Supabase
    const leadData = {
      contact_name: contactData.name,
      contact_email: contactData.email,
      contact_whatsapp: contactData.whatsapp,
      revenue_tier: answers.revenueTier,
      main_pain: answers.mainPain,
      maturity_score: score,
      result_archetype: archetype.title,
    };

    const success = await saveGrowthScanLead(leadData);

    if (success) {
      setResult(archetype);
      setTimeout(() => {
        goToStep('result');
        setSubmitting(false);
      }, 1000);
    } else {
      alert('Erro ao salvar. Tente novamente.');
      setSubmitting(false);
    }
  };

  const handleWhatsAppCTA = () => {
    const message = result 
      ? `Olá! Acabei de fazer o Growth Scan e meu resultado foi: "${result.title}". Gostaria de conversar sobre como a Baianê pode me ajudar.`
      : 'Olá! Gostaria de saber mais sobre os serviços da Baianê.';
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5571991918696?text=${encoded}`, '_blank');
  };

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [close]);

  // Progresso
  const progress = {
    intro: 0,
    revenue: 33,
    pain: 66,
    loading: 80,
    gate: 90,
    result: 100,
  }[step];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden pointer-events-auto"
            >
              {/* Card */}
              <div className="relative bg-background border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-white via-white/80 to-white"
                  />
                </div>

                {/* Close Button */}
                {step !== 'loading' && (
                  <button
                    onClick={close}
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                )}

                {/* Content */}
                <div className="relative p-8 md:p-12 overflow-y-auto max-h-[85vh]">
                  <AnimatePresence mode="wait">
                    {step === 'intro' && <IntroStep onStart={() => goToStep('revenue')} />}
                    {step === 'revenue' && <RevenueStep onSelect={handleRevenueTierSelect} />}
                    {step === 'pain' && <PainStep onSelect={handlePainSelect} />}
                    {step === 'loading' && <LoadingStep />}
                    {step === 'gate' && (
                      <GateStep
                        data={contactData}
                        onChange={setContactData}
                        onSubmit={handleSubmitContact}
                        submitting={submitting}
                      />
                    )}
                    {step === 'result' && result && (
                      <ResultStep result={result} onCTA={handleWhatsAppCTA} />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// STEP COMPONENTS
// ============================================

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center space-y-8 max-w-2xl mx-auto py-12"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-4">
        <TrendingUp className="w-10 h-10 text-white" strokeWidth={1.5} />
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
          Raio-X de Maturidade Digital
        </h2>
        <p className="font-body text-lg text-text-muted max-w-xl mx-auto">
          Em 2 minutos, descubra o que impede sua empresa de escalar e receba um plano de ação personalizado.
        </p>
      </div>

      <div className="flex items-center justify-center gap-8 text-sm text-text-muted py-8">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-white/40" />
          <span>2 perguntas rápidas</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-white/40" />
          <span>Diagnóstico gratuito</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-white/40" />
          <span>Plano de ação</span>
        </div>
      </div>

      <button
        onClick={onStart}
        className={cn(
          "inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full",
          "bg-white text-black font-body font-bold text-lg",
          "hover:scale-105 transition-transform duration-300",
          "shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        )}
      >
        <span>Iniciar Análise</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function RevenueStep({ onSelect }: { onSelect: (tier: RevenueTier) => void }) {
  const options = [
    { value: 'up_to_30k' as RevenueTier, label: 'Até R$ 30k', icon: '💰' },
    { value: '30k_to_100k' as RevenueTier, label: 'R$ 30k - R$ 100k', icon: '💵' },
    { value: '100k_to_500k' as RevenueTier, label: 'R$ 100k - R$ 500k', icon: '💸' },
    { value: 'above_500k' as RevenueTier, label: 'Acima de R$ 500k', icon: '💎' },
  ];

  return (
    <motion.div
      key="revenue"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8 max-w-3xl mx-auto"
    >
      <div className="text-center space-y-4">
        <span className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white uppercase tracking-wider">
          Pergunta 1 de 2
        </span>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
          Qual o faturamento mensal médio da sua empresa?
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onSelect(option.value)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "group p-6 rounded-xl border-2 border-white/10",
              "bg-white/5 hover:bg-white/10 hover:border-white/30",
              "transition-all duration-300 text-left"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{option.icon}</span>
              <span className="font-body text-lg font-semibold text-white">
                {option.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function PainStep({ onSelect }: { onSelect: (pain: MainPain) => void }) {
  const options = [
    {
      value: 'conversion' as MainPain,
      icon: Target,
      label: 'Tráfego alto, conversão baixa',
      description: 'Muito esforço em marketing, pouca venda',
    },
    {
      value: 'branding' as MainPain,
      icon: Zap,
      label: 'Marca amadora',
      description: 'Nossa presença digital não reflete a qualidade do que entregamos',
    },
    {
      value: 'channel' as MainPain,
      icon: TrendingUp,
      label: 'Dependência de indicação',
      description: '100% das vendas vêm de networking, sem previsibilidade',
    },
    {
      value: 'sales_process' as MainPain,
      icon: MessageCircle,
      label: 'Comercial não fecha',
      description: 'Temos leads, mas o time de vendas não converte',
    },
  ];

  return (
    <motion.div
      key="pain"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8 max-w-3xl mx-auto"
    >
      <div className="text-center space-y-4">
        <span className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white uppercase tracking-wider">
          Pergunta 2 de 2
        </span>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
          Onde o calo aperta mais hoje?
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.value}
              onClick={() => onSelect(option.value)}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              className={cn(
                "group p-6 rounded-xl border-2 border-white/10",
                "bg-white/5 hover:bg-white/10 hover:border-white/30",
                "transition-all duration-300 text-left"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-body text-lg font-semibold text-white">
                    {option.label}
                  </h4>
                  <p className="font-body text-sm text-text-muted">
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function LoadingStep() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    'Analisando 24 pontos de contato...',
    'Comparando com benchmarks do mercado...',
    'Identificando gargalos de crescimento...',
    'Gerando plano de ação personalizado...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center space-y-12 py-20"
    >
      <div className="relative inline-block">
        <Loader2 className="w-16 h-16 text-white animate-spin" strokeWidth={1.5} />
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="font-body text-lg text-white"
        >
          {texts[currentText]}
        </motion.p>
      </AnimatePresence>

      <div className="flex justify-center gap-2">
        {texts.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-white/20"
            animate={{
              backgroundColor: index === currentText ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function GateStep({
  data,
  onChange,
  onSubmit,
  submitting,
}: {
  data: { name: string; email: string; whatsapp: string };
  onChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}) {
  return (
    <motion.div
      key="gate"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-8 max-w-xl mx-auto"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
          Diagnóstico Pronto!
        </h3>
        <p className="font-body text-lg text-text-muted">
          Para desbloquear seu relatório completo e o Plano de Ação Personalizado, insira seus dados abaixo.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="font-body text-sm font-medium text-white">
            Nome Completo
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-text-muted",
              "focus:outline-none focus:border-white/30",
              "transition-colors"
            )}
            placeholder="João Silva"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-body text-sm font-medium text-white">
            E-mail Profissional
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-text-muted",
              "focus:outline-none focus:border-white/30",
              "transition-colors"
            )}
            placeholder="joao@empresa.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-body text-sm font-medium text-white">
            WhatsApp <span className="text-text-muted">(Opcional)</span>
          </label>
          <input
            type="tel"
            value={data.whatsapp}
            onChange={(e) => onChange({ ...data, whatsapp: e.target.value })}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-text-muted",
              "focus:outline-none focus:border-white/30",
              "transition-colors"
            )}
            placeholder="(71) 99999-9999"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "w-full py-4 rounded-lg",
            "bg-white text-black font-body font-bold text-lg",
            "hover:scale-[1.02] transition-transform duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center gap-2",
            "shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          )}
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              Receber Diagnóstico Gratuito
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-xs text-text-muted text-center">
          Seus dados estão seguros. Não compartilhamos com terceiros.
        </p>
      </form>
    </motion.div>
  );
}

function ResultStep({
  result,
  onCTA,
}: {
  result: ReturnType<typeof determineArchetype>;
  onCTA: () => void;
}) {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-8 max-w-2xl mx-auto text-center"
    >
      <div className="space-y-4">
        <span className="text-6xl">{result.icon}</span>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-white">
          {result.title}
        </h3>
        <p className="font-body text-xl text-text-muted">
          {result.subtitle}
        </p>
      </div>

      <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-left">
        <p className="font-body text-white leading-relaxed">
          {result.description}
        </p>
      </div>

      <div className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
        <p className="font-body text-sm text-text-muted mb-2">
          Solução Baianê:
        </p>
        <p className="font-display text-xl font-bold text-white">
          {result.solution}
        </p>
      </div>

      <button
        onClick={onCTA}
        className={cn(
          "w-full py-4 rounded-lg",
          "bg-green-600 hover:bg-green-700 text-white font-body font-bold text-lg",
          "hover:scale-[1.02] transition-all duration-300",
          "flex items-center justify-center gap-2",
          "shadow-[0_0_40px_rgba(34,197,94,0.3)]"
        )}
      >
        <MessageCircle className="w-5 h-5" />
        {result.ctaText}
      </button>

      <p className="text-sm text-text-muted">
        Nossa equipe vai te ajudar a implementar a solução ideal para o seu momento.
      </p>
    </motion.div>
  );
}
