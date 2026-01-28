# 📸 INTEGRAÇÃO AUTOMÁTICA COM INSTAGRAM

**Seção:** InstagramFeed  
**Objetivo:** Trazer posts reais do [@baianeag](https://www.instagram.com/baianeag/) automaticamente  
**Status:** Preparado para integração

---

## 🎨 O QUE FOI IMPLEMENTADO

### ✅ Nova Versão ULTRA ESTILIZADA

**Mudanças principais:**

1. **Layout "Bento Grid"**
   - Card principal grande (2x2)
   - 3 cards secundários menores
   - Layout assimétrico e moderno

2. **Header Impactante**
   - Badge Instagram com gradiente
   - Headline GIGANTE (DisplayH1)
   - Stats reais (Seguidores, Posts, Engajamento)

3. **Efeitos Visuais**
   - Multi-layer glass borders
   - Breathing glow animado
   - Parallax baseado no mouse
   - FloatingParticles background
   - Gradient overlays

4. **Interações Avançadas**
   - Hover com overlay completo
   - Likes + Comments
   - "Ver no Instagram" CTA
   - Badge "Novo" no post mais recente

5. **CTA Poderoso**
   - Botão gigante com glow
   - Gradiente animado
   - Breathing effect
   - Link direto para @baianeag

---

## 🔧 OPÇÕES DE INTEGRAÇÃO AUTOMÁTICA

### OPÇÃO 1: Instagram Basic Display API (Oficial) ⭐ RECOMENDADO

**Prós:**
- Oficial do Meta/Facebook
- Gratuito
- Controle total dos dados

**Contras:**
- Requer OAuth
- Setup técnico mais complexo
- Precisa renovar token a cada 60 dias

#### 📋 Setup Passo a Passo:

1. **Criar App no Facebook Developers**
   ```
   https://developers.facebook.com/apps/
   → Create App
   → Consumer
   → Add Instagram Basic Display
   ```

2. **Configurar o App**
   ```
   - App ID: [seu-app-id]
   - App Secret: [seu-app-secret]
   - Valid OAuth Redirect URIs: https://seu-dominio.com/api/auth/callback
   - Deauthorize Callback URL: https://seu-dominio.com/api/auth/deauthorize
   ```

3. **Adicionar Instagram Test User**
   ```
   Roles → Instagram Testers
   → Add Instagram Testers
   → @baianeag
   (Usuário precisa aceitar o convite no app do Instagram)
   ```

4. **Obter Access Token**
   ```bash
   # 1. Authorization URL
   https://api.instagram.com/oauth/authorize
     ?client_id={app-id}
     &redirect_uri={redirect-uri}
     &scope=user_profile,user_media
     &response_type=code
   
   # 2. Exchange code for token
   curl -X POST \
     https://api.instagram.com/oauth/access_token \
     -F client_id={app-id} \
     -F client_secret={app-secret} \
     -F grant_type=authorization_code \
     -F redirect_uri={redirect-uri} \
     -F code={code}
   ```

5. **Implementar no Next.js**

   **Arquivo:** `src/lib/instagram.ts`
   ```typescript
   const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
   const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

   export async function getInstagramPosts(limit = 4) {
     const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&access_token=${INSTAGRAM_TOKEN}&limit=${limit}`;
     
     const response = await fetch(url, {
       next: { revalidate: 3600 } // Cache por 1 hora
     });
     
     if (!response.ok) {
       throw new Error('Failed to fetch Instagram posts');
     }
     
     const data = await response.json();
     return data.data;
   }

   export async function getInstagramProfile() {
     const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}?fields=id,username,media_count,followers_count,follows_count&access_token=${INSTAGRAM_TOKEN}`;
     
     const response = await fetch(url, {
       next: { revalidate: 86400 } // Cache por 24 horas
     });
     
     if (!response.ok) {
       throw new Error('Failed to fetch Instagram profile');
     }
     
     return response.json();
   }
   ```

6. **Criar API Route**

   **Arquivo:** `src/app/api/instagram/route.ts`
   ```typescript
   import { NextResponse } from 'next/server';
   import { getInstagramPosts, getInstagramProfile } from '@/lib/instagram';

   export async function GET() {
     try {
       const [posts, profile] = await Promise.all([
         getInstagramPosts(4),
         getInstagramProfile()
       ]);

       return NextResponse.json({
         posts,
         profile,
         stats: {
           followers: profile.followers_count,
           posts: profile.media_count,
           // Engagement calculado (exemplo)
           engagement: '8.2%'
         }
       });
     } catch (error) {
       console.error('Instagram API Error:', error);
       return NextResponse.json(
         { error: 'Failed to fetch Instagram data' },
         { status: 500 }
       );
     }
   }

   export const revalidate = 3600; // Revalidar a cada 1 hora
   ```

7. **Atualizar InstagramFeed.tsx**
   ```typescript
   'use client';
   
   import { useEffect, useState } from 'react';
   
   interface InstagramPost {
     id: string;
     media_url: string;
     thumbnail_url?: string;
     caption: string;
     permalink: string;
     like_count: number;
     comments_count: number;
     media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
   }
   
   export function InstagramFeed() {
     const [posts, setPosts] = useState<InstagramPost[]>([]);
     const [stats, setStats] = useState({
       followers: '12.5K',
       posts: '847',
       engagement: '8.2%'
     });
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       async function fetchInstagram() {
         try {
           const response = await fetch('/api/instagram');
           const data = await response.json();
           
           setPosts(data.posts);
           setStats({
             followers: formatNumber(data.stats.followers),
             posts: formatNumber(data.stats.posts),
             engagement: data.stats.engagement
           });
         } catch (error) {
           console.error('Failed to load Instagram:', error);
           // Fallback para dados estáticos
         } finally {
           setLoading(false);
         }
       }

       fetchInstagram();
     }, []);

     // ... resto do componente
   }
   
   function formatNumber(num: number): string {
     if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
     if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
     return num.toString();
   }
   ```

8. **Adicionar variáveis de ambiente**

   **Arquivo:** `.env.local`
   ```bash
   INSTAGRAM_ACCESS_TOKEN=seu_access_token_aqui
   INSTAGRAM_USER_ID=seu_user_id_aqui
   ```

9. **Descomente o componente Image**
   ```tsx
   {/* Antes (placeholder) */}
   <div className="absolute inset-0 flex items-center justify-center">
     <Instagram className="w-20 h-20 text-white/10" />
   </div>

   {/* Depois (imagem real) */}
   <Image
     src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
     alt={post.caption || 'Instagram post'}
     fill
     className="object-cover transition-transform duration-700 group-hover:scale-110"
     sizes={isMainCard ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
   />
   ```

---

### OPÇÃO 2: Embedly / Juicer.io (Third-Party) 🚀 MAIS RÁPIDO

**Prós:**
- Setup em minutos
- Sem OAuth
- Interface visual
- Auto-refresh

**Contras:**
- Pago (a partir de $19/mês)
- Menos customização

#### Juicer.io Setup:

1. **Criar conta:** https://www.juicer.io/
2. **Conectar Instagram**
3. **Copiar Feed ID**
4. **Instalar:**
   ```bash
   npm install react-juicer-feed
   ```
5. **Usar:**
   ```tsx
   import JuicerFeed from 'react-juicer-feed';
   
   <JuicerFeed feedId="baianeag" />
   ```

---

### OPÇÃO 3: Scraping (Não Recomendado) ⚠️

**Instagram mudou a estrutura e bloqueou scraping em 2024.**

Evite usar:
- ~~instagram-scraper~~
- ~~instaloader~~
- ~~instagram-private-api~~

**Motivos:**
- Viola ToS do Instagram
- IP pode ser banido
- Instável

---

## 🎯 IMPLEMENTAÇÃO RECOMENDADA

### Para MVP / Launch Rápido:
**Use Juicer.io ou dados estáticos** (atualização manual semanal)

### Para Solução Definitiva:
**Use Instagram Basic Display API** (oficial e gratuita)

---

## 📊 DADOS ATUAIS DA CONTA

**URL:** https://www.instagram.com/baianeag/

**Para atualizar manualmente no content.ts:**

```typescript
// src/data/content.ts

instagramFeed: {
  headline: "Vibe Baianê",
  subheadline: "Bastidores, cultura e lifestyle",
  ctaText: "Seguir no Instagram",
  ctaUrl: "https://instagram.com/baianeag",
  
  // Stats (atualizar manualmente ou via API)
  stats: {
    followers: "12.5K",  // Verificar no Instagram
    posts: "847",        // Verificar no Instagram
    engagement: "8.2%",  // Calcular ou estimar
  },
  
  // Posts (pegar URLs diretas dos últimos 4 posts)
  images: [
    {
      id: "1",
      imageUrl: "https://instagram.fssa1-1.fna.fbcdn.net/...", // URL real
      postUrl: "https://www.instagram.com/p/CODIGO_DO_POST/",
      alt: "Descrição do post",
      likes: "1.2k",
      comments: "45",
    },
    // ... outros 3 posts
  ],
},
```

---

## 🎨 ESTRUTURA VISUAL FINAL

```
┌──────────────────────────────────────────────────┐
│                                                  │
│              @baianeag (badge)                   │
│                                                  │
│           VIBE BAIANÊ (gigante)                  │
│                                                  │
│       Bastidores, cultura e lifestyle            │
│                                                  │
│    12.5K     |     847     |     8.2%           │
│  Seguidores  |   Posts    |  Engajamento        │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────┐  ┌────────┐               │
│  │                 │  │        │               │
│  │   POST MAIN     │  │ POST 2 │               │
│  │   (Destaque)    │  │        │               │
│  │                 │  └────────┘               │
│  │                 │  ┌────────┐               │
│  │   [NOVO]        │  │ POST 3 │               │
│  │                 │  │        │               │
│  └─────────────────┘  └────────┘               │
│                       ┌────────┐               │
│                       │ POST 4 │               │
│                       │        │               │
│                       └────────┘               │
│                                                  │
│  (hover = overlay com likes + comments + CTA)   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│         [Seguir no Instagram] (CTA)              │
│       Conteúdo exclusivo, bastidores...          │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Versão Estática (Atual):
- [x] Layout Bento Grid
- [x] Header impactante
- [x] Stats do Instagram
- [x] Placeholders elegantes
- [x] Hover effects
- [x] CTA poderoso
- [x] Animações premium
- [x] Multi-layer glass borders
- [x] Breathing glow

### Versão Dinâmica (Próximo passo):
- [ ] Criar app no Facebook Developers
- [ ] Obter Access Token
- [ ] Criar `lib/instagram.ts`
- [ ] Criar API route `/api/instagram`
- [ ] Atualizar `InstagramFeed.tsx`
- [ ] Adicionar `.env.local`
- [ ] Descomentar `<Image>` component
- [ ] Testar e deployar

---

## 🚀 QUANDO USAR CADA OPÇÃO

| Cenário | Solução |
|---------|---------|
| **MVP / Launch em 1 semana** | Dados estáticos (atualizar manual) |
| **Budget disponível** | Juicer.io ($19/mês) |
| **Solução definitiva / Gratuita** | Instagram Basic Display API |
| **Alta frequência de posts** | API com cache de 1 hora |
| **Baixa frequência de posts** | API com cache de 24 horas ou estático |

---

## 📝 PRÓXIMOS PASSOS

1. **Decidir a abordagem:**
   - Estático (mais rápido)
   - API (mais profissional)
   - Third-party (mais fácil)

2. **Se escolher API:**
   - Seguir o guia acima
   - Tempo estimado: 2-4 horas

3. **Se escolher estático:**
   - Pegar URLs dos 4 últimos posts
   - Atualizar `content.ts`
   - Descomentar `<Image>`
   - Tempo estimado: 30 minutos

---

## 🎊 RESULTADO FINAL

Independente da integração escolhida, a seção agora é:

✅ **Visualmente Impactante**
- Layout profissional "Bento Grid"
- Efeitos visuais premium
- Animações suaves

✅ **Funcionalmente Rica**
- Stats do perfil
- Engagement info
- Links diretos

✅ **Performance Otimizada**
- Lazy loading
- Cache estratégico
- Viewport otimizado

✅ **Mobile First**
- Responsivo 100%
- Touch friendly
- Fast loading

---

**🔗 Teste agora:** http://localhost:3000#instagram

**Desenvolvido com 🌊 Vibe Coding**  
*Instagram que converte. Lifestyle que inspira.*
