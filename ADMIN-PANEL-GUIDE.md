# 🎛️ Guia do Painel de Admin

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Páginas Disponíveis](#páginas-disponíveis)
3. [Como Configurar](#como-configurar)
4. [Funcionalidades](#funcionalidades)

---

## 🎯 Visão Geral

O novo painel administrativo oferece uma interface completa para gerenciar todos os aspectos do site SimplesmenteDigital. Com um menu lateral intuitivo, você pode navegar facilmente entre as diferentes seções.

### Principais Melhorias

- ✅ Menu lateral com navegação fluida
- ✅ Dashboard com estatísticas em tempo real
- ✅ Gestão completa de leads
- ✅ Gerenciador de mídia (imagens)
- ✅ Sistema de links tipo Linktree

---

## 📄 Páginas Disponíveis

### 1. Dashboard (`/admin`)
**O que faz:** Visão geral de todas as métricas importantes

**Estatísticas mostradas:**
- Total de leads capturados
- Leads recebidos este mês
- Quantidade de imagens na galeria
- Links ativos no sistema

**Funcionalidades:**
- Cards clicáveis que levam para cada seção
- Lista dos 5 leads mais recentes
- Atualização automática de dados

---

### 2. Leads (`/admin/leads`)
**O que faz:** Gerenciamento de todos os leads do Growth Scan

**Funcionalidades:**
- 📊 Visualização completa de todos os leads
- 🔍 Busca por nome ou email
- 🎯 Filtro por arquétipo de resultado
- 📥 Exportação para CSV (planilha)
- 📈 Visualização de score de maturidade
- 📅 Data e hora de cadastro

**Informações exibidas de cada lead:**
- Nome e email
- WhatsApp (se fornecido)
- Faixa de faturamento
- Dor principal identificada
- Arquétipo resultante
- Score de maturidade digital (0-100)

**Como exportar leads:**
1. Acesse `/admin/leads`
2. Use os filtros se necessário
3. Clique em "Exportar CSV"
4. O arquivo será baixado automaticamente

---

### 3. Galeria (`/admin/gallery`)
**O que faz:** Upload e gerenciamento de imagens do site

**Funcionalidades:**
- 📤 Upload em massa (drag & drop)
- 🗂️ Categorias: Portfólio e Logos
- 🖼️ Preview antes do upload
- 🗑️ Deletar imagens existentes
- ✅ Feedback visual de sucesso/erro

**Como fazer upload:**
1. Selecione a categoria (Portfólio ou Logos)
2. Arraste arquivos para a área pontilhada OU clique para selecionar
3. Revise os arquivos selecionados
4. Clique em "Fazer Upload"
5. Aguarde o feedback de sucesso

**Formatos aceitos:**
- JPG / JPEG
- PNG
- WebP
- SVG

---

### 4. Links (`/admin/links`)
**O que faz:** Sistema de links personalizados estilo Linktree

**Estrutura:**
- **Perfis**: Cada pessoa tem seu próprio perfil
- **Links**: Cada perfil pode ter múltiplos links

**Como criar um perfil:**
1. Clique no botão "+" ao lado de "Perfis"
2. Preencha:
   - Nome (ex: "Marcos António")
   - Slug (ex: "marcos" - será a URL `/links/marcos`)
   - Bio (opcional)
3. Clique em "Criar"

**Como adicionar links:**
1. Selecione o perfil desejado
2. Clique em "Adicionar Link"
3. Preencha:
   - Ícone (emoji, ex: 📸, 💼, 📧)
   - Título (ex: "Meu Instagram")
   - URL completa (ex: "https://instagram.com/...")
4. Clique em "Salvar"

**Editar/Deletar:**
- Use os ícones de lápis (editar) ou lixeira (deletar) ao lado de cada link

**Visualizar página pública:**
- Clique em "Ver página pública" no topo
- A URL será: `https://seusite.com/links/[slug]`

---

## ⚙️ Como Configurar

### 1. Executar o SQL no Supabase

Execute o arquivo `supabase-links.sql` no SQL Editor do Supabase:

```sql
-- Copie e cole o conteúdo do arquivo supabase-links.sql
-- Ele criará as tabelas:
-- - link_profiles (perfis)
-- - link_items (links)
```

### 2. Verificar Variáveis de Ambiente

Certifique-se de que seu `.env.local` contém:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 3. Acessar o Admin

```
URL: https://seusite.com/admin/login
```

Credenciais padrão (altere no código em `src/lib/admin/auth.ts`):
- **Email**: admin@baiane.com
- **Senha**: baiane2024

---

## 🎨 Funcionalidades do Menu Lateral

### Navegação
- Dashboard
- Leads
- Galeria
- Links

### Ações
- **Ver Site**: Abre o site público em nova aba
- **Sair**: Faz logout e retorna para tela de login

### Responsivo
- O menu pode ser colapsado clicando na seta
- Em dispositivos móveis, o layout se adapta automaticamente

---

## 🔐 Segurança

### Autenticação
- Todas as páginas do admin verificam autenticação
- Sem login válido, você é redirecionado para `/admin/login`
- A sessão é armazenada em localStorage

### Permissões do Supabase
- As tabelas de links têm RLS (Row Level Security) habilitado
- Apenas perfis e links ativos são visíveis publicamente
- Operações de admin requerem chaves de service (não implementado por padrão)

---

## 🚀 Próximos Passos

### Para Marcos e Sócio:
1. Execute o SQL de links no Supabase
2. Acesse `/admin/links`
3. Crie seus perfis (marcos e o sócio)
4. Adicione seus links pessoais (Instagram, LinkedIn, WhatsApp, etc.)
5. Compartilhe suas páginas personalizadas: `/links/marcos` e `/links/socio`

### Personalização Adicional:
- Adicionar foto de perfil (avatar_url no banco)
- Customizar bio de cada perfil
- Adicionar analytics aos links
- Implementar ordem drag & drop dos links

---

## 📞 Suporte

Em caso de dúvidas ou problemas:
1. Verifique os logs do console do navegador (F12)
2. Confirme que o Supabase está configurado corretamente
3. Verifique se as tabelas foram criadas no banco

---

## ✨ Créditos

**Desenvolvido para**: SimplesmenteDigital  
**Stack**: Next.js 16, React 19, Supabase, Tailwind CSS, Framer Motion  
**Data**: Janeiro 2026
