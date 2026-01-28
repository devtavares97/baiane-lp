import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { content } from "@/data/content";
import { BahiaFlowBackground } from "@/components/ui/BahiaFlowBackground";
import { MouseSpotlight } from "@/components/ui/MouseSpotlight";
import { GrowthScanModal } from "@/components/features/GrowthScanModal";

/**
 * ROOT LAYOUT - Baianê Agência
 * -----------------------------
 * Tipografia Baianê (Design System):
 * - Display: Syne - Extravagante, larga, artística (H1, H2)
 * - Body: Inter - Leitura perfeita, neutra (Todo o resto)
 * 
 * Global Components:
 * - BahiaFlowBackground: Subtle texture (OTIMIZADO)
 * - MouseSpotlight: Efeito que segue o mouse (OTIMIZADO)
 */

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  keywords: content.seo.keywords,
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.title,
    description: content.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        {/* Preconnect to Google Fonts (Performance) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${syne.variable} ${inter.variable} antialiased font-sans`}
      >
        {/* Background Layers (Optimized) */}
        <BahiaFlowBackground />
        <MouseSpotlight />
        
        {/* Conteúdo da página */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Growth Scan Modal */}
        <GrowthScanModal />
      </body>
    </html>
  );
}
