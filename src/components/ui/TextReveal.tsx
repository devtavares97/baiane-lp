"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * TEXT REVEAL - Split Animation
 * ------------------------------
 * Animação de texto onde palavras aparecem uma por uma.
 * Opcional: Pode ser usado para headlines especiais.
 * 
 * Design System: Bahia Noir
 */

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({ 
  children, 
  className = "",
  delay = 0,
  staggerDelay = 0.08,
}: TextRevealProps) {
  // Dividir texto em palavras
  const words = children.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
