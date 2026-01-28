"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * FLOATING PARTICLES
 * ------------------
 * Partículas flutuantes sutis que adicionam movimento orgânico à página.
 * 
 * Performance:
 * - Número limitado de partículas (3-5)
 * - Animações suaves e lentas
 * - Z-index baixo para não interferir
 * - Renderizado apenas no cliente (evita hydration mismatch)
 * 
 * Design System: Bahia Noir
 */

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

interface Particle {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  opacity: number;
  moveX: number[];
  moveY: number[];
}

export function FloatingParticles({ count = 5, className }: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Gerar partículas apenas no cliente para evitar hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2, // 2-6px
        initialX: Math.random() * 100, // 0-100%
        initialY: Math.random() * 100, // 0-100%
        duration: Math.random() * 10 + 15, // 15-25s
        delay: Math.random() * 5, // 0-5s
        opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2
        moveX: [0, Math.random() * 100 - 50, 0],
        moveY: [0, Math.random() * 100 - 50, 0],
      }))
    );
  }, [count]);

  // Não renderizar nada até estar montado no cliente
  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            opacity: particle.opacity,
          }}
          animate={{
            x: particle.moveX,
            y: particle.moveY,
            scale: [1, 1.2, 0.8, 1], // Pulsação sutil
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function cn(...args: any[]) {
  return args.filter(Boolean).join(" ");
}
