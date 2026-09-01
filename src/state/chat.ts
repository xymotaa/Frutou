import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { ApiError, chatApi } from '@/api';
import type {
  ChatMessage,
  ConversationDetail,
  ConversationListItem,
} from '@/api';

const POLL_MS = 5000;

function msgErro(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  return 'Não foi possível carregar as conversas.';
}

/* ---- lista de conversas ---- */

type ListaState = {
  data: ConversationListItem[] | null;
  loading: boolean;
  erro: string | null;
  refetch: () => void;
};

/**
 * Lista de conversas. Enquanto a tela está em foco, refaz o GET a cada ~5s
 * (sem WebSocket). O primeiro carregamento mostra `loading`; os refreshes do
 * poll são silenciosos.
 */
export function useConversas(): ListaState {
  const [data, setData] = useState<ConversationListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const focado = useRef(false);

  const buscar = useCallback((silencioso = false) => {
    if (!silencioso) setLoading(true);
    chatApi
      .list()
      .then((res) => {
        setData(res);
        setErro(null);
      })
      .catch((e) => {
        // num refresh silencioso, não sobrescreve a lista já visível
        if (!silencioso) setErro(msgErro(e));
      })
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      focado.current = true;
      buscar(data !== null);
      const t = setInterval(() => {
        if (focado.current) buscar(true);
      }, POLL_MS);
      return () => {
        focado.current = false;
        clearInterval(t);
      };
    }, [buscar]),
  );

  return { data, loading, erro, refetch: () => buscar(false) };
}

/* ---- uma conversa ---- */

type ConversaState = {
  data: ConversationDetail | null;
  loading: boolean;
  erro: string | null;
  enviando: boolean;
  enviar: (texto: string) => Promise<void>;
  refetch: () => void;
};

export function useConversa(id: string): ConversaState {
  const [data, setData] = useState<ConversationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const focado = useRef(false);

  const buscar = useCallback(
    (silencioso = false) => {
      if (!silencioso) setLoading(true);
      chatApi
        .byId(id)
        .then((res) => {
          setData(res);
          setErro(null);
        })
        .catch((e) => {
          if (!silencioso) setErro(msgErro(e));
        })
        .finally(() => setLoading(false));
    },
    [id],
  );

  useFocusEffect(
    useCallback(() => {
      focado.current = true;
      // ao abrir: carrega e marca como lida
      buscar(false);
      chatApi.markRead(id).catch(() => {});
      const t = setInterval(() => {
        if (focado.current) {
          buscar(true);
          chatApi.markRead(id).catch(() => {});
        }
      }, POLL_MS);
      return () => {
        focado.current = false;
        clearInterval(t);
      };
    }, [id, buscar]),
  );

  const enviar = useCallback(
    async (texto: string) => {
      const t = texto.trim();
      if (!t || enviando) return;
      setEnviando(true);
      try {
        const nova = await chatApi.send(id, t);
        setData((prev) =>
          prev ? { ...prev, mensagens: [...prev.mensagens, nova] } : prev,
        );
      } catch (e) {
        setErro(
          e instanceof ApiError
            ? e.message
            : 'Não foi possível enviar. Tente de novo.',
        );
      } finally {
        setEnviando(false);
      }
    },
    [id, enviando],
  );

  return { data, loading, erro, enviando, enviar, refetch: () => buscar(false) };
}

/* ---- iniciar conversa a partir de um anúncio ---- */

/**
 * Cria (ou reaproveita) a conversa com o dono do anúncio. A 1ª mensagem
 * padrão é inserida pelo backend. Retorna o id da conversa.
 */
export async function iniciarConversa(listingId: string): Promise<string> {
  const conv = await chatApi.start(listingId);
  return conv.id;
}

export type { ChatMessage };
