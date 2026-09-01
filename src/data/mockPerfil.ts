import { useSyncExternalStore } from 'react';

export type Perfil = {
  nome: string;
  /** Primeiro nome, usado em saudações. */
  primeiroNome: string;
  /** Inicial exibida nos avatares quando não há foto. */
  inicial: string;
  /** URI local da foto de perfil (null = usa a inicial). */
  fotoUri: string | null;
  email: string;
  telefone: string;
  bairro: string;
  bio: string;
  nota: number;
  frutasDoadas: number;
  frutasVendidas: number;
};

/**
 * Usuário logado (dados de exemplo, em memória). Fonte única para nome/avatar
 * em todas as telas. Substituir por usersService.me() com o backend.
 */
let perfil: Perfil = {
  nome: 'Marina Silva',
  primeiroNome: 'Marina',
  inicial: 'M',
  fotoUri: null,
  email: 'marina.silva@email.com',
  telefone: '(11) 98765-4321',
  bairro: 'Vila Madalena, São Paulo',
  bio: 'Tenho um quintal cheio de frutas e adoro dividir o que sobra com a vizinhança.',
  nota: 4.8,
  frutasDoadas: 42,
  frutasVendidas: 15,
};

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

/** Atualiza campos do perfil e notifica quem estiver observando. */
export function atualizarPerfil(patch: Partial<Perfil>) {
  perfil = { ...perfil, ...patch };
  if (patch.nome) {
    perfil.primeiroNome = patch.nome.trim().split(/\s+/)[0] ?? perfil.primeiroNome;
    perfil.inicial = perfil.primeiroNome.charAt(0).toUpperCase();
  }
  emit();
}

/** Snapshot atual (não reativo). Use `usePerfil()` em componentes. */
export function getPerfil(): Perfil {
  return perfil;
}

/** Hook reativo: re-renderiza quando o perfil muda. */
export function usePerfil(): Perfil {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getPerfil,
    getPerfil,
  );
}
