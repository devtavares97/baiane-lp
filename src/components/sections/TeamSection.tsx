"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import React from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { DisplayH2, BodyRegular, BadgeText } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

/**
 * TEAM SECTION - Bahia Noir Style
 * --------------------------------
 * Seção de apresentação do time.
 * 
 * Features:
 * - Card centralizado com foto do fundador
 * - Design elegante e minimalista
 * - Hover effects sutis
 */

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Marcos Antonio",
    role: "FUNDADOR & CREATIVE DIRECTOR",
    description: "Criativo, filmmaker e pai. Apaixonado por criar desde os 12 anos de idade.",
    image: "/images/team/marcos-antonio.jpg",
  },
];

export function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionContainer
      id="team"
      paddingY="large"
      className="relative overflow-hidden"
      ref={containerRef}
    >
      {/* ============================================
          FLOATING VISUAL SLOT (Top-Right) - STATIC
          Insira aqui sua imagem decorativa (orb, symbol, etc)
          ============================================ */}
      <div className="absolute top-20 right-10 md:right-20 z-0 pointer-events-none">
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-white/5 blur-3xl" />
        
        {/* 
          SUBSTITUA ESTE DIV POR SUA IMAGEM:
          <Image 
            src="/images/floating-orb.png" 
            alt="" 
            width={400} 
            height={400}
            className="opacity-20"
          />
        */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-12 md:space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto flex flex-col items-center gap-4"
        >
          <BadgeText className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            O TIME
          </BadgeText>
          
          <DisplayH2 className="text-center">
            Quem faz <span className="text-text-muted">acontecer</span>
          </DisplayH2>
        </motion.div>

        {/* Team Member Card (Centralizado) */}
        <div className="flex justify-center">
          <div className="max-w-md w-full">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -8 }}
                className={cn(
                  "group relative",
                  "card-glass rounded-2xl overflow-hidden",
                  "transition-all duration-500"
                )}
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-surface overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 448px"
                    priority
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Glow overlay on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                </div>

                {/* Info Container */}
                <div className="p-8 space-y-4">
                  {/* Role Badge */}
                  <BadgeText className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted">
                    {member.role}
                  </BadgeText>

                  {/* Name */}
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
                    {member.name}
                  </h3>

                  {/* Description */}
                  <BodyRegular muted className="leading-relaxed">
                    {member.description}
                  </BodyRegular>
                </div>

                {/* Top accent line (appears on hover) */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-white to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
