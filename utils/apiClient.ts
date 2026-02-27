export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

function buildUrl(baseURL: string, endpoint: string, params?: Record<string, any>) {
  let url = endpoint.startsWith("http") ? endpoint : `${baseURL}${endpoint}`;
  if (params && Object.keys(params).length) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        search.append(key, String(value));
      }
    });
    const query = search.toString();
    if (query) url += url.includes("?") ? `&${query}` : `?${query}`;
  }
  return url;
}

export function createApiClient(baseURL: string) {
  async function request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    params?: Record<string, any>
  ): Promise<T> {
    const url = buildUrl(baseURL, endpoint, params);
    const options: RequestInit = { method, headers: {} };

    if (body !== undefined) {
      options.headers = { ...(options.headers as object), "Content-Type": "application/json" };
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);
    if (!res.ok) {
      const text = await res.text();
      throw new ApiError(res.status, text || res.statusText);
    }
    // assume JSON
    return (await res.json()) as T;
  }

  return {
    get: <T>(endpoint: string, params?: Record<string, any>) => request<T>("GET", endpoint, undefined, params),
    post: <T>(endpoint: string, body?: unknown) => request<T>("POST", endpoint, body),
    put: <T>(endpoint: string, body?: unknown) => request<T>("PUT", endpoint, body),
    delete: <T>(endpoint: string) => request<T>("DELETE", endpoint),
  };
}

export const apiClient = createApiClient("");
