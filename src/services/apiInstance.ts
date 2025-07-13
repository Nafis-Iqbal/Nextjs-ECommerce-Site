import { API_BASE_URL, DEFAULT_HEADERS } from '@/services/apiConfig';
import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient();

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const mergedHeaders = {
    ...DEFAULT_HEADERS,
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: mergedHeaders,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const errorMessage = errorData?.message || res.statusText || 'Fetch error';
    throw new Error(errorMessage);
  }

  // Assuming JSON response always; can add logic for other types
  return res.json() as Promise<T>;
}
