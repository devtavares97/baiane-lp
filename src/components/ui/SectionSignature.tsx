"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Sparkles, Zap, TrendingUp, Users, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SECTION SIGNATURE
 * -----------------
 * Assinaturas gráficas únicas para cada seção.
 * Cada variante tem design personalizado que reflete a personalidade da seção.
 * 
 * Design System: Bahia Noir
 */

type SignatureVariant = "hero" | "pain" | "method" | "services" | "social" | "filter";

interface SectionSignatureProps {
  variant: SignatureVariant;
  className?: string;
}

export function SectionSignature({ variant, className }: SectionSignatureProps) {
  const signatures = {
    // Hero: Linha horizontal + ponto pulsante
    hero: (
      <div className="flex items-center gap-3">
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="w-12 h-[2px] bg-gradient-to-r from-white/60 to-transparent" />
      </div>
    ),

    // Pain: Linha diagonal agressiva + ícone de alerta
    pain: (
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-4 h-4 text-white/40" strokeWidth={2} />
        <div className="relative w-16 h-[3px]">
          <div className="absolute inset-0 bg-white/20 skew-x-[-12deg]" />
          <motion.div
            className="absolute inset-0 bg-white/60 skew-x-[-12deg]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    ),

    // Method: Linha curva + número romano
    method: (
      <div className="flex items-center gap-3">
        <span className="font-display text-sm font-bold text-white/30 tracking-wider">
          I
        </span>
        <svg className="w-20 h-[2px]" viewBox="0 0 80 2">
          <motion.path
            d="M 0 1 Q 10 0, 20 1 T 40 1 T 60 1 T 80 1"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </svg>
      </div>
    ),

    // Services: Grid pattern + número
    services: (
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 grid grid-cols-2 gap-[2px]">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="bg-white/30 rounded-[1px]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            />
          ))}
        </div>
        <div className="w-10 h-[2px] bg-white/40" />
      </div>
    ),

    // SocialProof: Linha dupla + estatística
    social: (
      <div className="flex items-center gap-3">
        <TrendingUp className="w-4 h-4 text-white/40" strokeWidth={2} />
        <div className="space-y-1">
          <div className="w-16 h-[2px] bg-white/50" />
          <motion.div
            className="w-12 h-[1px] bg-white/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    ),

    // Filter: Linha quebrada + símbolo
    filter: (
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-white/40" strokeWidth={2} />
        <svg className="w-20 h-3" viewBox="0 0 80 12">
          <motion.path
            d="M 0 6 L 15 6 L 20 2 L 25 10 L 30 6 L 50 6"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </svg>
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("inline-flex mb-4", className)}
    >
      {signatures[variant]}
    </motion.div>
  );
}
