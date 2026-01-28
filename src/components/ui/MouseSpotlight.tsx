"use client";

import { useEffect, useRef } from "react";

/**
 * MOUSE SPOTLIGHT (OPTIMIZED)
 * ----------------------------
 * Efeito de bola clara que segue o mouse.
 * 
 * Otimizações:
 * - requestAnimationFrame para animação suave
 * - Transform (GPU) em vez de manipular background
 * - Will-change para otimização de composição
 * - Throttling automático via RAF
 */

export function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let isAnimating = false;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isAnimating) {
        isAnimating = true;
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const updatePosition = () => {
      if (spotlightRef.current) {
        const { x, y } = mousePos.current;
        spotlightRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      isAnimating = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed pointer-events-none z-0"
      style={{
        top: -300,
        left: -300,
        width: 600,
        height: 600,
        willChange: "transform",
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
