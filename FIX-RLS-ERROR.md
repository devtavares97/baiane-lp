# 🔧 CORREÇÃO DO ERRO RLS

## ❌ Erro que você está vendo:
```
new row violates row-level security policy
```

## 🔍 O QUE ACONTECEU:
As políticas de segurança (RLS) do Supabase estão bloqueando o INSERT porque a configuração original exigia autenticação.

## ✅ SOLUÇÃO RÁPIDA (2 minutos):

### **1. Abra o SQL Editor:**
https://app.supabase.com/project/ismikqcmdpjqmeirwpow/sql/new

### **2. Copie e execute este SQL:**

Abra o arquivo: `supabase-gallery-setup-FIXED.sql`

Ou copie e cole este código:

```sql
-- REMOVER POLÍTICAS ANTIGAS
DROP POLICY IF EXISTS "Allow public read access" ON public.gallery;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.gallery;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.gallery;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.gallery;

-- CRIAR POLÍTICAS PÚBLICAS (sem exigir autenticação)

-- Leitura pública
CREATE POLICY "Public read access for active items"
  ON public.gallery
  FOR SELECT
  USING (active = true);

-- INSERT público
CREATE POLICY "Allow public insert"
  ON public.gallery
  FOR INSERT
  WITH CHECK (true);

-- UPDATE público
CREATE POLICY "Allow public update"
  ON public.gallery
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- DELETE público
CREATE POLICY "Allow public delete"
  ON public.gallery
  FOR DELETE
  USING (true);

-- STORAGE: Permitir upload público
CREATE POLICY IF NOT EXISTS "Public upload access"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'gallery_images');

CREATE POLICY IF NOT EXISTS "Public read access"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'gallery_images');

CREATE POLICY IF NOT EXISTS "Public delete access"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'gallery_images');
```

### **3. Execute (RUN)**

### **4. Teste o upload novamente:**
http://localhost:3000/admin

---

## ⚠️ NOTA DE SEGURANÇA

**Para desenvolvimento:** Está OK! ✅

**Para produção:** Você deve proteger o `/admin` com:
- Autenticação (NextAuth, Supabase Auth)
- Middleware no Next.js
- Políticas RLS mais restritivas

Por enquanto, deixamos liberado para facilitar o desenvolvimento.

---

## 🎯 DEPOIS DE EXECUTAR:

1. ✅ Volte para http://localhost:3000/admin
2. ✅ Faça upload das imagens
3. ✅ Deve funcionar sem erros!

**Qualquer problema, me avise!** 🚀
