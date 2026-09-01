import { api, type UploadFile } from './client';
import type { UserMe, UserPublic } from './types';

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
};
