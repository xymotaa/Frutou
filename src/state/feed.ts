import { useCallback, useEffect, useRef, useState } from 'react';

import { ApiError, listingsApi, type FeedParams } from '@/api';
import type { ListingDetail, ListingListItem } from '@/api';
import { ensureLocation, getCoords, useLocal } from '@/state/local';

type Async<T> = {
  data: T | null;
  loading: boolean;
  erro: string | null;
  refetch: () => void;
};

function mensagemDeErro(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  return 'Não foi possível carregar. Verifique sua conexão.';
}

/* ---- feed (lista de anúncios) ---- */

export type FeedFilters = {
  q?: string;
  modalidade?: 'doacao' | 'venda';
  raioKm?: number;
};

/**
 * Feed de anúncios. Pede a localização uma vez e reexecuta a busca quando ela
 * chega (para o backend poder ordenar por distância). `filtros` deve ser
 * memoizado pelo caller (ou usar campos primitivos) para não refazer a busca
 * a cada render.
 */
export function useFeed(filtros: FeedFilters = {}): Async<ListingListItem[]> {
  const { q, modalidade, raioKm } = filtros;
  const local = useLocal();
  const [data, setData] = useState<ListingListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const reqId = useRef(0);

  useEffect(() => {
    void ensureLocation();
  }, []);

  const buscar = useCallback(() => {
    const id = ++reqId.current;
    setLoading(true);
    setErro(null);

    const coords = getCoords();
    const params: FeedParams = {
      q: q?.trim() || undefined,
      modalidade,
      raioKm,
      lat: coords?.lat,
      lng: coords?.lng,
    };

    listingsApi
      .feed(params)
      .then((res) => {
        if (id === reqId.current) setData(res);
      })
      .catch((e) => {
        if (id === reqId.current) setErro(mensagemDeErro(e));
      })
      .finally(() => {
        if (id === reqId.current) setLoading(false);
      });
  }, [q, modalidade, raioKm]);

  // refaz a busca quando os filtros mudam OU quando a localização resolve
  useEffect(() => {
    buscar();
  }, [buscar, local.status]);

  return { data, loading, erro, refetch: buscar };
}

/* ---- favoritos ---- */

export function useFavoritos(): Async<ListingListItem[]> {
  const [data, setData] = useState<ListingListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const reqId = useRef(0);

  const buscar = useCallback(() => {
    const id = ++reqId.current;
    setLoading(true);
    setErro(null);
    listingsApi
      .favoritos()
      .then((res) => {
        if (id === reqId.current) setData(res);
      })
      .catch((e) => {
        if (id === reqId.current) setErro(mensagemDeErro(e));
      })
      .finally(() => {
        if (id === reqId.current) setLoading(false);
      });
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  return { data, loading, erro, refetch: buscar };
}

/* ---- detalhe de um anúncio ---- */

export function useListing(id: string): Async<ListingDetail> {
  const [data, setData] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const reqId = useRef(0);

  const buscar = useCallback(() => {
    const rid = ++reqId.current;
    setLoading(true);
    setErro(null);
    listingsApi
      .byId(id)
      .then((res) => {
        if (rid === reqId.current) setData(res);
      })
      .catch((e) => {
        if (rid === reqId.current) setErro(mensagemDeErro(e));
      })
      .finally(() => {
        if (rid === reqId.current) setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    buscar();
  }, [buscar]);

  return { data, loading, erro, refetch: buscar };
}

/* ---- favoritar / desfavoritar (otimista, para telas de lista) ---- */

export async function alternarFavorito(
  id: string,
  favoritoAtual: boolean,
): Promise<void> {
  if (favoritoAtual) await listingsApi.desfavoritar(id);
  else await listingsApi.favoritar(id);
}
