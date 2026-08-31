import type { FruitKey } from '@/components/fruits';

export type Modalidade = 'doacao' | 'venda';

export type Listing = {
  id: string;
  titulo: string;
  autor: string;
  /** Distância textual já formatada, ex.: "1,2 km". */
  distancia: string;
  modalidade: Modalidade;
  /** Preço formatado quando modalidade === 'venda'. */
  preco?: string;
  /** Detalhe secundário: "2 caixas disp.", "Colhida hoje", etc. */
  detalhe: string;
  fruta: FruitKey;
  /** Coordenadas para o mapa (placeholder por ora). */
  lat: number;
  lng: number;
};

/**
 * Dados de exemplo enquanto não há backend.
 * Substituir por `listingsService.nearby()` quando a API existir.
 */
export const mockListings: Listing[] = [
  {
    id: '1',
    titulo: 'Manga Palmer',
    autor: 'Dona Maria',
    distancia: '1,2 km',
    modalidade: 'doacao',
    detalhe: '2 caixas disp.',
    fruta: 'manga',
    lat: -5.365,
    lng: -49.09,
  },
  {
    id: '2',
    titulo: 'Jabuticaba Sabará',
    autor: 'Sítio do Zé',
    distancia: '3,5 km',
    modalidade: 'venda',
    preco: 'R$ 15 / kg',
    detalhe: 'Colhida hoje',
    fruta: 'acerola',
    lat: -5.38,
    lng: -49.11,
  },
  {
    id: '3',
    titulo: 'Laranja-pera do quintal',
    autor: 'Ana Ribeiro',
    distancia: '850 m',
    modalidade: 'venda',
    preco: 'R$ 5 / kg',
    detalhe: '5 kg disp.',
    fruta: 'laranja',
    lat: -5.36,
    lng: -49.08,
  },
  {
    id: '4',
    titulo: 'Limão-taiti',
    autor: 'Carla Souza',
    distancia: '450 m',
    modalidade: 'doacao',
    detalhe: 'Pegar até sábado',
    fruta: 'limao',
    lat: -5.358,
    lng: -49.083,
  },
  {
    id: '5',
    titulo: 'Mangas para suco',
    autor: 'Rita Campos',
    distancia: '1,8 km',
    modalidade: 'venda',
    preco: 'R$ 3 / kg',
    detalhe: 'Maduras',
    fruta: 'manga',
    lat: -5.372,
    lng: -49.10,
  },
  {
    id: '6',
    titulo: 'Acerola fresca',
    autor: 'Pedro Alves',
    distancia: '2,0 km',
    modalidade: 'doacao',
    detalhe: 'Colhida hoje',
    fruta: 'acerola',
    lat: -5.375,
    lng: -49.07,
  },
];
