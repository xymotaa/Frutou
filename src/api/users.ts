import { api, type UploadFile } from './client';
import type {
  ListingListItem,
  ReviewPublic,
  UserMe,
  UserPublic,
} from './types';

export type PerfilPatch = {
  nome?: string;
  telefone?: string | null;
  bio?: string | null;
  bairro?: string | null;
  lat?: number | null;
  lng?: number | null;
};

export const usersApi = {
  updateMe: (patch: PerfilPatch) => api.patch<UserMe>('/users/me', patch),

  uploadPhoto: (file: UploadFile) =>
    api.upload<{ fotoUrl: string }>('POST', '/users/me/photo', {
      files: { foto: file },
    }),

  deletePhoto: () => api.del<void>('/users/me/photo'),

  byId: (id: string) => api.get<UserPublic>(`/users/${id}`),

  /** Anúncios ativos de um usuário (perfil público). */
  listings: (id: string) =>
    api.get<ListingListItem[]>(`/users/${id}/listings`),

  /** Avaliações recebidas por um usuário. */
  reviews: (id: string) => api.get<ReviewPublic[]>(`/users/${id}/reviews`),
};
