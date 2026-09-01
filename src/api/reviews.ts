import { api } from './client';
import type { HistoricoItem } from './types';

export const reviewsApi = {
  history: () => api.get<HistoricoItem[]>('/history'),

  create: (input: {
    conversationId: string;
    nota: number;
    comentario?: string;
  }) => api.post<{ id: string }>('/reviews', input),
};
