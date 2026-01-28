# 🚀 Como Fazer Push para o GitHub

## ⚠️ Problema de Autenticação

O Git está tentando usar credenciais antigas (`pedropipeimob`), mas o repositório pertence a `devtavares97`.

## ✅ Solução: Usar Token de Acesso Pessoal

### 1. Criar Token de Acesso no GitHub

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Dê um nome: `baiane-lp-push`
4. Selecione as permissões:
   - ✅ `repo` (acesso completo aos repositórios)
5. Clique em **"Generate token"**
6. **⚠️ COPIE O TOKEN** (você não verá ele novamente!)

### 2. Fazer Push com o Token

**Opção A: Usar o token na URL (temporário)**

```bash
git push https://SEU_TOKEN@github.com/devtavares97/baiane-lp.git main
```

**Opção B: Configurar o token no remote (recomendado)**

```bash
# Substitua SEU_TOKEN pelo token que você copiou
git remote set-url origin https://SEU_TOKEN@github.com/devtavares97/baiane-lp.git
git push -u origin main
```

**Opção C: Usar GitHub CLI (se tiver instalado)**

```bash
gh auth login
git push -u origin main
```

### 3. Alternativa: Usar Credenciais do macOS Keychain

Se preferir, você pode limpar as credenciais antigas e fazer login novamente:

```bash
# Limpar credenciais antigas
git credential-osxkeychain erase <<EOF
host=github.com
protocol=https
EOF

# Tentar push novamente (vai pedir usuário e senha/token)
git push -u origin main
```

Quando pedir:
- **Username:** `devtavares97`
- **Password:** Cole seu token de acesso pessoal (não use sua senha do GitHub)

---

## 📝 Status Atual

- ✅ Repositório criado: https://github.com/devtavares97/baiane-lp
- ✅ Remote configurado: `https://github.com/devtavares97/baiane-lp.git`
- ✅ Branch: `main`
- ✅ Arquivos commitados e prontos
- ⏳ **Aguardando autenticação para fazer push**

---

**Depois do push bem-sucedido, o repositório estará disponível em:**
**https://github.com/devtavares97/baiane-lp**
