# Deploy – GitHub + Vercel

## 1. Enviar para o GitHub

### Criar o repositório

1. Acesse [github.com/new](https://github.com/new).
2. Nome sugerido: **baiane-lp** (ou `simplesmente-digital`).
3. Deixe **vazio** (sem README, .gitignore ou license).
4. Crie o repositório.

### Conectar e dar push

```bash
cd /caminho/para/baiane-lp

# Troque YOUR_USER pelo seu usuário ou org do GitHub
git remote add origin https://github.com/YOUR_USER/baiane-lp.git
# Se origin já existir:
# git remote set-url origin https://github.com/YOUR_USER/baiane-lp.git

git push -u origin main
```

---

## 2. Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login (com GitHub).
2. **Add New** → **Project** → importe o repositório **baiane-lp**.
3. Em **Environment Variables**, configure:

   | Nome | Valor |
   |------|--------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://ismikqcmdpjqmeirwpow.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | sua anon key do Supabase |

4. **Deploy**. O build usa `next build` por padrão.

---

## 3. O que o `.gitignore` evita subir

- `.env`, `.env.local`, `.env.*.local` (secrets)
- `node_modules`, `.next`, `out`, `build`
- `.turbo`, `.cache`, `.vercel`
- Logs, `.DS_Store`, pastas de IDE

O `.env.example` **é** versionado; use como referência para as variáveis na Vercel.

---

## 4. Script de setup local (opcional)

```bash
cp .env.example .env.local
# Edite .env.local com suas chaves.

npm install
npm run setup:supabase   # só se for usar o script de criação de tabelas
npm run dev
```
