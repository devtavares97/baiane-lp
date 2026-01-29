import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { LinkProfile, LinkItem } from "@/types/supabase";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("link_profiles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const profileTyped = profile as LinkProfile;

  const { data: links } = await supabase
    .from("link_items")
    .select("*")
    .eq("profile_id", profileTyped.id)
    .order("order_num", { ascending: true });

  return NextResponse.json({
    profile: profileTyped,
    links: (links || []) as LinkItem[],
  });
}
