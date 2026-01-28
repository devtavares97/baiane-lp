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
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/admin/auth";
import type { LinkProfile, LinkItem } from "@/types/supabase";
import Image from "next/image";

interface EditingLink {
  id?: string;
  title: string;
  url: string;
  icon: string;
  order_num: number;
}

export default function LinksPage() {
  const [currentUser, setCurrentUser] = useState<{ username: string; slug: string; name: string } | null>(null);
  const [profile, setProfile] = useState<LinkProfile | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<EditingLink | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", bio: "", avatar_url: "" });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(false);

  useEffect(() => {
    async function init() {
      const user = getCurrentUser();
      if (!user) {
        window.location.href = "/admin/login";
        return;
      }
      setCurrentUser(user);
      await loadProfile(user.slug);
    }
    init();
  }, []);

  useEffect(() => {
    if (profile) {
      loadLinks(profile.id);
    }
  }, [profile]);

  async function loadProfile(slug: string) {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("link_profiles")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      // Se não encontrou o perfil, criar automaticamente
      if (!data) {
        const user = getCurrentUser();
        if (user && !creatingProfile) {
          setCreatingProfile(true);
          await createProfile(slug, user.name);
          setCreatingProfile(false);
        } else {
          setLoading(false);
        }
        return;
      }

      if (error) {
        console.error("Erro ao carregar perfil:", error);
        setLoading(false);
        return;
      }

      const profileData = data as LinkProfile;
      setProfile(profileData);
      setProfileData({
        name: profileData.name,
        bio: profileData.bio || "",
        avatar_url: profileData.avatar_url || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      setLoading(false);
    }
  }

  async function createProfile(slug: string, userName: string) {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("link_profiles")
        .insert({
          slug: slug,
          name: userName,
          bio: null,
          avatar_url: null,
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar perfil:", error);
        alert("Erro ao criar perfil: " + error.message);
        setLoading(false);
        return;
      }

      const newProfile = data as LinkProfile;
      setProfile(newProfile);
      setProfileData({
        name: newProfile.name,
        bio: newProfile.bio || "",
        avatar_url: newProfile.avatar_url || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      alert("Erro ao criar perfil");
      setLoading(false);
    }
  }

  async function loadLinks(profileId: string) {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from("link_items")
        .select("*")
        .eq("profile_id", profileId)
        .order("order_num", { ascending: true });

      if (error) throw error;
      setLinks((data || []) as LinkItem[]);
    } catch (error) {
      console.error("Erro ao carregar links:", error);
    }
  }

  async function saveProfile() {
    if (!supabase || !profile) return;

    try {
      const { error } = await supabase
        .from("link_profiles")
        .update({
          name: profileData.name,
          bio: profileData.bio || null,
          avatar_url: profileData.avatar_url || null,
        })
        .eq("id", profile.id);

      if (error) throw error;

      await loadProfile(profile.slug);
      setEditingProfile(false);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil");
    }
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0] || !supabase || !profile) return;

    const file = e.target.files[0];
    
    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB");
      return;
    }

    setUploadingAvatar(true);

    try {
      // Upload para Supabase Storage - tentar diferentes buckets
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.slug}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Tentar primeiro com gallery_images (se existir)
      let uploadError = null;
      let publicUrl = null;
      let bucketName = "gallery_images";

      const { error: error1 } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error1) {
        // Tentar com public-images
        bucketName = "public-images";
        const { error: error2 } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
          });
        
        if (error2) {
          uploadError = error2;
        }
      }

      if (uploadError) {
        console.error("Erro no upload:", uploadError);
        throw new Error(uploadError.message || "Erro ao fazer upload");
      }

      // Obter URL pública
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error("Não foi possível obter a URL pública");
      }

      setProfileData({ ...profileData, avatar_url: data.publicUrl });
      
      // Salvar automaticamente após upload
      if (profile) {
        const { error: updateError } = await supabase
          .from("link_profiles")
          .update({ avatar_url: data.publicUrl })
          .eq("id", profile.id);
        
        if (updateError) {
          console.error("Erro ao salvar URL no banco:", updateError);
          // Não lançar erro aqui, apenas logar - a URL já está no estado
        } else {
          // Recarregar perfil para atualizar o estado
          await loadProfile(profile.slug);
        }
      }
    } catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      alert(`Erro ao fazer upload da imagem: ${error.message || "Erro desconhecido"}`);
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function saveLink() {
    if (!supabase || !editingLink || !profile) return;

    try {
      if (editingLink.id) {
        // Atualizar
        const { error } = await supabase
          .from("link_items")
          .update({
            title: editingLink.title,
            url: editingLink.url,
            icon: editingLink.icon,
          })
          .eq("id", editingLink.id);

        if (error) throw error;
      } else {
        // Criar novo
        const { error } = await supabase.from("link_items").insert({
          profile_id: profile.id,
          title: editingLink.title,
          url: editingLink.url,
          icon: editingLink.icon,
          order_num: links.length,
          is_active: true,
        });

        if (error) throw error;
      }

      setEditingLink(null);
      loadLinks(profile.id);
    } catch (error) {
      console.error("Erro ao salvar link:", error);
      alert("Erro ao salvar link");
    }
  }

  async function deleteLink(id: string) {
    if (!supabase || !confirm("Deletar este link?")) return;

    try {
      const { error } = await supabase.from("link_items").delete().eq("id", id);

      if (error) throw error;

      if (profile) {
        loadLinks(profile.id);
      }
    } catch (error) {
      console.error("Erro ao deletar link:", error);
      alert("Erro ao deletar link");
    }
  }

  if (loading || !currentUser) {
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
          Meus Links
        </h1>
        <p className="font-body text-text-muted">
          Configure sua página de links pessoal
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar - Perfil */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="font-display text-xl font-bold text-white mb-4">
              Meu Perfil
            </h2>

            {!editingProfile ? (
              <>
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary/60">
                    {profile?.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt={profile.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    {profile?.name || currentUser.name}
                  </h3>
                  {profile?.bio && (
                    <p className="font-body text-sm text-text-muted">{profile.bio}</p>
                  )}
                  <a
                    href={`/links/${profile?.slug || currentUser.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs text-primary hover:underline flex items-center justify-center gap-1 mt-2"
                  >
                    Ver minha página
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <button
                  onClick={() => setEditingProfile(true)}
                  className={cn(
                    "w-full px-4 py-2 rounded-full",
                    "border border-white/20 bg-white/5",
                    "font-body text-sm font-semibold text-text-main",
                    "backdrop-blur-sm transition-all duration-300",
                    "hover:border-white/40 hover:bg-white/10"
                  )}
                >
                  Editar Perfil
                </button>
              </>
            ) : (
              <div className="space-y-4">
                {/* Upload Avatar */}
                <div>
                  <label className="font-body text-xs text-text-muted mb-2 block">
                    Foto de Perfil
                  </label>
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary/60 mb-2">
                    {profileData.avatar_url ? (
                      <Image
                        src={profileData.avatar_url}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <label className={cn(
                    "flex items-center justify-center gap-2",
                    "rounded-full border border-white/20 bg-white/5 px-6 py-3",
                    "font-body text-sm font-semibold text-text-main",
                    "backdrop-blur-sm transition-all duration-300",
                    "hover:border-white/40 hover:bg-white/10",
                    "cursor-pointer",
                    uploadingAvatar && "opacity-50 cursor-not-allowed"
                  )}>
                    <Upload className="w-4 h-4" />
                    {uploadingAvatar ? "Enviando..." : "Trocar foto"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={uploadingAvatar}
                    />
                  </label>
                </div>

                {/* Nome */}
                <div>
                  <label className="font-body text-xs text-text-muted mb-2 block">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="font-body text-xs text-text-muted mb-2 block">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
                    placeholder="Uma breve descrição sobre você..."
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={saveProfile}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2",
                      "rounded-full bg-primary px-6 py-3",
                      "font-body text-sm font-semibold text-primary-fg",
                      "transition-all duration-300",
                      "hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                    )}
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setEditingProfile(false);
                      if (profile) {
                        setProfileData({
                          name: profile.name,
                          bio: profile.bio || "",
                          avatar_url: profile.avatar_url || "",
                        });
                      }
                    }}
                    className={cn(
                      "inline-flex items-center justify-center",
                      "rounded-full border border-white/20 bg-white/5 px-4 py-3",
                      "font-body text-sm font-semibold text-text-main",
                      "backdrop-blur-sm transition-all duration-300",
                      "hover:border-white/40 hover:bg-white/10"
                    )}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main - Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          {profile ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-white">
                  Meus Links
                </h2>
                <button
                  onClick={() =>
                    setEditingLink({
                      title: "",
                      url: "",
                      icon: "🔗",
                      order_num: links.length,
                    })
                  }
                  className={cn(
                    "group inline-flex items-center justify-center gap-2",
                    "rounded-full bg-primary px-6 py-3",
                    "font-body text-sm font-semibold text-primary-fg",
                    "transition-all duration-300",
                    "hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                  )}
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
                        placeholder="🔗"
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
                      className={cn(
                        "flex-1 inline-flex items-center justify-center gap-2",
                        "rounded-full bg-primary px-6 py-3",
                        "font-body text-sm font-semibold text-primary-fg",
                        "transition-all duration-300",
                        "hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                      )}
                    >
                      <Save className="w-4 h-4" />
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingLink(null)}
                      className={cn(
                        "inline-flex items-center justify-center",
                        "rounded-full border border-white/20 bg-white/5 px-6 py-3",
                        "font-body text-sm font-semibold text-text-main",
                        "backdrop-blur-sm transition-all duration-300",
                        "hover:border-white/40 hover:bg-white/10"
                      )}
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
              {loading ? (
                <>
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                  <p className="font-body text-text-muted">
                    {creatingProfile ? "Criando seu perfil..." : "Carregando perfil..."}
                  </p>
                </>
              ) : (
                <p className="font-body text-text-muted">
                  Erro ao carregar perfil. Tente recarregar a página.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
