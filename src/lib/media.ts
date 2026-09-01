import { api } from '@/api';

/**
 * O backend monta as URLs de imagem com o seu `PUBLIC_URL` (ex.:
 * `http://localhost:3333/uploads/x.jpg`). Num device físico, `localhost` é o
 * próprio celular — a imagem não carrega. Reescrevemos o host de qualquer URL
 * `/uploads/...` para o host de `EXPO_PUBLIC_API_URL`, que é o que o app
 * comprovadamente alcança.
 */
export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const base = api.baseUrl;
  if (!base) return url;

  const idx = url.indexOf('/uploads/');
  if (idx === -1) return url; // não é upload do backend — deixa como veio
  return base + url.slice(idx);
}

/** Aplica `resolveMediaUrl` em cada item de um array de URLs. */
export function resolveMediaUrls(urls: string[] | null | undefined): string[] {
  if (!urls?.length) return [];
  return urls.map((u) => resolveMediaUrl(u) ?? u);
}
