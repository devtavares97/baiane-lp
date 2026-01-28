"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Image as ImageIcon,
  Link2,
  TrendingUp,
  Calendar,
  Mail,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface Stats {
  totalLeads: number;
  leadsThisMonth: number;
  totalImages: number;
  totalLinks: number;
}

interface RecentLead {
  id: string;
  contact_name: string;
  contact_email: string;
  created_at: string;
  result_archetype: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    leadsThisMonth: 0,
    totalImages: 0,
    totalLinks: 0,
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    if (!supabase) return;

    try {
      // Carregar estatísticas
      const [leadsResult, imagesResult, linksResult] = await Promise.all([
        supabase.from("leads_diagnostic").select("*", { count: "exact" }),
        supabase.from("gallery").select("*", { count: "exact" }),
        supabase.from("link_items").select("*", { count: "exact" }),
      ]);

      // Calcular leads deste mês
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const leadsThisMonth =
        (leadsResult.data as any)?.filter(
          (lead: any) => new Date(lead.created_at) >= startOfMonth
        ).length || 0;

      setStats({
        totalLeads: leadsResult.count || 0,
        leadsThisMonth,
        totalImages: imagesResult.count || 0,
        totalLinks: linksResult.count || 0,
      });

      // Carregar leads recentes
      const { data: recentData } = await supabase
        .from("leads_diagnostic")
        .select("id, contact_name, contact_email, created_at, result_archetype")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentLeads(recentData || []);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      title: "Total de Leads",
      value: stats.totalLeads,
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      href: "/admin/leads",
    },
    {
      title: "Leads Este Mês",
      value: stats.leadsThisMonth,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      href: "/admin/leads",
    },
    {
      title: "Imagens",
      value: stats.totalImages,
      icon: <ImageIcon className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      href: "/admin/gallery",
    },
    {
      title: "Links Ativos",
      value: stats.totalLinks,
      icon: <Link2 className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      href: "/admin/links",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="font-body text-text-muted">
          Visão geral do seu painel administrativo
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.a
            key={card.title}
            href={card.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative overflow-hidden rounded-xl p-6",
              "bg-white/5 border border-white/10",
              "hover:bg-white/10 transition-all duration-300",
              "group cursor-pointer"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 opacity-10 bg-gradient-to-br",
                card.color
              )}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "p-3 rounded-lg bg-gradient-to-br",
                    card.color,
                    "text-white"
                  )}
                >
                  {card.icon}
                </div>
              </div>
              <h3 className="font-body text-sm text-text-muted mb-1">
                {card.title}
              </h3>
              <p className="font-display text-3xl font-bold text-white">
                {card.value}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Recent Leads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-white/5 border border-white/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-white">
            Leads Recentes
          </h2>
          <a
            href="/admin/leads"
            className="font-body text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Ver todos →
          </a>
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="font-body text-text-muted">
              Nenhum lead cadastrado ainda
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <span className="font-display text-white font-bold">
                      {lead.contact_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-white font-medium">
                      {lead.contact_name}
                    </p>
                    <p className="font-body text-sm text-text-muted">
                      {lead.contact_email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs text-text-muted mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    {lead.result_archetype}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
