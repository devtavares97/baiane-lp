import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ExternalLink } from "lucide-react";
import type { LinkProfile, LinkItem } from "@/types/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProfileData(slug: string) {
  if (!supabase) return null;

  const { data: profile } = await supabase
    .from("link_profiles")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!profile) return null;

  const { data: links } = await supabase
    .from("link_items")
    .select("*")
    .eq("profile_id", (profile as any).id)
    .eq("is_active", true)
    .order("order_num", { ascending: true });

  return { profile: profile as LinkProfile, links: (links || []) as LinkItem[] };
}

export default async function LinkProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getProfileData(slug);

  if (!data) {
    notFound();
  }

  const { profile, links } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-4 flex items-center justify-center">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="font-display text-white text-3xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            {profile.name}
          </h1>
          {profile.bio && (
            <p className="font-body text-text-muted">{profile.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link: LinkItem) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                {link.icon && (
                  <span className="text-3xl flex-shrink-0">{link.icon}</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-body text-lg font-medium text-white group-hover:text-primary transition-colors">
                    {link.title}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </a>
          ))}
        </div>

        {links.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-white/5 border border-white/10">
            <p className="font-body text-text-muted">
              Nenhum link disponível no momento
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="font-body text-sm text-text-muted hover:text-primary transition-colors"
          >
            SimplesmenteDigital.com
          </a>
        </div>
      </div>
    </div>
  );
}
