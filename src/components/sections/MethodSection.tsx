"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { DisplayH2, BodyLarge, DisplayH3, BodyRegular } from "@/components/ui/Typography";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { SectionSignature } from "@/components/ui/SectionSignature";
import { cn } from "@/lib/utils";

/**
 * METHOD SECTION
 * --------------
 * Apresenta o "Mecanismo Único" da agência através de 3 pilares.
 * 
 * Design System: Bahia Noir
 * - Layout: 3 Cards em grid horizontal (Desktop) ou vertical (Mobile)
 * - Cards: Glassmorphism sutil (bg-white/5, border-white/10)
 * - Ícones: Com glow effect
 */

export function MethodSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <SectionContainer
      id="metodo"
      paddingY="large"
      className="relative"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-12 md:space-y-16"
      >
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <SectionSignature variant="method" />
            <DisplayH2>{content.method.headline}</DisplayH2>
          </motion.div>
          <motion.div variants={itemVariants}>
            <BodyLarge muted>{content.method.subheadline}</BodyLarge>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {content.method.cards.map((card, index) => {
            const Icon = card.icon;
            
            return (
              <CardSpotlight 
                key={index}
                spotlightSize={250}
                spotlightOpacity={0.06}
                className="h-full"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4, rotate: 0.5 }}
                  className="group relative cursor-default h-full"
                >
                {/* Sistema de Bordas de Vidro Cortado Multi-Camadas */}
                {/* Camada 1: Borda externa - luz principal */}
                <div className="absolute inset-0 rounded-2xl border-t-white/30 border-l-white/15 border-r-black/60 border-b-black/60" />
                
                {/* Camada 2: Borda interna - reflexo */}
                <div className="absolute inset-[1px] rounded-2xl border-t-transparent border-l-transparent border-r-white/5 border-b-white/5" />
                
                {/* Camada 3: Overlay de brilho animado (hover) */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Conteúdo do card */}
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 overflow-hidden">
                  {/* Glow effect respirando atrás */}
                  <motion.div
                    className="absolute inset-0 -z-10 blur-xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px -5px rgba(255,255,255,0.1)",
                        "0 0 30px -5px rgba(255,255,255,0.15)",
                        "0 0 20px -5px rgba(255,255,255,0.1)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Numeração Gigante de Fundo com Gradiente */}
                  <div className="absolute -z-10 -left-8 -top-12 opacity-[0.02] pointer-events-none mix-blend-overlay overflow-hidden">
                    <span className="font-display text-[14rem] font-black bg-gradient-to-br from-white via-white/30 to-transparent bg-clip-text text-transparent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Vignette de profundidade nos cantos */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative space-y-4">
                    {/* Icon com glow */}
                    <div className="relative inline-flex">
                      <div className="absolute inset-0 blur-lg bg-white/20 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                      <Icon 
                        className="relative w-10 h-10 md:w-12 md:h-12 text-text-main"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Título */}
                    <DisplayH3 className="text-xl md:text-2xl">
                      {card.title}
                    </DisplayH3>

                    {/* Descrição */}
                    <BodyRegular muted>
                      {card.description}
                    </BodyRegular>
                  </div>
                </div>
              </motion.div>
              </CardSpotlight>
            );
          })}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
