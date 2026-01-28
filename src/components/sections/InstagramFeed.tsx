"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { content } from "@/data/content";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { DesignAccent } from "@/components/ui/DesignAccent";
import { DisplayH2, BadgeText, BodySmall } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { getPortfolioImages } from "@/lib/queries/portfolio";
import type { PortfolioImage } from "@/types/supabase";

/**
 * GALLERY SECTION - DYNAMIC (Supabase)
 * -------------------------------------
 * Galeria de imagens dinâmicas do Supabase.
 * 
 * Features:
 * - Grid 5x2 sem espaçamento
 * - Imagens carregadas do Supabase
 * - Fallback para imagens estáticas
 * - Hover overlay com legendas
 * 
 * Gerenciar imagens:
 * 1. Acesse o Supabase Dashboard
 * 2. Tabela: portfolio_images
 * 3. Faça upload no Storage e adicione o URL
 * 
 * Design System: Bahia Noir
 */

export function InstagramFeed() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);

  // Buscar imagens do Supabase
  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getPortfolioImages(10); // Limitar a 10 imagens (5x2)
        setPortfolioImages(data);
      } catch (error) {
        console.error('Failed to fetch portfolio images:', error);
      } finally {
        setLoadingImages(false);
      }
    }

    fetchImages();
  }, []);

  // Usar imagens do Supabase ou fallback
  const hasImages = portfolioImages.length > 0;
  const imagesToDisplay = hasImages ? portfolioImages : content.galleryImages;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden py-24 md:py-32"
    >
      {/* Background Effects */}
      <FloatingParticles count={6} className="opacity-30" />
      <DesignAccent
        variant="pattern"
        size="lg"
        position="custom"
        customPosition={{ top: "10%", right: "5%" }}
        animation="float"
      />

      {/* Radial Gradient Spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08), transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-4 mb-16"
        >
          <BadgeText className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            PORTFÓLIO
          </BadgeText>
          
          <DisplayH2 className="text-center">
            Nosso <span className="text-text-muted">trabalho</span>
          </DisplayH2>
        </motion.div>

        {/* GRID 5x2 SEM ESPAÇAMENTO */}
        {loadingImages ? (
          <div className="flex items-center justify-center py-24">
            <BodySmall muted>Carregando portfólio...</BodySmall>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-5 gap-0 w-full"
          >
            {imagesToDisplay.map((image, index) => {
              const imageExists = !(image as any).image_url?.includes('placeholder');
            
              return (
                <motion.div
                  key={image.id}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={imageExists ? { scale: 1.05 } : {}}
                  className={cn(
                    "group relative overflow-hidden",
                    "aspect-square",
                    "bg-neutral-900",
                    "transition-all duration-300"
                  )}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-orange-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  {/* Imagem */}
                  <div className="absolute inset-0">
                    <Image
                      src={hasImages ? (image as any).image_url : (image as any).imageUrl}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={90}
                    />
                  </div>

                  {/* Overlay animado no Hover (só aparece se imagem existe) */}
                  {imageExists && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"
                    >
                      {/* Caption / Title */}
                      {image.caption && (
                        <div className="text-center px-4">
                          <p className="font-body text-xs md:text-sm text-white font-medium">
                            {image.caption}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
