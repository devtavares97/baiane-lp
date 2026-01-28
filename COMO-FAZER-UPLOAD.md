# 📤 COMO FAZER UPLOAD DAS IMAGENS PARA O SUPABASE

## 🎯 VISÃO GERAL

Vamos fazer upload das imagens diretamente para o **Supabase Storage** e armazená-las lá permanentemente.

---

## 📋 PASSO A PASSO

### **1️⃣ CRIAR AS TABELAS**

Primeiro, execute o SQL para criar as tabelas:

1. Abra: https://app.supabase.com/project/ismikqcmdpjqmeirwpow/sql/new
2. Copie o conteúdo de `supabase-tables.sql`
3. Cole e clique em **RUN**
4. Aguarde a confirmação ✅

---

### **2️⃣ CRIAR O BUCKET DE STORAGE**

Agora vamos criar o "balde" onde as imagens ficam armazenadas:

1. **Abra:** https://app.supabase.com/project/ismikqcmdpjqmeirwpow/storage/buckets
2. **Clique em:** "New Bucket" (botão verde)
3. **Preencha:**
   - **Name:** `baiane-assets`
   - **Public:** ✅ **MARQUE como público** (importante!)
   - **File size limit:** 5 MB (ou mais se precisar)
   - **Allowed MIME types:** `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`
4. **Clique em:** "Create Bucket"

---

### **3️⃣ CRIAR AS PASTAS**

Dentro do bucket `baiane-assets`, crie 2 pastas:

1. **Na tela do bucket**, clique em "Create folder"
2. **Crie:** `logos` (para logos dos clientes)
3. **Crie:** `portfolio` (para imagens do portfólio)

Estrutura final:
```
baiane-assets/
├── logos/
└── portfolio/
```

---

### **4️⃣ FAZER UPLOAD DOS LOGOS**

Prepare seus arquivos de logo:

**📏 ESPECIFICAÇÕES:**
- **Formato:** PNG ou SVG (com fundo transparente)
- **Tamanho:** Largura ideal ~200-300px
- **Proporção:** Retangular horizontal (ex: 200x100px)
- **Nomeação:** `logo-empresa-1.png`, `logo-empresa-2.png`, etc.

**📤 UPLOAD:**
1. Vá em: https://app.supabase.com/project/ismikqcmdpjqmeirwpow/storage/buckets/baiane-assets
2. Entre na pasta **`logos`**
3. Clique em "Upload files"
4. Selecione todos os logos
5. Aguarde o upload ✅

---

### **5️⃣ FAZER UPLOAD DO PORTFÓLIO**

Prepare suas imagens de portfólio:

**📏 ESPECIFICAÇÕES:**
- **Formato:** JPG ou WebP (otimizado para web)
- **Tamanho:** 1080x1080px (quadrado)
- **Qualidade:** 85% (para otimizar tamanho)
- **Quantidade:** 10 imagens (para o grid 5x2)
- **Nomeação:** `portfolio-1.jpg`, `portfolio-2.jpg`, ..., `portfolio-10.jpg`

**📤 UPLOAD:**
1. Vá em: https://app.supabase.com/project/ismikqcmdpjqmeirwpow/storage/buckets/baiane-assets
2. Entre na pasta **`portfolio`**
3. Clique em "Upload files"
4. Selecione todas as 10 imagens
5. Aguarde o upload ✅

---

### **6️⃣ INSERIR OS DADOS NAS TABELAS**

Agora vamos conectar as imagens às tabelas.

**📝 COPIAR AS URLs:**

Para cada imagem que você fez upload:
1. Clique na imagem no Storage
2. Clique em "Copy URL" (ou "Get public URL")
3. A URL será algo como:
   ```
   https://ismikqcmdpjqmeirwpow.supabase.co/storage/v1/object/public/baiane-assets/logos/logo-empresa-1.png
   ```

**📊 INSERIR NO BANCO:**

Vá em: https://app.supabase.com/project/ismikqcmdpjqmeirwpow/editor

#### **Para LOGOS:**
1. Selecione a tabela **`company_logos`**
2. Clique em "Insert row"
3. Preencha:
   - **name:** Nome da empresa (ex: "Empresa X")
   - **image_url:** Cole a URL do Storage
   - **order:** 1, 2, 3, 4... (ordem de exibição)
   - **active:** `true`
4. Clique em "Save"
5. Repita para cada logo

#### **Para PORTFÓLIO:**
1. Selecione a tabela **`portfolio_images`**
2. Clique em "Insert row"
3. Preencha:
   - **image_url:** Cole a URL do Storage
   - **caption:** Legenda (ex: "Cultura e identidade")
   - **alt:** Texto alternativo (ex: "Projeto de branding para cliente X")
   - **order:** 1, 2, 3... 10 (ordem no grid)
   - **active:** `true`
4. Clique em "Save"
5. Repita para todas as 10 imagens

---

## ✅ TESTAR

Depois de inserir tudo:

1. Volte para: **http://localhost:3000**
2. Recarregue a página (Cmd+R / Ctrl+R)
3. As imagens devem aparecer! 🎉

---

## 🚀 OPÇÃO RÁPIDA: SCRIPT DE UPLOAD (Opcional)

Se você tiver muitas imagens, posso criar um script que:
- Faz upload automático de todas as imagens
- Insere os registros no banco automaticamente

**Quer que eu crie esse script?** Me avise! 💪

---

## 📐 DICAS DE OTIMIZAÇÃO

### **Antes de fazer upload:**

1. **Comprimir imagens:** Use TinyPNG (https://tinypng.com) ou Squoosh (https://squoosh.app)
2. **Converter para WebP:** Formato mais moderno e leve
3. **Redimensionar:** Use as dimensões exatas (logos: 200-300px, portfolio: 1080x1080px)

### **Comando rápido (ImageMagick):**

```bash
# Converter e redimensionar para portfólio
mogrify -format webp -resize 1080x1080^ -gravity center -extent 1080x1080 -quality 85 *.jpg

# Converter logos para PNG otimizado
mogrify -format png -resize 250x -quality 95 *.png
```

---

## ❓ PROBLEMAS?

Se algo não funcionar, me avise! Vou resolver imediatamente. 🚀
