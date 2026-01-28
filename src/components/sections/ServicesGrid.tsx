"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { DisplayH2, DisplayH3, BodyRegular } from "@/components/ui/Typography";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { SectionSignature } from "@/components/ui/SectionSignature";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { DesignAccent } from "@/components/ui/DesignAccent";
import { cn } from "@/lib/utils";

/**
 * SERVICES GRID
 * -------------
 * Grid de serviços/soluções oferecidos pela agência.
 * 
 * Design System: Bahia Noir
 * - Layout: Grid responsivo (1 col mobile, 2 tablet, 4 desktop)
 * - Cards: Hover elevado com borda acesa
 * - Interação: Efeito sutil de lift e brilho na borda
 */

export function ServicesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <SectionContainer
      id="servicos"
      paddingY="large"
      className="relative"
    >
      {/* Floating Particles */}
      <FloatingParticles count={4} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <SectionSignature variant="services" />
          <DisplayH2>{content.services.headline}</DisplayH2>
        </motion.div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {content.services.items.map((service, index) => (
            <CardSpotlight
              key={index}
              spotlightSize={200}
              spotlightOpacity={0.05}
              className="h-full"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6, rotate: 0.5, scale: 1.02 }}
                className="group relative cursor-pointer h-full"
              >
              {/* Sistema de Bordas de Vidro Cortado Multi-Camadas */}
              <div className="absolute inset-0 rounded-xl border-t-white/30 border-l-white/15 border-r-black/60 border-b-black/60" />
              <div className="absolute inset-[1px] rounded-xl border-t-transparent border-l-transparent border-r-white/5 border-b-white/5" />
              
              <motion.div 
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 md:p-8 overflow-hidden">
                {/* Numeração Gigante de Fundo com Gradiente Linear */}
                <div className="absolute -z-10 -right-6 -top-8 opacity-[0.02] pointer-events-none mix-blend-overlay">
                  <span className="font-display text-[12rem] font-black bg-gradient-to-b from-white via-white/30 to-transparent bg-clip-text text-transparent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                
                {/* Glow animado atrás */}
                <motion.div
                  className="absolute inset-0 -z-10 blur-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 15px -5px rgba(255,255,255,0.05)",
                      "0 0 25px -5px rgba(255,255,255,0.12)",
                      "0 0 15px -5px rgba(255,255,255,0.05)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative space-y-3">
                  {/* Número do serviço (detalhe visual) */}
                  <div className="text-xs font-body font-medium text-text-muted/40 tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Título */}
                  <DisplayH3 className="text-lg md:text-xl group-hover:text-white transition-colors">
                    {service.title}
                  </DisplayH3>

                  {/* Descrição */}
                  <BodyRegular muted className="text-sm">
                    {service.description}
                  </BodyRegular>
                </div>

                {/* Indicador de hover (seta ou traço) */}
                <div className="absolute bottom-6 right-6 w-6 h-px bg-white/0 group-hover:bg-white/60 transition-all duration-300 origin-left group-hover:w-8" />
              </div>
            </motion.div>
            </CardSpotlight>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
