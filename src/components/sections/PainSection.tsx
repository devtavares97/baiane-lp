"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, XCircle } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionSignature } from "@/components/ui/SectionSignature";
import { DesignAccent } from "@/components/ui/DesignAccent";

/**
 * PAIN SECTION - "System Failure / Crise"
 * ----------------------------------------
 * Seção de identificação do problema com layout assimétrico dramático.
 * 
 * Design:
 * - Grid 2 colunas (assimétrico)
 * - Esquerda: Headline gigante com highlight
 * - Direita: Cards de alerta estilo notificações de erro
 * - Animações stagger para impacto
 */

const alertCards = [
  {
    icon: AlertCircle,
    title: "Sem ROI mensurável",
    description: "Posts bonitos não pagam contas. Você gasta, mas não sabe o retorno real.",
  },
  {
    icon: TrendingDown,
    title: "Vaidade vs Venda",
    description: "Curtidas e seguidores não convertem em clientes. É métrica de ego, não de receita.",
  },
  {
    icon: XCircle,
    title: "Dinheiro na mídia = Zero resultado",
    description: "Sem estratégia, tráfego pago é doação para Meta e Google. Você perde sempre.",
  },
];

export function PainSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <SectionContainer 
      id="dor"
      paddingY="large" 
      className="bg-black relative overflow-hidden"
    >
      {/* Radial Gradient Background (Depth) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-60 pointer-events-none" />

      {/* Main Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
      >
        {/* Design Accent - Geometric entre colunas */}
        <DesignAccent
          variant="geometric"
          size="lg"
          position="custom"
          customPosition={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          animation="rotate"
          className="hidden lg:block"
        />
        
        {/* COLUNA ESQUERDA: O Choque */}
        <motion.div variants={leftVariants} className="space-y-6">
          <SectionSignature variant="pain" />
          
          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            <span className="text-neutral-400">O 'marketing bonitinho' está </span>
            <span className="relative inline-block">
              <span className="text-white">queimando o seu caixa</span>
              {/* Sublinhado Agressivo */}
              <span className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-white/80" />
            </span>
            <span className="text-white">?</span>
          </h2>

          {/* Subtítulo */}
          <p className="font-body text-lg md:text-xl text-neutral-300 leading-relaxed max-w-xl">
            Você contrata agência, eles postam todo dia, o feed fica lindo...{" "}
            <span className="font-semibold text-white">mas o telefone não toca</span>.
          </p>

          {/* Linha decorativa */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-white/40"
          />
        </motion.div>

        {/* COLUNA DIREITA: Cards de Alerta (System Errors) */}
        <motion.div 
          variants={containerVariants}
          className="space-y-4"
        >
          {alertCards.map((card, index) => {
            const Icon = card.icon;
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ x: 4, scale: 1.01 }}
                className="group relative"
              >
                {/* Sistema de Bordas de Vidro Cortado */}
                <div className="absolute inset-0 rounded-lg border-t-white/25 border-l-white/30 border-r-black/50 border-b-black/50" />
                <div className="absolute inset-[1px] rounded-lg border-r-white/5 border-b-white/5" />
                
                <div className="relative flex gap-4 p-5 md:p-6 bg-white/5 border-l-2 border-white rounded-lg backdrop-blur-sm overflow-hidden">
                  {/* Glow animado atrás */}
                  <motion.div
                    className="absolute inset-0 -z-10 blur-xl"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  />
                  
                  {/* Ícone com Glow */}
                  <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 blur-md bg-white/30 rounded-full" />
                    <Icon className="relative w-6 h-6 text-white" strokeWidth={2} />
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="space-y-1 flex-1">
                    <h3 className="font-display text-lg md:text-xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-neutral-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Pulse indicator (System Error Style) */}
                  <div className="absolute top-5 right-5">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
