"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { login } from "@/lib/admin/auth";
import Image from "next/image";

/**
 * ADMIN LOGIN PAGE
 * ----------------
 * Página de login simples para acessar o admin
 */

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular delay (segurança)
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(username, password);

    if (success) {
      router.push("/admin");
    } else {
      setError("Credenciais inválidas");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Card de Login */}
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-baiane.png"
              alt="Baianê"
              width={200}
              height={50}
              className="h-[50px] w-auto"
            />
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-white mb-2">
              Admin Login
            </h1>
            <p className="font-body text-sm text-text-muted">
              Acesso restrito ao gerenciador de mídia
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-white">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={cn(
                    "w-full pl-11 pr-4 py-3 rounded-lg",
                    "bg-white/5 border border-white/10",
                    "text-white placeholder:text-text-muted",
                    "focus:outline-none focus:border-white/30",
                    "transition-colors"
                  )}
                  placeholder="Digite seu usuário"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-white">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "w-full pl-11 pr-12 py-3 rounded-lg",
                    "bg-white/5 border border-white/10",
                    "text-white placeholder:text-text-muted",
                    "focus:outline-none focus:border-white/30",
                    "transition-colors"
                  )}
                  placeholder="Digite sua senha"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <p className="font-body text-sm text-red-400 text-center">
                  {error}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-3 rounded-lg",
                "bg-white text-black font-body font-semibold",
                "hover:bg-white/90 transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2"
              )}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>
          </form>

          {/* Link para voltar */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="font-body text-sm text-text-muted hover:text-white transition-colors"
            >
              ← Voltar ao site
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
