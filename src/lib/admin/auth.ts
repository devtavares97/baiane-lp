/**
 * ADMIN AUTH - Sistema Simples de Autenticação
 * --------------------------------------------
 * Login básico com credenciais hardcoded
 */

const ADMIN_CREDENTIALS = {
  username: 'ADMIN',
  password: 'M$RC$$2026',
};

const AUTH_KEY = 'baiane_admin_auth';

/**
 * Verificar credenciais
 */
export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

/**
 * Fazer login
 */
export function login(username: string, password: string): boolean {
  if (validateCredentials(username, password)) {
    // Salvar no localStorage com timestamp
    const authData = {
      authenticated: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    return true;
  }
  return false;
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
