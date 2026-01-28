# 📸 GALERIA DE IMAGENS

Esta pasta contém as imagens da galeria exibidas na landing page.

## 📁 ESTRUTURA

```
/public/images/gallery/
├── image-1.jpg   ← Linha 1, Coluna 1
├── image-2.jpg   ← Linha 1, Coluna 2
├── image-3.jpg   ← Linha 1, Coluna 3
├── image-4.jpg   ← Linha 1, Coluna 4
├── image-5.jpg   ← Linha 1, Coluna 5
├── image-6.jpg   ← Linha 2, Coluna 1
├── image-7.jpg   ← Linha 2, Coluna 2
├── image-8.jpg   ← Linha 2, Coluna 3
├── image-9.jpg   ← Linha 2, Coluna 4
├── image-10.jpg  ← Linha 2, Coluna 5
└── README.md     ← Este arquivo
```

**Layout:** Grid 5x2 (5 colunas × 2 linhas) sem espaçamento

---

## 🎨 ESPECIFICAÇÕES DAS IMAGENS

### Formato Recomendado:
- **Tipo:** JPG ou PNG
- **Tamanho:** 1080x1080px (quadrado)
- **Aspect Ratio:** 1:1
- **Qualidade:** Alta (90-100%)
- **Peso:** Máx 500KB por imagem

### Dimensões Aceitas:
- ✅ 1080x1080px (ideal)
- ✅ 1200x1200px (ótimo)
- ✅ 1500x1500px (máximo)
- ⚠️ Outras dimensões serão recortadas automaticamente

---

## 📤 COMO ADICIONAR NOVAS IMAGENS

### 1. Preparar as Imagens
```bash
# Renomeie suas imagens:
image-1.jpg  (ou .png)
image-2.jpg
image-3.jpg
image-4.jpg
image-5.jpg
image-6.jpg
image-7.jpg
image-8.jpg
image-9.jpg
image-10.jpg
```

### 2. Fazer Upload
**Copie os arquivos para esta pasta:**
```
/public/images/gallery/
```

### 3. Atualizar Legendas (Opcional)
**Edite:** `src/data/content.ts`

```typescript
galleryImages: [
  {
    id: "1",
    imageUrl: "/images/gallery/image-1.jpg",
    alt: "Descrição da imagem",
    caption: "Legenda que aparece no hover",
  },
  // ... outras imagens
]
```

---

## 🎯 EXEMPLOS DE CONTEÚDO

### Sugestões de Imagens:
1. **Equipe/Bastidores** - Time trabalhando, brainstorms
2. **Salvador/Bahia** - Paisagens, cultura local
3. **Projetos** - Trabalhos realizados, cases
4. **Eventos** - Workshops, palestras, networking
5. **Lifestyle** - Dia a dia da agência, cultura

### Sugestões de Legendas:
- "Bastidores da criação"
- "Salvador inspira"
- "Estratégia em ação"
- "Time Baianê"
- "Cultura e performance"

---

## 🔧 OTIMIZAÇÃO DE IMAGENS

### Online (Recomendado):
- **TinyPNG:** https://tinypng.com/
- **Squoosh:** https://squoosh.app/
- **Optimizilla:** https://imagecompressor.com/

### Linha de Comando:
```bash
# ImageMagick (redimensionar + comprimir)
magick convert original.jpg -resize 1080x1080^ -gravity center -extent 1080x1080 -quality 90 image-1.jpg

# FFmpeg (converter)
ffmpeg -i original.png -vf scale=1080:1080 -q:v 2 image-1.jpg
```

---

## ⚠️ IMPORTANTE

1. **Nomes dos arquivos** devem ser EXATAMENTE:
   - `image-1.jpg` ou `image-1.png`
   - `image-2.jpg` ou `image-2.png`
   - etc.

2. **Minúsculas:** Use sempre minúsculas nos nomes

3. **Sem espaços:** Use `-` ao invés de espaços

4. **Direitos autorais:** Use apenas imagens que você tem direito de usar

5. **Performance:** Imagens pesadas (>1MB) vão deixar o site lento

---

## 🚀 APÓS ADICIONAR AS IMAGENS

1. **Reinicie o servidor** (se necessário):
   ```bash
   npm run dev
   ```

2. **Acesse:** http://localhost:3000#gallery

3. **Verifique:**
   - Imagens aparecendo corretamente
   - Hover funcionando
   - Legendas (se configuradas)

---

## 📊 STATUS ATUAL

### Linha 1:
- [ ] image-1.jpg
- [ ] image-2.jpg
- [ ] image-3.jpg
- [ ] image-4.jpg
- [ ] image-5.jpg

### Linha 2:
- [ ] image-6.jpg
- [ ] image-7.jpg
- [ ] image-8.jpg
- [ ] image-9.jpg
- [ ] image-10.jpg

**Total: 10 imagens (Grid 5x2)** | **Adicione as imagens e marque como concluído! ✅**

---

**Dúvidas?** Consulte a documentação do Next.js Image: https://nextjs.org/docs/app/api-reference/components/image
