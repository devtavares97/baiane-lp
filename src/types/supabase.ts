/**
 * SUPABASE DATABASE TYPES
 * ------------------------
 * Tipos TypeScript gerados com base no schema do Supabase.
 * 
 * Para regenerar estes tipos:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
 */

export interface Database {
  public: {
    Tables: {
      company_logos: {
        Row: {
          id: string;
          name: string;
          image_url: string;
          order: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          image_url: string;
          order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          image_url?: string;
          order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      portfolio_images: {
        Row: {
          id: string;
          image_url: string;
          caption: string | null;
          alt: string;
          order: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          caption?: string | null;
          alt?: string;
          order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          caption?: string | null;
          alt?: string;
          order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          image_url: string;
          category: 'portfolio' | 'logo';
          caption: string | null;
          alt: string;
          order: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          category: 'portfolio' | 'logo';
          caption?: string | null;
          alt?: string;
          order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          category?: 'portfolio' | 'logo';
          caption?: string | null;
          alt?: string;
          order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads_diagnostic: {
        Row: {
          id: string;
          created_at: string;
          contact_name: string;
          contact_email: string;
          contact_whatsapp: string | null;
          revenue_tier: 'up_to_30k' | '30k_to_100k' | '100k_to_500k' | 'above_500k';
          main_pain: 'conversion' | 'branding' | 'channel' | 'sales_process';
          team_structure: 'solo' | 'freelancer' | 'agency' | 'in_house' | null;
          maturity_score: number;
          result_archetype: string;
          user_agent: string | null;
          referrer: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          contact_name: string;
          contact_email: string;
          contact_whatsapp?: string | null;
          revenue_tier: 'up_to_30k' | '30k_to_100k' | '100k_to_500k' | 'above_500k';
          main_pain: 'conversion' | 'branding' | 'channel' | 'sales_process';
          team_structure?: 'solo' | 'freelancer' | 'agency' | 'in_house' | null;
          maturity_score?: number;
          result_archetype: string;
          user_agent?: string | null;
          referrer?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          contact_name?: string;
          contact_email?: string;
          contact_whatsapp?: string | null;
          revenue_tier?: 'up_to_30k' | '30k_to_100k' | '100k_to_500k' | 'above_500k';
          main_pain?: 'conversion' | 'branding' | 'channel' | 'sales_process';
          team_structure?: 'solo' | 'freelancer' | 'agency' | 'in_house' | null;
          maturity_score?: number;
          result_archetype?: string;
          user_agent?: string | null;
          referrer?: string | null;
        };
      };
      link_profiles: {
        Row: {
          id: string;
          slug: string;
          name: string;
          bio: string | null;
          avatar_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      link_items: {
        Row: {
          id: string;
          profile_id: string;
          title: string;
          url: string;
          icon: string | null;
          order_num: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          title: string;
          url: string;
          icon?: string | null;
          order_num?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          title?: string;
          url?: string;
          icon?: string | null;
          order_num?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Helper types para facilitar o uso
export type CompanyLogo = Database['public']['Tables']['company_logos']['Row'];
export type PortfolioImage = Database['public']['Tables']['portfolio_images']['Row'];
export type GalleryItem = Database['public']['Tables']['gallery']['Row'];
export type Lead = Database['public']['Tables']['leads_diagnostic']['Row'];
export type LinkProfile = Database['public']['Tables']['link_profiles']['Row'];
export type LinkItem = Database['public']['Tables']['link_items']['Row'];
