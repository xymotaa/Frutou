import { usersApi, type PerfilPatch } from '@/api/users';
import type { UploadFile } from '@/api/client';
import type { UserMe } from '@/api/types';
import { getSession, setSessionUser, useSession } from '@/state/session';

/**
 * Visão do perfil usada pelas telas. É derivada do `UserMe` da sessão
 * (`src/state/session.ts`) — não é uma fonte de dados própria.
 *
 * `inicial` e `primeiroNome` são derivados do nome (helpers), não campos.
 * `fotoUri` = alias de `fotoUrl` (as telas ainda usam esse nome).
 * `nota` / `frutasDoadas` / `frutasVendidas`: `nota` vem da API;
 * doadas/vendidas ainda não existem no backend → 0 por enquanto.
 */
export type Perfil = {
  id: string;
  nome: string;
  primeiroNome: string;
  inicial: string;
  fotoUri: string | null;
  email: string;
  telefone: string;
  bairro: string;
  bio: string;
  nota: number;
  frutasDoadas: number;
  frutasVendidas: number;
};

export function primeiroNome(nome: string): string {
  return nome.trim().split(/\s+/)[0] ?? nome;
}

export function inicial(nome: string): string {
  return (primeiroNome(nome).charAt(0) || '?').toUpperCase();
}

function adapt(user: UserMe): Perfil {
  return {
    id: user.id,
    nome: user.nome,
    primeiroNome: primeiroNome(user.nome),
    inicial: inicial(user.nome),
    fotoUri: user.fotoUrl,
    email: user.email,
    telefone: user.telefone ?? '',
    bairro: user.bairro ?? '',
    bio: user.bio ?? '',
    nota: user.nota,
    frutasDoadas: 0,
    frutasVendidas: 0,
  };
}

const VAZIO: Perfil = {
  id: '',
  nome: '',
  primeiroNome: '',
  inicial: '?',
  fotoUri: null,
  email: '',
  telefone: '',
  bairro: '',
  bio: '',
  nota: 0,
  frutasDoadas: 0,
  frutasVendidas: 0,
};

/** Hook reativo — segue a sessão. */
export function usePerfil(): Perfil {
  const { user } = useSession();
  return user ? adapt(user) : VAZIO;
}

/** Snapshot não-reativo. */
export function getPerfil(): Perfil {
  const { user } = getSession();
  return user ? adapt(user) : VAZIO;
}

/**
 * Atualiza campos textuais do perfil (`PATCH /users/me`) e/ou a foto
 * (`POST` / `DELETE /users/me/photo`), depois sincroniza a sessão.
 *
 * `fotoUri`:
 *   - string começando com "file:"/"content:" → upload de nova foto
 *   - string http(s) → é a foto atual, ignora
 *   - null → remove a foto
 *   - undefined → não mexe na foto
 */
export async function atualizarPerfil(patch: {
  nome?: string;
  telefone?: string;
  bairro?: string;
  bio?: string;
  fotoUri?: string | null;
  lat?: number | null;
  lng?: number | null;
}): Promise<void> {
  const campos: PerfilPatch = {};
  if (patch.nome !== undefined) campos.nome = patch.nome;
  if (patch.telefone !== undefined) campos.telefone = patch.telefone || null;
  if (patch.bairro !== undefined) campos.bairro = patch.bairro || null;
  if (patch.bio !== undefined) campos.bio = patch.bio || null;
  if (patch.lat !== undefined) campos.lat = patch.lat;
  if (patch.lng !== undefined) campos.lng = patch.lng;

  let user: UserMe | null = null;

  if (Object.keys(campos).length > 0) {
    user = await usersApi.updateMe(campos);
  }

  if (patch.fotoUri !== undefined) {
    if (patch.fotoUri === null) {
      await usersApi.deletePhoto();
      // recarrega o /auth/me para pegar fotoUrl = null
      const { authApi } = await import('@/api/auth');
      user = await authApi.me();
    } else if (/^(file:|content:|ph:)/i.test(patch.fotoUri)) {
      const file: UploadFile = {
        uri: patch.fotoUri,
        name: 'perfil.jpg',
        type: 'image/jpeg',
      };
      await usersApi.uploadPhoto(file);
      const { authApi } = await import('@/api/auth');
      user = await authApi.me();
    }
  }

  if (user) setSessionUser(user);
}
