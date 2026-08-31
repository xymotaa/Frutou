export type Perfil = {
  nome: string;
  /** Primeiro nome, usado em saudações. */
  primeiroNome: string;
  /** Inicial exibida nos avatares. */
  inicial: string;
  nota: number;
  frutasDoadas: number;
  frutasVendidas: number;
};

/**
 * Usuário logado (dados de exemplo). Fonte única para nome/avatar em todas as
 * telas. Substituir por usersService.me() com o backend.
 */
export const usuarioAtual: Perfil = {
  nome: 'Marina Silva',
  primeiroNome: 'Marina',
  inicial: 'M',
  nota: 4.8,
  frutasDoadas: 42,
  frutasVendidas: 15,
};

