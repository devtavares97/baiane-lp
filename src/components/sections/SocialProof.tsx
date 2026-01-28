"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { content } from "@/data/content";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { StatNumber, BodyRegular, BodySmall, DisplayH2 } from "@/components/ui/Typography";
import { SectionSignature } from "@/components/ui/SectionSignature";
import { cn } from "@/lib/utils";
import { Building2, Store, Briefcase, Rocket, Quote } from "lucide-react";
import { getLogoImages } from "@/lib/queries/gallery";
import type { GalleryItem } from "@/types/supabase";

/**
 * SOCIAL PROOF
 * ------------
 * Seção de credibilidade e autoridade.
 * 
 * Parte 1: Stats/Numbers
 * Parte 2: Marquee de logos (clientes) - DINÂMICO (Supabase Gallery)
 * Parte 3: Mosaico de Depoimentos (Masonry Layout)
 * 
 * Design System: Bahia Noir
 * - Stats: Números grandes (Syne) com labels sutis
 * - Marquee: Animação infinita com logos reais do Supabase
 * - Logos: Filtro grayscale (P&B) que fica colorido no hover
 * - Testimonials: Layout em colunas (Pinterest style) com cards de alturas variadas
 */

export function SocialProof() {
  const [logos, setLogos] = useState<GalleryItem[]>([]);
  const [loadingLogos, setLoadingLogos] = useState(true);

  // Buscar logos do Supabase (category: 'logo')
  useEffect(() => {
    async function fetchLogos() {
      try {
        const data = await getLogoImages();
        setLogos(data);
      } catch (error) {
        console.error('Failed to fetch logos:', error);
      } finally {
        setLoadingLogos(false);
      }
    }

    fetchLogos();
  }, []);

  const statsVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  // Placeholders de logos (ícones genéricos) - Fallback
  const logoPlaceholders = [
    Building2, Store, Briefcase, Rocket,
    Building2, Store, Briefcase, Rocket,
  ];

  // Usar logos do Supabase ou fallback (duplicar para efeito marquee)
  const hasLogos = logos.length > 0;
  const displayLogos = hasLogos ? [...logos, ...logos] : logoPlaceholders;

  return (
    <SectionContainer
      id="prova-social"
      paddingY="large"
      className="relative overflow-hidden"
    >
      <div className="space-y-16 md:space-y-20">
        {/* PARTE 1: STATS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto"
        >
          <div className="col-span-full flex justify-center">
            <SectionSignature variant="social" />
          </div>
          {content.socialProof.stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statsVariants}
              className="text-center space-y-2"
            >
              {/* Número */}
              <StatNumber className="text-text-main">
                {stat.number}
              </StatNumber>

              {/* Label */}
              <BodyRegular muted className="text-sm md:text-base">
                {stat.label}
              </BodyRegular>
            </motion.div>
          ))}
        </motion.div>

        {/* PARTE 2: MARQUEE DE LOGOS */}
        <div className="space-y-6">
          {/* Título */}
          <BodySmall muted className="text-center uppercase tracking-wider">
            {content.socialProof.trustedByTitle}
          </BodySmall>

          {/* Marquee Container */}
          <div className="relative">
            {/* Gradientes nas bordas para fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Marquee animado */}
            {loadingLogos ? (
              <div className="flex items-center justify-center py-8">
                <BodySmall muted>Carregando logos...</BodySmall>
              </div>
            ) : (
              <motion.div
                className="flex gap-12 md:gap-16"
                animate={{
                  x: [0, -50 + "%"],
                }}
                transition={{
                  duration: hasLogos ? 30 : 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Logos dinâmicos do Supabase ou fallback */}
                {hasLogos ? (
                  displayLogos.map((logo, index) => (
                    <div
                      key={`${(logo as any).id}-${index}`}
                      className={cn(
                        "flex-shrink-0 w-32 h-20 md:w-40 md:h-24",
                        "flex items-center justify-center",
                        "rounded-lg bg-white/5 border border-white/10",
                        "backdrop-blur-sm p-4",
                        "relative overflow-hidden",
                        "group"
                      )}
                    >
                      <Image
                        src={(logo as any).image_url}
                        alt={(logo as any).alt}
                        fill
                        className={cn(
                          "object-contain",
                          "grayscale group-hover:grayscale-0",
                          "opacity-60 group-hover:opacity-100",
                          "transition-all duration-500"
                        )}
                        sizes="160px"
                      />
                    </div>
                  ))
                ) : (
                  displayLogos.map((LogoIcon, index) => {
                    const IconComponent = LogoIcon as any;
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex-shrink-0 w-20 h-20 md:w-24 md:h-24",
                          "flex items-center justify-center",
                          "rounded-lg bg-white/5 border border-white/10",
                          "backdrop-blur-sm"
                        )}
                      >
                        <IconComponent
                          className="w-8 h-8 md:w-10 md:h-10 text-white/30"
                          strokeWidth={1.5}
                        />
                      </div>
                    );
                  })
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* PARTE 3: MOSAICO DE DEPOIMENTOS */}
        <div className="space-y-12">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <DisplayH2>{content.socialProof.testimonialsTitle}</DisplayH2>
          </motion.div>

          {/* Masonry Grid de Depoimentos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn(
              "columns-1 md:columns-2 lg:columns-3",
              "gap-6 space-y-6"
            )}
          >
            {content.socialProof.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "break-inside-avoid",
                  "group relative p-6 md:p-8 rounded-2xl",
                  "bg-white/5 border border-white/10",
                  "backdrop-blur-sm",
                  "hover:bg-white/[0.07] hover:border-white/20",
                  "transition-all duration-300",
                  "cursor-default"
                )}
              >
                {/* Ícone de aspas decorativo */}
                <div className="absolute top-6 right-6 opacity-[0.03] pointer-events-none">
                  <Quote className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
                </div>

                {/* Conteúdo */}
                <div className="relative space-y-4">
                  {/* Texto do depoimento */}
                  <BodyRegular className="text-text-main leading-relaxed">
                    "{testimonial.text}"
                  </BodyRegular>

                  {/* Autor */}
                  <div className="space-y-1 pt-2 border-t border-white/10">
                    <p className="font-body text-sm font-semibold text-white">
                      {testimonial.author}
                    </p>
                    <p className="font-body text-xs text-text-muted">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
