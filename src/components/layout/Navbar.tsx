"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { content } from "@/data/content";
import { useGrowthScan } from "@/hooks/useGrowthScan";

/**
 * NAVBAR COMPONENT
 * ----------------
 * Navegação sticky com scroll effect e menu mobile.
 * 
 * Design System: Bahia Noir
 * - Inicial: Transparente
 * - Scrolled: bg-black/60 + backdrop-blur + border-bottom
 * - Logo: Baianê PNG na pasta public
 */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open: openGrowthScan } = useGrowthScan();

  // Detect scroll para mudar estilo do navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll para âncoras
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo-baiane.png"
                alt="Baianê Agência"
                width={240}
                height={55}
                className="h-[52px] w-auto"
                priority
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {content.navbar.links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "font-body text-sm font-medium transition-colors relative",
                    "text-text-muted hover:text-text-main"
                  )}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                  {/* Underline effect on hover */}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}

              {/* CTA Button - Growth Scan */}
              <motion.button
                onClick={openGrowthScan}
                className={cn(
                  "rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold",
                  "text-primary-fg transition-all duration-300",
                  "hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
                  "flex items-center gap-2"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-4 h-4" />
                Fazer Raio-X
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-text-main p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.6, 1] }}
            className={cn(
              "fixed top-20 right-0 bottom-0 z-40 w-full max-w-sm",
              "bg-surface/95 backdrop-blur-lg border-l border-white/10",
              "md:hidden"
            )}
          >
            <nav className="flex flex-col p-8 gap-6">
              {content.navbar.links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-lg font-medium text-text-muted hover:text-text-main transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#footer"
                onClick={(e) => handleNavClick(e, "#footer")}
                className={cn(
                  "rounded-full bg-primary px-8 py-4 font-body text-base font-semibold",
                  "text-primary-fg text-center transition-all",
                  "hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {content.navbar.cta}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
