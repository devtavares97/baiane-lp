"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { content } from "@/data/content";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { DisplayH2, BodyRegular } from "@/components/ui/Typography";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { SectionSignature } from "@/components/ui/SectionSignature";
import { cn } from "@/lib/utils";

/**
 * FILTER SECTION
 * --------------
 * Seção de qualificação de público: "Para quem é" vs "Para quem NÃO é".
 * 
 * Design System: Bahia Noir
 * - Layout: Duas colunas contrastantes (Desktop) ou empilhadas (Mobile)
 * - Ícones: Check (verde sutil) e X (vermelho sutil)
 * - Contraste visual entre as duas listas
 */

export function FilterSection() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <SectionContainer
      id="filtro"
      paddingY="large"
      className="relative"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          <SectionSignature variant="filter" />
          <DisplayH2>{content.filter.headline}</DisplayH2>
        </motion.div>

        {/* Grid de duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* COLUNA 1: PARA QUEM É */}
          <motion.div
            variants={containerVariants}
            className="group relative"
          >
            {/* Sistema de Bordas de Vidro Cortado */}
            <div className="absolute inset-0 rounded-2xl border-t-white/30 border-l-white/15 border-r-black/60 border-b-black/60" />
            <div className="absolute inset-[1px] rounded-2xl border-r-white/5 border-b-white/5" />
            
            <motion.div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="relative p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden">
              {/* Glow animado */}
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
              <div className="relative space-y-6">
                {/* Título da coluna */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-text-main">
                    Para quem é
                  </h3>
                </div>

                {/* Lista */}
                <ul className="space-y-4">
                  {content.filter.isFor.map((item, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <BodyRegular muted={false} className="text-text-main">
                        {item}
                      </BodyRegular>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* COLUNA 2: PARA QUEM NÃO É */}
          <motion.div
            variants={containerVariants}
            className="group relative"
          >
            {/* Sistema de Bordas de Vidro Cortado */}
            <div className="absolute inset-0 rounded-2xl border-t-white/20 border-l-white/10 border-r-black/70 border-b-black/70" />
            <div className="absolute inset-[1px] rounded-2xl border-r-white/5 border-b-white/5" />
            
            <div className="relative p-8 md:p-10 rounded-2xl bg-black/60 backdrop-blur-sm overflow-hidden">
              {/* Glow sutil */}
              <div className="absolute inset-0 -z-10 blur-xl opacity-50" />
              <div className="relative space-y-6">
                {/* Título da coluna */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-text-muted">
                    Para quem não é
                  </h3>
                </div>

                {/* Lista */}
                <ul className="space-y-4">
                  {content.filter.isNotFor.map((item, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3"
                    >
                      <X className="w-5 h-5 text-red-400/60 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <BodyRegular muted className="text-text-muted/80">
                        {item}
                      </BodyRegular>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
