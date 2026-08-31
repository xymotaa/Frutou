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

  /* ---- campos usados na tela de detalhes ---- */
  /** Ex.: "15 unidades disponíveis", "5 kg disponíveis". */
  disponibilidade: string;
  /** Ex.: "há 2h", "ontem". */
  publicadoHa: string;
  descricao: string;
  autorNota: number;
  autorTrocas: number;
  /** Ex.: "10 min a pé". */
  tempoAPe: string;
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
    disponibilidade: '15 unidades disponíveis',
    publicadoHa: 'há 2h',
    descricao:
      'Tenho um pé de manga no quintal de casa e ele produziu bastante nesta temporada! As frutas estão bem doces e maduras, perfeitas para sucos ou para comer in natura. Não vou conseguir consumir tudo e adoraria compartilhar com a vizinhança. Venha com uma sacola!',
    autorNota: 4.9,
    autorTrocas: 24,
    tempoAPe: '10 min a pé',
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
    disponibilidade: '8 kg disponíveis',
    publicadoHa: 'há 5h',
    descricao:
      'Jabuticaba colhida hoje de manhã, direto do pé. Fruta firme, doce e sem bicho. Ideal para comer fresca, fazer geleia ou licor. Vendo por quilo, com desconto para quem levar mais de 3 kg. Retirada no sítio ou combino entrega no bairro.',
    autorNota: 4.8,
    autorTrocas: 51,
    tempoAPe: '38 min a pé',
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
    disponibilidade: '5 kg disponíveis',
    publicadoHa: 'ontem',
    descricao:
      'Laranja-pera bem suculenta, ótima para suco. O pé é antigo e sempre dá fruta doce. Colho na hora que você combinar para chegar o mais fresca possível. Aceito troca por outras frutas ou hortaliças da estação.',
    autorNota: 4.7,
    autorTrocas: 12,
    tempoAPe: '11 min a pé',
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
    disponibilidade: 'Cerca de 3 kg',
    publicadoHa: 'há 30 min',
    descricao:
      'O limoeiro carregou de novo e não damos conta. Limão-taiti graúdo, com bastante suco. Doação para quem puder passar até sábado — depois disso as frutas começam a cair. Só trazer um saco ou caixinha.',
    autorNota: 5.0,
    autorTrocas: 7,
    tempoAPe: '6 min a pé',
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
    lng: -49.1,
    disponibilidade: '20 kg disponíveis',
    publicadoHa: 'há 1 dia',
    descricao:
      'Mangas bem maduras, algumas com marquinhas da casca, mas ótimas para suco e vitamina. Preço baixo justamente por serem de vez. Levo até o portão se você estiver aqui perto. Quanto mais levar, melhor o preço.',
    autorNota: 4.6,
    autorTrocas: 33,
    tempoAPe: '20 min a pé',
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
    disponibilidade: 'Cerca de 2 kg',
    publicadoHa: 'há 3h',
    descricao:
      'Aceroleira dando fruta sem parar. Colhi hoje cedo um bom tanto e quero doar antes que estrague — acerola não dura muito depois de colhida. Rica em vitamina C, ótima para suco congelado. É só combinar o horário e passar aqui.',
    autorNota: 4.9,
    autorTrocas: 18,
    tempoAPe: '24 min a pé',
  },
];

export function getListing(id: string): Listing | undefined {
  return mockListings.find((l) => l.id === id);
}
