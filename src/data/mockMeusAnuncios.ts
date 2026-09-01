import type { FruitKey } from '@/components/fruits';

export type StatusAnuncio = 'ativo' | 'encerrado';

export type MeuAnuncio = {
  id: string;
  titulo: string;
  descricao: string;
  bairro: string;
  distancia: string;
  modalidade: 'doacao' | 'venda';
  preco?: string;
  status: StatusAnuncio;
  fruta: FruitKey;
};

export function getMeuAnuncio(id: string): MeuAnuncio | undefined {
  return mockMeusAnuncios.find((a) => a.id === id);
}

/** Dados de exemplo. Substituir por listingsService.mine() com o backend. */
export const mockMeusAnuncios: MeuAnuncio[] = [
  {
    id: 'a1',
    titulo: 'Tangerinas frescas',
    descricao: 'Colhidas hoje de manhã. Cerca de 2 kg disponíveis.',
    bairro: 'Vila Mariana',
    distancia: '2 km',
    modalidade: 'doacao',
    status: 'ativo',
    fruta: 'laranja',
  },
  {
    id: 'a2',
    titulo: 'Limão siciliano',
    descricao: 'Limões grandes e suculentos, ideais para suco ou tempero.',
    bairro: 'Pinheiros',
    distancia: '5 km',
    modalidade: 'venda',
    preco: 'R$ 5,00 / dúzia',
    status: 'ativo',
    fruta: 'limao',
  },
  {
    id: 'a3',
    titulo: 'Mangas maduras',
    descricao: 'Passaram um pouco do ponto, ótimas para suco.',
    bairro: 'Saúde',
    distancia: '3 km',
    modalidade: 'doacao',
    status: 'encerrado',
    fruta: 'manga',
  },
  {
    id: 'a4',
    titulo: 'Acerola do quintal',
    descricao: 'Duas sacolas cheias. Já foi tudo, obrigada!',
    bairro: 'Ipiranga',
    distancia: '4 km',
    modalidade: 'venda',
    preco: 'R$ 8,00 / kg',
    status: 'encerrado',
    fruta: 'acerola',
  },
];
