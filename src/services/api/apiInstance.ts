import { API_BASE_URL, DEFAULT_HEADERS } from '@/lib/apiConfig';
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
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: mergedHeaders,
  });

  return res.json() as Promise<T>;
}
