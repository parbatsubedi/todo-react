const PREFIX = '/api'
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + PREFIX;

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`
      }),

      ...options.headers
    }
  };

  const response = await fetch(`${API_URL}${endpoint}`, config)

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', response.status, errorText);
    throw new Error(`API request failed with status ${response.status}: ${errorText}`)
  }

  const text = await response.text();
  if (!text) {
    throw new Error('Empty response from server');
  }

  return JSON.parse(text);
}