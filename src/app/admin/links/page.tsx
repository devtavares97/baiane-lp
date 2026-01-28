"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ExternalLink,
  Loader2,
  User,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import type { LinkProfile, LinkItem } from "@/types/supabase";

interface EditingLink {
  id?: string;
  title: string;
  url: string;
  icon: string;
  order_num: number;
}

export default function LinksPage() {
  const [profiles, setProfiles] = useState<LinkProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<EditingLink | null>(null);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [newProfile, setNewProfile] = useState({ name: "", slug: "", bio: "" });

  useEffect(() => {
    loadProfiles();
  }, []);

  useEffect(() => {
    if (selectedProfile) {
      loadLinks(selectedProfile);
    }
  }, [selectedProfile]);

  async function loadProfiles() {
    if (!supabase) return;

    try {
      const { data, error } = await supabase.from("link_profiles").select("*").order("created_at", { ascending: true });

      if (error) throw error;
      const profiles = (data || []) as LinkProfile[];
      setProfiles(profiles);
      if (profiles && profiles.length > 0 && !selectedProfile) {
        setSelectedProfile(profiles[0].id);
      }
    } catch (error) {
      console.error("Erro ao carregar perfis:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadLinks(profileId: string) {
    if (!supabase) return;

    try {
      const { data, error } = await supabase.from("link_items").select("*").eq("profile_id", profileId).order("order_num", { ascending: true });

      if (error) throw error;
      setLinks((data || []) as LinkItem[]);
    } catch (error) {
      console.error("Erro ao carregar links:", error);
    }
  }

  async function createProfile() {
    if (!supabase || !newProfile.name || !newProfile.slug) return;

    try {
      // @ts-ignore - Types will be generated after SQL execution
      const { error } = await supabase.from("link_profiles").insert({
        name: newProfile.name,
        slug: newProfile.slug,
        bio: newProfile.bio || null,
      });

      if (error) throw error;

      setNewProfile({ name: "", slug: "", bio: "" });
      setCreatingProfile(false);
      loadProfiles();
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      alert("Erro ao criar perfil. Slug pode já estar em uso.");
    }
  }

  async function saveLink() {
    if (!supabase || !editingLink || !selectedProfile) return;

    try {
      if (editingLink.id) {
        // Atualizar
        // @ts-expect-error - Supabase types not generated yet
        const { error } = await supabase.from("link_items").update({
          title: editingLink.title,
          url: editingLink.url,
          icon: editingLink.icon,
        }).eq("id", editingLink.id);

        if (error) throw error;
      } else {
        // Criar novo
        // @ts-expect-error - Supabase types not generated yet
        const { error } = await supabase.from("link_items").insert({
          profile_id: selectedProfile,
          title: editingLink.title,
          url: editingLink.url,
          icon: editingLink.icon,
          order_num: links.length,
        });

        if (error) throw error;
      }

      setEditingLink(null);
      loadLinks(selectedProfile);
    } catch (error) {
      console.error("Erro ao salvar link:", error);
      alert("Erro ao salvar link");
    }
  }

  async function deleteLink(id: string) {
    if (!supabase || !confirm("Deletar este link?")) return;

    try {
      // @ts-ignore - Types will be generated after SQL execution
      const { error } = await supabase.from("link_items").delete().eq("id", id);

      if (error) throw error;

      if (selectedProfile) {
        loadLinks(selectedProfile);
      }
    } catch (error) {
      console.error("Erro ao deletar link:", error);
      alert("Erro ao deletar link");
    }
  }

  const currentProfile = profiles.find((p) => p.id === selectedProfile);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
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
          Gestão de Links
        </h1>
        <p className="font-body text-text-muted">
          Configure perfis e links estilo Linktree
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar - Perfis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-white">
              Perfis
            </h2>
            <button
              onClick={() => setCreatingProfile(true)}
              className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Criar Perfil */}
          {creatingProfile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-lg bg-white/10 border border-white/20 space-y-3"
            >
              <input
                type="text"
                placeholder="Nome"
                value={newProfile.name}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, name: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="Slug (ex: marcos)"
                value={newProfile.slug}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, slug: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-primary"
              />
              <textarea
                placeholder="Bio (opcional)"
                value={newProfile.bio}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, bio: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={createProfile}
                  className="flex-1 px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Criar
                </button>
                <button
                  onClick={() => {
                    setCreatingProfile(false);
                    setNewProfile({ name: "", slug: "", bio: "" });
                  }}
                  className="px-3 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Lista de Perfis */}
          <div className="space-y-2">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile.id)}
                className={cn(
                  "w-full p-4 rounded-lg text-left transition-all duration-300",
                  "flex items-center gap-3",
                  selectedProfile === profile.id
                    ? "bg-primary/20 border-2 border-primary text-white"
                    : "bg-white/5 border-2 border-white/10 text-text-muted hover:bg-white/10 hover:border-white/20"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium truncate">
                    {profile.name}
                  </p>
                  <p className="font-body text-xs opacity-60 truncate">
                    /{profile.slug}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {profiles.length === 0 && !creatingProfile && (
            <div className="text-center py-8 text-text-muted font-body text-sm">
              Nenhum perfil criado ainda
            </div>
          )}
        </motion.div>

        {/* Main - Links do perfil selecionado */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          {currentProfile ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    {currentProfile.name}
                  </h2>
                  <a
                    href={`/links/${currentProfile.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                  >
                    Ver página pública
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <button
                  onClick={() =>
                    setEditingLink({
                      title: "",
                      url: "",
                      icon: "🔗",
                      order_num: links.length,
                    })
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Link
                </button>
              </div>

              {/* Form de Edição */}
              {editingLink && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-white/10 border border-white/20 space-y-4"
                >
                  <h3 className="font-display text-lg font-bold text-white">
                    {editingLink.id ? "Editar Link" : "Novo Link"}
                  </h3>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label className="font-body text-xs text-text-muted mb-2 block">
                        Ícone
                      </label>
                      <input
                        type="text"
                        value={editingLink.icon}
                        onChange={(e) =>
                          setEditingLink({ ...editingLink, icon: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-center text-2xl focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="font-body text-xs text-text-muted mb-2 block">
                        Título
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Meu Instagram"
                        value={editingLink.title}
                        onChange={(e) =>
                          setEditingLink({ ...editingLink, title: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-xs text-text-muted mb-2 block">
                      URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={editingLink.url}
                      onChange={(e) =>
                        setEditingLink({ ...editingLink, url: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={saveLink}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingLink(null)}
                      className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Lista de Links */}
              <div className="space-y-3">
                {links.length === 0 ? (
                  <div className="text-center py-12 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-body text-text-muted">
                      Nenhum link adicionado ainda
                    </p>
                  </div>
                ) : (
                  links.map((link) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <span className="text-2xl">{link.icon}</span>
                      <div className="flex-1">
                        <p className="font-body text-white font-medium">
                          {link.title}
                        </p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-xs text-text-muted hover:text-primary transition-colors truncate block"
                        >
                          {link.url}
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setEditingLink({
                              id: link.id,
                              title: link.title,
                              url: link.url,
                              icon: link.icon || "🔗",
                              order_num: link.order_num,
                            })
                          }
                          className="p-2 rounded-lg bg-white/5 text-white hover:bg-primary/20 hover:text-primary transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLink(link.id)}
                          className="p-2 rounded-lg bg-white/5 text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 rounded-xl bg-white/5 border border-white/10">
              <User className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="font-body text-text-muted">
                Selecione ou crie um perfil
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
