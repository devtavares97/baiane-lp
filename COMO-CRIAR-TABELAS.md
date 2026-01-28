# 🗄️ COMO CRIAR AS TABELAS NO SUPABASE

## 📋 PASSOS (5 minutos)

### **1️⃣ Abrir o SQL Editor**

Clique aqui: [**SQL Editor do Supabase**](https://app.supabase.com/project/ismikqcmdpjqmeirwpow/sql/new)

_(Ou vá em: Supabase Dashboard → SQL Editor → New Query)_

---

### **2️⃣ Copiar o SQL**

Abra o arquivo `supabase-tables.sql` (que acabei de criar) e **copie TODO o conteúdo**.

_(É o arquivo que está na raiz do projeto, ao lado deste arquivo)_

---

### **3️⃣ Colar e Executar**

1. **Cole** o SQL no editor do Supabase
2. Clique em **RUN** (ou pressione `Cmd + Enter` / `Ctrl + Enter`)
3. Aguarde a confirmação ✅

---

### **4️⃣ Verificar**

Após executar, vá em:
- **Supabase Dashboard → Table Editor**

Você deve ver:
- ✅ **`company_logos`** (6 registros de exemplo)
- ✅ **`portfolio_images`** (10 registros de exemplo)

---

### **5️⃣ Testar no Site**

Volte para: **http://localhost:3000**

O site agora vai carregar:
- **Logos dos clientes** direto do Supabase
- **Imagens do portfólio** direto do Supabase

_(Se estiver usando os dados de exemplo, vai aparecer imagens placeholder cinza escuro com texto branco)_

---

## 🎯 PRÓXIMOS PASSOS (Depois de testar)

### **Substituir Imagens Placeholder:**

1. **Storage:** Supabase Dashboard → Storage → Create Bucket → `public-images` (marcar como público)
2. **Upload:** Fazer upload das imagens reais (logos dos clientes e fotos do portfólio)
3. **URLs:** Copiar as URLs públicas das imagens
4. **Update:** Editar as tabelas e substituir as URLs placeholder pelas URLs reais

---

## ❓ PROBLEMAS?

Se algo der errado, me avise! Vou te ajudar imediatamente. 🚀

---

**Arquivo SQL pronto:** `supabase-tables.sql`
