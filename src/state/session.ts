import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { ApiError } from '@/api/client';
import { authApi } from '@/api/auth';
import type { UserMe } from '@/api/types';

const TOKEN_KEY = 'frutou.token';

/* ---- armazenamento do token ---- */
// SecureStore não existe no web → usa localStorage lá.

const isWeb = Platform.OS === 'web';

async function storeGet(key: string): Promise<string | null> {
  if (isWeb) {
    try {
      return globalThis.localStorage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

async function storeSet(key: string, value: string): Promise<void> {
  if (isWeb) {
    try {
      globalThis.localStorage?.setItem(key, value);
    } catch {
      /* ignore */
    }
    return;
  }
  try {
    await SecureStore.setItemAsync(key, value);
  } catch {
    /* segue só em memória */
  }
}

async function storeDelete(key: string): Promise<void> {
  if (isWeb) {
    try {
      globalThis.localStorage?.removeItem(key);
    } catch {
      /* ignore */
    }
    return;
  }
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {
    /* ignore */
  }
}

let cachedToken: string | null | undefined; // undefined = ainda não lido do disco

export async function getToken(): Promise<string | null> {
  if (cachedToken !== undefined) return cachedToken;
  cachedToken = await storeGet(TOKEN_KEY);
  return cachedToken;
}

async function setToken(token: string): Promise<void> {
  cachedToken = token;
  await storeSet(TOKEN_KEY, token);
}

async function clearToken(): Promise<void> {
  cachedToken = null;
  await storeDelete(TOKEN_KEY);
}

/* ---- store reativo da sessão ---- */

export type SessionStatus = 'loading' | 'signedOut' | 'signedIn';

type SessionState = {
  status: SessionStatus;
  user: UserMe | null;
};

let state: SessionState = { status: 'loading', user: null };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function set(next: Partial<SessionState>) {
  state = { ...state, ...next };
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Hook reativo. Re-renderiza quando status/user muda. */
export function useSession(): SessionState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );
}

/** Snapshot não-reativo (para uso fora de componentes). */
export function getSession(): SessionState {
  return state;
}

/* ---- ações ---- */

/**
 * Chamado no boot (App.tsx). Lê o token do disco; se houver, valida com
 * GET /auth/me. Define status para 'signedIn' ou 'signedOut'.
 */
export async function restoreSession(): Promise<void> {
  const token = await getToken();
  if (!token) {
    set({ status: 'signedOut', user: null });
    return;
  }
  try {
    const user = await authApi.me();
    set({ status: 'signedIn', user });
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) {
      await clearToken();
    }
    set({ status: 'signedOut', user: null });
  }
}

/** Após login/registro: guarda o token e busca o usuário. */
export async function signIn(token: string, user?: UserMe): Promise<void> {
  await setToken(token);
  if (user) {
    set({ status: 'signedIn', user });
    return;
  }
  const me = await authApi.me();
  set({ status: 'signedIn', user: me });
}

export async function signOut(): Promise<void> {
  await clearToken();
  set({ status: 'signedOut', user: null });
}

/** Atualiza o usuário em cache (após PATCH /users/me, upload de foto, etc.). */
export function setSessionUser(user: UserMe): void {
  set({ user });
}
