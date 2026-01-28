# 🚨 SOLUÇÃO DEFINITIVA - RLS ERROR

## 🎯 PASSO A PASSO (5 MINUTOS):

### **1. Abra o SQL Editor do Supabase:**
👉 https://app.supabase.com/project/ismikqcmdpjqmeirwpow/sql/new

---

### **2. Copie TODO o conteúdo deste arquivo:**
```
SOLUCAO-DEFINITIVA.sql
```

**OU clique aqui para copiar:** [Veja o arquivo no VS Code]

---

### **3. Cole no SQL Editor e clique em RUN**

O SQL vai:
- ✅ Dropar a tabela antiga (começar do zero)
- ✅ Criar a tabela SEM RLS (para funcionar sem autenticação)
- ✅ Criar o bucket `gallery_images`
- ✅ Configurar políticas públicas no Storage

---

### **4. Verifique se funcionou:**

Após executar o SQL, você deve ver no final:

```
✅ Tabela gallery existe: true
✅ Bucket gallery_images existe: true
✅ RLS na tabela gallery: false (desativado para desenvolvimento)
```

---

### **5. Teste o upload:**

Vá em: http://localhost:3000/admin

- Selecione a categoria (Portfolio ou Logo)
- Arraste algumas imagens
- Clique em "Fazer Upload"
- **Deve funcionar agora!** 🎉

---

## 🔧 SE AINDA NÃO FUNCIONAR:

### **Opção A: Verifique o erro no Console**

Abra o Console do navegador (F12) e me mande o erro completo que aparece.

---

### **Opção B: Teste a conexão**

Execute este SQL para testar:

```sql
-- Testar INSERT manual
INSERT INTO public.gallery (image_url, category, alt, "order")
VALUES ('https://via.placeholder.com/500', 'portfolio', 'Teste', 1);

-- Ver se inseriu
SELECT * FROM public.gallery;
```

Se funcionar, o problema é no Storage.
Se não funcionar, o problema é na tabela.

---

### **Opção C: Verificar variáveis de ambiente**

Abra: `.env.local`

Deve ter:
```
NEXT_PUBLIC_SUPABASE_URL=https://ismikqcmdpjqmeirwpow.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Se estiver diferente, corrija e reinicie o servidor.

---

## 🆘 SE NADA DISSO FUNCIONAR:

Me mande:
1. O erro COMPLETO que aparece no console (F12)
2. Um print da tela do erro
3. Resultado deste SQL:

```sql
SELECT * FROM storage.buckets WHERE id = 'gallery_images';
SELECT * FROM information_schema.tables WHERE table_name = 'gallery';
```

---

## 💪 VAMOS RESOLVER ISSO!

Execute a `SOLUCAO-DEFINITIVA.sql` e me avisa o resultado! 🚀
