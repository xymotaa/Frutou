export type Conversa = {
  id: string;
  nome: string;
  ultimaMensagem: string;
  quando: string;
  naoLida: boolean;
  /** Contexto: sobre qual anúncio é a conversa. */
  assunto: string;
  modalidade: 'doacao' | 'venda';
};

/** Dados de exemplo. Substituir por chatService.list() com o backend. */
export const mockConversas: Conversa[] = [
  {
    id: '1',
    nome: 'Dona Jurema',
    ultimaMensagem: 'Oi! Ainda tem mangas disponíveis?',
    quando: 'agora',
    naoLida: true,
    assunto: 'Mangas rosa · R$ 15/caixa',
    modalidade: 'venda',
  },
  {
    id: '2',
    nome: 'Carlos Silva',
    ultimaMensagem: 'Passo aí no final da tarde para buscar, pode ser?',
    quando: '10:45',
    naoLida: true,
    assunto: 'Abacates · Doação',
    modalidade: 'doacao',
  },
  {
    id: '3',
    nome: 'Mariah',
    ultimaMensagem: 'Combinado, te vejo na feira amanhã!',
    quando: 'ontem',
    naoLida: false,
    assunto: 'Laranjas · R$ 4/kg',
    modalidade: 'venda',
  },
];
