import dynamic from "next/dynamic";
import { Navbar, Footer } from "@/components/layout";
import { Hero } from "@/components/sections";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * HOME PAGE - Baianê Agência Landing Page (OPTIMIZED)
 * ----------------------------------------------------
 * Design System: Bahia Noir (Dark Mode)
 * Stack: Next.js 14+ (App Router) + TypeScript + Tailwind
 * 
 * OPTIMIZATIONS:
 * - Lazy loading de seções abaixo do fold (code splitting)
 * - Hero carrega imediatamente (Above the Fold)
 * - Outras seções carregam sob demanda
 * - Mantém todos os efeitos visuais
 * 
 * Estrutura da página:
 * - ✓ Navbar (Immediate load)
 * - ✓ Hero (Immediate load - Above the Fold)
 * - ✓ PainSection (Lazy loaded)
 * - ✓ MethodSection (Lazy loaded)
 * - ✓ ServicesGrid (Lazy loaded)
 * - ✓ SocialProof (Lazy loaded)
 * - ✓ PortfolioGallery (Lazy loaded)
 * - ✓ TeamSection (Lazy loaded)
 * - ✓ FilterSection (Lazy loaded)
 * - ✓ Footer (Lazy loaded)
 */

// Lazy load seções abaixo do fold (Code Splitting)
const PainSection = dynamic(() => import("@/components/sections/PainSection").then(mod => ({ default: mod.PainSection })), {
  loading: () => <div className="min-h-screen" />,
});

const MethodSection = dynamic(() => import("@/components/sections/MethodSection").then(mod => ({ default: mod.MethodSection })), {
  loading: () => <div className="min-h-screen" />,
});

const ServicesGrid = dynamic(() => import("@/components/sections/ServicesGrid").then(mod => ({ default: mod.ServicesGrid })), {
  loading: () => <div className="min-h-screen" />,
});

const SocialProof = dynamic(() => import("@/components/sections/SocialProof").then(mod => ({ default: mod.SocialProof })), {
  loading: () => <div className="min-h-screen" />,
});

const PortfolioGallery = dynamic(() => import("@/components/sections/PortfolioGallery").then(mod => ({ default: mod.PortfolioGallery })), {
  loading: () => <div className="min-h-screen" />,
});

const TeamSection = dynamic(() => import("@/components/sections/TeamSection").then(mod => ({ default: mod.TeamSection })), {
  loading: () => <div className="min-h-screen" />,
});

const FilterSection = dynamic(() => import("@/components/sections/FilterSection").then(mod => ({ default: mod.FilterSection })), {
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        {/* 1. Hero Section (Above the Fold - Immediate Load) */}
        <Hero />

        {/* Divisor: Hero → Pain (Linha quebrada agressiva) */}
        <SectionDivider variant="broken" height="md" />

        {/* 2. Pain Section (Lazy Loaded) */}
        <PainSection />

        {/* Divisor: Pain → Method (Linha curva suave - transição para solução) */}
        <SectionDivider variant="curved" height="md" />

        {/* 3. Method Section (Lazy Loaded) */}
        <MethodSection />

        {/* Divisor: Method → Services (Linha dupla - organização) */}
        <SectionDivider variant="double" height="sm" />

        {/* 4. Services Grid (Lazy Loaded) */}
        <ServicesGrid />

        {/* Divisor: Services → Social (Linha com pontos - conexão) */}
        <SectionDivider variant="dotted" height="md" />

        {/* 5. Social Proof (Lazy Loaded) */}
        <SocialProof />

        {/* Divisor: Social → Portfolio (Linha simples - conexão) */}
        <SectionDivider variant="simple" height="sm" />

        {/* 6. Portfolio Gallery (Lazy Loaded) */}
        <PortfolioGallery />

        {/* Divisor: Portfolio → Team (Linha dupla - organização) */}
        <SectionDivider variant="double" height="sm" />

        {/* 7. Team Section (Lazy Loaded) */}
        <TeamSection />

        {/* Divisor: Team → Filter (Linha simples - clareza) */}
        <SectionDivider variant="simple" height="sm" />

        {/* 8. Filter Section (Lazy Loaded) */}
        <FilterSection />

        {/* Divisor: Filter → Footer (Linha espessa - fechamento) */}
        <SectionDivider variant="thick" height="lg" />
      </main>

      {/* Footer (Lazy Loaded) */}
      <Footer />
    </>
  );
}
