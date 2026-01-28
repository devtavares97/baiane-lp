"use client";

import { motion } from "framer-motion";
import { LucideIcon, Sparkles, Star, Zap, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * DESIGN ACCENT - Sistema Expandido
 * ----------------------------------
 * Ornamentos decorativos com múltiplas variantes e animações.
 * 
 * Variantes:
 * - geometric: Formas geométricas (quadrado, círculo, losango)
 * - icon: Ícone central com glow
 * - pattern: Padrão repetitivo sutil
 * - particle: Partículas flutuantes
 * 
 * Design System: Bahia Noir
 */

type AccentVariant = "geometric" | "icon" | "pattern" | "particle";
type AccentSize = "sm" | "md" | "lg";
type AccentAnimation = "pulse" | "float" | "rotate" | "glow";
type AccentPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center" | "custom";

interface DesignAccentProps {
  variant?: AccentVariant;
  size?: AccentSize;
  position?: AccentPosition;
  customPosition?: { top?: string; right?: string; bottom?: string; left?: string; transform?: string };
  icon?: LucideIcon;
  animation?: AccentAnimation;
  className?: string;
}

export function DesignAccent({
  variant = "geometric",
  size = "md",
  position = "top-right",
  customPosition,
  icon: CustomIcon,
  animation = "pulse",
  className,
}: DesignAccentProps) {
  // Tamanhos
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  // Posicionamentos
  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "custom": "",
  };

  // Animações
  const animations = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.4, 0.7, 0.4],
    },
    float: {
      y: [0, -10, 0],
      opacity: [0.4, 0.6, 0.4],
    },
    rotate: {
      rotate: [0, 360],
      opacity: [0.4, 0.6, 0.4],
    },
    glow: {
      boxShadow: [
        "0 0 10px rgba(255,255,255,0.1)",
        "0 0 20px rgba(255,255,255,0.2)",
        "0 0 10px rgba(255,255,255,0.1)",
      ],
    },
  };

  const Icon = CustomIcon || Sparkles;

  // Renderizar baseado na variante
  const renderAccent = () => {
    switch (variant) {
      case "geometric":
        return (
          <div className={cn(
            sizes[size],
            "rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm",
            "flex items-center justify-center"
          )}>
            <div className="w-2 h-2 bg-white/30 rotate-45" />
          </div>
        );

      case "icon":
        return (
          <div className={cn(
            sizes[size],
            "rounded-full bg-white/5 border border-white/10 backdrop-blur-sm",
            "flex items-center justify-center relative overflow-hidden"
          )}>
            {/* Glow interno */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <Icon className="w-1/2 h-1/2 text-white/40 relative z-10" strokeWidth={1.5} />
          </div>
        );

      case "pattern":
        return (
          <div className={cn(
            sizes[size],
            "rounded-lg border border-white/10 backdrop-blur-sm overflow-hidden"
          )}>
            <div className="w-full h-full grid grid-cols-3 gap-[1px] p-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-[1px]"
                />
              ))}
            </div>
          </div>
        );

      case "particle":
        return (
          <div className={cn(sizes[size], "relative")}>
            {/* 3 partículas orbitando */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                animate={{
                  x: [0, Math.cos((i * 120 * Math.PI) / 180) * 20, 0],
                  y: [0, Math.sin((i * 120 * Math.PI) / 180) * 20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
            <div className="w-2 h-2 bg-white/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        );
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute pointer-events-none",
        position !== "custom" && positions[position],
        className
      )}
      style={customPosition}
      animate={animations[animation]}
      transition={{
        duration: animation === "rotate" ? 20 : 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {renderAccent()}
    </motion.div>
  );
}
