export type ItemHistorico = {
  id: string;
  titulo: string;
  /** 'recebi' = você pegou de alguém; 'ofereci' = você doou/vendeu. */
  papel: 'recebi' | 'ofereci';
  parceiro: string;
  data: string;
  modalidade: 'doacao' | 'venda';
  preco?: string;
  /** Nota que você deu ao parceiro (0 = ainda não avaliou). */
  minhaNota: number;
};

/** Dados de exemplo. Substituir por listingsService.history() com o backend. */
export const mockHistorico: ItemHistorico[] = [
  {
    id: 'h1',
    titulo: 'Manga Palmer',
    papel: 'recebi',
    parceiro: 'Dona Maria',
    data: '28 ago 2026',
    modalidade: 'doacao',
    minhaNota: 5,
  },
  {
    id: 'h2',
    titulo: 'Limões do pé',
    papel: 'ofereci',
    parceiro: 'Carlos Silva',
    data: '21 ago 2026',
    modalidade: 'doacao',
    minhaNota: 4,
  },
  {
    id: 'h3',
    titulo: 'Jabuticaba Sabará',
    papel: 'recebi',
    parceiro: 'Sítio do Zé',
    data: '14 ago 2026',
    modalidade: 'venda',
    preco: 'R$ 15 / kg',
    minhaNota: 5,
  },
  {
    id: 'h4',
    titulo: 'Laranja-pera',
    papel: 'ofereci',
    parceiro: 'Ana Ribeiro',
    data: '2 ago 2026',
    modalidade: 'venda',
    preco: 'R$ 5 / kg',
    minhaNota: 0,
  },
];
