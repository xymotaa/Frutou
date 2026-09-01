import { api } from './client';
import type { GeoResult } from './types';

export const geoApi = {
  /** Busca textual → coordenadas (proxy do Nominatim no backend). Top 5. */
  search: (q: string) =>
    api.get<GeoResult[]>(`/geo?q=${encodeURIComponent(q)}`),
};
