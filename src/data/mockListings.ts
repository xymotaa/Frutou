import type { FruitKey } from '@/components/fruits';

export type Modalidade = 'doacao' | 'venda';

export type Listing = {
  id: string;
  titulo: string;
  autor: string;
  distancia: string;
  modalidade: Modalidade;
  preco?: string;
  fruta: FruitKey;
};

/**
 * Dados de exemplo para a Home enquanto não há backend.
 * Substituir por `listingsService.nearby()` quando a API existir.
 */
export const mockListings: Listing[] = [
  {
    id: '1',
    titulo: 'Mangas maduras',
    autor: 'Lucas Mota',
    distancia: '800 m',
    modalidade: 'doacao',
    fruta: 'manga',
  },
  {
    id: '2',
    titulo: 'Laranja-pera do quintal',
    autor: 'Ana Ribeiro',
    distancia: '1,2 km',
    modalidade: 'venda',
    preco: 'R$ 5 / kg',
    fruta: 'laranja',
  },
  {
    id: '3',
    titulo: 'Limão-taiti',
    autor: 'Carla Souza',
    distancia: '450 m',
    modalidade: 'doacao',
    fruta: 'limao',
  },
  {
    id: '4',
    titulo: 'Acerola fresca',
    autor: 'Pedro Alves',
    distancia: '2,0 km',
    modalidade: 'doacao',
    fruta: 'acerola',
  },
  {
    id: '5',
    titulo: 'Mangas para suco',
    autor: 'Rita Campos',
    distancia: '1,8 km',
    modalidade: 'venda',
    preco: 'R$ 3 / kg',
    fruta: 'manga',
  },
  {
    id: '6',
    titulo: 'Limões do pé',
    autor: 'João Nunes',
    distancia: '3,1 km',
    modalidade: 'doacao',
    fruta: 'limao',
  },
];
