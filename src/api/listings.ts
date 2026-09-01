import { api, type UploadFile } from './client';
import type { ListingDetail, ListingListItem, Modalidade } from './types';

export type FeedParams = {
  q?: string;
  modalidade?: Modalidade;
  raioKm?: number;
  lat?: number;
  lng?: number;
  limit?: number;
};

function qs(params: Record<string, string | number | undefined>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== '',
  );
  if (!entries.length) return '';
  return '?' + entries.map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&');
}

/** Campos de texto do formulário de anúncio (ver AnuncioForm). */
export type AnuncioInput = {
  titulo: string;
  descricao: string;
  modalidade: Modalidade;
  precoTexto?: string;
  disponibilidade: string;
  detalhe?: string;
  bairro?: string;
  lat?: number;
  lng?: number;
  janelaRetirada?: string;
};

export const listingsApi = {
  feed: (params: FeedParams = {}) =>
    api.get<ListingListItem[]>(`/listings${qs(params)}`),

  favoritos: () => api.get<ListingListItem[]>('/listings/favoritos'),

  mine: (status?: 'ativo' | 'encerrado') =>
    api.get<ListingListItem[]>(`/listings/mine${qs({ status })}`),

  byId: (id: string) => api.get<ListingDetail>(`/listings/${id}`),

  create: (input: AnuncioInput, fotos: UploadFile[]) =>
    api.upload<ListingDetail>('POST', '/listings', {
      fields: input,
      files: { fotos },
    }),

  update: (id: string, input: Partial<AnuncioInput>, fotos?: UploadFile[]) =>
    api.upload<ListingDetail>('PATCH', `/listings/${id}`, {
      fields: input,
      files: fotos && fotos.length ? { fotos } : {},
    }),

  encerrar: (id: string) =>
    api.post<ListingDetail>(`/listings/${id}/encerrar`),

  reabrir: (id: string) => api.post<ListingDetail>(`/listings/${id}/reabrir`),

  favoritar: (id: string) => api.post<void>(`/listings/${id}/favorito`),

  desfavoritar: (id: string) => api.del<void>(`/listings/${id}/favorito`),
};
