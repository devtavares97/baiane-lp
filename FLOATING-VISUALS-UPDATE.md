# ✅ FLOATING VISUALS UPDATE - Baianê Landing Page

## 📋 Resumo

Implementação de **3 seções** com **slots dedicados para elementos visuais flutuantes** (Floating Visuals), mantendo o Design System "Bahia Noir" intacto.

---

## 🎨 Design System Preservado

**IMPORTANTE:** Todas as mudanças mantêm as configurações existentes:
- ✅ Paleta de cores (Monocromática: Preto + Branco)
- ✅ Tipografia (Syne + Inter)
- ✅ Background base (#050505)
- ✅ Efeitos e animações (Framer Motion)

---

## 🆕 Seções Implementadas/Refatoradas

### 1️⃣ **TeamSection** (NOVA)
**Arquivo:** `src/components/sections/TeamSection.tsx`

**Características:**
- ✅ Horizontal scrollable carousel
- ✅ 5 cards de membros do time (Pedro, Ana, João, Maria, Carlos)
- ✅ Layout: Square image + Name + Role
- ✅ **FLOATING VISUAL SLOT (Top-Right):** Container posicionado absolutamente para inserir imagem decorativa (orb, symbol, etc.)

**Estrutura do Card:**
```tsx
- Square image container (aspect-square)
- Role badge (uppercase, small text)
- Name (large, bold)
- Animated underline on hover
```

**Efeitos:**
- Parallax effect no floating element (y transform)
- Fade gradients nas bordas do carousel
- Lift animation (y: -8) no hover dos cards
- Scroll hint no mobile

**Como usar o slot:**
```tsx
// Localização: Linha ~70
<motion.div style={{ y: floatingY, opacity: floatingOpacity }}>
  {/* SUBSTITUA por sua imagem: */}
  <Image 
    src="/images/floating-orb.png" 
    alt="" 
    width={400} 
    height={400}
    className="opacity-20"
  />
</motion.div>
```

---

### 2️⃣ **PainSection (Manifesto)** - REFATORADO
**Arquivo:** `src/components/sections/PainSection.tsx`

**Mudanças principais:**
- ✅ Layout typography-led (split-screen/central)
- ✅ Copy atualizado com texto do manifesto:
  - "O 'marketing bonitinho' está queimando o seu caixa?"
  - Destaque para frases-chave ("falta de rota", "doação para as plataformas")
  - Call-to-action: "Pare de gastar com vaidade. Comece a investir em performance."
- ✅ **2 FLOATING VISUAL SLOTS:**
  - **Slot 1 (Top-Left):** Para gráfico de performance ou ícone de warning
  - **Slot 2 (Bottom-Right):** Para shape abstrato ou elemento decorativo

**Efeitos:**
- Parallax effect independente para cada floating element
- Card destacado para parágrafo principal (glassmorphism)
- Animated underline no CTA final

**Como usar os slots:**

**Slot 1 (Top-Left) - Linha ~68:**
```tsx
<motion.div style={{ y: floatingTopY, opacity: floatingOpacity }}>
  {/* SUBSTITUA por sua imagem: */}
  <Image 
    src="/images/performance-graph.png" 
    alt="" 
    width={300} 
    height={300}
    className="opacity-30 mix-blend-screen"
  />
</motion.div>
```

**Slot 2 (Bottom-Right) - Linha ~84:**
```tsx
<motion.div style={{ y: floatingBottomY, opacity: floatingOpacity }}>
  {/* SUBSTITUA por sua imagem: */}
  <Image 
    src="/images/warning-icon.png" 
    alt="" 
    width={350} 
    height={350}
    className="opacity-20 mix-blend-overlay"
  />
</motion.div>
```

---

### 3️⃣ **Footer (High-Impact CTA)** - REFATORADO
**Arquivo:** `src/components/layout/Footer.tsx`

**Mudanças principais:**
- ✅ Layout simplificado: Tipografia gigante + Botão pill
- ✅ Headline: "Sua marca merece sair do improviso." (8xl em desktop!)
- ✅ Social icons minimalistas (Instagram, LinkedIn)
- ✅ Botão "Solicitar Proposta" (pill-shaped, grande)
- ✅ **FLOATING BACKGROUND SLOT:** Container para textura/imagem de fundo com parallax

**Layout:**
```
┌─────────────────────────────────────┐
│  [Huge Typography]                  │
│  "Sua marca merece..."              │
│                                     │
│  [Social Icons]  [Large Pill CTA]  │
└─────────────────────────────────────┘
```

**Efeitos:**
- Parallax effect no background (y transform + opacity fade)
- Glow effect no botão CTA
- Hover states nos social icons

**Como usar o slot:**

**Background Slot - Linha ~72:**
```tsx
<motion.div style={{ y: bgY, opacity: bgOpacity }}>
  {/* SUBSTITUA por sua imagem de fundo: */}
  <Image 
    src="/images/footer-texture.png" 
    alt="" 
    fill
    className="object-cover opacity-20 mix-blend-overlay"
  />
</motion.div>
```

---

## 📂 Arquivos Modificados/Criados

### Novos:
- ✅ `src/components/sections/TeamSection.tsx` (nova seção)
- ✅ `FLOATING-VISUALS-UPDATE.md` (esta documentação)

### Modificados:
- ✅ `src/components/sections/PainSection.tsx` (refatorado com slots)
- ✅ `src/components/layout/Footer.tsx` (redesenhado com slot)
- ✅ `src/components/sections/index.ts` (export do TeamSection)
- ✅ `src/app/page.tsx` (integração da TeamSection)
- ✅ `src/app/globals.css` (utility class `.scrollbar-hide`)

---

## 🎯 Recursos dos Floating Visuals

### 1. **Parallax Effect**
Todos os floating elements usam `useScroll` e `useTransform` do Framer Motion para criar movimento parallax suave baseado no scroll.

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"],
});

const floatingY = useTransform(scrollYProgress, [0, 1], [100, -100]);
const floatingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
```

### 2. **Positioning Strategy**
- `position: absolute`
- `z-index: 0` (atrás do conteúdo) ou `z-10` (na frente, quando necessário)
- `pointer-events: none` (não interfere com cliques)

### 3. **Blend Modes Recomendados**
- `mix-blend-screen` - Para luzes e glows
- `mix-blend-overlay` - Para texturas
- `opacity: 0.2-0.3` - Para sutileza

---

## 🚀 Como Adicionar Suas Imagens

### Passo 1: Preparar as Imagens
Coloque suas imagens na pasta `public/images/`:
```
public/
  images/
    floating-orb.png
    performance-graph.png
    warning-icon.png
    footer-texture.png
    team/
      pedro.jpg
      ana.jpg
      ...
```

### Passo 2: Importar o Next.js Image
```tsx
import Image from "next/image";
```

### Passo 3: Substituir os Placeholders
Localize os comentários `/* SUBSTITUA ESTE DIV POR SUA IMAGEM: */` em cada arquivo e substitua o placeholder pelo componente `<Image>`.

**Exemplo:**
```tsx
// ANTES (Placeholder)
<div className="w-64 h-64 rounded-full bg-white/5 blur-3xl" />

// DEPOIS (Imagem Real)
<Image 
  src="/images/floating-orb.png" 
  alt="" 
  width={400} 
  height={400}
  className="opacity-20 grayscale"
/>
```

---

## 📊 Estrutura Visual

```
┌─────────────────────────────────────────────┐
│  HERO                                       │
├─────────────────────────────────────────────┤
│  PAIN/MANIFESTO                             │
│  [Floating Visual TL] [Floating Visual BR]  │ ← 2 SLOTS
├─────────────────────────────────────────────┤
│  METHOD                                     │
├─────────────────────────────────────────────┤
│  SERVICES                                   │
├─────────────────────────────────────────────┤
│  SOCIAL PROOF                               │
├─────────────────────────────────────────────┤
│  TEAM (Horizontal Scroll)                   │
│  [Floating Visual TR]                       │ ← 1 SLOT
├─────────────────────────────────────────────┤
│  FILTER                                     │
├─────────────────────────────────────────────┤
│  FOOTER (High-Impact CTA)                   │
│  [Floating Background]                      │ ← 1 SLOT
└─────────────────────────────────────────────┘

Total: 4 Floating Visual Slots
```

---

## ✨ Próximos Passos

1. **Adicionar Imagens Reais:**
   - Fotos dos membros do time (TeamSection)
   - Gráficos/icons decorativos (PainSection)
   - Textura de fundo (Footer)
   - Orb/symbol decorativo (TeamSection)

2. **Ajustar Opacidade e Blend Modes:**
   - Testar diferentes valores de `opacity`
   - Experimentar `mix-blend-screen`, `overlay`, `multiply`

3. **Fine-tuning do Parallax:**
   - Ajustar valores de `useTransform` para controlar velocidade
   - Exemplo: `[100, -100]` → `[50, -50]` (movimento mais sutil)

4. **Testar Responsividade:**
   - Verificar posicionamento em mobile/tablet
   - Ajustar tamanhos (`w-64` → `w-48` em mobile, se necessário)

---

## 🎨 Dicas de Design

### Para Floating Visuals:
1. **Mantenha sutileza:** `opacity: 0.2-0.3` é ideal
2. **Use grayscale:** `className="grayscale"` mantém o Bahia Noir
3. **Blur backgrounds:** `blur-2xl` ou `blur-3xl` para suavidade
4. **Evite poluição visual:** Menos é mais

### Para as Imagens dos Cards:
1. **Preto e branco:** Todas as fotos devem ser grayscale
2. **Alto contraste:** Fotos artísticas, close-ups
3. **Quadradas:** `aspect-square` para consistência

---

## 📝 Notas Técnicas

- **Erros de Linter:** 0 ✅
- **Performance:** Parallax otimizado com `useTransform` (GPU-accelerated)
- **Acessibilidade:** `pointer-events: none` garante que floating elements não bloqueiem interações
- **Responsividade:** Todos os slots se adaptam a mobile/tablet

---

**Status:** ✅ **IMPLEMENTAÇÃO COMPLETA**

Todas as 3 seções estão prontas com slots para floating visuals. Basta adicionar suas imagens nos locais indicados!

**Última Atualização:** Janeiro 2026
