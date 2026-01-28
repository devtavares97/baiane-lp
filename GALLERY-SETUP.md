# 📸 SETUP DA GALERIA DE IMAGENS

**Status:** Configurado e pronto para uso!  
**Data:** 27 de Janeiro de 2026

---

## ✅ O QUE FOI IMPLEMENTADO

### 1. **Componente Gallery** (`InstagramFeed.tsx`)
- ✅ Removidos iframes do Instagram
- ✅ Implementado `<Image />` do Next.js
- ✅ Grid 4 colunas responsivo
- ✅ Hover overlay com legendas
- ✅ Animações suaves
- ✅ Multi-layer glass borders
- ✅ Breathing glow effect
- ✅ Otimização automática de imagens

### 2. **Estrutura de Dados** (`content.ts`)
- ✅ Novo tipo `GalleryImage`
- ✅ Array `galleryImages` com 4 slots
- ✅ Caminhos configurados para `/images/gallery/`
- ✅ Campo `caption` para legendas

### 3. **Estrutura de Pastas**
```
/public/images/gallery/
├── image-1.jpg  ← ADICIONE AQUI
├── image-2.jpg  ← ADICIONE AQUI
├── image-3.jpg  ← ADICIONE AQUI
├── image-4.jpg  ← ADICIONE AQUI
└── README.md    (guia completo)
```

---

## 🎯 COMO USAR

### PASSO 1: Preparar as Imagens

**Formato:**
- Tipo: JPG ou PNG
- Tamanho: 1080x1080px (quadrado)
- Qualidade: 90-100%
- Peso: Máx 500KB

**Dica:** Use https://tinypng.com/ para comprimir

### PASSO 2: Nomear os Arquivos

```
image-1.jpg
image-2.jpg
image-3.jpg
image-4.jpg
```

⚠️ **IMPORTANTE:** Nomes EXATAMENTE como acima!

### PASSO 3: Fazer Upload

Copie os arquivos para:
```
/public/images/gallery/
```

### PASSO 4: Atualizar Legendas (Opcional)

Edite `src/data/content.ts`:

```typescript
galleryImages: [
  {
    id: "1",
    imageUrl: "/images/gallery/image-1.jpg",
    alt: "Sua descrição aqui",
    caption: "Legenda que aparece no hover", // ← Edite aqui
  },
  // ... outras imagens
]
```

### PASSO 5: Testar

1. Reinicie o servidor (se necessário)
2. Acesse: http://localhost:3000#gallery
3. Verifique se as imagens aparecem

---

## 📊 CONFIGURAÇÃO ATUAL

### Imagens Configuradas:

| Slot | Arquivo | Legenda | Status |
|------|---------|---------|--------|
| 1 | image-1.jpg | "Cultura e identidade" | ⏳ Aguardando |
| 2 | image-2.jpg | "Salvador, Bahia" | ⏳ Aguardando |
| 3 | image-3.jpg | "Branding estratégico" | ⏳ Aguardando |
| 4 | image-4.jpg | "Performance criativa" | ⏳ Aguardando |

---

## 🎨 SUGESTÕES DE CONTEÚDO

### Ideias de Imagens:
1. **Equipe Baianê** - Time em ação, brainstorms
2. **Salvador** - Paisagens icônicas (Pelourinho, farol da Barra)
3. **Projetos** - Screenshots de cases, trabalhos
4. **Cultura** - Elementos culturais baianos
5. **Eventos** - Workshops, palestras

### Exemplos de Legendas:
- "Criatividade com raiz"
- "Salvador inspira cada projeto"
- "Estratégia que transforma"
- "Time Baianê em ação"
- "Cultura e performance"

---

## 🔧 FERRAMENTAS DE EDIÇÃO

### Online (Grátis):
- **Redimensionar:** https://www.iloveimg.com/resize-image
- **Comprimir:** https://tinypng.com/
- **Editar:** https://www.photopea.com/

### Apps:
- **Mac:** Preview, Pixelmator
- **Windows:** Paint, Photoshop
- **Mobile:** Snapseed, VSCO

---

## 🎯 LAYOUT FINAL

```
Desktop (4 cols):
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│         │ │         │ │         │ │         │
│ IMG 1   │ │ IMG 2   │ │ IMG 3   │ │ IMG 4   │
│         │ │         │ │         │ │         │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
  (hover = legenda aparece)

Mobile (2 cols):
┌─────────┐ ┌─────────┐
│ IMG 1   │ │ IMG 2   │
└─────────┘ └─────────┘
┌─────────┐ ┌─────────┐
│ IMG 3   │ │ IMG 4   │
└─────────┘ └─────────┘
```

---

## 🚀 FEATURES IMPLEMENTADAS

### Otimizações:
- ✅ Lazy loading automático
- ✅ Placeholder blur enquanto carrega
- ✅ Responsive images (diferentes tamanhos)
- ✅ WebP automático (quando possível)
- ✅ Quality 90 (balanço perfeito)

### Interações:
- ✅ Hover scale (zoom suave)
- ✅ Overlay com legenda
- ✅ Glow pulsante
- ✅ Transições suaves (700ms)

### Design:
- ✅ Multi-layer glass borders
- ✅ Background gradient no hover
- ✅ FloatingParticles background
- ✅ Radial spotlight
- ✅ Aspect ratio 1:1 (quadrado perfeito)

---

## ⚠️ TROUBLESHOOTING

### Imagem não aparece?
1. Verifique o nome do arquivo (exato)
2. Confirme que está na pasta `/public/images/gallery/`
3. Reinicie o servidor: `Ctrl+C` → `npm run dev`
4. Limpe o cache do navegador: `Ctrl+Shift+R`

### Imagem está esticada/distorcida?
- Use imagens quadradas (1:1)
- Recomendado: 1080x1080px
- O componente corta automaticamente se não for quadrada

### Imagem demora para carregar?
- Comprima a imagem (< 500KB)
- Use JPG ao invés de PNG (geralmente menor)
- Ferramentas: TinyPNG, Squoosh

---

## 📝 CHECKLIST DE SETUP

- [x] Componente InstagramFeed refatorado
- [x] Tipo GalleryImage criado
- [x] Array galleryImages configurado
- [x] Pasta /public/images/gallery/ criada
- [x] README.md na pasta criado
- [x] Documentação completa (este arquivo)
- [ ] Adicionar image-1.jpg
- [ ] Adicionar image-2.jpg
- [ ] Adicionar image-3.jpg
- [ ] Adicionar image-4.jpg
- [ ] Atualizar legendas (opcional)
- [ ] Testar no navegador

---

## 🔗 LINKS ÚTEIS

- **Next.js Image:** https://nextjs.org/docs/app/api-reference/components/image
- **TinyPNG:** https://tinypng.com/
- **Squoosh:** https://squoosh.app/
- **Photopea (Photoshop web):** https://www.photopea.com/

---

## 📊 PRÓXIMOS PASSOS

1. **Adicionar suas 4 imagens** na pasta `/public/images/gallery/`
2. **Editar legendas** em `src/data/content.ts` (opcional)
3. **Testar** acessando http://localhost:3000#gallery
4. **Celebrar!** 🎉

---

**Estrutura pronta!** Agora é só adicionar as imagens e aproveitar! 📸✨

**Dúvidas?** Leia o `README.md` dentro da pasta `/public/images/gallery/`
