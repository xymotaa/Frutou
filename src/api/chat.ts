import { api } from './client';
import type {
  ChatMessage,
  ConversationDetail,
  ConversationListItem,
} from './types';

export const chatApi = {
  list: () => api.get<ConversationListItem[]>('/conversations'),

  byId: (id: string) => api.get<ConversationDetail>(`/conversations/${id}`),

  /** Cria (ou reaproveita) a conversa com o dono do anúncio. */
  start: (listingId: string) =>
    api.post<ConversationDetail>('/conversations', { listingId }),

  send: (id: string, texto: string) =>
    api.post<ChatMessage>(`/conversations/${id}/messages`, { texto }),

  markRead: (id: string) => api.post<void>(`/conversations/${id}/read`),
};
