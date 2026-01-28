"use client";

import { useRef, useEffect, useState } from "react";

/**
 * CARD SPOTLIGHT
 * --------------
 * Spotlight que segue o mouse dentro do card.
 * 
 * Performance:
 * - Usa refs para evitar re-renders
 * - Apenas ativo quando mouse está sobre o card
 * - Smooth transitions
 * 
 * Design System: Bahia Noir
 */

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  spotlightSize?: number;
  spotlightOpacity?: number;
}

export function CardSpotlight({
  children,
  className = "",
  spotlightSize = 300,
  spotlightOpacity = 0.08,
}: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    
    if (!card || !spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Atualiza posição do spotlight diretamente no style
      spotlight.style.background = `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, rgba(255, 255, 255, ${spotlightOpacity}), transparent 70%)`;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [spotlightSize, spotlightOpacity]);

  return (
    <div ref={cardRef} className={`relative ${className}`}>
      {/* Spotlight Layer */}
      <div
        ref={spotlightRef}
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "transparent",
        }}
      />
      
      {/* Conteúdo */}
      {children}
    </div>
  );
}
