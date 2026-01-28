"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Instagram } from "lucide-react";
import { content } from "@/data/content";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { DisplayH2, BodyLarge, BodySmall } from "@/components/ui/Typography";
import { DesignAccent } from "@/components/ui/DesignAccent";
import { cn } from "@/lib/utils";
import { useGrowthScan } from "@/hooks/useGrowthScan";

/**
 * FOOTER - High-Impact CTA (Bahia Noir Style)
 * --------------------------------------------
 * Call to Action final com tipografia grande e botão destacado.
 * 
 * Features:
 * - Large typography centered/left-aligned
 * - Pill-shaped button
 * - Floating background image slot (parallax effect)
 * - Social links minimalist
 */

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { open: openGrowthScan } = useGrowthScan();

  return (
    <footer id="footer" className="relative bg-black border-t border-white/5 overflow-hidden" ref={containerRef}>
      {/* ============================================
          FLOATING BACKGROUND IMAGE SLOT - STATIC
          Insira aqui uma textura ou imagem de fundo
          ============================================ */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {/* Placeholder gradient/texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-transparent" />
        
        {/* 
          SUBSTITUA ESTE DIV POR SUA IMAGEM DE FUNDO:
          <Image 
            src="/images/footer-texture.png" 
            alt="" 
            fill
            className="object-cover opacity-20 mix-blend-overlay"
          />
        */}
      </div>

      {/* Main CTA Section */}
      <SectionContainer paddingY="default" className="relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* ========================================
              CARD PRINCIPAL: CTA HERO (MANTIDO)
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="group relative"
          >
            {/* Sistema de Bordas de Vidro Cortado Multi-Camadas */}
            <div className="absolute inset-0 rounded-2xl border-t-white/35 border-l-white/20 border-r-black/60 border-b-black/60" />
            <div className="absolute inset-[1px] rounded-2xl border-r-white/5 border-b-white/5" />
            
            <motion.div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Card com Glassmorphism + Glow Effect */}
            <div className="relative h-full rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm overflow-hidden p-8 md:p-10">
              {/* Glow Animado Respirando */}
              <motion.div
                className="absolute inset-0 -z-10 blur-2xl"
                animate={{
                  boxShadow: [
                    "0 0 30px -5px rgba(255,255,255,0.15)",
                    "0 0 50px -5px rgba(255,255,255,0.25)",
                    "0 0 30px -5px rgba(255,255,255,0.15)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Grid Pattern Background */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }} />

              <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                {/* Badge + Headline */}
                <div className="space-y-4">
                  {/* Badge Animado */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        Diagnóstico Gratuito
                      </span>
                    </span>
                  </motion.div>

                  {/* Headline Impactante */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight"
                  >
                    <span className="text-white">Sua marca merece</span>
                    <br />
                    <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                      sair do improviso
                    </span>
                    <span className="text-white">.</span>
                  </motion.h2>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-white/60 text-sm md:text-base max-w-xl"
                  >
                    Descubra o que está travando seu crescimento. Análise estratégica sem custo.
                  </motion.p>
                </div>

                {/* CTA Button (Destacado) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative"
                >
                  {/* Design Accent próximo ao CTA */}
                  <DesignAccent
                    variant="icon"
                    size="sm"
                    position="custom"
                    customPosition={{ top: "-20px", right: "-20px" }}
                    animation="glow"
                  />
                  
                  <motion.button
                    onClick={openGrowthScan}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "group inline-flex items-center justify-center gap-3",
                      "rounded-full bg-white px-8 py-4",
                      "font-body text-base font-bold text-black",
                      "shadow-[0_0_40px_rgba(255,255,255,0.15)]",
                      "hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]",
                      "transition-all duration-300"
                    )}
                  >
                    <span>Fazer diagnóstico gratuito</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] blur-2xl" />
            </div>
          </motion.div>

          {/* ========================================
              FOOTER BAR: Estilo Navbar (SIMPLES)
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="border-t border-white/5 pt-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left: Logo + Info */}
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                {/* Logo */}
                <div className="relative h-[50px] w-auto">
                  <Image
                    src="/logo-baiane.png"
                    alt="Baianê Agência"
                    width={220}
                    height={50}
                    className="h-[50px] w-auto object-contain"
                    priority
                  />
                </div>
                
                {/* Divider */}
                <div className="hidden md:block w-px h-4 bg-white/10" />
                
                {/* Info inline */}
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{content.footer.links.location}</span>
                  <span>•</span>
                  <span>{content.footer.links.legal}</span>
                </div>
              </div>

              {/* Right: Social Icons */}
              <div className="flex items-center gap-4">
                <motion.a
                  href={content.footer.links.social[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full border border-white/10 hover:border-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </footer>
  );
}
