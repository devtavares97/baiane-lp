# 📁 IMAGENS DO PORTFÓLIO

Coloque aqui as imagens que aparecerão na seção de galeria/portfólio do site.

## 📏 ESPECIFICAÇÕES

- **Formato:** JPG ou WebP (otimizado para web)
- **Tamanho:** 1080x1080px (quadrado)
- **Qualidade:** 85% (para otimizar o peso do arquivo)
- **Nomeação:** `portfolio-1.jpg`, `portfolio-2.jpg`, ..., `portfolio-10.jpg`
- **Quantidade:** 10 imagens (para o grid 5x2)
- **Peso:** Ideal até 300KB por imagem

## 📤 COMO USAR

### **Opção 1: Upload Manual**
1. Faça upload destes arquivos diretamente no Supabase Storage
2. Siga as instruções em `COMO-FAZER-UPLOAD.md`

### **Opção 2: Script Automático**
1. Coloque todas as 10 imagens aqui
2. Execute: `npx tsx scripts/upload-to-supabase.ts`
3. O script fará upload e criará os registros automaticamente

## 💡 DICAS DE OTIMIZAÇÃO

### **1. Redimensionar para 1080x1080px:**

```bash
# Com ImageMagick (Mac/Linux)
mogrify -resize 1080x1080^ -gravity center -extent 1080x1080 *.jpg

# Ou individualmente
convert original.jpg -resize 1080x1080^ -gravity center -extent 1080x1080 portfolio-1.jpg
```

### **2. Comprimir:**

- **Online:** https://tinypng.com ou https://squoosh.app
- **Batch:** Use ferramentas como ImageOptim (Mac) ou FileOptimizer (Windows)

### **3. Converter para WebP (mais leve):**

```bash
# Com cwebp (Mac/Linux)
for file in *.jpg; do cwebp -q 85 "$file" -o "${file%.jpg}.webp"; done
```

## 🎨 O QUE INCLUIR

Escolha imagens que representem bem o seu trabalho:
- Projetos de branding
- Campanhas criativas
- Eventos e ações
- Bastidores do time
- Fotos de Salvador/Bahia (identidade local)
- Cases de sucesso

**A ordem das imagens importa!** As primeiras aparecerão mais à esquerda no grid.
