/**
 * ADMIN AUTH - Sistema Simples de Autenticação
 * --------------------------------------------
 * Login básico com credenciais hardcoded para múltiplos usuários
 */

const ADMIN_CREDENTIALS = {
  marcosantonio: {
    password: 'm$rc$$$2025',
    slug: 'marcosantonio',
    name: 'Marcos Antonio',
  },
  ricardohenrique: {
    password: 'ric$$doheR$co',
    slug: 'ricardohenrique',
    name: 'Ricardo Henrique',
  },
};

const AUTH_KEY = 'baiane_admin_auth';

/**
 * Verificar credenciais
 */
export function validateCredentials(username: string, password: string): boolean {
  const user = ADMIN_CREDENTIALS[username.toLowerCase() as keyof typeof ADMIN_CREDENTIALS];
  return user && user.password === password;
}

/**
 * Obter informações do usuário
 */
export function getUserInfo(username: string) {
  return ADMIN_CREDENTIALS[username.toLowerCase() as keyof typeof ADMIN_CREDENTIALS];
}

/**
 * Fazer login
 */
export function login(username: string, password: string): boolean {
  if (validateCredentials(username, password)) {
    const userInfo = getUserInfo(username);
    // Salvar no localStorage com timestamp e informações do usuário
    const authData = {
      authenticated: true,
      username: username.toLowerCase(),
      slug: userInfo.slug,
      name: userInfo.name,
      timestamp: Date.now(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    return true;
  }
  return false;
}

/**
 * Obter usuário atual autenticado
 */
export function getCurrentUser(): { username: string; slug: string; name: string } | null {
  if (typeof window === 'undefined') return null;

  try {
    const authDataStr = localStorage.getItem(AUTH_KEY);
    if (!authDataStr) return null;

    const authData = JSON.parse(authDataStr);
    
    // Verificar se passou mais de 24 horas
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const isExpired = Date.now() - authData.timestamp > twentyFourHours;
    
    if (isExpired) {
      logout();
      return null;
    }

    if (authData.authenticated) {
      return {
        username: authData.username,
        slug: authData.slug,
        name: authData.name,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fazer logout
 */
export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

/**
 * Verificar se está autenticado
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const authDataStr = localStorage.getItem(AUTH_KEY);
    if (!authDataStr) return false;

    const authData = JSON.parse(authDataStr);
    
    // Verificar se passou mais de 24 horas
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const isExpired = Date.now() - authData.timestamp > twentyFourHours;
    
    if (isExpired) {
      logout();
      return false;
    }

    return authData.authenticated === true;
  } catch {
    return false;
  }
}
