"use client";

/**
 * BAHIA FLOW BACKGROUND - Subtle Texture (OPTIMIZED)
 * ---------------------------------------------------
 * Background estático otimizado para performance.
 * 
 * Mudanças de otimização:
 * - Removidas animações pesadas (CPU/GPU)
 * - Gradientes estáticos apenas
 * - Zero JavaScript runtime
 * 
 * Design System: Bahia Noir
 */

export function BahiaFlowBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Noise Texture Static */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}
