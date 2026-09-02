import { getToken } from '@/state/session';

const BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').replace(/\/$/, '');

if (!BASE_URL && __DEV__) {
  console.warn(
    '[api] EXPO_PUBLIC_API_URL não definido. Crie um .env na raiz do app ' +
      '(veja .env.example).',
  );
}

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

type ErrorBody = { error?: { message?: string; code?: string } };

async function parse<T>(res: Response): Promise<T> {
  const text = await res.text();
  const body = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    const err = (body as ErrorBody)?.error;
    throw new ApiError(
      res.status,
      err?.message ?? `Erro ${res.status}`,
      err?.code,
    );
  }

  return body as T;
}

async function authHeaders(): Promise<Record<string, string>> {
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * `fetch` com timeout via AbortController. Sem isto, uma conexão pendurada
 * (rede caiu no meio, backend travou) deixa a promessa presa "para sempre" e
 * a UI fica em loading eterno.
 */
async function fetchComTimeout(
  url: string,
  init: RequestInit,
  ms: number,
): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new ApiError(
        0,
        'O servidor demorou para responder. Ele pode estar iniciando — tente de novo em alguns segundos.',
        'timeout',
      );
    }
    throw new ApiError(0, 'Falha de conexão. Verifique sua rede.', 'network');
  } finally {
    clearTimeout(t);
  }
}

/** GET/DELETE/POST/PATCH com corpo JSON. `path` começa com "/". */
async function request<T>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  body?: unknown,
): Promise<T> {
  const res = await fetchComTimeout(
    `${BASE_URL}${path}`,
    {
      method,
      headers: {
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(await authHeaders()),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
    // O free tier do Render hiberna e leva ~30-50s para acordar na 1ª request.
    45000,
  );
  return parse<T>(res);
}

/** Arquivo local (galeria/câmera) para envio multipart. */
export type UploadFile = { uri: string; name: string; type: string };

/**
 * Envio multipart (`multipart/form-data`). `files` é um mapa
 * campo -> arquivo(s). `fields` são strings simples.
 */
async function upload<T>(
  method: 'POST' | 'PATCH',
  path: string,
  {
    fields = {},
    files = {},
  }: {
    fields?: Record<string, string | number | boolean | undefined>;
    files?: Record<string, UploadFile | UploadFile[]>;
  },
): Promise<T> {
  const form = new FormData();

  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null) form.append(k, String(v));
  }
  for (const [field, value] of Object.entries(files)) {
    const list = Array.isArray(value) ? value : [value];
    for (const f of list) {
      // React Native aceita { uri, name, type } como parte do FormData.
      form.append(field, {
        uri: f.uri,
        name: f.name,
        type: f.type,
      } as unknown as Blob);
    }
  }

  const res = await fetchComTimeout(
    `${BASE_URL}${path}`,
    {
      method,
      headers: { ...(await authHeaders()) }, // sem Content-Type: o fetch define o boundary
      body: form,
    },
    60000, // upload de fotos + possível cold start do Render
  );
  return parse<T>(res);
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
  del: <T>(path: string) => request<T>('DELETE', path),
  upload,
  baseUrl: BASE_URL,
};
