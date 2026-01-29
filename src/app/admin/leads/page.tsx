"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import type { Lead } from "@/types/supabase";

const revenueTierLabels: Record<string, string> = {
  up_to_30k: "Até R$ 30k",
  "30k_to_100k": "R$ 30k - R$ 100k",
  "100k_to_500k": "R$ 100k - R$ 500k",
  above_500k: "Acima de R$ 500k",
};

const painLabels: Record<string, string> = {
  conversion: "Conversão",
  branding: "Branding",
  channel: "Canal",
  sales_process: "Processo de Vendas",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArchetype, setFilterArchetype] = useState<string>("all");

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchTerm, filterArchetype, leads]);

  async function loadLeads() {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from("leads_diagnostic")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
      setFilteredLeads(data || []);
    } catch (error) {
      console.error("Erro ao carregar leads:", error);
    } finally {
      setLoading(false);
    }
  }

  function filterLeads() {
    let filtered = leads;

    // Filtrar por busca
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.contact_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por arquétipo
    if (filterArchetype !== "all") {
      filtered = filtered.filter(
        (lead) => lead.result_archetype === filterArchetype
      );
    }

    setFilteredLeads(filtered);
  }

  const uniqueArchetypes = Array.from(
    new Set(leads.map((lead) => lead.result_archetype))
  );

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
        <div>
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            Leads
          </h1>
          <p className="font-body text-text-muted">
            {filteredLeads.length} lead(s) encontrado(s)
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              "w-full pl-12 pr-4 py-3 rounded-lg",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-text-muted",
              "focus:outline-none focus:border-primary/50",
              "transition-all duration-300"
            )}
          />
        </div>

        {/* Filter by Archetype */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <select
            value={filterArchetype}
            onChange={(e) => setFilterArchetype(e.target.value)}
            className={cn(
              "w-full pl-12 pr-4 py-3 rounded-lg appearance-none",
              "bg-white/5 border border-white/10",
              "text-white",
              "focus:outline-none focus:border-primary/50",
              "transition-all duration-300",
              "cursor-pointer"
            )}
          >
            <option value="all">Todos os arquétipos</option>
            {uniqueArchetypes.map((archetype) => (
              <option key={archetype} value={archetype}>
                {archetype}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12 rounded-xl bg-white/5 border border-white/10"
        >
          <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="font-body text-text-muted">
            Nenhum lead encontrado com os filtros aplicados
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredLeads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={cn(
                "p-6 rounded-xl bg-white/5 border border-white/10",
                "hover:bg-white/10 transition-all duration-300"
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-white font-bold text-lg">
                        {lead.contact_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        {lead.contact_name}
                      </h3>
                      <div className="space-y-2">
                        <p className="font-body text-sm text-text-muted flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {lead.contact_email}
                        </p>
                        {lead.contact_whatsapp && (
                          <p className="font-body text-sm text-text-muted flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {lead.contact_whatsapp}
                          </p>
                        )}
                        <p className="font-body text-sm text-text-muted flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(lead.created_at).toLocaleString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="font-body text-xs text-text-muted mb-1">
                        Faturamento
                      </p>
                      <p className="font-body text-sm text-white font-medium">
                        {revenueTierLabels[lead.revenue_tier]}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-muted mb-1">
                        Dor Principal
                      </p>
                      <p className="font-body text-sm text-white font-medium">
                        {painLabels[lead.main_pain]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Score & Archetype */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="font-body text-xs text-text-muted mb-2">
                      Arquétipo
                    </p>
                    <span className="inline-block px-4 py-2 rounded-lg bg-primary/20 text-primary font-body font-medium">
                      {lead.result_archetype}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-xs text-text-muted mb-2">
                      Score de Maturidade
                    </p>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="font-display text-3xl font-bold text-white">
                        {lead.maturity_score}
                      </span>
                      <span className="font-body text-text-muted">/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
