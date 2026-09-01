/**
 * Tipos de resposta da API — fonte da verdade, espelham o contrato do backend
 * (repo `frutou-api`, seção A.4 do plano). Campos marcados `// fmt` já vêm como
 * texto pronto para exibição; o app não reformata nem faz `new Date`.
 */

export type Modalidade = 'doacao' | 'venda';

/* ---- usuário ---- */

export type UserPublic = {
  id: string;
  nome: string;
  fotoUrl: string | null;
  nota: number; // 0..5, 1 casa
  trocas: number;
};

export type UserMe = UserPublic & {
  email: string;
  telefone: string | null;
  bio: string | null;
  bairro: string | null;
  lat: number | null;
  lng: number | null;
};

export type AuthResponse = { token: string; user: UserMe };

/* ---- anúncio ---- */

export type ListingListItem = {
  id: string;
  titulo: string;
  modalidade: Modalidade;
  precoTexto: string | null; // fmt (só venda)
  fotos: string[]; // URLs absolutas; [0] é a capa
  detalhe: string | null; // fmt curto ("Colhida hoje")
  distanciaTexto: string | null; // fmt ("1,2 km" | "850 m") — null se sem geo
  publicadoHa: string; // fmt ("há 2h" | "ontem")
  status: 'ativo' | 'encerrado';
  autor: UserPublic;
  favorito: boolean;
  /** Coordenadas para o modo mapa. `null`/ausente quando o anúncio não tem local. */
  lat?: number | null;
  lng?: number | null;
};

export type ListingDetail = ListingListItem & {
  descricao: string;
  disponibilidade: string; // fmt ("15 unidades")
  bairro: string | null;
  lat: number | null;
  lng: number | null;
  janelaRetirada: string | null;
  tempoAPe: string | null; // fmt ("10 min a pé") — null se sem geo
};

/* ---- chat ---- */

export type ConversationListItem = {
  id: string;
  parceiro: { id: string; nome: string; fotoUrl: string | null };
  assunto: string; // fmt ("Manga Palmer · Doação")
  modalidade: Modalidade;
  ultimaMensagem: { texto: string; de: 'eu' | 'ele' } | null;
  quando: string; // fmt ("agora" | "14:05" | "ontem" | "12 mar")
  naoLida: boolean;
};

export type ChatMessage = {
  id: string;
  de: 'eu' | 'ele';
  texto: string;
  hora: string; // fmt ("14:02" | "ontem" | "agora")
};

export type ConversationDetail = {
  id: string;
  parceiro: { id: string; nome: string; fotoUrl: string | null };
  assunto: string;
  modalidade: Modalidade;
  listingId: string;
  mensagens: ChatMessage[]; // ordem cronológica (mais antiga primeiro)
};

/* ---- histórico / review ---- */

export type HistoricoItem = {
  id: string; // = conversationId
  conversationId: string;
  listingId: string;
  titulo: string;
  papel: 'recebi' | 'ofereci';
  parceiro: { id: string; nome: string };
  data: string; // fmt ("28 ago 2026")
  modalidade: Modalidade;
  precoTexto: string | null;
  minhaNota: number; // 0 = ainda não avaliei
};

/* ---- avaliação pública (perfil de outro usuário) ---- */

export type ReviewPublic = {
  id: string;
  nota: number; // 1..5
  comentario: string | null;
  data: string; // fmt ("28 ago 2026")
  autor: { id: string; nome: string; fotoUrl: string | null };
  listingTitulo: string;
};

/* ---- geocoding (Fase 6) ---- */

export type GeoResult = {
  lat: number;
  lng: number;
  bairro: string | null;
  label: string;
};
