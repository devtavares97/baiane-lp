# 🎨 Baianê Agência - Landing Page

> **Landing Page de alta conversão** focada em estratégia e identidade cultural.  
> Design System: **Bahia Noir** (Dark Mode) - Dark Energy & Bahia Noir

---

## 📋 Visão Geral

**Objetivo:** Captura de leads qualificados (B2B) para diagnóstico estratégico.  
**Filosofia:** Component-Driven Development - código modular, limpo e escalável.

---

## 🚀 Tech Stack

| Categoria | Tecnologia |
|-----------|-----------|
| **Framework** | Next.js 14+ (App Router) |
| **Linguagem** | TypeScript (Strict Mode) |
| **Estilização** | Tailwind CSS v4 (CSS Variables) |
| **UI Kit** | Shadcn/ui (Radix Primitives) |
| **Ícones** | Lucide React |
| **Animações** | Framer Motion |
| **Fontes** | Syne (Display) + Inter (Body) |
| **Deploy** | Vercel |

---

## 🎨 Design System - Bahia Noir

### Paleta de Cores (Monocromática)

```css
--background: #050505      /* Preto quase absoluto */
--surface: #121212         /* Cartões e seções */
--surface-hover: #1A1A1A   /* Hover states */
--border: #262626          /* Divisórias sutis */
--primary: #FFFFFF         /* Cor de ação (Branco) */
--primary-fg: #000000      /* Texto em primary */
--text-main: #FFFFFF       /* Títulos */
--text-muted: #A3A3A3      /* Parágrafos */
```

### Tipografia

- **Display (Syne):** Títulos principais (H1, H2) - Extravagante, larga, artística
- **Body (Inter):** Todo o resto do texto - Leitura perfeita, neutra

### Efeitos Especiais

- **Noise Texture:** Granulação sutil (opacity: 0.03) sobre o fundo para evitar aspecto "plástico"
- **Glow Effect:** `0 0 25px -5px var(--primary)` em elementos-chave
- **Grayscale Images:** Todas as imagens em P&B por padrão, coloridas no hover

---

## 📁 Estrutura do Projeto

```
baiane-lp/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root Layout + Fontes
│   │   ├── page.tsx        # Home Page
│   │   └── globals.css     # Design Tokens + Tailwind
│   ├── data/
│   │   └── content.ts      # Copywriting estruturado
│   ├── lib/
│   │   └── utils.ts        # Helpers (clsx + tailwind-merge)
│   └── components/         # (A ser criado na Fase 2)
├── public/
│   └── images/
│       ├── hero/
│       ├── logos/
│       └── textures/
├── next.config.ts          # Configuração do Next.js
├── tailwind.config.ts      # (Não usado - Tailwind v4)
└── components.json         # Shadcn/ui config
```

---

## 🛠️ Setup & Instalação

### 1. Instalar Dependências

```bash
npm install
```

### 2. Rodar em Desenvolvimento

```bash
npm run dev
```

### 3. Build de Produção

```bash
npm run build
npm start
```

---

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "next": "^16.1.5",
    "react": "^19.0.0",
    "typescript": "^5.7.2",
    "tailwindcss": "^4.0.0",
    "framer-motion": "^11.x",
    "lucide-react": "^0.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  }
}
```

---

## 🎯 Próximos Passos (Fase 2)

### Componentes a Desenvolver

1. **Navbar** - Sticky com backdrop-blur e scroll effect
2. **Hero** - Grid layout com animações Framer Motion
3. **PainSection** - Foco tipográfico na dor do cliente
4. **MethodSection** - Cards dos 3 pilares (staggered animation)
5. **ServicesGrid** - Grid responsivo com hover effects
6. **SocialProof** - Estatísticas + marquee de logos
7. **FilterSection** - Comparativo "Para quem é/não é"
8. **Footer** - CTA final + formulário (React Hook Form + Zod)

---

## 📐 Regras de Desenvolvimento

### A. Reusabilidade (DRY)
- Criar componentes base: `<SectionContainer>`, `<SectionHeader>`, `<Button>`
- Evitar repetição de classes Tailwind

### B. Otimização
- ✅ Usar `<Image />` do Next.js sempre
- ✅ Carregar fontes via `next/font`
- ✅ `'use client'` apenas nas folhas (mantendo Server Components)

### C. Responsividade
- ✅ Mobile-First approach
- ✅ Touch targets mínimos de 44px

---

## 🎨 Componentes Base Sugeridos

### SectionContainer
Gerencia padding vertical e max-width horizontal de forma consistente.

```tsx
<SectionContainer>
  {/* Conteúdo */}
</SectionContainer>
```

### Button
Variantes Primary e Secondary com efeitos do Design System.

```tsx
<Button variant="primary">CTA Primário</Button>
<Button variant="secondary">CTA Secundário</Button>
```

---

## 📚 Referências

- **[Scope](../scope.md)** - Escopo técnico completo
- **[Design System](../design_system.md)** - Documentação visual detalhada
- **[Content](./src/data/content.ts)** - Copywriting e dados

---

## 🌊 "Vibe Coding"

> *"A estética atrai. O método vende."*  
> Código limpo, design impactante, performance mensurável.

**Da Bahia para o mundo.**

---

**Status:** ✅ Fase 1 Completa - Setup & Foundation  
**Próximo:** Desenvolvimento de Componentes Visuais

---

*Desenvolvido com ❤️ seguindo as melhores práticas de Next.js e Tailwind CSS.*
