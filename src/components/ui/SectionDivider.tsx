"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SECTION DIVIDER - Variantes Criativas
 * --------------------------------------
 * Divisores de seção com personalidade que refletem a transição.
 * 
 * Variantes:
 * - broken: Linha quebrada agressiva (para transições dramáticas)
 * - curved: Linha curva suave (para transições fluidas)
 * - double: Linha dupla (para organização/estrutura)
 * - dotted: Linha com pontos (para conexão)
 * - simple: Linha simples (para clareza)
 * - thick: Linha espessa (para fechamento/ênfase)
 * 
 * Design System: Bahia Noir
 */

type DividerVariant = "broken" | "curved" | "double" | "dotted" | "simple" | "thick";
type DividerHeight = "sm" | "md" | "lg";

interface SectionDividerProps {
  variant?: DividerVariant;
  height?: DividerHeight;
  className?: string;
}

export function SectionDivider({ 
  variant = "simple", 
  height = "md",
  className 
}: SectionDividerProps) {
  const heights = {
    sm: "py-8",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
  };

  const renderDivider = () => {
    switch (variant) {
      case "broken":
        return (
          <svg className="w-full h-1" viewBox="0 0 800 4" preserveAspectRatio="none">
            <motion.path
              d="M 0 2 L 200 2 L 210 0 L 220 4 L 230 2 L 400 2 L 410 0 L 420 4 L 430 2 L 800 2"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        );

      case "curved":
        return (
          <svg className="w-full h-1" viewBox="0 0 800 4" preserveAspectRatio="none">
            <motion.path
              d="M 0 2 Q 200 0, 400 2 T 800 2"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
        );

      case "double":
        return (
          <div className="space-y-1">
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        );

      case "dotted":
        return (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-white/20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.01 }}
              />
            ))}
          </div>
        );

      case "simple":
        return (
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        );

      case "thick":
        return (
          <motion.div
            className="h-[2px] bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
        );
    }
  };

  return (
    <div className={cn("w-full", heights[height], className)}>
      <div className="container mx-auto max-w-7xl px-6">
        {renderDivider()}
      </div>
    </div>
  );
}
