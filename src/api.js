/**
 * Central API configuration.
 * Set VITE_API_URL at build time to point at the deployed backend, e.g.
 *   VITE_API_URL=https://sales-savvy-api.onrender.com npm run build
 * Falls back to the local Spring Boot server.
 */
export const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:9090').replace(/\/$/, '');

/** Small wrapper around fetch that always sends cookies and prefixes the base URL. */
export async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, { credentials: 'include', ...options });
  return response;
}

/** Quick connectivity probe used by the login page banner. */
export async function checkBackend(timeoutMs = 4000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(`${API_BASE}/health`, { signal: ctrl.signal });
    return r.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}
