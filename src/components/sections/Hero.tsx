"use client";

import { motion } from "framer-motion";
import { ImageIcon, ArrowRight } from "lucide-react";
import { content } from "@/data/content";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { DisplayH1, BodyLarge, BadgeText } from "@/components/ui/Typography";
import { SectionSignature } from "@/components/ui/SectionSignature";
import { DesignAccent } from "@/components/ui/DesignAccent";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { cn } from "@/lib/utils";
import { useGrowthScan } from "@/hooks/useGrowthScan";

/**
 * HERO SECTION
 * ------------
 * Seção principal "Above the Fold" com grid layout.
 * 
 * Design System: Bahia Noir
 * - Layout: Grid 2 colunas (Texto | Visual)
 * - Tipografia: Syne (Display) para H1
 * - Animações: Fade-up escalonado com Framer Motion
 * - Image Slot: Placeholder elegante até imagem final
 */

export function Hero() {
  const { open: openGrowthScan } = useGrowthScan();

  // Variantes de animação otimizadas (mais rápidas)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1, // Reduzido de 0.3 para 0.1
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduzido de 30 para 20
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <SectionContainer 
      paddingY="large" 
      className="min-h-screen flex items-center pt-32 relative"
    >
      {/* Floating Particles */}
      <FloatingParticles count={3} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* TEXTO (Esquerda no Desktop, Centralizado no Mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8 text-center md:text-left max-w-3xl mx-auto md:mx-0 relative"
        >
          {/* Design Accent - Top Right */}
          <DesignAccent
            variant="icon"
            size="md"
            position="top-right"
            animation="float"
            className="hidden md:block"
          />
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
            <span className={cn(
              "inline-flex items-center px-4 py-2 rounded-full",
              "bg-white/5 border border-white/10 backdrop-blur-sm"
            )}>
              <BadgeText>{content.hero.badge}</BadgeText>
            </span>
          </motion.div>

          {/* Headline (H1) - Usando componente de tipografia */}
          <motion.div variants={itemVariants}>
            <DisplayH1 className="text-center md:text-left">
              {content.hero.headline}
            </DisplayH1>
          </motion.div>

          {/* Subheadline - Usando componente de tipografia */}
          <motion.div variants={itemVariants}>
            <BodyLarge muted className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
              {content.hero.subheadline}
            </BodyLarge>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            {/* Primary CTA - Growth Scan */}
            <motion.button
              onClick={openGrowthScan}
              className={cn(
                "group inline-flex items-center justify-center gap-2",
                "rounded-full bg-primary px-6 sm:px-8 py-3 sm:py-4",
                "font-body text-sm sm:text-base font-semibold text-primary-fg",
                "transition-all duration-300",
                "hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {content.hero.ctaPrimary}
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.a
              href="#metodo"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "rounded-full border border-white/20 bg-white/5 px-6 sm:px-8 py-3 sm:py-4",
                "font-body text-sm sm:text-base font-semibold text-text-main",
                "backdrop-blur-sm transition-all duration-300",
                "hover:border-white/40 hover:bg-white/10"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {content.hero.ctaSecondary}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* VISUAL (Direita no Desktop, Abaixo no Mobile) - IMAGE PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative w-full order-first md:order-last"
        >
          {/* Placeholder Container */}
          <div className={cn(
            "relative aspect-square md:aspect-[4/5] w-full max-w-lg mx-auto md:max-w-none",
            "rounded-2xl overflow-hidden",
            "bg-neutral-900 border border-white/10",
            "shadow-2xl shadow-black/50"
          )}>
            {/* Noise/Grain Texture Overlay */}
            <div 
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: "cover",
              }}
            />

            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20" />

            {/* Static Icon (Center) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 md:w-20 md:h-20 text-white/20" strokeWidth={1} />
            </div>

            {/* Placeholder Text (Bottom) */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs font-body text-text-muted/50 text-center">
                Image Slot: {content.hero.imageAlt}
              </p>
            </div>
          </div>

          {/* Glow Effect Behind */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-white/10 rounded-2xl" />

          {/* 
            QUANDO TIVER A IMAGEM FINAL, SUBSTITUA O PLACEHOLDER POR:
            
            <Image
              src="/images/hero/main.jpg"
              alt={content.hero.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          */}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
