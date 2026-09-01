export type Perfil = {
  nome: string;
  /** Primeiro nome, usado em saudações. */
  primeiroNome: string;
  /** Inicial exibida nos avatares. */
  inicial: string;
  email: string;
  telefone: string;
  bairro: string;
  bio: string;
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
  email: 'marina.silva@email.com',
  telefone: '(11) 98765-4321',
  bairro: 'Vila Madalena, São Paulo',
  bio: 'Tenho um quintal cheio de frutas e adoro dividir o que sobra com a vizinhança.',
  nota: 4.8,
  frutasDoadas: 42,
  frutasVendidas: 15,
};
