const BASE_URL = 'https://example.com/api'; // Placeholder; replace with real backend base URL via env

type RequestOptions = RequestInit & { timeoutMs?: number };

// PUBLIC_INTERFACE
export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  /** Perform a GET request to the backend API with a timeout and JSON parsing. */
  const { timeoutMs = 8000, ...rest } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE_URL}${path}`, { ...rest, signal: controller.signal });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(id);
  }
}

// PUBLIC_INTERFACE
export async function apiPost<T>(path: string, body: unknown, options: RequestOptions = {}): Promise<T> {
  /** Perform a POST request to the backend API with JSON body and timeout. */
  const { timeoutMs = 10000, headers, ...rest } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(headers || {}) },
      body: JSON.stringify(body),
      signal: controller.signal,
      ...rest
    });
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(id);
  }
}
