# 🧩 ROADMAP DE COMPONENTES - FASE 2

**Referência:** Este documento detalha a estrutura de componentes a serem desenvolvidos.

---

## 📋 Estrutura Proposta

```
src/components/
├── ui/                          # Componentes base (shadcn)
│   ├── button.tsx
│   ├── input.tsx
│   ├── select.tsx
│   └── form.tsx
│
├── base/                        # Componentes reutilizáveis do projeto
│   ├── SectionContainer.tsx     # Wrapper de seções (padding/max-width)
│   ├── SectionHeader.tsx        # Títulos e subtítulos padronizados
│   └── Button.tsx               # Botão com variantes da marca
│
├── layout/                      # Componentes de layout
│   ├── Navbar.tsx               # Navegação sticky
│   └── Footer.tsx               # Rodapé com formulário
│
└── sections/                    # Seções da landing page
    ├── Hero.tsx                 # Hero com grid layout
    ├── PainSection.tsx          # Seção da dor do cliente
    ├── MethodSection.tsx        # Framework dos 3 pilares
    ├── ServicesGrid.tsx         # Grid de serviços
    ├── SocialProof.tsx          # Estatísticas + logos
    └── FilterSection.tsx        # Para quem é/não é
```

---

## 🎯 Ordem de Desenvolvimento Sugerida

### ETAPA 1: Base Components (30min)
Componentes reutilizáveis que serão usados em todo o projeto.

#### 1.1 SectionContainer
```tsx
interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}

// Gerencia:
// - py-16 md:py-24 (padding vertical)
// - container mx-auto (max-width horizontal)
// - px-4 md:px-6 (padding horizontal)
```

#### 1.2 SectionHeader
```tsx
interface SectionHeaderProps {
  headline: string;
  subheadline?: string;
  align?: "left" | "center";
  badge?: string;
}

// Gerencia:
// - Tipografia (Syne para headline)
// - Alinhamento
// - Badge opcional acima do título
```

#### 1.3 Button (Customizado)
```tsx
interface ButtonProps {
  variant: "primary" | "secondary" | "outline";
  size?: "default" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

// Primary: bg-primary + glow effect
// Secondary: card-glass + border
// Outline: border only
```

---

### ETAPA 2: Layout Components (45min)

#### 2.1 Navbar
**Features:**
- Sticky no topo
- Transparente inicial → `bg-black/60 backdrop-blur-md` ao scroll
- Logo SVG à esquerda
- Links de navegação (scroll suave)
- CTA destacado à direita
- Mobile: Hamburger menu

**Estado:**
```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  // ...
}, []);
```

**Animação:**
- Framer Motion para entrada
- Links com hover effect (underline ou glow)

---

#### 2.2 Footer
**Features:**
- CTA final (headline + subheadline)
- Formulário integrado (React Hook Form + Zod)
- Links sociais
- Copyright + localização

**Formulário:**
```tsx
const formSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  company: z.string().url("URL inválida").or(z.string().startsWith("@")),
  challenge: z.enum([...content.footer.form.challengeOptions]),
});
```

---

### ETAPA 3: Content Sections (2-3h)

#### 3.1 Hero (45min)
**Layout:**
- Grid: 2 colunas no desktop (texto | visual)
- Mobile: Stack (texto → visual)

**Animação:**
```tsx
// Fade-up escalonado
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
```

**Elementos:**
- Badge sutil
- H1 com tipografia fluida (`text-5xl md:text-7xl`)
- Subheadline
- 2 CTAs (Primary + Secondary)
- Visual placeholder com grayscale effect

---

#### 3.2 PainSection (30min)
**Design:**
- Fundo contrastante (`bg-surface`)
- Tipografia focada (texto grande e impactante)
- 3 parágrafos empilhados

**Layout:**
```tsx
<SectionContainer className="bg-surface">
  <SectionHeader headline={content.pain.headline} align="center" />
  <div className="max-w-3xl mx-auto space-y-6">
    {content.pain.description.map((text, i) => (
      <p key={i} className="text-lg text-text-muted">{text}</p>
    ))}
  </div>
</SectionContainer>
```

---

#### 3.3 MethodSection (45min)
**Design:**
- 3 cards (pilares do framework)
- Ícones Lucide
- Staggered animation (entrada escalonada)

**Grid:**
```tsx
// Mobile: Stack (1col)
// Tablet: 2col
// Desktop: 3col
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Card:**
```tsx
<motion.div
  className="card-glass p-8 hover:border-white/30"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1 }}
>
  <Icon className="w-12 h-12 mb-4" />
  <h3>{card.title}</h3>
  <p>{card.description}</p>
</motion.div>
```

---

#### 3.4 ServicesGrid (30min)
**Grid:**
```tsx
// 1col mobile → 2col tablet → 4col desktop
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

**Card:**
- Fundo: `bg-surface`
- Hover: `hover:bg-surface-hover hover:scale-[1.02]`
- Sombra sutil

---

#### 3.5 SocialProof (45min)
**Duas partes:**

**A) Estatísticas:**
```tsx
// Grid horizontal com 3 stats
<div className="grid grid-cols-3 gap-8 text-center">
  <div>
    <p className="text-5xl font-display font-bold">5M+</p>
    <p className="text-text-muted">Alcance Gerado</p>
  </div>
  // ...
</div>
```

**B) Marquee de Logos:**
```tsx
// Scroll infinito horizontal (logos de clientes)
// Monocromático (grayscale)
// Usando CSS animation ou Framer Motion
```

---

#### 3.6 FilterSection (30min)
**Layout:**
- Duas colunas (Para quem é | Para quem não é)
- Verde/Vermelho ou Check/X para indicadores

**Grid:**
```tsx
<div className="grid md:grid-cols-2 gap-8">
  <div className="card-glass p-8">
    <h3 className="text-green-400">✓ Para quem é</h3>
    <ul>
      {content.filter.isFor.map(...)}
    </ul>
  </div>
  <div className="card-glass p-8">
    <h3 className="text-red-400">✗ Para quem não é</h3>
    <ul>
      {content.filter.isNotFor.map(...)}
    </ul>
  </div>
</div>
```

---

## 🎨 Padrões de Animação

### Fade Up (Padrão)
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Stagger (Listas)
```tsx
variants={{
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}}
```

### Hover (Cards)
```tsx
whileHover={{ y: -2, transition: { duration: 0.2 } }}
```

---

## 📦 Instalações Adicionais Necessárias

### Para Formulário
```bash
npx shadcn@latest add form input select
npm install react-hook-form zod @hookform/resolvers
```

### Para Animações Avançadas
```bash
# Já instalado: framer-motion
```

---

## 🧪 Checklist de Desenvolvimento

### Base Components
- [ ] SectionContainer.tsx
- [ ] SectionHeader.tsx
- [ ] Button.tsx

### Layout
- [ ] Navbar.tsx (com scroll effect)
- [ ] Footer.tsx (com formulário)

### Sections
- [ ] Hero.tsx
- [ ] PainSection.tsx
- [ ] MethodSection.tsx
- [ ] ServicesGrid.tsx
- [ ] SocialProof.tsx
- [ ] FilterSection.tsx

### Finalização
- [ ] Integrar todas as seções em page.tsx
- [ ] Testar responsividade
- [ ] Ajustar animações
- [ ] Validar formulário
- [ ] Performance audit

---

## 🎯 Estimativa de Tempo

| Etapa | Tempo |
|-------|-------|
| Base Components | 30min |
| Navbar | 30min |
| Footer | 45min |
| Hero | 45min |
| PainSection | 30min |
| MethodSection | 45min |
| ServicesGrid | 30min |
| SocialProof | 45min |
| FilterSection | 30min |
| **TOTAL** | **~6h** |

---

## 📚 Referências Rápidas

- **Content:** `src/data/content.ts`
- **Design Tokens:** `src/app/globals.css`
- **Scope Técnico:** `../scope.md`
- **Design System:** `../design_system.md`

---

**Next:** Começar com os Base Components (SectionContainer, SectionHeader, Button)
