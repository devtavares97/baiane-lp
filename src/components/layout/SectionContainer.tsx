import { cn } from "@/lib/utils";
import { forwardRef } from "react";

/**
 * SECTION CONTAINER
 * -----------------
 * Wrapper reutilizável para seções da landing page.
 * Gerencia max-width, padding horizontal e vertical de forma consistente.
 * 
 * Design System: Bahia Noir
 */

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow" | "full";
  paddingY?: "default" | "large" | "xlarge" | "small" | "none";
  as?: "section" | "div" | "header" | "footer";
  id?: string;
}

export const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  function SectionContainer(
    {
      children,
      className,
      size = "default",
      paddingY = "default",
      as: Component = "section",
      id,
    },
    ref
  ) {
    return (
      <Component
        ref={ref as any}
        id={id}
        className={cn(
          // Padding Horizontal (Mobile-First)
          "px-6 md:px-12",
          
          // Max-Width baseado no tamanho
          size === "default" && "container mx-auto max-w-7xl",
          size === "wide" && "container mx-auto max-w-[1400px]",
          size === "narrow" && "container mx-auto max-w-4xl",
          size === "full" && "w-full",
          
          // Padding Vertical
          paddingY === "default" && "py-16 md:py-24",
          paddingY === "large" && "py-24 md:py-32",
          paddingY === "xlarge" && "py-32 md:py-40 lg:py-48",
          paddingY === "small" && "py-8 md:py-12",
          paddingY === "none" && "py-0",
          
          className
        )}
      >
        {children}
      </Component>
    );
  }
);
