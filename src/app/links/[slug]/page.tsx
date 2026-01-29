"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import type { LinkProfile, LinkItem } from "@/types/supabase";

type Data = { profile: LinkProfile; links: LinkItem[] } | null;

export default function LinkProfilePage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [data, setData] = useState<Data>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFoundState(true);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/links/${encodeURIComponent(slug)}`);
        if (!res.ok) {
          if (res.status === 404) setNotFoundState(true);
          setLoading(false);
          return;
        }
        const json = await res.json();
        if (!cancelled) {
          setData({ profile: json.profile, links: json.links ?? [] });
        }
      } catch {
        if (!cancelled) setNotFoundState(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (notFoundState) {
    notFound();
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="animate-pulse rounded-full h-12 w-12 border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  const { profile, links } = data;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-white/10 shadow-2xl">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-display text-white text-4xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            {profile.name}
          </h1>

          {profile.bio && (
            <p className="font-body text-base text-text-muted max-w-sm mx-auto leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3 mb-8">
          {links.map((link: LinkItem) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 rounded-xl bg-white text-black hover:bg-primary hover:text-primary-fg transition-all duration-300 group shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                {link.icon && (
                  <span className="text-2xl flex-shrink-0">{link.icon}</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-body text-base font-semibold text-black group-hover:text-primary-fg transition-colors">
                    {link.title}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-black/40 group-hover:text-primary-fg/80 transition-colors flex-shrink-0" />
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

        <div className="text-center mt-8">
          <a
            href="/"
            className="font-body text-sm text-text-muted hover:text-primary transition-colors"
          >
            Baianê Agência
          </a>
        </div>
      </div>
    </div>
  );
}
