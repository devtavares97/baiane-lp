"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { BadgeText } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { getPortfolioImages } from "@/lib/queries/gallery";
import type { GalleryItem } from "@/types/supabase";

/**
 * PORTFOLIO GALLERY
 * -----------------
 * Galeria visual estática gerenciada via Supabase
 * 
 * SUBSTITUIU: InstagramFeed
 * 
 * Design:
 * - Layout Masonry (Mosaico) usando CSS Columns
 * - Imagens são apenas visuais (sem links externos)
 * - Hover sutil para dar vida
 * - Carrega dinamicamente do Supabase (categoria: 'portfolio')
 */

export function PortfolioGallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getPortfolioImages();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch portfolio images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  return (
    <SectionContainer
      id="galeria"
      paddingY="large"
      className="relative overflow-hidden"
    >
      <div className="space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <BadgeText>PORTFÓLIO</BadgeText>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Nosso trabalho
          </h2>
        </motion.div>

        {/* Masonry Gallery */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-body text-text-muted">Carregando galeria...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <p className="font-body text-text-muted">Nenhuma imagem disponível</p>
            <a
              href="/admin"
              className="font-body text-sm text-primary hover:underline"
            >
              Adicionar imagens no Admin →
            </a>
          </div>
        ) : (
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
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={cn(
                  "break-inside-avoid",
                  "group relative rounded-xl overflow-hidden",
                  "bg-neutral-900 border border-white/10",
                  "cursor-default"
                )}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.image_url}
                    alt={image.alt}
                    fill
                    className={cn(
                      "object-cover",
                      "transition-all duration-500",
                      "group-hover:scale-105"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Subtle Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0",
                      "bg-gradient-to-t from-black/60 via-transparent to-transparent",
                      "opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-500"
                    )}
                  />

                  {/* Caption (se existir) */}
                  {image.caption && (
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 p-4",
                        "opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-500",
                        "translate-y-2 group-hover:translate-y-0"
                      )}
                    >
                      <p className="font-body text-sm text-white font-medium">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </SectionContainer>
  );
}
