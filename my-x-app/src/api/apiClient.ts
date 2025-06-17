const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T | null> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  // 204 No Content や Content-Length: 0 の場合は JSON なしとみなす
  if (res.status === 204 || res.headers.get("Content-Length") === "0") {
    return null;
  }

  return res.json() as Promise<T>;
}
