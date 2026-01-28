# 🔐 ADMIN - SISTEMA DE LOGIN

Sistema de autenticação simples implementado com sucesso!

---

## 🚀 COMO ACESSAR:

### **1. Abra a página de login:**
```
http://localhost:3000/admin/login
```

### **2. Digite as credenciais:**
```
Usuário: ADMIN
Senha: M$RC$$2026
```

### **3. Clique em "Entrar"**

### **4. Você será redirecionado para:**
```
http://localhost:3000/admin
```

---

## ✨ FUNCIONALIDADES IMPLEMENTADAS:

### **🔐 Sistema de Login:**
- ✅ Página de login estilizada (`/admin/login`)
- ✅ Validação de credenciais
- ✅ Sessão salva no `localStorage` (24 horas)
- ✅ Proteção automática da rota `/admin`
- ✅ Botão de logout

### **📸 Gerenciador de Imagens:**
- ✅ **Upload em massa** (Drag & Drop)
- ✅ **Visualizar imagens existentes** (Portfolio e Logos separados)
- ✅ **Deletar imagens** (com confirmação)
- ✅ Contador por categoria
- ✅ Preview das imagens
- ✅ Loading states

---

## 🎨 VISUAL:

### **Login Page:**
- Logo da Baianê no topo
- Card glassmorphism
- Campos com ícones
- Toggle para mostrar/ocultar senha
- Mensagem de erro animada
- Background decorativo

### **Admin Panel:**
- Header com logo + botão de logout
- Seleção de categoria (Portfolio / Logos)
- Área de Drag & Drop
- **NOVO:** Lista de imagens atuais
  - Grid separado por categoria
  - Hover effect para mostrar botão de delete
  - Loading indicator ao deletar

---

## 🔒 SEGURANÇA:

### **O que está protegido:**
✅ Rota `/admin` (redireciona para `/admin/login`)
✅ Sessão expira em 24 horas
✅ Credenciais validadas antes do acesso

### **Avisos:**
⚠️ **Desenvolvimento apenas!**
- As credenciais estão hardcoded no código
- Não use em produção sem melhorias

### **Para Produção:**
- [ ] Mover credenciais para variáveis de ambiente
- [ ] Adicionar hash de senha
- [ ] Implementar JWT ou NextAuth
- [ ] Adicionar rate limiting
- [ ] Logs de acesso
- [ ] 2FA (opcional)

---

## 📋 FLUXO DE USO:

1. **Login:** `/admin/login` → Digite credenciais → Entrar
2. **Upload:** Selecione categoria → Arraste imagens → Upload
3. **Gerenciar:** Veja imagens existentes abaixo
4. **Deletar:** Hover na imagem → Clique no ícone de lixeira → Confirme
5. **Logout:** Clique em "Sair" no header

---

## 🛠️ ARQUIVOS CRIADOS:

```
src/
├── lib/
│   └── admin/
│       ├── auth.ts              # Sistema de autenticação
│       └── gallery-manager.ts   # Gerenciar imagens (listar, deletar)
└── app/
    └── admin/
        ├── login/
        │   └── page.tsx         # Página de login
        └── page.tsx             # Admin panel (atualizado)
```

---

## 🎯 TESTE AGORA:

1. Acesse: http://localhost:3000/admin
2. Você será redirecionado para: http://localhost:3000/admin/login
3. Digite:
   - Usuário: `ADMIN`
   - Senha: `M$RC$$2026`
4. Gerencie suas imagens! 🚀

---

## 💡 DICAS:

- **Esqueceu a senha?** Está no código: `M$RC$$2026`
- **Sessão expirou?** Faça login novamente
- **Logout:** Clique em "Sair" no header
- **Deletar tudo?** Delete uma por uma (segurança)

---

**Sistema pronto para uso! 🎉**
