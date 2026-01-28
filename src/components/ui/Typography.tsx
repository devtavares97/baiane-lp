/**
 * TYPOGRAPHY COMPONENTS - Design System Bahia Noir
 * -------------------------------------------------
 * Componentes de tipografia reutilizáveis.
 * PREMISSA: Se mudar um estilo aqui, muda em todo o site.
 */

import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

// ============================================================================
// DISPLAY HEADINGS (Fonte Syne - Artística)
// ============================================================================

interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  textureOverlay?: boolean;
}

/**
 * H1 Display - Hero Headlines
 * Uso: Títulos principais de seções (Hero, Pain, Method)
 */
export function DisplayH1({ children, className, textureOverlay = true, ...props }: DisplayProps) {
  return (
    <div className="relative inline-block">
      {/* Overlay de textura granular (opcional) */}
      {textureOverlay && (
        <div 
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      
      <h1
        className={cn(
          "font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
          "font-bold text-text-main leading-tight tracking-tight relative",
          className
        )}
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
        {...props}
      >
        {children}
      </h1>
    </div>
  );
}

/**
 * H2 Display - Section Headlines
 * Uso: Títulos de seções secundárias
 */
export function DisplayH2({ children, className, textureOverlay = true, ...props }: DisplayProps) {
  return (
    <div className="relative inline-block">
      {/* Overlay de textura granular (opcional) */}
      {textureOverlay && (
        <div 
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      
      <h2
        className={cn(
          "font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
          "font-bold text-text-main leading-tight tracking-tight relative",
          className
        )}
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
        {...props}
      >
        {children}
      </h2>
    </div>
  );
}

/**
 * H3 Display - Subsection Titles
 * Uso: Títulos de cards, blocos menores
 */
export function DisplayH3({ children, className, ...props }: DisplayProps) {
  return (
    <h3
      className={cn(
        "font-display text-xl sm:text-2xl md:text-3xl",
        "font-bold text-text-main leading-snug tracking-tight",
        className
      )}
      style={{ fontFamily: "var(--font-syne), sans-serif" }}
      {...props}
    >
      {children}
    </h3>
  );
}

// ============================================================================
// BODY TEXT (Fonte Inter/DM Sans - Neutro)
// ============================================================================

interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}

/**
 * Body Large - Parágrafos principais
 * Uso: Subheadlines, introduções de seção
 */
export function BodyLarge({ children, className, muted = false, ...props }: BodyProps) {
  return (
    <p
      className={cn(
        "font-body text-base sm:text-lg md:text-xl",
        "leading-relaxed",
        muted ? "text-text-muted" : "text-text-main",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/**
 * Body Regular - Parágrafos padrão
 * Uso: Descrições de cards, listas, conteúdo geral
 */
export function BodyRegular({ children, className, muted = true, ...props }: BodyProps) {
  return (
    <p
      className={cn(
        "font-body text-sm sm:text-base",
        "leading-relaxed",
        muted ? "text-text-muted" : "text-text-main",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/**
 * Body Small - Legendas e textos auxiliares
 * Uso: Labels, tooltips, metadados
 */
export function BodySmall({ children, className, muted = true, ...props }: BodyProps) {
  return (
    <p
      className={cn(
        "font-body text-xs sm:text-sm",
        "leading-normal",
        muted ? "text-text-muted" : "text-text-main",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// ============================================================================
// SPECIAL COMPONENTS
// ============================================================================

/**
 * Stat Number - Números grandes para Social Proof
 * Uso: Métricas, estatísticas
 */
export function StatNumber({ children, className, ...props }: DisplayProps) {
  return (
    <div
      className={cn(
        "font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
        "font-bold text-text-main leading-none tracking-tight",
        className
      )}
      style={{ fontFamily: "var(--font-syne), sans-serif" }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Badge Text - Pequenos labels de destaque
 * Uso: Tags, categorias, "NEW", etc.
 */
export function BadgeText({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-body text-xs font-medium uppercase tracking-wide",
        "text-text-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
