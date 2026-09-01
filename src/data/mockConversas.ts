import { useSyncExternalStore } from 'react';

export type Mensagem = {
  id: string;
  /** 'eu' = usuário atual; 'ele' = o outro participante. */
  de: 'eu' | 'ele';
  texto: string;
  hora: string;
};

export type Conversa = {
  id: string;
  nome: string;
  quando: string;
  naoLida: boolean;
  /** Contexto: sobre qual anúncio é a conversa. */
  assunto: string;
  modalidade: 'doacao' | 'venda';
  mensagens: Mensagem[];
};

/** Dados de exemplo (em memória). Substituir por chatService com o backend. */
export const mockConversas: Conversa[] = [
  {
    id: '1',
    nome: 'Dona Jurema',
    quando: 'agora',
    naoLida: true,
    assunto: 'Mangas rosa · R$ 15/caixa',
    modalidade: 'venda',
    mensagens: [
      { id: 'm1', de: 'ele', texto: 'Oi! Ainda tem mangas disponíveis?', hora: '14:02' },
      { id: 'm2', de: 'eu', texto: 'Tenho sim! Duas caixas ainda.', hora: '14:05' },
      { id: 'm3', de: 'ele', texto: 'Perfeito. Consigo passar amanhã de manhã?', hora: '14:06' },
    ],
  },
  {
    id: '2',
    nome: 'Carlos Silva',
    quando: '10:45',
    naoLida: true,
    assunto: 'Abacates · Doação',
    modalidade: 'doacao',
    mensagens: [
      { id: 'm1', de: 'eu', texto: 'Oi Carlos, os abacates estão prontos para retirada.', hora: '10:30' },
      { id: 'm2', de: 'ele', texto: 'Passo aí no final da tarde para buscar, pode ser?', hora: '10:45' },
    ],
  },
  {
    id: '3',
    nome: 'Mariah',
    quando: 'ontem',
    naoLida: false,
    assunto: 'Laranjas · R$ 4/kg',
    modalidade: 'venda',
    mensagens: [
      { id: 'm1', de: 'ele', texto: 'As laranjas ainda estão disponíveis?', hora: 'ontem' },
      { id: 'm2', de: 'eu', texto: 'Sim! Levo na feira amanhã se você for.', hora: 'ontem' },
      { id: 'm3', de: 'ele', texto: 'Combinado, te vejo na feira amanhã!', hora: 'ontem' },
    ],
  },
];

/* ---- store reativo (em memória) ---- */

const listeners = new Set<() => void>();
let versao = 0;

function emit() {
  versao += 1;
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Hook reativo: re-renderiza quando qualquer conversa/mensagem muda. */
export function useConversas(): Conversa[] {
  useSyncExternalStore(
    subscribe,
    () => versao,
    () => versao,
  );
  return mockConversas;
}

/** Hook reativo para uma conversa específica. */
export function useConversa(id: string): Conversa | undefined {
  useSyncExternalStore(
    subscribe,
    () => versao,
    () => versao,
  );
  return mockConversas.find((c) => c.id === id);
}

export function getConversa(id: string): Conversa | undefined {
  return mockConversas.find((c) => c.id === id);
}

/** Adiciona uma mensagem minha a uma conversa e notifica os observadores. */
export function enviarMensagem(conversaId: string, texto: string) {
  const c = mockConversas.find((x) => x.id === conversaId);
  if (!c) return;
  c.mensagens.push({
    id: `m${Date.now()}`,
    de: 'eu',
    texto,
    hora: 'agora',
  });
  c.quando = 'agora';
  emit();
}

/** Texto que abre a conversa quando alguém demonstra interesse num anúncio. */
export function textoInteresse(tituloAnuncio: string, doacao: boolean): string {
  return doacao
    ? `Oi! Tenho interesse no anúncio "${tituloAnuncio}". Ainda está disponível? Consigo combinar a retirada.`
    : `Oi! Tenho interesse no anúncio "${tituloAnuncio}". Ainda está à venda? Podemos combinar os detalhes?`;
}

/**
 * Cria (ou reaproveita) uma conversa com `nome` sobre `assunto`, já com a
 * primeira mensagem do usuário. Retorna o id da conversa.
 */
export function iniciarConversa(
  nome: string,
  assunto: string,
  modalidade: 'doacao' | 'venda',
  primeiraMensagem: string,
): string {
  const existente = mockConversas.find(
    (c) => c.nome === nome && c.assunto === assunto,
  );

  if (existente) {
    enviarMensagem(existente.id, primeiraMensagem);
    return existente.id;
  }

  const nova: Conversa = {
    id: `c${Date.now()}`,
    nome,
    quando: 'agora',
    naoLida: false,
    assunto,
    modalidade,
    mensagens: [
      { id: `m${Date.now()}`, de: 'eu', texto: primeiraMensagem, hora: 'agora' },
    ],
  };
  mockConversas.unshift(nova);
  emit();
  return nova.id;
}
